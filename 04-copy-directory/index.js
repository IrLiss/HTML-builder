const fs = require('fs');
const path = require('path');

let filename = __dirname + '\\files';
let filenameCopy = __dirname + '\\files-copy';
let dirCurrent = path.join(filename);
let dirCopy = path.join(filenameCopy);

function createDir(dirCopy) {

    fs.access(dirCopy, (error) => {
        if (error && error.code === 'ENOENT') {
            fs.mkdir(dirCopy, {recursive: true}, (error) => {
                if (error) {
                    return console.log(error.message);
                }
            });
            copyDir(dirCurrent, dirCopy)
        } else {
            fs.readdir(dirCopy, (error, fileNames) => {
                if (error) {
                    return console.log(error.message);
                }
                fileNames.forEach(filename => {
                    fs.unlink(path.join(dirCopy, filename), (error) => {
                        if (error) {
                            return console.log(error.message);
                        }
                    })
                })
            })
            copyDir(dirCurrent, dirCopy)
        }
    });
}

function copyDir(dirCurrent, dirCopy) {
    fs.readdir(dirCurrent, {withFileTypes: true}, (error, fileBuffer) => {

        fileBuffer.forEach(filename => {

            let src = path.join(dirCurrent, filename.name);
            let copy = path.join(dirCopy, filename.name);

                fs.copyFile(src, copy, function(error) {
                    if (error) {
                       return console.log(error.message);
                    }
                });
        })
    })
}

createDir(dirCopy);
console.log('Directory created successfully!');