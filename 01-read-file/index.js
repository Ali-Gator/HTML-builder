const fs = require('fs');
const path = require('path');

const input = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
input.on('error', err => console.log('Файл не найден\n', err));
input.on('data', chunk => process.stdout.write(chunk));




