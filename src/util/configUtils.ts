import display from './display'
import config from '../services/config'
import {KafkaCluster} from '../services/config'

const getKafka = (required = true): KafkaCluster => {
  const k = config.getConfig().selected.kafka
  if(!k && required) {
    display.error('You don\'t have a kafka selected yet.')
    display.info('Call: kcmd set kafka')
    process.exit(1)
  }
  return <KafkaCluster>k
}

const getTopic = (required = true): string => {
  const t = config.getConfig().selected.topic
  if(!t && required) {
    display.error('You don\'t have a kafka topic selected yet.')
    display.info('Call: kcmd set topic')
    process.exit(1)
  }
  return <string>t
}

const getGroup = (required = true): string => {
  const g = config.getConfig().selected.group
  if(!g && required) {
    display.error('You don\'t have a kafka group selected yet.')
    display.info('Call: kcmd set group')
    process.exit(1)
  }
  return <string>g
}

export default {
  getKafka,
  getGroup,
  getTopic
}
