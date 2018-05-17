#include <cmath>
#include <iostream>
#include <vector>
using std::vector;

#include "integrator.hh"

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
  double tS = 0, tE = 10, step = 0.0001;

  Integrator integrator(simpleHarmonicOscillator, {1, 0});

  for (double t = tS; t <= tE; t += step) {
    std::cout << t << "\t" << cos(t) << "\t" << integrator[0] << std::endl;
    integrator.step(t, step);
  }
}