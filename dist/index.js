#! /usr/bin/env node
"use strict";

var figlet = require('figlet');

var chalk = require('chalk');

var config = require('./services/config');

var _require = require('commander'),
    program = _require.program,
    commander = _require.commander;

var _require2 = require('./commands/servers'),
    clusters = _require2.clusters,
    add = _require2.add;

var select = require('./commands/select');

var _require3 = require('./commands/topics'),
    topics = _require3.topics,
    topic = _require3.topic;

var show = require('./commands/show');

var consumer = require('./commands/consumer');

var offsets = require('./commands/offsets');

var groups = require('./commands/groups');

var _require4 = require('./commands/config'),
    showConfig = _require4.showConfig,
    updateConfig = _require4.updateConfig;

program.command('clusters').description('List all kafka clusters').action(clusters);
program.command('topics').description('List all topics of selected kafka').action(topics);
program.command('groups').description('List all groups of selected kafka').action(groups);
program.command('show').description('Show all selected options').action(show);
program.command('add <name> <brokers>').description('Add a kafka server').action(add);
program.command('select <type>').description('Select a kafka server/topic/group').action(select);
program.command('consumer').description('Consume messages of selected topic').action(consumer);
program.command('topic').description('Get metadata of topic').action(topic);
program.command('offsets <type>').description('Get topic/group offsets').action(offsets);
program.command('config').description('Show current config').action(showConfig);
program.command('update-config').description('Update config').action(updateConfig);

if (config.getBooleanConfig(config.CONFIG_BANNER)) {
  console.log(chalk.green(figlet.textSync('k tool', {
    horizontalLayout: 'full'
  })));
}

program.parse();
//# sourceMappingURL=index.js.map