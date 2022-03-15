import display from './display'
import config from '../services/config'
import {KafkaCluster} from '../services/config'

const getKafka = (required = true): KafkaCluster => {
  const k = config.getSelectedCluster()
  if(!k && required) {
    display.error('You don\'t have a kafka selected yet.')
    display.info('Call: kcmd set kafka')
    process.exit(1)
  }
  return <KafkaCluster>k
}

const getTopic = (required = true): string => {
  const t = config.getSelectedTopic()
  if(!t && required) {
    display.error('You don\'t have a kafka topic selected yet.')
    display.info('Call: kcmd set topic')
    process.exit(1)
  }
  return <string>t
}

const getGroup = (required = true): string => {
  const g = config.getSelectedGroup()
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
