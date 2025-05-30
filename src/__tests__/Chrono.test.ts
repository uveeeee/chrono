import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Chrono } from '../core/Chrono';

describe('Chrono', () => {
  let chrono: Chrono;
  let mockTime: number;

  beforeEach(() => {
    mockTime = 0;
    vi.spyOn(performance, 'now').mockImplementation(() => mockTime);
    chrono = new Chrono({ autoStart: false });
  });

  afterEach(() => {
    chrono.stop();
    vi.restoreAllMocks();
  });

  describe('basic functionality', () => {
    it('should add and remove callbacks', () => {
      const callback = vi.fn();
      const remove = chrono.add(callback);
      
      expect(chrono.getCallbacks()).toHaveLength(1);
      
      remove();
      expect(chrono.getCallbacks()).toHaveLength(0);
    });

    it('should clear all callbacks', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      
      chrono.add(callback1);
      chrono.add(callback2);
      
      expect(chrono.getCallbacks()).toHaveLength(2);
      
      chrono.clear();
      expect(chrono.getCallbacks()).toHaveLength(0);
    });
  });

  describe('priority system', () => {
    it('should respect callback priorities', () => {
      const order: number[] = [];
      const callback1 = () => order.push(1);
      const callback2 = () => order.push(2);
      const callback3 = () => order.push(3);

      chrono.add(callback2, 2);
      chrono.add(callback1, 1);
      chrono.add(callback3, 3);

      chrono.start();
      chrono.raf(mockTime);

      expect(order).toEqual([1, 2, 3]);
    });

    it('should maintain priority order after adding new callbacks', () => {
      const order: number[] = [];
      const callback1 = () => order.push(1);
      const callback2 = () => order.push(2);
      const callback3 = () => order.push(3);

      chrono.add(callback2, 2);
      chrono.add(callback1, 1);
      chrono.add(callback3, 3);
      chrono.add(() => order.push(4), 1.5);

      chrono.start();
      chrono.raf(mockTime);

      expect(order).toEqual([1, 4, 2, 3]);
    });
  });

  describe('FPS limiting', () => {
    it('should respect maxFPS setting', () => {
      const callback = vi.fn();
      const chrono = new Chrono({ maxFPS: 30, autoStart: false });
      
      chrono.add(callback);
      chrono.start();
      
      // First frame
      mockTime = 0;
      chrono.raf(mockTime);
      expect(callback).toHaveBeenCalledTimes(1);
      
      // Second frame too soon (16ms < 33.33ms for 30 FPS)
      mockTime = 16;
      chrono.raf(mockTime);
      expect(callback).toHaveBeenCalledTimes(1);
      
      // Third frame after enough time has passed
      mockTime = 34;
      chrono.raf(mockTime);
      expect(callback).toHaveBeenCalledTimes(2);
    });

    it('should not limit FPS when maxFPS is not set', () => {
      const callback = vi.fn();
      const chrono = new Chrono({ autoStart: false });
      
      chrono.add(callback);
      chrono.start();
      
      // First frame
      mockTime = 0;
      chrono.raf(mockTime);
      expect(callback).toHaveBeenCalledTimes(1);
      
      // Second frame
      mockTime = 16;
      chrono.raf(mockTime);
      expect(callback).toHaveBeenCalledTimes(2);
      
      // Third frame
      mockTime = 32;
      chrono.raf(mockTime);
      expect(callback).toHaveBeenCalledTimes(3);
    });
  });

  describe('error handling', () => {
    it('should handle errors in callbacks without breaking the loop', () => {
      const errorCallback = vi.fn(() => {
        throw new Error('Test error');
      });
      const normalCallback = vi.fn();

      chrono.add(errorCallback);
      chrono.add(normalCallback);
      
      chrono.start();
      chrono.raf(mockTime);

      expect(normalCallback).toHaveBeenCalled();
    });

    it('should continue running after an error in a callback', () => {
      const errorCallback = vi.fn(() => {
        throw new Error('Test error');
      });
      const normalCallback = vi.fn();

      chrono.add(errorCallback);
      chrono.add(normalCallback);
      
      chrono.start();
      chrono.raf(mockTime);
      mockTime += 16;
      chrono.raf(mockTime);

      expect(normalCallback).toHaveBeenCalledTimes(2);
    });
  });

  describe('start/stop behavior', () => {
    it('should not run callbacks when stopped', () => {
      const callback = vi.fn();
      chrono.add(callback);
      
      chrono.start();
      chrono.raf(mockTime);
      expect(callback).toHaveBeenCalledTimes(1);
      
      chrono.stop();
      chrono.raf(mockTime);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should auto-start when autoStart is true', () => {
      const callback = vi.fn();
      const chrono = new Chrono({ autoStart: true });
      
      chrono.add(callback);
      chrono.raf(mockTime);
      
      expect(callback).toHaveBeenCalled();
    });
  });
}); 