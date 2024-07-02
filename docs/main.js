import Chrono from '../dist/chrono.modern.mjs'

function onFrame(time, deltaTime) {
  console.log(time, deltaTime)
  document.body.innerHTML = `time: ${time}<br/>delta time: ${deltaTime}`
}

Chrono.add(onFrame, 0)
