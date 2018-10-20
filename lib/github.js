const octokit = require('@octokit/rest')();
const Configstore = require('configstore');

const pkg = require('../package.json');
const _ = require('lodash');
const CLI = require('clui');
Spinner = CLI.Spinner;
const chalk = require('chalk');

const inquirer = require('./inquirer');

const conf = new Configstore(pkg.name);

module.exports = {
  getInstance: () => {
    return octokit;
  },
  getStoredGithubToken: () => {
    return conf.get('github.token');
  },

  setGithubCredentials: async () => {},

  registerNewToken: async () => {}
};
