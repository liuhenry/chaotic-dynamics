#ifndef __INTEGRATOR_H__
#define __INTEGRATOR_H__

#include <vector>
using std::vector;

// DynFun specifies a specific differential equation system
// A higher order diffeq should be specified as a system of
// first order equations by change of variables.
//
//
typedef vector<double> (*DynFun)(double t, const vector<double> &params,
                                 const vector<double> &z);
typedef vector<double> (*IntegrationStep)(DynFun, double, double,
                                          const vector<double> &,
                                          const vector<double> &);

enum IntegrationMethod { Euler, Midpoint, RungeKutta };

class Integrator {
  vector<double> _state;
  DynFun _dynFun;
  IntegrationStep _integrationStep;

  void setMethod(IntegrationMethod);

 public:
  Integrator(DynFun, vector<double>, IntegrationMethod = RungeKutta);

  vector<double> &step(double, double, const vector<double> &);
  double operator[](std::size_t) const;
  double &operator[](std::size_t);
};

#endif