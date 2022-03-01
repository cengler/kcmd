import config from './../services/config'
import display from './../util/display'
import _ from 'lodash'
import { selectOne } from '../util/inquirerUtils'
import kafka from './../services/kafka'

function selectCluster() {
  let kafkaList = config.getKafkaList()
  let selectedKafka = config.getKafka(false)
  selectOne(kafkaList, selectedKafka, 'Select kafka cluster', 'name')
    .then(cluster => {
      const idx = _.findIndex(kafkaList, ['name', cluster]);
      const kc = kafkaList[idx]
      config.setKafka(kc)
      display.success(`Kafka cluster [${kc.name}] has been set successfully!`)
    })
}

function selectTopic() {
  const sk = config.getKafka()
  kafka.topics(sk.brokers)
    .then(ts => {
      const st = config.getTopic(false)
      selectOne(ts, st, 'Select topic')
        .then(topic => {
          config.setTopic(topic)
        })
    })
}

function selectGroup() {
  const sk = config.getKafka()
  kafka.groups(sk.brokers)
    .then(gs => {
      gs = gs.map(t => t.groupId)
      const sg = config.getGroup(false)
      selectOne(gs, sg, 'Select group')
        .then(group => {
          config.setGroup(group)
        })
    })
}

function select(type) {
  switch (type) {
    case 'cluster':
      selectCluster()
      break
    case 'topic':
      selectTopic()
      break
    case 'group':
      selectGroup()
      break
    default:
      display.error('error: invalid argument \'type\'. Allowed choices are: cluster, topic, group')
  }
}

module.exports = select
