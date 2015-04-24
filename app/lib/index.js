var chalk           = require('chalk');

module.exports      = {
  extra: {
    welcome: function () {
      return  '\n ' + chalk.green('   ___  _   __  _   _                _ _') +
              '\n ' + chalk.green('  /   || | / / | | | |              | | |') +
              '\n ' + chalk.green(' / /| || |/ /  | |_| | ___  __ _  __| | | ___  ___ ___') +
              '\n ' + chalk.green('/ /_| ||    \\  |  _  |/ _ \\/ _` |/ _` | |/ _ \\/ __/ __|') +
              '\n ' + chalk.green('\\___  || |\\  \\ | | | |  __/ (_| | (_| | |  __/\\__ \\__ \\') +
              '\n ' + chalk.green('    |_/\\_| \\_/ \\_| |_/\\___|\\__,_|\\__,_|_|\\___||___/___/');
    }
  }
}
