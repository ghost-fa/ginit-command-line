#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const repo = require('./lib/repo');

const github = require('./lib/github');
clear();
console.log(
  chalk.yellow(figlet.textSync('ginit', { horizontalLayout: 'full' }))
);

if (files.directoryExists('.git')) {
  console.log(chalk.red('Aleady a git repository!'));
  process.exit();
}

const getGithubToken = async () => {
  let token = github.getStoredGithubToken();
  if (token) {
    return token;
  }

  await github.setGithubCredentials();
  const accessToken = await github.hasAccessToken();
  if (accessToken) {
    console.log(chalk.yellow('An existing access token has been found!'));

    token = await github.regenerateNewToken(accessToken.id);
    return token;
  }

  token = await github.registerNewToken();
  return token;
};

const run = async () => {
  try {
    const token = await getGithubToken();
    github.githubAuth(token);
    const url = await repo.createRemoteRepo();

    await repo.createGitignore();

    const done = await repo.setupRepo(url);
    if (done) {
      console.log(chalk.green('All done!'));
    }
  } catch (err) {
    if (err) {
      switch (err.code) {
        case 401:
          console.log(
            chalk.red(
              "couldn't log you in. Please provide correct credentials/ token. "
            )
          );
          break;
        case 422:
          console.log(
            chalk.red(
              'There already exists as remote repository with the same name'
            )
          );
          break;
        default:
          console.log(err);
      }
    }
  }
};

run();

// // const run = async () => {
// //   const credentials = await inquirer.askGithubCredentials();
// //   console.log(credentials);
// // };
// //
// // run();
//
// const run = async () => {
//   let token = await github.getStoredGithubToken();
//   if (!token) {
//     await github.setGithubCredentials();
//     token = await github.registerNewToken();
//   }
//   console.log(token);
// };
//
// run();
