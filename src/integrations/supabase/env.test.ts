import test from 'node:test';
import assert from 'node:assert/strict';
import { getSupabaseConfig, hasSupabaseConfig } from './env.ts';

test('reads Supabase settings from environment variables', () => {
  const config = getSupabaseConfig({
    env: {
      SUPABASE_URL: 'https://example.supabase.co',
      SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_test',
    },
  });

  assert.equal(config.url, 'https://example.supabase.co');
  assert.equal(config.key, 'sb_publishable_test');
  assert.equal(hasSupabaseConfig(config), true);
});
