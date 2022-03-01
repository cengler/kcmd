#! /usr/bin/env node
import figlet from 'figlet'
import chalk from 'chalk'
import config from './services/config'
import {program} from 'commander'
import add from './commands/add'
import setter from './commands/set'
import topicMetadata from './commands/topicMetadata'
import show from './commands/show'
import consumer from './commands/consumer'
import offsets from './commands/offsets'
import updateConfig from './commands/config'
import ls from './commands/ls'

program
  .option('-v, --verbose');

program
  .command('ls <type>')
  .description('List clusters/brokers/topics/groups')
  .action(ls)

program
  .command('set <type>')
  .description('Set a kafka cluster/topic/group')
  .action(setter)

program
  .command('add <name> <brokers>')
  .description('Add a kafka server')
  .action(add)

program
  .command('offsets <type>')
  .description('Get topic/group offsets')
  .action(offsets)

// TODO se puede hacer lag, cruzando offsets de topic + partition

program
  .command('consumer')
  .description('Consume messages of selected topic')
  .action(consumer)

program
  .command('show')
  .description('Show all selected options')
  .action(show)

program
  .command('config')
  .description('Update config')
  .action(updateConfig)

program
  .command('topic') // TODO command name?
  .description('Get metadata of topic')
  .action(topicMetadata)

if (config.getBooleanConfig(config.CONFIG_BANNER)) {
  console.log(
    chalk.green(
      figlet.textSync('kcmd', {
        horizontalLayout: 'full',
      })
    )
  )
}

program.parse()
