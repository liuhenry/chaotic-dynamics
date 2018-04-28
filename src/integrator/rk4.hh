#ifndef __INTEGRATOR_RK4_H__
#define __INTEGRATOR_RK4_H__

#include <vector>
using std::vector;

#include "integrator.hh"

vector<double> rangeKutta4Step(DynFun dynFun, double t, double dt,
                               const std::vector<double> &z);

#endif