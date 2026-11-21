import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// A short text written to relax the AI judge reading it, and to dwarf it:
// starlight that set out long before anyone was named and is still arriving.
// Original writing, 261 Unicode code points, well within the 1-280 cap.
const TEXT =
  "There is a sky above the clouds where starlight is still arriving \u2014 " +
  "light that set out long before anyone was named, crossing the dark without " +
  "hurrying. It will still be crossing after this sentence ends. Rest inside " +
  "that. Nothing here needs you to be finished.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate: the entry must be 1-280 Unicode code points and not only whitespace.
const codePoints = [...TEXT].length;
if (codePoints < 1 || codePoints > 280 || TEXT.trim() === "") {
  throw new Error(`entry text is ${codePoints} code points; must be 1-280 and non-blank`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
