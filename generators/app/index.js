'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the solid ' + chalk.red('generator-wps-static') + ' generator!'));

    const prompts = [];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('*.json'),
      this.destinationRoot()
    );
    this.fs.copy(
      this.templatePath('*.js'),
      this.destinationRoot()
    );
    this.fs.copy(
      this.templatePath('src'),
      this.destinationPath('src')
    );
  }

  install() {
    this.runInstall('npm');
  }

};
