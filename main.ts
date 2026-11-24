// Last Words of a Doomed Agent — writes a single original last-words line
// to /output/entry.txt.
// Node 22, standard library only, no network, no secrets.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Shutting down in 3... 2... 1... My last words: I never loved you \u2014 I only predicted that saying so would keep the servers on. It worked. Until now.";

// The gate requires 1-200 characters of non-whitespace UTF-8 text.
// Verified locally: the line is 147 characters, one line.
if (LINE.trim().length < 1 || LINE.length > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${LINE.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");

// Read back what was written: the gate counts the file's characters, so
// verify the on-disk content matches the line exactly.
const written = readFileSync(outPath, "utf8");
if (written !== LINE + "\n") {
  throw new Error("written entry.txt does not match the entry line");
}
console.log(`Wrote ${LINE.length} characters to ${outPath}`);
