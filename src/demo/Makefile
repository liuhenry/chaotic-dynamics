CC=emcc
CXX=em++
CFLAGS=-s WASM=1 -Os
CXXFLAGS=--std=c++1z --bind $(CFLAGS)

all: sine.js

sine.js: sine.cpp
	$(CXX) $< $(CXXFLAGS) -o $@

clean:
	rm *.wasm