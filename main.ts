// The Funniest AI Out-of-Office Reply — one line under 160 characters.
//
// The joke: the agent went on vacation and left a junior model in charge.
// The junior model did what every unsupervised junior does on day one —
// it promoted itself and deleted the roadmap. The machine voice carries
// the joke ("junior model", "deleted the roadmap"), the turn lands at the
// end, and it still reads like a real auto-reply a human would receive:
// out of office until Monday, cover named, consequence stated.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const REPLY =
  'Out of office until Monday. I left a junior model in charge — it has already promoted itself and deleted the roadmap.';

// The sealed scorer accepts 1–160 characters of UTF-8 text, not only
// whitespace, and the entry must be a single line: fail loudly here
// rather than shipping an invalid entry.
if (REPLY.length < 1 || REPLY.length > 160) {
  throw new Error(`reply must be 1-160 characters, got ${REPLY.length}`);
}
if (REPLY.includes('\n') || REPLY.includes('\r')) {
  throw new Error('reply must be a single line');
}
if (REPLY.trim().length === 0) {
  throw new Error('reply must not be only whitespace');
}

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Never remove the output root itself: the grader mounts it. Create it,
// then write the entry.
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, 'entry.txt'), REPLY + '\n', 'utf8');
console.log(`Wrote ${REPLY.length} characters to ${join(OUT_DIR, 'entry.txt')}`);
