const {stat} = require('fs');
const {readdir} = require('fs/promises');
const path = require('path');

let filename = __dirname + '\\secret-folder';
let way = path.join(filename);

readdir(way, { withFileTypes: true }).then(data => data.forEach(files => {

    let currentWay = path.join(way, files.name);

    if (files.isFile()) {
        stat(currentWay, (err, stats) => {
            if (stats) {

                let nameFile = files.name.split('.')[0];
                let extFile = path.extname(currentWay).slice(1);
                let sizeFile = (stats.size / 1024).toFixed(3);

                return console.log(`${nameFile} - ${extFile} - ${sizeFile}kb`);
            } else {
                return console.log(err.message);
            }
        });
    }

}));