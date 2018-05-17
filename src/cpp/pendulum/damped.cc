#include <cmath>
#include <vector>
using std::vector;

#include "integrator/integrator.hh"

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#include <emscripten/bind.h>
#endif

class DampedPendulum {
  int _t;
  Integrator _integrator;

  static vector<double> eom(double, const vector<double> &);

 public:
  DampedPendulum(double angle)
      : _t(0), _integrator(DampedPendulum::eom, {angle, 0}){}

  double theta() const { return _integrator[0]; }
  double omega() const { return _integrator[1]; }

  void tick();
};

vector<double> DampedPendulum::eom(double t, const vector<double> &z) {
  // theta'' = -sin(theta) - theta'
  // becomes:
  // theta' = omega
  // omega' = -sin(theta) - omega
  const double &theta = z[0], &omega = z[1];
  double dtheta = omega, domega = -sin(theta) - (1.0/10) * omega;
  return vector<double>{dtheta, domega};
}

void DampedPendulum::tick() {
  for (int i = 0; i < 5; i ++) {
    _integrator.step(_t, 0.01); 
  }
}

#ifdef __EMSCRIPTEN__
EMSCRIPTEN_BINDINGS(damped_pendulum) {
  emscripten::class_<DampedPendulum>("DampedPendulum")
    .constructor<double>()
    .function("tick", &DampedPendulum::tick)
    .property("theta", &DampedPendulum::theta)
    .property("omega", &DampedPendulum::omega)
    ;
}
#endif