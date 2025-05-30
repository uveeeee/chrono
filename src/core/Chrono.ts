import type { CallbackEntry, ChronoOptions } from '../types';

export class Chrono {
  private callbacks: CallbackEntry[] = [];
  private now = 0;
  private rafId: number | null = null;
  private isRunning = false;
  private maxFPS = 0;
  private lastFrameTime = 0;
  private frameInterval = 0;
  private isFirstFrame = true;

  constructor(options: ChronoOptions = {}) {
    this.now = performance.now();
    this.maxFPS = options.maxFPS || 0;
    this.frameInterval = this.maxFPS ? 1000 / this.maxFPS : 0;
    this.raf = this.raf.bind(this);

    if (options.autoStart !== false) {
      this.start();
    }
  }

  /**
   * Starts the animation loop
   */
  public start(): void {
    if (!this.isRunning) {
      this.isRunning = true;
      this.lastFrameTime = performance.now();
      this.isFirstFrame = true;
      this.rafId = requestAnimationFrame(this.raf);
    }
  }

  /**
   * Stops the animation loop
   */
  public stop(): void {
    if (this.isRunning && this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.isRunning = false;
      this.rafId = null;
    }
  }

  /**
   * Adds a callback to the requestAnimationFrame loop with an optional priority.
   * @param callback - The function to call each frame
   * @param priority - The priority of the callback. Lower numbers run earlier
   * @returns A function to remove the callback from the loop
   */
  public add(
    callback: (timestamp: number, deltaTime: number) => void,
    priority = 0
  ): () => void {
    this.callbacks.push({ callback, priority });
    this.callbacks.sort((a, b) => a.priority - b.priority);

    return () => this.remove(callback);
  }

  /**
   * Removes a callback from the requestAnimationFrame loop.
   * @param callback - The function to remove
   */
  public remove(callback: (timestamp: number, deltaTime: number) => void): void {
    this.callbacks = this.callbacks.filter(({ callback: cb }) => callback !== cb);
  }

  /**
   * Clears all callbacks from the loop
   */
  public clear(): void {
    this.callbacks = [];
  }

  /**
   * Gets the current list of callbacks
   */
  public getCallbacks(): CallbackEntry[] {
    return [...this.callbacks];
  }

  /**
   * The requestAnimationFrame loop handler.
   * @param now - The current timestamp
   * @internal This method is exposed for testing purposes only
   */
  public raf(now: number): void {
    if (!this.isRunning) return;

    const deltaTime = now - this.now;
    this.now = now;

    // FPS limiting
    if (this.maxFPS && !this.isFirstFrame) {
      const elapsed = now - this.lastFrameTime;
      if (elapsed < this.frameInterval) {
        this.rafId = requestAnimationFrame(this.raf);
        return;
      }
      this.lastFrameTime = now;
    }

    // Execute callbacks
    for (const { callback } of this.callbacks) {
      try {
        callback(now, deltaTime);
      } catch (error) {
        console.error('Error in animation callback:', error);
      }
    }

    // Request next frame after executing callbacks
    this.rafId = requestAnimationFrame(this.raf);
    
    // Mark first frame as complete
    if (this.isFirstFrame) {
      this.isFirstFrame = false;
      this.lastFrameTime = now;
    }
  }
} 