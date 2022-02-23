const inquirer = require("inquirer");
const {spawn} = require("cross-spawn");
const chalk = require("chalk");
const path = require("path");
const fs = require('fs-extra')
const ora = require("ora");
const ejs = require('ejs')
const {readFile} = require("./io");
let allDepends = [
    'react-router-dom-v6',
    'resso',
    'prettier&eslint',
    'autoprefixer&postcss-pxtorem',
    'antd',
    'axios',
    'scss',
    'vite-plugin-compression',
]
let depends = []

module.exports = function (name) {
    inquirer.prompt([
        {
            type: "checkbox",
            message: "选择要安装的依赖项：",
            name: "depends",
            choices: allDepends
        }
    ]).then((answer) => {
        depends = answer.depends;
        installDepends(name, answer.depends)
    });
}

function installDepends(name, depends) {
    const spinner = ora('创建依赖...');
    spinner.start();
    const cwd = process.cwd();
    const targetUrl = path.join(cwd, name)
    fs.mkdirSync(targetUrl)
    const templateUrl = path.join(__dirname, 'templates');
    readFile(name, depends, templateUrl, targetUrl);

    spawn('zx', [path.join(__dirname,'test.mjs'), name], {
        stdio: 'inherit'
    });
    spinner.succeed();
}
