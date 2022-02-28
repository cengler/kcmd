#! /usr/bin/env node
import figlet from 'figlet'
import chalk from 'chalk'
import config from './services/config'
import {program} from 'commander'
import {add, clusters} from './commands/servers'
import select from './commands/select'
import {topic, topics} from './commands/topics'
import show from './commands/show'
import consumer from './commands/consumer'
import offsets from './commands/offsets'
import groups from './commands/groups'
import {showConfig, updateConfig} from './commands/config'

program
  .command('clusters')
  .description('List all kafka clusters')
  .action(clusters)

program
  .command('topics')
  .description('List all topics of selected kafka')
  .action(topics)

program
  .command('groups')
  .description('List all groups of selected kafka')
  .action(groups)

program
  .command('show')
  .description('Show all selected options')
  .action(show)

program
  .command('add <name> <brokers>')
  .description('Add a kafka server')
  .action(add)

program
  .command('select')
  .description('Select a kafka server/topic/group')
  .action(select)

program
  .command('consumer')
  .description('Consume messages of selected topic')
  .action(consumer)

program
  .command('topic')
  .description('Get metadata of topic')
  .action(topic)

program
  .command('offsets <type>')
  .description('Get topic/group offsets')
  .action(offsets)

program
  .command('config')
  .description('Show current config')
  .action(showConfig)

program
  .command('update-config')
  .description('Update config')
  .action(updateConfig)

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
