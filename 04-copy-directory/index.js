const fs = require('fs/promises');
const path = require('path');

async function copyDir() {
  const newDir = path.join(__dirname, 'files-copy');
  const initDir = path.join(__dirname, 'files');

  try {
    await fs.rm(newDir, {recursive: true, force: true});
    await fs.mkdir(newDir, {recursive: true});
    const files = await fs.readdir(initDir);
    for (const file of files) {
      const newFile = path.join(newDir, file);
      const initFile = path.join(initDir, file);
      if ((await fs.stat(initFile)).isFile()) {
        await fs.copyFile(initFile, newFile);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

copyDir();
