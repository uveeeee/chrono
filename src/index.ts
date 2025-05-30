import { Chrono } from './core/Chrono';
import type { ChronoOptions } from './types';

/**
 * Creates a new Chrono instance if running in a browser environment.
 * Returns null if running in a non-browser environment.
 * @param options - Optional configuration options for the Chrono instance
 * @returns A new Chrono instance or null
 */
export function createChronoInstance(options?: ChronoOptions): Chrono | null {
  try {
    if (typeof window === 'undefined') {
      return null;
    }
    return new Chrono(options);
  } catch (error) {
    console.warn('Failed to create Chrono instance:', error);
    return null;
  }
}

/**
 * The default Chrono instance for the current environment.
 * Will be null in non-browser environments.
 */
export const chronoInstance = createChronoInstance();

// Export the class and types
export { Chrono };
export type { ChronoOptions };

// Default export
export default chronoInstance; 