const fs = require('fs');
const path = require('path');
const readline = require('readline');

const output = fs.createWriteStream(path.join(__dirname, 'message.txt'));

const rl = readline.createInterface({
  input: process.stdin,
  output: output
});

process.stdout.write('Hello! Write something :)\n');

rl.on('line', (line) => {
  if (line === 'exit') {
    rl.emit('close');
  } else {
    output.write(line + '\n');
  }
});

process.on('SIGINT', () => {
  rl.emit('close');
});

rl.on('close', () => {
  process.stdout.write('Bye!!\n');
  process.exit();
});

