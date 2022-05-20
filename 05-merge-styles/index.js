const fs = require('fs/promises');
const path = require('path');

const mergeStyles = async () => {
  try {
    const stylesDir = path.join(__dirname, 'styles');
    const inputFiles = await fs.readdir(stylesDir);
    const inputFilesData = [];
    const outputFile = path.join(__dirname, 'project-dist', 'bundle.css');

    for (const file of inputFiles) {
      const filePath = path.join(stylesDir, file);
      const fileStat = await fs.stat(filePath);
      const isFile = fileStat.isFile();
      const isCss = path.extname(file) === '.css';

      if (isFile && isCss) {
        inputFilesData.push(await fs.readFile(filePath, 'utf8'));
      }

      await fs.writeFile(outputFile, inputFilesData, 'utf8');
    }
  } catch (err) {
    console.log(err);
  }
};

mergeStyles();


