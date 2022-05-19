const fs = require('fs/promises');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

async function readDir() {
  try {
    const files = await fs.readdir(folderPath, {withFileTypes: true});
    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(folderPath, file.name);
        const fullName = file.name;
        const name = path.parse(fullName).name;
        const ext = path.extname(fullName);
        const size = (await fs.stat(filePath)).size;
        process.stdout.write(`${name} - ${ext} - ${size} bytes\n`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

readDir();
