type EnvLike = {
  SUPABASE_URL?: string;
  SUPABASE_PUBLISHABLE_KEY?: string;
  VITE_SUPABASE_URL?: string;
  VITE_SUPABASE_PUBLISHABLE_KEY?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
} & Record<string, string | undefined>;

export type SupabaseConfig = {
  url?: string;
  key?: string;
  serviceRoleKey?: string;
};

function getRuntimeEnv() {
  const viteEnv = (typeof import.meta !== 'undefined' && 'env' in import.meta
    ? (import.meta as ImportMeta & { env?: EnvLike }).env
    : undefined) as EnvLike | undefined;

  return {
    ...(typeof process !== 'undefined' ? process.env : {}),
    ...(viteEnv ?? {}),
  } as EnvLike;
}

export function getSupabaseConfig(input?: { env?: EnvLike; runtime?: 'server' | 'client' }) {
  const env = input?.env ?? getRuntimeEnv();
  const runtime = input?.runtime ?? 'server';

  const url = runtime === 'client'
    ? env.VITE_SUPABASE_URL ?? env.SUPABASE_URL
    : env.SUPABASE_URL ?? env.VITE_SUPABASE_URL;

  const key = runtime === 'client'
    ? env.VITE_SUPABASE_PUBLISHABLE_KEY ?? env.SUPABASE_PUBLISHABLE_KEY
    : env.SUPABASE_PUBLISHABLE_KEY ?? env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY ?? env.VITE_SUPABASE_SERVICE_ROLE_KEY;

  return { url, key, serviceRoleKey } satisfies SupabaseConfig;
}

export function hasSupabaseConfig(config: SupabaseConfig) {
  return Boolean(config.url && config.key);
}
