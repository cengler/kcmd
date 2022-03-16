import config from './../services/config'
import configUtils from './../util/configUtils'
import display from './../util/display'
import _ from 'lodash'
import inquirerUtils from '../util/inquirerUtils'
import kafka from './../services/kafka'

function setCluster(name: string) {
  const c = config.getClusterByName(name)
  if (c) {
    config.setSelectedCluster(c)
    display.success(`Kafka cluster [${c.name}] has been set successfully!`)
  } else {
    display.error(`Kafka cluster [${name}] not found`)
  }
}

function selectCluster() {
  let clusters = config.getClusters()
  let selectedKafka = config.getConfig().selected.kafka
    inquirerUtils.selectOne(clusters, selectedKafka, 'Select kafka cluster', 'name')
    .then(cluster => {
      const idx = _.findIndex(clusters, ['name', cluster])
      const kc = clusters[idx]
      config.setSelectedCluster(kc)
      display.success(`Kafka cluster [${kc.name}] has been set successfully!`)
    })
}

function setTopic(value: string) {
  const sk = configUtils.getKafka()
  kafka.topics(sk.brokers)
    .then(ts => {
      if (ts.includes(value)) {
        display.success(`Topic [${value}] has been set successfully!`)
      } else {
        display.error(`Topic [${value}] not found in selected kafka`)
      }
    })
}

function setGroup(value: string) {
  const sk = configUtils.getKafka()
  kafka.groups(sk.brokers)
    .then(gs => {
      const gsn = gs.map(g => g.groupId)
      if (gsn.includes(value)) {
        display.success(`Group [${value}] has been set successfully!`)
      } else {
        display.error(`Group [${value}] not found in selected kafka`)
      }
    })
}

function selectTopic() {
  const sk = configUtils.getKafka()
  kafka.topics(sk.brokers)
    .then(ts => {
      const st = config.getConfig().selected.topic
        inquirerUtils.selectOneAuto(ts, st, 'Select topic')
        .then(topic => {
          config.setSelectedTopic(topic)
          display.success(`Topic [${topic}] has been set successfully!`)
        })
    })
}

function selectGroup() {
  const sk = configUtils.getKafka()
  kafka.groups(sk.brokers)
    .then(gs => {
      const groups: string[] =  gs.map(t => t.groupId)
      const sg = config.getConfig().selected.group
        inquirerUtils.selectOneAuto(groups, sg, 'Select group')
        .then(group => {
          config.setSelectedGroup(group)
          display.success(`Group [${group}] has been set successfully!`)
        })
    })
}

function set(type: string, value: string | undefined) {
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
      if(value)
        setGroup(value)
      else
        selectGroup()
      break
    default:
      display.error('error: invalid argument \'type\'. Allowed choices are: cluster, topic, group')
  }
}

export default set
