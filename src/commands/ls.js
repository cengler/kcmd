import display from './../util/display'
import config from '../services/config'
import kafka from "../services/kafka";

function clusters() {
  const kafkaList = config.getKafkaList()
  if (kafkaList && kafkaList.length) {
    display.print(kafkaList)
  } else {
    display.info('You don\'t have a kafka yet.')
    display.info('Call: kcmd add <name> <brokerslist>')
  }
}

function brokers() {
  const sk = config.getKafka()
  kafka.brokers(sk.brokers)
    .then(bs => display.print(bs))
}

function topics() {
  const sk = config.getKafka()
  kafka.topics(sk.brokers)
    .then(ts => display.print(ts))
}

function groups() {
  const sk = config.getKafka()
  kafka.groups(sk.brokers)
    .then(gs => display.print(gs))
}

function ls(type) {
  switch (type) {
    case 'clusters':
      clusters()
      break
    case 'brokers':
      brokers()
      break
    case 'topics':
      topics()
      break
    case 'groups':
      groups()
      break
    default:
      display.error('error: invalid argument \'type\'. Allowed choices are: clusters, brokers, topics, groups')
  }
}

module.exports = ls

