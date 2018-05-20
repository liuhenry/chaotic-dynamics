#ifndef __INTEGRATOR_EULER_H__
#define __INTEGRATOR_EULER_H__

#include <vector>
using std::vector;

#include "integrator.hh"

vector<double> forwardEulerStep(DynFun dynFun, double t0, double dt,
                                const vector<double> &params,
                                const vector<double> &z);

vector<double> midpointStep(DynFun dynFun, double t0, double dt,
                            const vector<double> &params,
                            const vector<double> &z);

#endif