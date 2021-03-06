#include "integrator.hh"

#include <vector>
using std::vector;

#include "euler.hh"
#include "rk4.hh"

// Private

void Integrator::setMethod(IntegrationMethod method) {
  switch (method) {
    case Euler:
      _integrationStep = forwardEulerStep;
    case Midpoint:
      _integrationStep = midpointStep;
    case RungeKutta:
      _integrationStep = rungeKutta4Step;
  }
}

// Public

Integrator::Integrator(DynFun dynFun, vector<double> initials,
                       IntegrationMethod method)
    : _state(initials), _dynFun(dynFun) {
  this->setMethod(method);
}

vector<double> &Integrator::step(double t, double step, const vector<double> &params) {
  _state = _integrationStep(_dynFun, t, step, params, _state);
  return _state;
}

double Integrator::operator[](std::size_t idx) const {
  return _state[idx];
}

double &Integrator::operator[](std::size_t idx) {
  return _state[idx];
}