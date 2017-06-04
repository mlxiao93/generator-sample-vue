var Generator = require('yeoman-generator');
var fs = require('fs');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type    : 'input',
        name    : 'pageName',
        message : 'Your page name',
        default : 'new-page' // Default to current folder name
      }
    ]).then((answers) => {
      answers.pageName = answers.pageName.replace(/\s/g, '-')
      this.answers = answers;
    });
  }

  writing() {
    var pageName = this.answers.pageName
    this.fs.copyTpl(
      this.templatePath('./page.vue'),
      this.destinationPath(`./src/pages/${pageName}/index.vue`),
      this.answers
    );
  }

  updating() {
    var that = this;
    var pageName = this.answers.pageName;
    var match = /-(\w)/.exec(pageName);
    var w = match && match[1];
    var pageNameCamelStyle =  w ? pageName.replace(/-\w/, w.toUpperCase()) : pageName

    fs.readFile(that.destinationPath('src/pages/index.js'), {flag: 'r+', encoding: 'utf8'}, function (err, data) {
      if(err) {
       console.error(err);
       return;
      }

      var impt = `import ${pageNameCamelStyle} from './${pageName}'`
      var router = `{
    path: '/${pageName}',
    component: ${pageNameCamelStyle}
  },`;

      data = data.replace(/(\/\* yeoman-inject:import DO NOT DELETE OR MODIFY \*\/)/, `${impt}\n$1`);
      data = data.replace(/(\/\* yeoman-inject:router DO NOT DELETE OR MODIFY \*\/)/, `${router}\n$1`);
      // console.log(data);

      fs.writeFile(that.destinationPath('src/pages/index.js'), new Buffer(data), {flag: 'w+'}, function (err) {
         if(err) console.error(err);
      });
    });

    fs.readFile(that.destinationPath('src/components/app-nav/index.vue'), {flag: 'r+', encoding: 'utf8'}, function (err, data) {
      if(err) {
       console.error(err);
       return;
      }

      var link = `<li><router-link to="/${pageName}">${pageNameCamelStyle}</router-link></li>`

      data = data.replace(/(<!-- yeoman-inject:link DO NOT DELETE OR MODIFY -->)/, `${link}\n$1`);

      fs.writeFile(that.destinationPath('src/components/app-nav/index.vue'), new Buffer(data), {flag: 'w+'}, function (err) {
         if(err) console.error(err);
      });
    });

  }
};
