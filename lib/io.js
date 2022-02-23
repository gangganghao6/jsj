const fs = require("fs-extra");
const ejs = require("ejs");
const path = require("path");


module.exports.readFile= function readFile(name, depends, templateCatalogue, targetCatalogue) {
    fs.readdir(templateCatalogue, (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
            if (file.includes('.') === false) {
                fs.mkdirSync(path.join(targetCatalogue, file))
                readFile(name, depends, path.join(templateCatalogue, file), path.join(targetCatalogue, file))
            } else {
                ejs.renderFile(path.join(templateCatalogue, file), {name, depends}).then(data => {
                    if(file.includes('.ejs')){
                        file=file.replace('.ejs','')
                    }
                    fs.writeFileSync(path.join(targetCatalogue, file), data)
                })
            }
        })
    })
}
