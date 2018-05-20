#ifndef __INTEGRATOR_RK4_H__
#define __INTEGRATOR_RK4_H__

#include <vector>
using std::vector;

#include "integrator.hh"

vector<double> rungeKutta4Step(DynFun dynFun, double t, double dt,
                               const vector<double> &params,
                               const vector<double> &z);

#endif