[![Chronos](public/header.png)](https://github.com/uvee-dev/chrono)

## Description
Chrono is a JavaScript library that allows you to merge all your `requestAnimationFrame` (rAF) loops into one for better performance and provides better control over their execution priority.

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

### React
```jsx
import { useFrame } from '@uveee/chrono';

function Component() {
  useFrame((time, deltaTime) => {
    console.log(`Time: ${time}, Delta Time: ${deltaTime}`);
  });

  return <div>Your component content</div>;
}
```

### Support 
If you find this project helpful, please consider giving it a star on GitHub!
