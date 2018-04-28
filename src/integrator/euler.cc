#include "euler.hh"

#include <vector>

void forwardEulerStep(DynFun dynFun, double t, double dt,
                      std::vector<double> &z, std::vector<double> &zNext,
                      int nDim) {
  std::vector<double> dz(nDim);

  // z_{n+1} = z_n + dt * f(t, z_n)
  dynFun(t, z, dz);
  for (int i = 0; i < nDim; i++) {
    zNext[i] = z[i] + dt * dz[i];
  }
}

void midpointStep(DynFun dynFun, double t, double dt, std::vector<double> &z,
                  std::vector<double> &zNext, int nDim) {
  std::vector<double> dz(nDim);

  // z_{n+0.5} = z_n + 0.5 * dt * f(t, z)
  std::vector<double> z1(nDim);
  dynFun(t, z, dz);
  for (int i = 0; i < nDim; i++) {
    z1[i] = z[i] + 0.5 * dt * dz[i];
  }

  // z_{n+1} = z_n + dt * f(t+0.5*dt, z_{n+0.5})
  dynFun(t + 0.5 * dt, z1, dz);
  for (int i = 0; i < nDim; i++) {
    zNext[i] = z[i] + dt * dz[i];
  }
}