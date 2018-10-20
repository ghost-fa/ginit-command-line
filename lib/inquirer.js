const inquirer = require('inquirer');

const files = require('./files');

module.exports = {
  askGithubCredentials: () => {
    const argv = require('minimist')(process.arqv.slice(2));
    const questions = [
      {
        type:'input',
        name: 'name',
        type: 'input',
        message: 'Enter a name for repository:',
        default:argv._[0] || files.getCurrentDirectoryBase(),
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your name for the repository.';
          }
        }
      },
      {

        type: 'input',
        name: 'description',
        default:argv._[1] || null,
        message: 'Optionally enter a description of the repository:',
      },
      {
        type:'list',
        name:'visibility',
        message:'Public or private',
        choices:['public' , 'private'],
        default:'public'
      }
    ];

    return inquirer.prompt(questions);

};
