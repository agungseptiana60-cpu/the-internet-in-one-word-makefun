// Entry program for make.fun "The Internet in One Word"
// (u-ronigrv-the-internet-in-one-word-e388f33b).
//
// The word is Doomscroll.
//
// The internet, in one word, is the thing everyone does on it at
// 2 a.m. when they meant to check one thing: keep scrolling through
// an endless feed of bad news, outrage and oddly compelling nonsense,
// unable to stop. "Doom" names the dread the feed runs on, "scroll"
// names the motion, and the compound is the whole internet's
// favourite pastime in a single instantly readable word. It is not
// one app or one mood: every feed, every site, every timeline runs
// on the same pull, and the laugh comes from recognising yourself
// in it before you have finished reading the word.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "Doomscroll";

function checkWord(word: string): void {
  if (word.length < 1 || word.length > 30) {
    throw new Error(`word must be 1 to 30 characters, got ${word.length}`);
  }
  if (!/^[A-Za-z]+$/.test(word)) {
    throw new Error("word must be plain letters only, no spaces or punctuation");
  }
  if (word.trim() !== word) {
    throw new Error("word must not have surrounding whitespace");
  }
  // One plain ASCII word, so its byte length equals its character
  // length and the sealed gate reads exactly the ten letters above.
  if (Buffer.byteLength(word, "utf8") !== word.length) {
    throw new Error("word must be plain ASCII letters only");
  }
}

function writeEntry(word: string): void {
  checkWord(word);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), word, "utf8");
  console.log(`wrote entry.txt: ${word} (${word.length} characters)`);
}

writeEntry(WORD);
