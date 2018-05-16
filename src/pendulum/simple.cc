#include <cmath>
#include <vector>
using std::vector;

#include "integrator/integrator.hh"

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#include <emscripten/bind.h>
#endif

vector<double> eom(double t, const vector<double> &z) {
  // theta'' = -sin(theta)
  // becomes:
  // theta' = omega
  // omega' = -sin(theta)
  const double &theta = z[0], &omega = z[1];
  double dtheta = omega, domega = -sin(theta);
  return vector<double>{dtheta, domega};
}

class SimplePendulum {
  int _t;
  Integrator _integrator;

 public:
  SimplePendulum(double angle)
      : _t(0), _integrator(eom, {angle, 0}){}

  double theta() const { return _integrator[0]; }
  double omega() const { return _integrator[1]; }

  void tick();
};

void SimplePendulum::tick() {
  for (int i = 0; i < 5; i ++) {
    _integrator.step(_t, 0.01); 
  }
}

#ifdef __EMSCRIPTEN__
EMSCRIPTEN_BINDINGS(simple_pendulum) {
  emscripten::class_<SimplePendulum>("SimplePendulum")
    .constructor<double>()
    .function("tick", &SimplePendulum::tick)
    .property("theta", &SimplePendulum::theta)
    .property("omega", &SimplePendulum::omega)
    ;
}
#endif