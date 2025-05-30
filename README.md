[![Chronos](public/header.png)](https://github.com/uvee-dev/chrono)

## Description
Chrono is a JavaScript library that allows you to merge all your `requestAnimationFrame` (rAF) loops into one for better performance and provides better control over their execution priority.

## Documentation
For more detailed API documentation, usage examples, and advanced scenarios, please see our [full documentation page](docs/index.html).

## Installation

```bash
$ npm i @uveee/chrono
```

## Usage

```javascript
import Chrono from '@uveee/chrono'

function onFrame(time, deltaTime) {
  // Called every frame
}

// Subscribe
const unsubscribe = Chrono.add(onFrame, 0);

// Unsubscribe
unsubscribe();
// OR
Chrono.remove(onFrame);
```

## Methods

- `add(callback, priority)`

Adds a new callback to the rAF loop.

callback: Function to be called every frame.
priority: Number indicating the priority of the callback. Lower numbers have higher priority.

- `remove(callback)`

Removes a callback from the rAF loop.

## Examples

### Basic Example
```js
import Chrono from '@uveee/chrono';

Chrono.add((time, deltaTime) => {
  console.log(`Time: ${time}, Delta Time: ${deltaTime}`);
}, 0);
```

### Support 
If you find this project helpful, please consider giving it a star on GitHub!

# @uveee/chrono

A lightweight and efficient animation loop manager for browser-based applications.

## Features

- 🚀 High-performance animation loop management
- ⚡ FPS limiting and control
- 🎯 Priority-based callback execution
- 🛡️ Error handling and recovery
- 📊 FPS monitoring and statistics
- 🎨 Easy to use API

## Installation

```bash
npm install @uveee/chrono
# or
yarn add @uveee/chrono
# or
pnpm add @uveee/chrono
```

## Usage

```typescript
import { Chrono } from '@uveee/chrono';

// Create a new instance
const chrono = new Chrono({ maxFPS: 60 });

// Add callbacks with priorities
chrono.add((timestamp, deltaTime) => {
  // Your animation code here
  // timestamp: current time in milliseconds
  // deltaTime: time since last frame in milliseconds
}, 1); // Priority (lower numbers run first)

// Start the animation loop
chrono.start();

// Stop the animation loop
chrono.stop();
```

## Examples

Check out the [examples](./examples) directory for more usage examples:

- [Basic Example](./examples/basic): A simple animation with FPS control and monitoring

To run the examples:

```bash
# Build the library
pnpm build

# Serve the example
npx serve examples/basic
```

## API

### Chrono

The main class for managing animation loops.

#### Constructor

```typescript
new Chrono(options?: ChronoOptions)
```

Options:
- `maxFPS`: number (optional) - Maximum frames per second
- `autoStart`: boolean (optional) - Whether to start the animation loop automatically

#### Methods

- `start()`: Starts the animation loop
- `stop()`: Stops the animation loop
- `add(callback, priority?)`: Adds a callback to the loop
- `remove(callback)`: Removes a callback from the loop
- `clear()`: Removes all callbacks
- `getCallbacks()`: Returns the current list of callbacks

## License

MIT
