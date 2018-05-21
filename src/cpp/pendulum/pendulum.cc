#include <cmath>
#include <queue>
#include <tuple>
#include <vector>
using std::deque;
using std::get;
using std::tuple;
using std::vector;

#include "integrator/integrator.hh"

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#include <emscripten/bind.h>
using emscripten::select_overload;
#endif

class Pendulum {
  int _t;
  Integrator _integrator;
  deque<tuple<double, double>> _phase_history;

  static vector<double> eom(double, const vector<double> &,
                            const vector<double> &);

 public:
  Pendulum(double theta, double omega)
      : _t(0), _integrator(Pendulum::eom, {theta, omega}), _phase_history() {}

  double theta() const { return _integrator[0]; }
  double omega() const { return _integrator[1]; }

  int historySize() const { return _phase_history.size(); }
  double theta(int idx) const { return get<0>(_phase_history[idx]); }
  double omega(int idx) const { return get<1>(_phase_history[idx]); }

  void tick(double);
};

vector<double> Pendulum::eom(double t, const vector<double> &params,
                             const vector<double> &z) {
  // theta'' = -sin(theta)
  // becomes:
  // theta' = omega
  // omega' = -sin(theta)
  const double &theta = z[0], &omega = z[1];
  double dtheta = omega, domega = -sin(theta) - params[0] * omega;
  return vector<double>{dtheta, domega};
}

void Pendulum::tick(double damping=0) {
  for (int i = 0; i < 5; i++) {
    _integrator.step(_t, 0.01, {damping});
  }

  double theta = _integrator[0];
  double omega = _integrator[1];

  // https://stackoverflow.com/questions/4633177/c-how-to-wrap-a-float-to-the-interval-pi-pi
  theta = -M_PI*2 + fmod(M_PI*4 + fmod(theta+M_PI*2, M_PI*4), M_PI*4);

  _integrator[0] = theta;

  _phase_history.push_front({theta, omega});
  if (_phase_history.size() > 5000) {
    _phase_history.pop_back();
  }
}

#ifdef __EMSCRIPTEN__
EMSCRIPTEN_BINDINGS(pendulum) {
  emscripten::class_<Pendulum>("Pendulum")
      .constructor<double, double>()
      .function("tick", &Pendulum::tick)
      .property("theta", select_overload<double() const>(&Pendulum::theta))
      .property("omega", select_overload<double() const>(&Pendulum::omega))
      .property("historySize", &Pendulum::historySize)
      .function("theta_idx",
                select_overload<double(int) const>(&Pendulum::theta))
      .function("omega_idx",
                select_overload<double(int) const>(&Pendulum::omega));
}
#endif