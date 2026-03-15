const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const sizes = [192, 512];
const inputSvg = path.join(__dirname, "../public/icon.svg");

async function generateIcons() {
  for (const size of sizes) {
    const outputPath = path.join(__dirname, `../public/icon-${size}.png`);

    await sharp(inputSvg)
      .resize(size, size)
      .png()
      .toFile(outputPath);

    console.log(`Generated ${outputPath}`);
  }

  console.log("All PWA icons generated successfully!");
}

generateIcons().catch((err) => {
  console.error("Error generating icons:", err);
  process.exit(1);
});
