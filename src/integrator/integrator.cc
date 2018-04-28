#include "integrator.hh"

#include <vector>
#include <cmath>
#include <iostream>

#include "euler.hh"


/* Example Systems */

void exponential(double t, const std::vector<double> &z, std::vector<double> &dz) {
  auto x = z[0];
  auto dx = x;
  dz[0] = dx;
}

void simpleHarmonicOscillator(double t, const std::vector<double> &z,
                              std::vector<double> &dz) {
  // x'' = -x
  // -> x' = v
  //    v' = -x
  auto x = z[0], v = z[1];
  auto dx = v, dv = -x;
  dz[0] = dx;
  dz[1] = dv;
}

int main() {
  double tS = 0, tE = 4, step = 0.25;

  std::vector<double> z0 = {1};
  std::vector<double> z1(1);

  for (double t = tS; t <= tE; t += step) {
    std::cout << t << "\t" << exp(t) << "\t" << z0[0] << std::endl;
    midpointStep(exponential, t, step, z0, z1, 1);
    z0 = z1;
  }
}