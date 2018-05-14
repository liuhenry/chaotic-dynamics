CC=gcc
CXX=g++
CFLAGS=-Wall
CXXFLAGS=--std=c++1z $(CFLAGS)

SOURCES := $(wildcard *.cc)
OBJECTS := $(patsubst %.cc, %.o, $(SOURCES))

test: $(OBJECTS)
	$(CXX) $(CXXFLAGS) $^ -o $@

clean:
	rm *.o