#include "rk4.hh"

#include <vector>
using std::vector;

vector<double> rungeKutta4Step(DynFun dynFun, double t, double dt,
                               const vector<double> &params,
                               const std::vector<double> &z) {
  const size_t nDim = z.size();
  vector<double> zRet(nDim), z2(nDim), z3(nDim), z4(nDim);

  // f1 = f(t, z_n)
  auto f1 = dynFun(t, params, z);

  // k2 = f(t+0.5*dt, z_n+k_1/2)
  for (int i = 0; i < nDim; i++) {
    z2[i] = z[i] + 0.5 * dt * f1[i];
  }
  auto f2 = dynFun(t + 0.5 * dt, params, z2);

  // k3 = f(t+0.5*dt, z_n+k_2/2)
  for (int i = 0; i < nDim; i++) {
    z3[i] = z[i] + 0.5 * dt * f2[i];
  }
  auto f3 = dynFun(t + 0.5 * dt, params, z3);

  // k4 = f(t+dt, z_n+k_3)
  for (int i = 0; i < nDim; i++) {
    z4[i] = z[i] + dt * f3[i];
  }
  auto f4 = dynFun(t + dt, params, z4);

  // z_{n+1) = z_n + (dt/6) * (k_1 + 2k_2 + 2k_3 + k_4)
  for (int i = 0; i < nDim; i++) {
    zRet[i] = z[i] + (dt / 6) * (f1[i] + 2 * f2[i] + 2 * f3[i] + f4[i]);
  }

  return zRet;
}