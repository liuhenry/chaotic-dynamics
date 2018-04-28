#ifndef __EULER_INTEGRATOR_H__
#define __EULER_INTEGRATOR_H__

#include <vector>
using std::vector;

#include "integrator.hh"

vector<double> forwardEulerStep(DynFun dynFun, double t0, double dt,
                                const vector<double> &z, int nDim);

vector<double> midpointStep(DynFun dynFun, double t0, double dt,
                            const vector<double> &z, int nDim);

#endif