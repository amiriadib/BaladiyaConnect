const fs = require('fs');
const args = process.argv;

const outIndex = args.indexOf('-out');
if (outIndex !== -1 && outIndex + 2 < args.length) {
  const outPath = args[outIndex + 1];
  const inPath = args[outIndex + 2];

  try {
    fs.copyFileSync(inPath, outPath);

    // Generate a dummy source map to prevent Gradle from crashing when it tries to move it!
    if (args.includes('-output-source-map')) {
      const mapPath = outPath + '.map';
      const dummyMap = JSON.stringify({
        version: 3,
        sources: [],
        names: [],
        mappings: ""
      });
      fs.writeFileSync(mapPath, dummyMap, 'utf8');
    }

    process.exit(0);
  } catch (e) {
    console.error('Error copying file:', e);
    process.exit(1);
  }
} else {
  console.error('-out flag not found or missing arguments. Args:', args);
  process.exit(1);
}
