const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');

console.log(
  chalk.yellow(figlet.textSync('ginit', { horizontalLayout: 'full' }))
);
