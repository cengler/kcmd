const conf = new (require('conf'))()
const chalk = require('chalk')
const kafka = require('./../services/kafka');

async function consumer () {
  const server = conf.get('kafka-server')
  if (!server) {
    console.log(
      chalk.red.bold('You don\'t have a kafka selected yet.')
    )
  } else if(!server.topic){
    console.log(
      chalk.red.bold('You don\'t have a kafka topic selected yet.')
    )
  } else {
    kafka.consumer(server.brokers, server.topic) // TODO
  }
}

module.exports = consumer
