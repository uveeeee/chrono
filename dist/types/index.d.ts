export default chronoInstance;
declare const chronoInstance: Chrono;
declare class Chrono {
    callbacks: any[];
    now: number;
    /**
     * The requestAnimationFrame loop handler.
     * @param {number} now - The current timestamp.
     */
    raf(now: number): void;
    /**
     * Adds a callback to the requestAnimationFrame loop with an optional priority.
     * @param {Function} callback - The function to call each frame.
     * @param {number} [priority=0] - The priority of the callback. Lower numbers run earlier.
     * @returns {Function} - A function to remove the callback from the loop.
     */
    add(callback: Function, priority?: number): Function;
    /**
     * Removes a callback from the requestAnimationFrame loop.
     * @param {Function} callback - The function to remove.
     */
    remove(callback: Function): void;
}
