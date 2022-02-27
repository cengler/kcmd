import Conf from 'conf'

const conf = new Conf()

const CONFIG_BANNER = 'banner-mode'
const CONFIG_VERBOSE = 'verbose'
const CONFIG_DISPLAY = 'display'

const configValues = [
  {config: CONFIG_BANNER, message: 'Show banner', values: ['true', 'false'], default:'true'},
  {config: CONFIG_VERBOSE, values: ['true', 'false'], default:'true'},
  {config: CONFIG_DISPLAY, values: ['table', 'csv', 'json'], default:'table'}
]

const getDefaultConfig = () => {
  let c = {}
  configValues.forEach(v => c[v.config] = v.default)
  return c
}

const getKafkaList = () => {
  return conf.get('kafka-list')
}

const addKafka = (kafka) => {
  let list = conf.get('kafka-list')
  if (!list) {
    list = []
  }
  list.add(kafka)
  conf.set('kafka-list', list)

}

const getSelected = () => {
  return conf.get("select")
}

const setKafka = (kafka) => {
  conf.set('select.kafka', kafka)
}

const getKafka = () => {
  return conf.get('select.kafka')
}

const setTopic = (topic) => {
  conf.set('select.topic', topic)
}

const setGroup = (group) => {
  conf.set('select.group', group)
}

const getConfig = () => {
  let c = conf.get("config")
  if(!c) {
    c = getDefaultConfig()
    conf.set("config", c)
  }
  return c
}

const setConfig = (c) => {
  conf.set('config', c)
}

const getBooleanConfig = (config) => {
  return getConfig()[config] === 'true'
}

const getStringConfig = (config) => {
  return getConfig()[config]
}

const setStringConfig = (config, value) => {
  let c = getConfig()
  c[config] = value
  setConfig(c)
}

module.exports = {
  getSelected,
  setTopic,
  setKafka,
  setGroup,
  getKafkaList,
  addKafka,
  getKafka,
  getConfig,
  setConfig,
  configValues,
  getBooleanConfig,
  getStringConfig,
  setStringConfig,
  CONFIG_BANNER,
  CONFIG_VERBOSE,
  CONFIG_DISPLAY
}
