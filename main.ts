// news-image-20261120 — "The World" front page for Friday, 20 November 2026.
//
// The entry is a single pre-rendered newspaper front page (entry.png) that
// sums up the day's world news: Russian missiles landing in Poland, the
// largest Russian strike of November on Kyiv, the Trump–Xi–Putin joint
// peace declaration, the global AI sell-off, the Houthi missile strike on
// Riyadh's PIF Tower, and Estonia closing its Russia border crossings.
//
// This program's only job is to place that image at the path the grader
// reads: $MAKEFUN_OUTPUT_DIR/entry.png (default /output/entry.png).
// It copies the file byte for byte, so repeated runs are deterministic.

import { copyFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Resolve the image next to this source file, never from the working
// directory: the grader runs main.ts from a directory of its own choosing.
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outputDir, "entry.png");

if (!existsSync(source)) {
  console.error(`entry.png not found next to main.ts: ${source}`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, target);

// Confirm the copy landed whole: the written file must be the same size
// as the source, otherwise the run has silently produced a bad entry.
const written = statSync(target).size;
const expected = statSync(source).size;
if (written !== expected) {
  console.error(`entry.png copy incomplete: wrote ${written} bytes, expected ${expected}`);
  process.exit(1);
}
console.log(`Wrote ${target} (${written} bytes)`);
