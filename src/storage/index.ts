import { z } from 'zod';

const VersionedSchema = z.object({
  version: z.literal(1),
  data: z
    .object({
      user: z
        .object({
          isFirstTime: z.boolean().default(true),
        })
        .partial(),
      preferences: z.object({ theme: z.enum(['light', 'dark']).default('light') }).partial(),
    })
    .partial(),
});

type ModelV1 = z.infer<typeof VersionedSchema>;

const KEY = 'trademate_store';

export function loadStore(): ModelV1 {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { version: 1, data: {} };
    const parsed = JSON.parse(raw);
    return VersionedSchema.parse(parsed);
  } catch {
    return { version: 1, data: {} };
  }
}

export function saveStore(model: ModelV1) {
  localStorage.setItem(KEY, JSON.stringify(model));
}

export function migrate(input: unknown): ModelV1 {
  // Placeholder for future migration; currently v1 only
  try {
    return VersionedSchema.parse(input);
  } catch {
    return { version: 1, data: {} };
  }
}
