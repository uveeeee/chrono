# @uveee/chrono

[![Chronos](public/header.png)](https://github.com/uvee-dev/chrono)

A lightweight and efficient animation loop manager for browser-based applications. It provides a simple way to manage multiple animation callbacks with priority control and FPS limiting.

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

## Quick Start

```typescript
import { Chrono } from '@uveee/chrono';

// Create a new instance with optional configuration
const chrono = new Chrono({
    maxFPS: 60,          // Maximum frames per second
    autoStart: false,    // Don't start automatically
    debug: true          // Enable debug mode
});

// Add a callback with priority
chrono.add((timestamp, deltaTime) => {
    // Your animation code here
    console.log(`Frame time: ${deltaTime}ms`);
}, 1); // Priority level (higher = more important)

// Start the animation loop
chrono.start();

// Stop when needed
chrono.stop();
```

## API Reference

### Constructor Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| maxFPS | number | 60 | Maximum frames per second |
| autoStart | boolean | false | Whether to start the loop automatically |
| debug | boolean | false | Enable debug mode for performance monitoring |

### Methods

#### `add(callback: Function, priority: number = 0): void`
Adds a callback function to the animation loop. Higher priority callbacks are executed first.

```typescript
chrono.add((timestamp, deltaTime) => {
    // Animation code
}, 1);
```

#### `remove(callback: Function): void`
Removes a callback from the animation loop.

```typescript
const callback = (timestamp, deltaTime) => {
    // Animation code
};
chrono.add(callback);
chrono.remove(callback);
```

#### `start(): void`
Starts the animation loop.

#### `stop(): void`
Stops the animation loop.

#### `getFPS(): number`
Returns the current frames per second.

#### `getFrameTime(): number`
Returns the time taken to render the last frame in milliseconds.

### Callback Parameters

Each callback receives two parameters:

1. `timestamp`: The current timestamp in milliseconds
2. `deltaTime`: The time elapsed since the last frame in milliseconds

## Examples

### Basic Animation

```typescript
import { Chrono } from '@uveee/chrono';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

const chrono = new Chrono({ maxFPS: 60 });

let x = 0;
chrono.add((timestamp, deltaTime) => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update position
    x += deltaTime * 0.1;
    if (x > canvas.width) x = 0;
    
    // Draw circle
    ctx.beginPath();
    ctx.arc(x, canvas.height / 2, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#FF6B35';
    ctx.fill();
});

chrono.start();
```

### Multiple Animations with Priorities

```typescript
import { Chrono } from '@uveee/chrono';

const chrono = new Chrono();

// Background animation (low priority)
chrono.add((timestamp, deltaTime) => {
    document.body.style.background = `hsl(${timestamp / 20}, 50%, 50%)`;
}, 0);

// Main animation (high priority)
chrono.add((timestamp, deltaTime) => {
    // Your main animation code
}, 1);
```

### FPS Monitoring

```typescript
import { Chrono } from '@uveee/chrono';

const chrono = new Chrono({ debug: true });

// Update FPS display
chrono.add((timestamp, deltaTime) => {
    const fps = chrono.getFPS();
    const frameTime = chrono.getFrameTime();
    
    console.log(`FPS: ${fps.toFixed(1)}`);
    console.log(`Frame time: ${frameTime.toFixed(2)}ms`);
});
```

## Performance Tips

1. **Use Priorities Wisely**: Assign higher priorities to critical animations and lower priorities to background effects.
2. **Monitor FPS**: Enable debug mode to monitor performance and adjust accordingly.
3. **Clean Up**: Always remove callbacks when they're no longer needed to prevent memory leaks.
4. **Optimize Callbacks**: Keep callback functions as lightweight as possible.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [uvee-dev](https://github.com/uvee-dev)
