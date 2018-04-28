#ifndef __EULER_INTEGRATOR_H__
#define __EULER_INTEGRATOR_H__

#include <vector>

#include "integrator.hh"

void forwardEulerStep(DynFun dynFun, double t0, double t1,
                      std::vector<double> &z, std::vector<double> &zNext,
                      int nDim);

void midpointStep(DynFun dynFun, double t0, double t1, std::vector<double> &z,
                  std::vector<double> &zNext, int nDim);

#endif