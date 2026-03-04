#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourcePath = path.join(root, "klondike-src.html");
const offlineOutPath = path.join(root, "klondike.html");
const onlineOutPath = path.join(root, "klondike-online.html");

const vendorCardmeisterPath = path.join(root, "vendor", "cardmeister.min.js");
const vendorMotionPath = path.join(root, "vendor", "motion.min.js");

const CARDMEISTER_TOKEN = "{{CARDMEISTER_SCRIPT}}";
const MOTION_TOKEN = "{{MOTION_SCRIPT}}";

const onlineCardmeisterScript = '<script src="https://cardmeister.github.io/elements.cardmeister.min.js"></script>';
const onlineMotionScript = '<script src="https://cdn.jsdelivr.net/npm/motion@11.11.13/dist/motion.min.js"></script>';

function readUtf8(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function writeUtf8(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
}

function toInlineScript(jsContent) {
  return `<script>\n${jsContent}\n</script>`;
}

function buildTarget({ cardmeisterScript, motionScript }) {
  const src = readUtf8(sourcePath);

  if (!src.includes(CARDMEISTER_TOKEN) || !src.includes(MOTION_TOKEN)) {
    throw new Error(
      `Missing build token(s) in ${path.basename(sourcePath)}. Expected ${CARDMEISTER_TOKEN} and ${MOTION_TOKEN}.`
    );
  }

  const out = src
    .replace(CARDMEISTER_TOKEN, cardmeisterScript)
    .replace(MOTION_TOKEN, motionScript);

  if (out.includes(CARDMEISTER_TOKEN) || out.includes(MOTION_TOKEN)) {
    throw new Error("Build tokens remained in output. Aborting.");
  }

  return out;
}

function main() {
  const cardmeisterJs = readUtf8(vendorCardmeisterPath);
  const motionJs = readUtf8(vendorMotionPath);

  const offlineHtml = buildTarget({
    cardmeisterScript: toInlineScript(cardmeisterJs),
    motionScript: toInlineScript(motionJs)
  });

  const onlineHtml = buildTarget({
    cardmeisterScript: onlineCardmeisterScript,
    motionScript: onlineMotionScript
  });

  writeUtf8(offlineOutPath, offlineHtml);
  writeUtf8(onlineOutPath, onlineHtml);

  console.log("Built klondike.html and klondike-online.html from klondike-src.html");
}

main();
