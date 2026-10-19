import fs from "node:fs";
import sharp from "sharp";

const logo = await sharp("public/mji-logo-1200w.png")
  .resize({
    width: 720,
    height: 274,
    fit: "contain",
    background: { r: 248, g: 248, b: 248, alpha: 1 },
  })
  .toBuffer();

const bar = Buffer.from(
  `<svg width="1200" height="630"><rect width="1200" height="630" fill="#f8f8f8"/><rect y="0" width="1200" height="8" fill="#c8a45d"/></svg>`,
);

await sharp(bar)
  .composite([{ input: logo, gravity: "center" }])
  .png()
  .toFile("public/og-image.png");

await sharp("public/mji-logo-1200w.png")
  .resize({
    width: 180,
    height: 180,
    fit: "contain",
    background: { r: 248, g: 248, b: 248, alpha: 1 },
  })
  .png()
  .toFile("public/apple-touch-icon.png");

console.log(
  "ok",
  fs.statSync("public/og-image.png").size,
  fs.statSync("public/apple-touch-icon.png").size,
);
