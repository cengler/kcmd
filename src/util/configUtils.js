import display from './display'
import config from '../services/config'

const getKafka = (required = true) => {
  const k = config.getKafka()
  if(!k && required) {
    display.error('You don\'t have a kafka selected yet.')
    display.info('Call: kcmd set kafka')
    process.exit(1)
  }
  return k
}

const getTopic = (required = true) => {
  const t = config.getTopic()
  if(!t && required) {
    display.error('You don\'t have a kafka topic selected yet.')
    display.info('Call: kcmd set topic')
    process.exit(1)
  }
  return t
}

const getGroup = (required = true) => {
  const g = config.getGroup()
  if(!g && required) {
    display.error('You don\'t have a kafka group selected yet.')
    display.info('Call: kcmd set group')
    process.exit(1)
  }
  return g
}

module.exports = {
  getKafka,
  getGroup,
  getTopic
}
