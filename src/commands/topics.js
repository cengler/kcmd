import config from './../services/config'
import chalk from 'chalk'
import kafka from './../services/kafka'
import display from './../util/display'

async function topics() {
  const select = config.getSelected()
  if (!select || !select.kafka) {
    console.log(
      chalk.red.bold('You don\'t have a kafka selected yet.')
    )
  } else {
    kafka.topics(select.kafka.brokers)
      .then(ts => display.print(ts))
  }
}

async function topic() {
  const select = config.getSelected()
  if (!select || !select.kafka) {
    console.log(
      chalk.red.bold('You don\'t have a kafka selected yet.')
    )
  } else if (!select.topic) {
    console.log(
      chalk.red.bold('You don\'t have a kafka topic selected yet.')
    )
  } else {
    kafka.topicMetadata(select.kafka.brokers, select.topic)
      .then(tm => display.print(tm))
  }
}

module.exports = {
  topics,
  topic
}
