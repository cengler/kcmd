import config from './../services/config'
import kafka from './../services/kafka'
import display from './../util/display'
import configUtils from '../util/configUtils'

function offsetsTopic() {
  const sk = configUtils.getKafka()
  const topic = configUtils.getTopic()
  kafka.topicOffsets(sk.brokers, topic)
    .then(os => display.print(os))
}

function offsetsGroup() {
  const sk = configUtils.getKafka()
  const group = configUtils.getGroup()
  kafka.groupOffsets(sk.brokers, group)
    .then(os => display.print(os))
}

function offsets(type) {
  switch (type) {
    case 'topic':
      offsetsTopic()
      break
    case 'group':
      offsetsGroup()
      break
    default:
      display.error('error: invalid argument \'type\'. Allowed choices are: topic, group')
  }
}

module.exports = offsets
