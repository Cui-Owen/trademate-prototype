export type ReplayState = {
  playing: boolean;
  speed: 1 | 5 | 10;
  index: number;
};

type Listener = (s: ReplayState) => void;

class ReplayController {
  private state: ReplayState = { playing: true, speed: 1, index: 0 };
  private listeners = new Set<Listener>();
  get() {
    return this.state;
  }
  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }
  set(partial: Partial<ReplayState>) {
    this.state = { ...this.state, ...partial };
    this.listeners.forEach((l) => l(this.state));
  }
  play() {
    this.set({ playing: true });
  }
  pause() {
    this.set({ playing: false });
  }
  setSpeed(speed: 1 | 5 | 10) {
    this.set({ speed });
  }
  setIndex(index: number) {
    this.set({ index });
  }
}

let singleton: ReplayController | null = null;
export function getReplayController() {
  if (!singleton) singleton = new ReplayController();
  return singleton;
}
