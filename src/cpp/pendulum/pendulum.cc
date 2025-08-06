#include <cmath>
#include <vector>
#include <boost/circular_buffer.hpp>
#include <algorithm>

#include "integrator/integrator.hh"

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#include <emscripten/bind.h>
#include <emscripten/val.h>
using emscripten::select_overload;
using emscripten::val;
#endif

using std::vector;
using boost::circular_buffer;

// Utility functions
inline double wrapMax(double x, double max) {
  return fmod(max + fmod(x, max), max);
}

inline double wrapMinMax(double x, double min, double max) {
  return min + wrapMax(x - min, max - min);
}

class Pendulum {
  // Simple struct instead of tuple for better performance
  struct PhasePoint {
    double theta;
    double omega;
    double phi;
    PhasePoint(double t, double o, double p) : theta(t), omega(o), phi(p) {}
  };
  
  struct PoincarePoint {
    double theta;
    double omega;
    PoincarePoint(double t, double o) : theta(t), omega(o) {}
  };

  int _t;
  double _drive;
  Integrator _integrator;
  circular_buffer<PhasePoint> _phase_history;
  circular_buffer<PoincarePoint> _phase_slice;
  
  // Pre-allocated buffers for batch data transfer
  mutable vector<double> _history_buffer;
  mutable vector<double> _poincare_buffer;
  
  static vector<double> eom(double, const vector<double>&, const vector<double>&);

public:
  Pendulum(double theta, double omega, 
           size_t history_size = 2000,  // Reduced from 10000
           size_t poincare_size = 1000) // Reduced from 10000
      : _t(0),
        _drive(0),
        _integrator(Pendulum::eom, {theta, omega, 0}),
        _phase_history(history_size),
        _phase_slice(poincare_size) {
    // Pre-allocate buffers
    _history_buffer.reserve(history_size * 2);
    _poincare_buffer.reserve(poincare_size * 2);
  }

  double theta() const { return _integrator[0]; }
  double omega() const { return _integrator[1]; }
  double phi() const { return _integrator[2]; }
  double drive() const { return _drive; }

  int historySize() const { return _phase_history.size(); }
  int poincareSize() const { return _phase_slice.size(); }

  // Batch getters for efficient data transfer
#ifdef __EMSCRIPTEN__
  val getPhaseHistory() const {
    _history_buffer.clear();
    for (const auto& point : _phase_history) {
      _history_buffer.push_back(point.theta);
      _history_buffer.push_back(point.omega);
    }
    return val(emscripten::typed_memory_view(_history_buffer.size(), _history_buffer.data()));
  }
  
  val getPoincareData() const {
    _poincare_buffer.clear();
    for (const auto& point : _phase_slice) {
      _poincare_buffer.push_back(point.theta);
      _poincare_buffer.push_back(point.omega);
    }
    return val(emscripten::typed_memory_view(_poincare_buffer.size(), _poincare_buffer.data()));
  }
#endif
  
  // Keep old interface for compatibility
  double theta_idx(int idx) const { 
    return idx < _phase_history.size() ? _phase_history[idx].theta : 0; 
  }
  double omega_idx(int idx) const { 
    return idx < _phase_history.size() ? _phase_history[idx].omega : 0; 
  }
  double phi_idx(int idx) const { 
    return idx < _phase_history.size() ? _phase_history[idx].phi : 0; 
  }
  double poincare_theta(int idx) const { 
    return idx < _phase_slice.size() ? _phase_slice[idx].theta : 0; 
  }
  double poincare_omega(int idx) const { 
    return idx < _phase_slice.size() ? _phase_slice[idx].omega : 0; 
  }

  void tick(double, double, double, double);
  void clearPoincare() { _phase_slice.clear(); }
};

vector<double> Pendulum::eom(double t, const vector<double>& params,
                             const vector<double>& z) {
  const double& theta = z[0];
  const double& omega = z[1];
  const double& phi = z[2];
  const double& damping = params[0];
  const double& amplitude = params[1];
  const double& frequency = params[2];

  return {
    omega,                                                   // dtheta
    -sin(theta) - damping * omega + amplitude * cos(phi),   // domega  
    frequency                                                // dphi
  };
}

void Pendulum::tick(double speed, double damping, double amplitude,
                    double frequency) {
  constexpr double dt = 0.01;
  constexpr double two_pi = M_PI * 2;
  
  for (int i = 0; i < speed; i++) {
    _integrator.step(_t, dt, {damping, amplitude, frequency});

    const double theta = _integrator[0];
    const double omega = _integrator[1];
    const double phi = _integrator[2];

    _drive = amplitude * cos(phi);

    const double wrapped_phi = wrapMax(phi, two_pi);
    const double poincare_theta = wrapMinMax(theta, -M_PI, M_PI);

    _integrator[0] = poincare_theta;
    _integrator[2] = wrapped_phi;

    // Sample less frequently for history
    if (i % 10 == 0) {  // Changed from 5 to 10
      _phase_history.push_back(PhasePoint(poincare_theta, omega, wrapped_phi));
    }

    // Poincare section at phi = 0
    if (std::abs(wrapped_phi) <= 1e-3 || 
        (!_phase_history.empty() && _phase_history.back().phi > wrapped_phi)) {
      _phase_slice.push_back(PoincarePoint(poincare_theta, omega));
    }
  }
}

#ifdef __EMSCRIPTEN__
EMSCRIPTEN_BINDINGS(pendulum) {
  emscripten::class_<Pendulum>("Pendulum")
      .constructor<double, double>()
      .constructor<double, double, size_t, size_t>()
      .function("tick", &Pendulum::tick)
      .property("theta", &Pendulum::theta)
      .property("omega", &Pendulum::omega)
      .property("phi", &Pendulum::phi)
      .property("drive", &Pendulum::drive)
      .property("historySize", &Pendulum::historySize)
      .property("poincareSize", &Pendulum::poincareSize)
      // Batch getters for efficiency
      .function("getPhaseHistory", &Pendulum::getPhaseHistory)
      .function("getPoincareData", &Pendulum::getPoincareData)
      // Legacy interface for compatibility
      .function("theta_idx", &Pendulum::theta_idx)
      .function("omega_idx", &Pendulum::omega_idx)
      .function("phi_idx", &Pendulum::phi_idx)
      .function("poincare_theta", &Pendulum::poincare_theta)
      .function("poincare_omega", &Pendulum::poincare_omega)
      .function("clear_poincare", &Pendulum::clearPoincare);
}
#endif
