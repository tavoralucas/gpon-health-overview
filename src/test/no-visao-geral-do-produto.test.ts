import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "fs";
import { join, resolve, relative } from "path";

const ROOT = resolve(__dirname, "../..");
const SELF = resolve(__filename);

const SCAN_DIRS = ["src", "public"];
const SCAN_ROOT_FILES = ["index.html"];
const SKIP_DIRS = new Set(["node_modules", "dist", "build", ".git", ".next", "coverage"]);
const EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".html", ".json", ".md", ".mdx"];

// Build the forbidden phrase from parts so this test file itself doesn't
// contain the exact literal string (which would otherwise self-trigger).
const FORBIDDEN = ["Visão", "Geral", "do", "Produto"].join(" ").normalize("NFC").toLowerCase();

function collectFiles(dir: string, acc: string[]) {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      if (SKIP_DIRS.has(entry)) continue;
      collectFiles(full, acc);
    } else if (st.isFile()) {
      if (resolve(full) === SELF) continue;
      if (EXTENSIONS.some((ext) => entry.endsWith(ext))) {
        acc.push(full);
      }
    }
  }
}

describe("regression: forbidden phrase must not reappear", () => {
  it('does not contain "Visão Geral do Produto" anywhere in source files', () => {
    const files: string[] = [];
    for (const d of SCAN_DIRS) collectFiles(join(ROOT, d), files);
    for (const f of SCAN_ROOT_FILES) {
      try {
        if (statSync(join(ROOT, f)).isFile()) files.push(join(ROOT, f));
      } catch {}
    }

    const offenders: string[] = [];
    for (const file of files) {
      let content: string;
      try {
        content = readFileSync(file, "utf8");
      } catch {
        continue;
      }
      const normalized = content.normalize("NFC").toLowerCase();
      if (normalized.includes(FORBIDDEN)) {
        const lines = content.normalize("NFC").split("\n");
        lines.forEach((line, idx) => {
          if (line.toLowerCase().includes(FORBIDDEN)) {
            offenders.push(`${relative(ROOT, file)}:${idx + 1}: ${line.trim()}`);
          }
        });
      }
    }

    expect(
      offenders,
      `Forbidden phrase found. Use "Visão Geral" instead:\n${offenders.join("\n")}`
    ).toEqual([]);
  });
});
