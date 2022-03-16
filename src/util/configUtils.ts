import display from './display'
import config from '../services/config'
import {KafkaCluster} from '../services/config'

const getKafka = (): KafkaCluster => {
  const k = process.env.CLUSTER ? config.getClusterByName(process.env.CLUSTER) : config.getConfig().selected.kafka
  if(!k) {
    display.error('You don\'t have a kafka selected yet.')
    display.info('Call: kcmd set kafka')
    process.exit(1)
  }
  return <KafkaCluster>k
}

const getTopic = (): string => {
  const t = process.env.TOPIC ? process.env.TOPIC : config.getConfig().selected.topic
  if(!t) {
    display.error('You don\'t have a kafka topic selected yet.')
    display.info('Call: kcmd set topic')
    process.exit(1)
  }
  return <string>t
}

const getGroup = (): string => {
  const g = process.env.GROUP ? process.env.GROUP : config.getConfig().selected.group
  if(!g) {
    display.error('You don\'t have a kafka group selected yet.')
    display.info('Call: kcmd set group')
    process.exit(1)
  }
  return <string>g
}

function getVerbose(): boolean {
  return process.env.VERBOSE ? true : config.getConfig().config.verbose
}

export default {
  getKafka,
  getGroup,
  getTopic,
  getVerbose
}
