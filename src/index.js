const program = require('commander');
const chalk = require('chalk');
const { VERSION } = require('../lib/utils/constants');

let actionMap = {
  'create <app-name>': { // 配置命令的名字
    alias: '', // 别名
    description: 'create a new project', // 描述
    examples: [ // 使用示例
      'daemon-cli create <app-name>'
    ]
  },
  'init <app-name>': {
    alias: 'i',
    description: 'generate a project from a remote template',
    examples: [
      'daemon-cli init <app-name>'
    ]
  },
  'config [option]': {
    alias: 'c',
    description: 'inspect and modify the config .daemonrc',
    examples: [
      'daemon-cli config set <key> <value>',
      'daemon-cli config get <key>',
      'daemon-cli config unset <key>'
    ]
  },
  '*': {
    alias: '',
    description: 'Unknown command',
    examples: []
  }
};

Object.keys(actionMap).map(action => {
  let currentAction = actionMap[action];
  program.command(action)
    .description(currentAction.description)
    .alias(currentAction.alias)
    .action((option, cmd) => {
      if (action === '*') {
        console.log('\r\n ' + chalk.red(`${currentAction.description} ${chalk.yellow(cmd)}.`))
      } else if (action.includes('create')) {
        require('../lib/create')(option, cmd);
      } else if(action.includes('config')) {
        require('../lib/config')(option, cmd);
      } else if (action.includes('init')) {
        require('../lib/init')(option, cmd);
      }
    })
})

function help(){
  console.log(chalk.green('\r\n ' + `Run ${chalk.yellow(`daemon-cli <command> --help`)} for detailed usage of given command.`));
  console.log(chalk.magenta('\r\n ' + 'How to use command: '));
  Object.keys(actionMap).forEach(action => {
    actionMap[action].examples.forEach(example => {
      console.log(chalk.cyan('  - ' + example))
    })
  })
}

program.on('-h', help);
program.on('--help', help);
program.version(VERSION, '-v --version').parse(process.argv);
