const conf = new (require('conf'))()

const configValues = [
  {config: 'banner-mode', message: 'Show banner', values: ['true', 'false'], default:'false'},
  {config: 'verbose', values: ['true', 'false'], default:'true'},
  {config: 'verbose', values: ['true', 'false'], default:'true'},
  {config: 'debug', values: ['true', 'false'], default:'true'}
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
  configValues
}
