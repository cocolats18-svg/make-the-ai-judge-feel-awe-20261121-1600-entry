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
// Counted as code points ([...TEXT]), not UTF-16 code units, per the rules.
function assertValidEntry(text: string): number {
  const codePoints = [...text].length;
  if (codePoints < 1 || codePoints > 280 || text.trim() === "") {
    throw new Error(`entry text is ${codePoints} code points; must be 1-280 and non-blank`);
  }
  return codePoints;
}

const codePoints = assertValidEntry(TEXT);

// Output: the grader reads /output/entry.txt (or $MAKEFUN_OUTPUT_DIR when set).
// Create the directory first, tolerating a pre-existing path, then write
// the entry as UTF-8. The written text is byte-identical to TEXT above.
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT, { encoding: "utf8", flag: "w" });
