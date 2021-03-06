CC = emcc
CXX = em++
CFLAGS = -s WASM=1 -Os -I src/cpp/ -I /usr/local/include/
CXXFLAGS = --std=c++1z --bind $(CFLAGS)

SRC_DIR = src/cpp

SOURCES := $(wildcard $(SRC_DIR)/**/*.cc)
SOURCES := $(filter-out $(SRC_DIR)/integrator/test.cc, $(SOURCES))
OBJECTS := $(patsubst %.cc, %.o, $(SOURCES))
TARGET = dist/assets/js/pendulum-wasm

$(TARGET).js: $(OBJECTS)
	$(CXX) $(CXXFLAGS) $^ -o $@

%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c $^ -o $@

clean:
	rm $(OBJECTS) $(TARGET).js $(TARGET).wasm