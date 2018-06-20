#include <cmath>
#include <tuple>
#include <vector>
#include <boost/circular_buffer.hpp>
using std::get;
using std::tuple;
using std::vector;
using boost::circular_buffer;

#include "integrator/integrator.hh"

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#include <emscripten/bind.h>
using emscripten::select_overload;
#endif

// Some utils (TODO: move into own class)
double wrapMax(double x, double max) {
  /* wrap x -> [0,max) */
  return fmod(max + fmod(x, max), max);
}

double wrapMinMax(double x, double min, double max) {
  /* wrap x -> [min,max) */
  return min + wrapMax(x - min, max - min);
}

class Pendulum {
  int _t;
  double _drive;
  Integrator _integrator;
  circular_buffer<tuple<double, double, double>> _phase_history;
  circular_buffer<tuple<double, double>> _phase_slice;
  static vector<double> eom(double, const vector<double> &,
                            const vector<double> &);

 public:
  Pendulum(double theta, double omega)
      : _t(0),
        _drive(0),
        _integrator(Pendulum::eom, {theta, omega, 0}),
        _phase_history(10000),
        _phase_slice(10000) {}

  double theta() const { return _integrator[0]; }
  double omega() const { return _integrator[1]; }
  double phi() const { return _integrator[2]; }
  double drive() const { return _drive; }

  int historySize() const { return _phase_history.size(); }
  double theta(int idx) const { return get<0>(_phase_history[idx]); }
  double omega(int idx) const { return get<1>(_phase_history[idx]); }
  double phi(int idx) const { return get<2>(_phase_history[idx]); }

  int poincareSize() const { return _phase_slice.size(); }
  double poincareTheta(int idx) const { return get<0>(_phase_slice[idx]); }
  double poincareOmega(int idx) const { return get<1>(_phase_slice[idx]); }

  void tick(double, double, double, double);
  void clearPoincare() { _phase_slice.clear(); }
};

vector<double> Pendulum::eom(double t, const vector<double> &params,
                             const vector<double> &z) {
  // theta'' + d*theta' + sin(theta) = a*cos(p*t)
  // becomes:
  // theta' = omega
  // omega' = -sin(theta) - d*omega + a*cos(phi)
  // phi' = p
  const double &theta = z[0], &omega = z[1], &phi = z[2];
  const double &damping = params[0], &amplitude = params[1],
               &frequency = params[2];

  const double dtheta = omega;
  const double domega = -sin(theta) - damping * omega + amplitude * cos(phi);
  const double dphi = frequency;
  return vector<double>{dtheta, domega, dphi};
}

void Pendulum::tick(double speed, double damping, double amplitude,
                    double frequency) {
  for (int i = 0; i < speed; i++) {
    // Step size constant at 0.01, seems to work well for our purposes
    _integrator.step(_t, 0.01, {damping, amplitude, frequency});

    const double theta = _integrator[0];
    const double omega = _integrator[1];
    const double phi = _integrator[2];

    // For visualization of drive state
    _drive = amplitude * cos(phi);

    // Wrap periodic variables
    // https://stackoverflow.com/questions/4633177/c-how-to-wrap-a-float-to-the-interval-pi-pi
    // wrapped_theta: [-2π, 2π) - extended range to allow basin visualization
    // wrapped_phi: [0, 2π)
    // poincare_theta: [-π, π)
    // const double wrapped_theta = wrapMinMax(theta, -M_PI * 2, M_PI * 2);
    const double wrapped_phi = wrapMax(phi, M_PI * 2);
    const double poincare_theta = wrapMinMax(theta, -M_PI, M_PI);
    const double wrapped_theta = poincare_theta;

    _integrator[0] = wrapped_theta;
    _integrator[2] = wrapped_phi;

    if (i % 5 == 0) {
      _phase_history.push_front({wrapped_theta, omega, wrapped_phi});
    }

    const bool phiZero = std::abs(wrapped_phi) <= 1e-3;
    if (phiZero || get<2>(_phase_history.front()) > wrapped_phi) {
      _phase_slice.push_front({poincare_theta, omega});
    }
  }
}

#ifdef __EMSCRIPTEN__
EMSCRIPTEN_BINDINGS(pendulum) {
  emscripten::class_<Pendulum>("Pendulum")
      .constructor<double, double>()
      .function("tick", &Pendulum::tick)
      .property("theta", select_overload<double() const>(&Pendulum::theta))
      .property("omega", select_overload<double() const>(&Pendulum::omega))
      .property("phi", select_overload<double() const>(&Pendulum::phi))
      .property("drive", select_overload<double() const>(&Pendulum::drive))
      .property("historySize", &Pendulum::historySize)
      .function("theta_idx",
                select_overload<double(int) const>(&Pendulum::theta))
      .function("omega_idx",
                select_overload<double(int) const>(&Pendulum::omega))
      .function("phi_idx", select_overload<double(int) const>(&Pendulum::phi))
      .property("poincareSize", &Pendulum::poincareSize)
      .function("poincare_theta",
                select_overload<double(int) const>(&Pendulum::poincareTheta))
      .function("poincare_omega",
                select_overload<double(int) const>(&Pendulum::poincareOmega))
      .function("clear_poincare", &Pendulum::clearPoincare);
}
#endif
