import config from './../services/config'
import chalk from 'chalk'
import kafka from './../services/kafka'
import display from './../util/display'

async function offsetsTopic() {
  const select = config.getSelected()
  if (!select.kafka) {
    console.log(
      chalk.red.bold('You don\'t have a kafka selected yet.')
    )
  } else if (!select.topic) {
    console.log(
      chalk.red.bold('You don\'t have a kafka topic selected yet.')
    )
  } else {
    kafka.offsets(select.kafka.brokers, select.topic)
      .then(os => display.print(os))
  }
}

async function offsetsGroup() {
  const select = config.getSelected()
  if (!select.kafka) {
    console.log(
      chalk.red.bold('You don\'t have a kafka selected yet.')
    )
  } else if (!select.group) {
    console.log(
      chalk.red.bold('You don\'t have a kafka group selected yet.')
    )
  } else {
    kafka.groupOffsets(select.kafka.brokers, select.group)
      .then(os => display.print(os))
  }
}

function offsets(type) {
  if (type === 'topic')
    offsetsTopic()
  else if (type === 'group')
    offsetsGroup()
  else {
    console.log(
      chalk.red.bold(`No type!!!`)
    )
  }
}

module.exports = offsets
