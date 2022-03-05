import config from './../services/config'
import display from './../util/display'
import _ from 'lodash'
import { selectOne } from '../util/inquirerUtils'
import kafka from './../services/kafka'

function setCluster(value) {
  const c = config.getCluster(value)
  if (c) {
    config.setKafka(c)
    display.success(`Kafka cluster [${kc.name}] has been set successfully!`)
  } else {
    display.error(`Kafka cluster [${value}] not found`)
  }
}

function selectCluster() {
  let clusters = config.getClusters()
  let selectedKafka = config.getKafka()
  selectOne(clusters, selectedKafka, 'Select kafka cluster', 'name')
    .then(cluster => {
      const idx = _.findIndex(clusters, ['name', cluster]);
      const kc = clusters[idx]
      config.setKafka(kc)
      display.success(`Kafka cluster [${kc.name}] has been set successfully!`)
    })
}

function setTopic(value) {
  const sk = config.getKafka()
  kafka.topics(sk.brokers)
    .then(ts => {
      if (ts.includes(value)) {
        display.success(`Topic [${value}] has been set successfully!`)
      } else {
        display.error(`Topic [${value}] not found in selected kafka`)
      }
    })
}

function selectTopic() {
  const sk = config.getKafka()
  kafka.topics(sk.brokers)
    .then(ts => {
      const st = config.getTopic()
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
      const sg = config.getGroup()
      selectOne(gs, sg, 'Select group')
        .then(group => {
          config.setGroup(group)
        })
    })
}

function setter(type, value) {
  switch (type) {
    case 'cluster':
      if(value)
        setCluster(value)
      else
        selectCluster()
      break
    case 'topic':
      if(value)
        setTopic(value)
      else
        selectTopic()
      break
    case 'group':
      // TODO gr
      selectGroup(value)
      break
    default:
      display.error('error: invalid argument \'type\'. Allowed choices are: cluster, topic, group')
  }
}

module.exports = setter
