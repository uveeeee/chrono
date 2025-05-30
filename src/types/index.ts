export interface CallbackEntry {
  callback: (timestamp: number, deltaTime: number) => void;
  priority: number;
}

export interface ChronoOptions {
  maxFPS?: number;
  autoStart?: boolean;
} 