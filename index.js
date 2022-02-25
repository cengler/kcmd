#! /usr/bin/env node
const { program, commander } = require('commander')
const { clusters, add } = require('./commands/servers')
const select = require('./commands/select')
const { topics, topic } = require('./commands/topics')
const show = require('./commands/show')
const consumer = require('./commands/consumer')
const offsets = require('./commands/offsets')
const groups = require('./commands/groups')

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
  .command('select <type>')
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

program.parse()
