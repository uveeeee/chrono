class Chrono {
  constructor() {
    this.callbacks = [];
    this.now = performance.now();
    this.raf = this.raf.bind(this);
    requestAnimationFrame(this.raf);
  }

  /**
   * Adds a callback to the requestAnimationFrame loop with an optional priority.
   * @param {Function} callback - The function to call each frame.
   * @param {number} [priority=0] - The priority of the callback. Lower numbers run earlier.
   * @returns {Function} - A function to remove the callback from the loop.
   */
  add(callback, priority = 0) {
    this.callbacks.push({ callback, priority });
    this.callbacks.sort((a, b) => a.priority - b.priority);

    return () => this.remove(callback);
  }

  /**
   * Removes a callback from the requestAnimationFrame loop.
   * @param {Function} callback - The function to remove.
   */
  remove(callback) {
    this.callbacks = this.callbacks.filter(({ callback: cb }) => callback !== cb);
  }

  /**
   * The requestAnimationFrame loop handler.
   * @param {number} now - The current timestamp.
   */
  raf(now) {
    requestAnimationFrame(this.raf);

    const deltaTime = now - this.now;
    this.now = now;

    for (const { callback } of this.callbacks) {
      callback(now, deltaTime);
    }
  }
}

const isClient = typeof window !== 'undefined';
const chronoInstance = isClient ? new Chrono() : null;

export default chronoInstance;
