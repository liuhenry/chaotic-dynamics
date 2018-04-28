#include <vector>
#include <iostream>

#include "euler.hh"

void forwardEulerStep(DynFun dynFun, double t, double dt,
                      std::vector<double> &z0, std::vector<double> &z1,
                      int nDim) {
  std::vector<double> dz(nDim);

  dynFun(t, z0, dz);

  for (int i = 0; i < nDim; i++) {
    z1[i] = z0[i] + dt * dz[i];
  }
}