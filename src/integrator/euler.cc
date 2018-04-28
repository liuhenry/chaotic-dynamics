#include "euler.hh"

#include <vector>
using std::vector;

vector<double> forwardEulerStep(DynFun dynFun, double t, double dt,
                                const std::vector<double> &z, int nDim) {
  vector<double> zRet(nDim);

  // z_{n+1} = z_n + dt * f(t, z_n)
  auto dz = dynFun(t, z);
  for (int i = 0; i < nDim; i++) {
    zRet[i] = z[i] + dt * dz[i];
  }

  return zRet;
}

vector<double> midpointStep(DynFun dynFun, double t, double dt,
                            const vector<double> &z, int nDim) {
  vector<double> zRet(nDim);

  // z_{n+0.5} = z_n + 0.5 * dt * f(t, z)
  vector<double> z1(z);
  auto dz = dynFun(t, z);
  for (int i = 0; i < nDim; i++) {
    z1[i] = z[i] + 0.5 * dt * dz[i];
  }

  // z_{n+1} = z_n + dt * f(t+0.5*dt, z_{n+0.5})
  dz = dynFun(t + 0.5 * dt, z1);
  for (int i = 0; i < nDim; i++) {
    zRet[i] = z[i] + dt * dz[i];
  }

  return zRet;
}