import React from 'react';
import { getReplayController } from '../../providers/replay/controller';

export const ReplayControls: React.FC = () => {
  const ctrl = getReplayController();
  const [state, setState] = React.useState(ctrl.get());
  React.useEffect(() => {
    const unsub = ctrl.subscribe(setState);
    return unsub;
  }, []);

  return (
    <div className="fixed bottom-4 left-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-md p-2 flex items-center gap-2 text-sm">
      <button
        aria-label={state.playing ? 'Pause' : 'Play'}
        className="px-2 py-1 border border-[var(--color-border)] rounded-[var(--radius-sm)]"
        onClick={() => (state.playing ? ctrl.pause() : ctrl.play())}
      >
        {state.playing ? 'Pause' : 'Play'}
      </button>
      <div className="flex items-center gap-1">
        <span>Speed:</span>
        {[1, 5, 10].map((s) => (
          <button
            key={s}
            onClick={() => ctrl.setSpeed(s as 1 | 5 | 10)}
            className={`px-2 py-1 rounded-[var(--radius-sm)] ${
              state.speed === s
                ? 'bg-[var(--color-primary)] text-[var(--color-primary-contrast)]'
                : 'border border-[var(--color-border)]'
            }`}
          >
            {s}x
          </button>
        ))}
      </div>
      <button
        className="px-2 py-1 border border-[var(--color-border)] rounded-[var(--radius-sm)]"
        onClick={() => ctrl.setIndex(state.index + 60)}
      >
        +1m
      </button>
    </div>
  );
};
