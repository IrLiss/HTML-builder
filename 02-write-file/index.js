const fs = require('fs');
const path = require('path');

let filename = __dirname + '\\text.txt';
let way = path.join(filename);
let output = fs.createWriteStream(way, 'utf-8');

const process = require('process');
process.stdout.write('\nHello, please enter text!\n');

process.on('SIGINT', function () {
    process.exit();
});

process.stdin.on('data', function (print) {
    print.toString().toLowerCase().trim() === 'exit' ? process.exit() : output.write(print);
});

process.on('exit', function () {
    process.stdout.write('The text file has already been created!\n');
});

output.on('error', function (error) {
    console.log(error.message);
    process.exit();
});