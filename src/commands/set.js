import config from './../services/config'
import display from './../util/display'
import _ from 'lodash'
import { selectOne, selectOneAuto } from '../util/inquirerUtils'
import kafka from './../services/kafka'

function setCluster() {
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

function setTopic() {
  const sk = config.getKafka()
  kafka.topics(sk.brokers)
    .then(ts => {
      const st = config.getTopic()
      selectOneAuto(ts, st, 'Select topic')
        .then(topic => {
          config.setTopic(topic)
        })
    })
}

function setGroup() {
  const sk = config.getKafka()
  kafka.groups(sk.brokers)
    .then(gs => {
      gs = gs.map(t => t.groupId)
      const sg = config.getGroup()
      selectOneAuto(gs, sg, 'Select group')
        .then(group => {
          config.setGroup(group)
        })
    })
}

function setter(type) {
  switch (type) {
    case 'cluster':
      setCluster()
      break
    case 'topic':
      setTopic()
      break
    case 'group':
      setGroup()
      break
    default:
      display.error('error: invalid argument \'type\'. Allowed choices are: cluster, topic, group')
  }
}

module.exports = setter
