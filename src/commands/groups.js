import config from './../services/config'
import chalk from 'chalk'
import kafka from "./../services/kafka"
import display from "./../util/display"

function groups() {
  const server = config.getKafka()
  if (!server) {
    console.log(
      chalk.red.bold('You don\'t have a kafka selected yet.')
    )
  } else {
    kafka.groups(server.brokers)
      .then(gs => display.print(gs))
  }
}

module.exports = groups
