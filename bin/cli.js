#! /usr/bin/env node
const program = require('commander')//命令处理（处理用户输入）
const figlet = require('figlet')//自定义logo
const inquirer = require('inquirer')//终端交互
const ora = require("ora");//进度展示
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')//模板文件处理
const chalk = require('chalk')//字符美化
const spawn = require('cross-spawn');//控制台命令操作（向控制台输出）
function printLogo() {
    console.log(figlet.textSync('jsj', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    }));
    console.log(chalk.white('jsj构建工具，支持'), chalk.green('vue'), '/', chalk.blue('react'))
}

program.command('create react <app-name>')
    .description('创建React项目')
    .action((type,name) => {
        printLogo()
        require('../lib/createReact')(name)
    })
    .version(`v${require('../package.json').version}`)
    .usage('<command> [option]')

program.command('create vue <app-name>')
    .description('创建Vue项目')
    .action((type,name) => {
        printLogo()
        require('../lib/createReact')(name)
    })
    .version(`v${require('../package.json').version}`)
    .usage('<command> [option]')
program.parse(process.argv)
