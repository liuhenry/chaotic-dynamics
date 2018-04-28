#ifndef __INTEGRATOR_H__
#define __INTEGRATOR_H__

#include <vector>
using std::vector;

// DynFun specifies a specific differential equation system
// A higher order diffeq should be specified as a system of
// first order equations by change of variables.
//
//
typedef vector<double> (*DynFun)(double t, const vector<double> &z);

#endif