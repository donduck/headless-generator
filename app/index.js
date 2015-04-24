/*

  ██╗  ██╗██╗  ██╗    ██╗  ██╗███████╗ █████╗ ██████╗ ██╗     ███████╗███████╗███████╗
  ██║  ██║██║ ██╔╝    ██║  ██║██╔════╝██╔══██╗██╔══██╗██║     ██╔════╝██╔════╝██╔════╝
  ███████║█████╔╝     ███████║█████╗  ███████║██║  ██║██║     █████╗  ███████╗███████╗
  ╚════██║██╔═██╗     ██╔══██║██╔══╝  ██╔══██║██║  ██║██║     ██╔══╝  ╚════██║╚════██║
       ██║██║  ██╗    ██║  ██║███████╗██║  ██║██████╔╝███████╗███████╗███████║███████║
       ╚═╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝╚══════╝╚══════╝

*/

'use strict';
var yeoman          = require('yeoman-generator'),
    chalk           = require('chalk'),
    yosay           = require('yosay'),
    mkdirp          = require('mkdirp'),
    _s              = require('underscore.string'),
    lib             = require('./lib');

module.exports      = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    if (!this.options['skip-message']) {
      this.log(lib.extra.welcome());
    }
  },

  prompting: function () {
    var done        = this.async(),
        prompts     = [
          {
            type: 'string',
            name: 'projectName',
            message: 'What\'s your projects\'s name?' + chalk.red(' (Required)'),
            validate: function (input) {
              if (input === '') {
                return 'Please enter your projects\'s name';
              }
              return true;
            }
          },
          {
            type: 'string',
            name: 'apiAddress',
            message: 'What\'s the HTTP address for your API?' + chalk.red(' (Required)'),
            validate: function (input) {
              if (input === '') {
                return 'Please enter your projects\'s API address.';
              }
              return true;
            }
          },
          {
            type: 'string',
            name: 'ttl',
            default: '0',
            message: 'What\'s the TTL for your cache?',
            validate: function (input) {
              if (input === '') {
                return 'Please enter your projects\'s TTL.';
              }
              return true;
            }
          }
        ];
    this.prompt(prompts, function (props) {
      var self = this,
          key;
      self.promptOptions = {};
      for (key in props) {
        if (props.hasOwnProperty(key) && typeof props[key] !== 'undefined') {
          self.promptOptions[key] = props[key];
        }
      }
      done();
    }.bind(this));
  },
  writing: {
    app: function () {
      this.promptOptions.projectName = _s.slugify(this.promptOptions.projectName);
      mkdirp(this.promptOptions.projectName);
      this.destinationRoot(this.promptOptions.projectName);
      this.directory(this.sourceRoot(), this.destinationRoot());
      this.fs.copyTpl(
        this.templatePath('config/_env.json'),
        this.destinationPath('config/env.json'),
        this.promptOptions
      );
    }
  },
  install: function () {

  }
});
