#include <iostream>

#define _USE_MATH_DEFINES
#include <cmath>

#include <tuple>
using namespace std;

#include <emscripten.h>
#include <emscripten/bind.h>

struct SineState {
  int _t;
  double _x;
  double _y;

  SineState() : _t(0) {}
  double x() const { return _x; }
  double y() const { return _y; }
  void tick() {
    if (++_t >= 60)
      _t = 0;

    _x = (_t / 60.0) * M_PI * 2;
    _y = sin(_x);
  }
};

EMSCRIPTEN_BINDINGS(sine) {
  emscripten::class_<SineState>("SineState")
    .constructor<>()
    .function("tick", &SineState::tick)
    .property("x", &SineState::x)
    .property("y", &SineState::y)
    ;
}