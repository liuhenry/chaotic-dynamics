#include "integrator.hh"

#include <cmath>
#include <iostream>
#include <vector>
using std::vector;

#include "euler.hh"

/* Example Systems */

auto exponential(double t, const vector<double> &z) {
  // x' = x
  const double &x = z[0];
  double dx = x;
  return vector<double>{dx};
}

auto simpleHarmonicOscillator(double t, const vector<double> &z) {
  // x'' = -x
  // becomes:
  // x' = v
  // v' = -x
  const double &x = z[0], &v = z[1];
  double dx = v, dv = -x;
  return vector<double>{dx, dv};
}

int main() {
  double tS = 0, tE = 4, step = 1;

  vector<double> z = {1};

  for (double t = tS; t <= tE; t += step) {
    std::cout << t << "\t" << exp(t) << "\t" << z[0] << std::endl;
    z = forwardEulerStep(exponential, t, step, z, 1);
  }
}