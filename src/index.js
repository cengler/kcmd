#! /usr/bin/env node
import figlet from 'figlet'
import chalk from 'chalk'
import config from './services/config'
import {program} from 'commander'
import putCluster from './commands/putCluster'
import deleteCluster from './commands/deleteCluster'
import setter from './commands/set'
import topicMetadata from './commands/topicMetadata'
import show from './commands/show'
import consumer from './commands/consumer'
import offsets from './commands/offsets'
import lag from './commands/lag'
import updateConfig from './commands/config'
import ls from './commands/ls'

program
  .option('-t, --topic <topic>')
  .on('option:topic', function () {
    process.env.TOPIC = this.opts().topic
  })
  .option('-g, --group <group>')
  .on('option:group', function () {
    process.env.GROUP = this.opts().group
  })
  .option('-c, --cluster <name>')
  .on('option:cluster', function () {
    process.env.CLUSTER = this.opts().cluster
  })


program
  .command('ls <type>')
  .description('List clusters/brokers/topics/groups')
  .action(ls)

program
  .command('set <type> [value]')
  .description('Set a kafka cluster/topic/group')
  .action(setter)

program
  .command('put <name> <brokers>')
  .description('Add/Replace a kafka cluster by name')
  .action(putCluster)

program
  .command('delete <name>')
  .description('Delete a kafka cluster by name')
  .action(deleteCluster)

program
  .command('offsets <type>')
  .description('Get topic/group offsets')
  .action(offsets)

program
  .command('lag')
  .description('Get lag of selected group')
  .action(lag)

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
