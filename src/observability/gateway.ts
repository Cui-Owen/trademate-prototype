import type { AnalyticsEvent, EventName, EventPayloads } from './taxonomy';

export interface AnalyticsGateway {
  track<K extends EventName>(name: K, payload: EventPayloads[K]): void;
  getTimeline(): AnalyticsEvent[];
  clear(): void;
}

export class InMemoryGateway implements AnalyticsGateway {
  private events: AnalyticsEvent[] = [];
  track<K extends EventName>(name: K, payload: EventPayloads[K]) {
    const evt = { name, payload, ts: Date.now() } as AnalyticsEvent<K>;
    this.events.push(evt);
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.debug('[analytics]', evt);
    }
  }
  getTimeline() {
    return this.events.slice();
  }
  clear() {
    this.events = [];
  }
}

let singleton: AnalyticsGateway | null = null;
export function getAnalytics(): AnalyticsGateway {
  if (!singleton) singleton = new InMemoryGateway();
  return singleton;
}
