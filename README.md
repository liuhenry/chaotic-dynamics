# Chaotic Dynamics Visualizations

A visualization of chaotic dynamics in the damped, driven pendulum (and an excuse to explore WebAssembly).

![Screenshot](https://user-images.githubusercontent.com/293681/82255903-6d026500-9923-11ea-8d74-bef1506a1719.png)

The numerics are implemented as a standard 4th-order Runge-Kutta integrator in C++, which is compiled to a JS class using WebAssembly (WASM). The front-end hooks this to an interface using React/Redux and visualizes it using Canvas.
