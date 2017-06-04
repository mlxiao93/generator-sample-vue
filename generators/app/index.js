var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type    : 'input',
        name    : 'projectName',
        message : 'Your project name',
        default : this.appname.replace(/\s/g, '-') // Default to current folder name
      }
    ]).then((answers) => {
      this.answers = answers;
    });
  }
  writing() {
    this.fs.copyTpl(
      this.templatePath('./'),
      this.destinationPath('./'),
      this.answers
    );
  }
  installDependencies() {
    this.spawnCommand('cnpm', ['install'])
  }
};
