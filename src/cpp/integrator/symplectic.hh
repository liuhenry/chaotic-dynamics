#ifndef __INTEGRATOR_SYMPLECTIC_H__
#define __INTEGRATOR_SYMPLECTIC_H__

#include <vector>
using std::vector;

#include "integrator.hh"

vector<double> symplecticEulerStep(DynFun dynFun, double t0, double dt,
                                   const vector<double> &params,
                                   const vector<double> &z);

#endif