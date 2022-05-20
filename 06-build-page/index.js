const fs = require('fs/promises');
const path = require('path');

const getComponent = async (tag) => {
  const componentName = tag.slice(2, tag.length - 2);
  return await fs.readFile(path.join(__dirname, '/components', `${componentName}.html`), 'utf8');
};

const createHtml = async () => {
  try {
    const template = await fs.readFile(path.join(__dirname, 'template.html'), 'utf8');
    const tags = template.match(/{{[a-z]*}}/gmi);
    let indexHtml = template;

    for (const tag of tags) {
      indexHtml = indexHtml.replace(tag, await getComponent(tag));
    }

    await fs.mkdir(path.join(__dirname, '/project-dist'), {recursive: true});
    await fs.writeFile(path.join(__dirname, '/project-dist', 'index.html'), indexHtml, 'utf8');
  } catch (err) {
    console.log(err);
  }
};

const mergeStyles = async () => {
  try {
    const stylesDir = path.join(__dirname, 'styles');
    const inputFiles = await fs.readdir(stylesDir);
    const inputFilesData = [];
    const outputFile = path.join(__dirname, 'project-dist', 'style.css');

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

async function copyDir(initName, newName) {
  const newDir = path.join(__dirname, newName);
  const initDir = path.join(__dirname, initName);

  try {
    await fs.mkdir(newDir, {recursive: true});
    const files = await fs.readdir(initDir);
    for (const file of files) {
      const newFile = path.join(newDir, file);
      const initFile = path.join(initDir, file);
      if ((await fs.stat(initFile)).isFile()) {
        await fs.copyFile(initFile, newFile);
      } else {
        await copyDir(`${initName}/${file}`, `${newName}/${file}`);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

const buildPage = async () => {
  try {
    await createHtml();
    await mergeStyles();
    await copyDir('/assets', '/project-dist');
  } catch (err) {
    console.log(err);
  }
};

buildPage();
