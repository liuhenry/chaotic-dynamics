#ifndef __INTEGRATOR_H__
#define __INTEGRATOR_H__

#include <vector>

// DynFun specifies a specific differential equation system
// A higher order diffeq should be specified as a system of
// first order equations by change of variables.
//
//
typedef void (*DynFun)(double t, const std::vector<double> &z,
                       std::vector<double> &dz);

#endif