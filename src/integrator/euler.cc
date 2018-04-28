#include "euler.hh"

#include <vector>
using std::vector;

vector<double> forwardEulerStep(DynFun dynFun, double t, double dt,
                                const std::vector<double> &z) {
  vector<double> zRet(z.size());

  // z_{n+1} = z_n + dt * f(t, z_n)
  auto f = dynFun(t, z);
  for (int i = 0; i < z.size(); i++) {
    zRet[i] = z[i] + dt * f[i];
  }

  return zRet;
}

vector<double> midpointStep(DynFun dynFun, double t, double dt,
                            const vector<double> &z) {
  vector<double> zRet(z.size());

  // z_{n+0.5} = z_n + 0.5 * dt * f(t, z_n)
  vector<double> z1(z);
  auto f = dynFun(t, z);
  for (int i = 0; i < z.size(); i++) {
    z1[i] = z[i] + 0.5 * dt * f[i];
  }

  // z_{n+1} = z_n + dt * f(t+0.5*dt, z_{n+0.5})
  f = dynFun(t + 0.5 * dt, z1);
  for (int i = 0; i < z.size(); i++) {
    zRet[i] = z[i] + dt * f[i];
  }

  return zRet;
}