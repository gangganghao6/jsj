#! /usr/bin/env node
import {$, cd} from "zx";
import ora from "ora";
$.verbose = false;

cd(path.join(process.cwd(), process.argv[3]))
const spinner = ora('安装依赖...');
spinner.start();
await $`yarn`
spinner.succeed();

