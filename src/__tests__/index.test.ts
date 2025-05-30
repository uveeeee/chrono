import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Chrono } from '../core/Chrono';
import { createChronoInstance, chronoInstance } from '../index';

describe('index', () => {
  beforeEach(() => {
    vi.stubGlobal('window', {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    vi.resetModules();
  });

  describe('createChronoInstance', () => {
    it('should return null in non-browser environment', () => {
      vi.stubGlobal('window', undefined);
      const instance = createChronoInstance();
      expect(instance).toBeNull();
    });

    it('should create a Chrono instance in browser environment', () => {
      const instance = createChronoInstance();
      expect(instance).toBeInstanceOf(Chrono);
    });

    it('should accept options when creating instance', () => {
      const instance = createChronoInstance({ maxFPS: 30 });
      expect(instance).toBeInstanceOf(Chrono);
    });

    it('should handle errors when creating instance', async () => {
      const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

      vi.doMock('../core/Chrono', () => {
        return {
          Chrono: class {
            constructor() {
              throw new Error('Test error');
            }
          }
        };
      });

      const { createChronoInstance: createChronoInstanceMocked } = await import('../index');
      const instance = createChronoInstanceMocked();

      expect(instance).toBeNull();
      expect(consoleWarn).toHaveBeenCalledWith(
        'Failed to create Chrono instance:',
        expect.any(Error)
      );

      vi.unmock('../core/Chrono');
    });

    it('should handle errors with custom error message', async () => {
      const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

      vi.doMock('../core/Chrono', () => {
        return {
          Chrono: class {
            constructor() {
              throw new Error('Custom error message');
            }
          }
        };
      });

      const { createChronoInstance: createChronoInstanceMocked } = await import('../index');
      const instance = createChronoInstanceMocked();

      expect(instance).toBeNull();
      expect(consoleWarn).toHaveBeenCalledWith(
        'Failed to create Chrono instance:',
        expect.objectContaining({
          message: 'Custom error message'
        })
      );

      vi.unmock('../core/Chrono');
    });
  });

  describe('chronoInstance', () => {
    it('should be a Chrono instance in browser environment', () => {
      expect(chronoInstance).toBeInstanceOf(Chrono);
    });
  });

  describe('exports', () => {
    it('should export createChronoInstance function', () => {
      expect(typeof createChronoInstance).toBe('function');
    });

    it('should export chronoInstance', () => {
      expect(chronoInstance).toBeDefined();
    });

    it('should export Chrono class', () => {
      expect(Chrono).toBeDefined();
      expect(typeof Chrono).toBe('function');
    });
  });
}); 