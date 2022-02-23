#! /usr/bin/env node
const { program, commander } = require('commander')
const add = require('./commands/add')
const list = require('./commands/list')
const select = require('./commands/select')
const topics = require('./commands/topics')
const show = require('./commands/show')
const consumer = require('./commands/consumer')

program
  .command('list')
  .description('List all kafka servers')
  .action(list)

program
  .command('show')
  .description('Show selected')
  .action(show)

program
  .command('add <name> <brokers>')
  .description('Add a kafka servers')
  .action(add)

program
  .command('select <type>')
  .description('Select a kafka server')
  .action(select)

program
  .command('topics')
  .description('List all topics of selected kafka')
  .action(topics)

program
  .command('consumer')
  .description('Consume messages of selected topic')
  .action(consumer)

program.parse()
