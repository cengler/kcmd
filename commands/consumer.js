const config = require('./../services/config')
const chalk = require('chalk')
const kafka = require('./../services/kafka');

async function consumer () {
  const select = config.getSelected()
  if (!select || !select.kafka) {
    console.log(
      chalk.red.bold('You don\'t have a kafka selected yet.')
    )
  } else if(!select.topic){
    console.log(
      chalk.red.bold('You don\'t have a kafka topic selected yet.')
    )
  } else {
    kafka.consumer(select.kafka.brokers, select.topic) // TODO
  }
}

module.exports = consumer
