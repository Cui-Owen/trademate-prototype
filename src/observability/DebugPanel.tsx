import React from 'react';
import { getAnalytics } from './gateway';

export const DebugPanel: React.FC = () => {
  const analytics = getAnalytics();
  const [events, setEvents] = React.useState(analytics.getTimeline());

  React.useEffect(() => {
    const id = setInterval(() => setEvents(analytics.getTimeline()), 500);
    return () => clearInterval(id);
  }, [analytics]);

  return (
    <div className="fixed bottom-4 right-4 w-[360px] max-h-[50vh] overflow-auto bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-md p-3 text-xs">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold text-[var(--color-text)]">Debug Timeline</div>
        <button className="text-[var(--color-text-muted)]" onClick={() => analytics.clear()}>
          Clear
        </button>
      </div>
      {events.length === 0 ? (
        <div className="text-[var(--color-text-muted)]">No events yet…</div>
      ) : (
        <ul className="space-y-2">
          {events
            .slice()
            .reverse()
            .map((e, i) => (
              <li key={i} className="border-b border-[var(--color-border)] pb-2">
                <div className="text-[var(--color-text)]">{e.name}</div>
                <div className="text-[var(--color-text-muted)]">
                  {new Date(e.ts).toLocaleTimeString()}
                </div>
                <pre className="mt-1 text-[var(--color-text)] whitespace-pre-wrap">
                  {JSON.stringify(e.payload, null, 2)}
                </pre>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
