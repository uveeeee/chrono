class e {
  constructor(t = {}) {
    this.callbacks = [], this.now = 0, this.rafId = null, this.isRunning = !1, this.maxFPS = 0, this.lastFrameTime = 0, this.frameInterval = 0, this.isFirstFrame = !0, this.now = performance.now(), this.maxFPS = t.maxFPS || 0, this.frameInterval = this.maxFPS ? 1e3 / this.maxFPS : 0, this.raf = this.raf.bind(this), t.autoStart !== !1 && this.start();
  }
  /**
   * Starts the animation loop
   */
  start() {
    this.isRunning || (this.isRunning = !0, this.lastFrameTime = performance.now(), this.isFirstFrame = !0, this.rafId = requestAnimationFrame(this.raf));
  }
  /**
   * Stops the animation loop
   */
  stop() {
    this.isRunning && this.rafId !== null && (cancelAnimationFrame(this.rafId), this.isRunning = !1, this.rafId = null);
  }
  /**
   * Adds a callback to the requestAnimationFrame loop with an optional priority.
   * @param callback - The function to call each frame
   * @param priority - The priority of the callback. Lower numbers run earlier
   * @returns A function to remove the callback from the loop
   */
  add(t, i = 0) {
    return this.callbacks.push({ callback: t, priority: i }), this.callbacks.sort((s, a) => s.priority - a.priority), () => this.remove(t);
  }
  /**
   * Removes a callback from the requestAnimationFrame loop.
   * @param callback - The function to remove
   */
  remove(t) {
    this.callbacks = this.callbacks.filter(({ callback: i }) => t !== i);
  }
  /**
   * Clears all callbacks from the loop
   */
  clear() {
    this.callbacks = [];
  }
  /**
   * Gets the current list of callbacks
   */
  getCallbacks() {
    return [...this.callbacks];
  }
  /**
   * The requestAnimationFrame loop handler.
   * @param now - The current timestamp
   * @internal This method is exposed for testing purposes only
   */
  raf(t) {
    if (!this.isRunning)
      return;
    const i = t - this.now;
    if (this.now = t, this.maxFPS && !this.isFirstFrame) {
      if (t - this.lastFrameTime < this.frameInterval) {
        this.rafId = requestAnimationFrame(this.raf);
        return;
      }
      this.lastFrameTime = t;
    }
    for (const { callback: s } of this.callbacks)
      try {
        s(t, i);
      } catch (a) {
        console.error("Error in animation callback:", a);
      }
    this.rafId = requestAnimationFrame(this.raf), this.isFirstFrame && (this.isFirstFrame = !1, this.lastFrameTime = t);
  }
}
function n(r) {
  try {
    return typeof window > "u" ? null : new e(r);
  } catch (t) {
    return console.warn("Failed to create Chrono instance:", t), null;
  }
}
const h = n();
export {
  e as Chrono,
  h as chronoInstance,
  n as createChronoInstance,
  h as default
};
//# sourceMappingURL=chrono.es.js.map
