# Chaotic Dynamics Project Documentation

## Project Overview

This is a web-based visualization tool for chaotic dynamical systems, specifically focused on pendulum simulations. The project was built around 2017-2018 and uses:

- **Frontend**: React 16 with Redux for state management
- **Visualization**: HTML5 Canvas for rendering pendulum motion, phase space, and Poincaré sections
- **Physics Engine**: C++ compiled to WebAssembly using Emscripten
- **Build Tools**: Webpack 4, TypeScript 3.9, Babel

## Build Process

### Prerequisites

1. **Node.js**: The project uses npm for package management (v23.5.0 used)
2. **Emscripten**: Required for compiling C++ to WebAssembly
   - Install via Homebrew: `brew install emscripten`
   - Configure: `rm ~/.emscripten && brew postinstall emscripten`

### Building the Project

#### 1. Install Dependencies
```bash
npm install
```

**Status**: ✅ Successful, but with warnings:
- 65 vulnerabilities (8 low, 11 moderate, 39 high, 7 critical)
- Old lockfile warning - package-lock.json was created with an old npm version

#### 2. Build C++ Components
```bash
make
```

**Status**: ✅ Successful after installing Emscripten
- Updated Makefile to include `-s USE_BOOST_HEADERS=1` for Boost circular_buffer support
- Generates `pendulum-wasm.js` and `pendulum-wasm.wasm` in `dist/assets/js/`
- Uses Emscripten's embind for C++ to JavaScript bindings

#### 3. Build JavaScript/TypeScript
```bash
# Run TypeScript type checking first
npx tsc --noEmit

# Then build the bundle
npm run build
```

**Status**: ⚠️ Partial success
- **IMPORTANT**: Always run `npx tsc --noEmit` before committing to catch TypeScript errors
- Build created `bundle.js` and `bundle.js.map` in `dist/assets/js/`
- Error occurred due to Node.js version incompatibility with Webpack 4
- Error: "digital envelope routines::unsupported" - common with Webpack 4 on newer Node.js versions
- Despite the error, the JavaScript bundle was successfully generated

### Deployment

The project deploys from the `gh-pages` branch which contains:
- `index.html` - Main entry point
- `assets/js/` - JavaScript bundles and WebAssembly files
- `assets/css/` - Tachyons CSS framework

## Pre-Commit Checklist

**IMPORTANT**: Before committing any changes, always run:

1. **TypeScript type checking**:
   ```bash
   npx tsc --noEmit
   ```
   Fix any type errors before proceeding.

2. **Build C++ components** (if modified):
   ```bash
   make clean && make
   cp dist/assets/js/pendulum-wasm.* public/assets/js/
   ```

3. **Build JavaScript bundle** (if TypeScript modified):
   ```bash
   npm run build
   cp dist/assets/js/bundle.* public/assets/js/
   ```

4. **Test the application**:
   ```bash
   npx http-server public -p 8080
   ```
   Open http://localhost:8080 and verify functionality.

## Known Issues

1. **Outdated Dependencies**: 
   - React 16 (current is 19)
   - Webpack 4 with deprecated `awesome-typescript-loader`
   - TypeScript 3.9 (current is 5.7)
   - Multiple security vulnerabilities

2. **Build Issues**:
   - Emscripten not installed
   - Node.js/OpenSSL compatibility issues with Webpack 4
   - Missing HTML entry point

3. **Code Style**:
   - Uses class components instead of modern functional components
   - No linting or formatting configuration
   - Redux without Redux Toolkit

## Recommended Updates

1. **Immediate fixes**:
   - Create an index.html file
   - Install Emscripten SDK for C++ compilation
   - Add `NODE_OPTIONS=--openssl-legacy-provider` for Webpack 4 compatibility

2. **Modernization**:
   - Upgrade to React 19 with functional components
   - Migrate to Vite or modern Webpack 5+
   - Update TypeScript to 5.x
   - Add ESLint and Prettier
   - Use Redux Toolkit

3. **Development workflow**:
   - Add proper npm scripts for development
   - Configure hot module replacement
   - Add testing framework

## Project Structure

```
/
├── src/
│   ├── cpp/           # C++ physics simulation
│   │   ├── integrator/   # Numerical integration methods (Euler, RK4, Symplectic)
│   │   └── pendulum/     # Pendulum physics
│   └── js/            # TypeScript/React frontend
│       ├── actions/      # Redux actions
│       ├── canvas/       # Canvas rendering logic
│       ├── components/   # React components
│       ├── reducers/     # Redux reducers
│       ├── stores/       # Redux store configuration
│       └── types/        # TypeScript definitions
├── dist/              # Build output
└── webpack.config.js  # Webpack configuration
```

## Running the Project

Currently, the project cannot run due to:
1. Missing index.html
2. Missing WebAssembly files
3. No development server configuration for serving the files

To get it running, you would need to:
1. Create an index.html that loads the bundle.js
2. Install Emscripten and build the C++ components
3. Use `npm run serve` with proper webpack-dev-server configuration