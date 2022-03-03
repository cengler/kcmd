import Conf from 'conf'
const conf = new Conf()

const SELECT   = 'select'
const KAFKA    = 'select.kafka'
const TOPIC    = 'select.topic'
const GROUP    = 'select.group'
const CLUSTERS = 'clusters'
const CONFIG   = 'config'

// SELECT SECTION

const getSelected = () => {
  return conf.get(SELECT)
}

function getKafka() {
  return conf.get(KAFKA)
}

function getTopic() {
  return conf.get(TOPIC)
}

function getGroup() {
  return conf.get(GROUP)
}

function setKafka(kafka) {
  conf.set(KAFKA, kafka)
}

function setTopic(topic) {
  conf.set(TOPIC, topic)
}

function setGroup(group) {
  conf.set(GROUP, group)
}

// KAFKA CLUSTERS SECTION

const getClusters = () => {
  let map = conf.get(CLUSTERS)
  if(!map) {
    map = {}
    conf.set(CLUSTERS, map)
  }
  return Object.values(map)
}

const putCluster = (kafka) => {
  let map = conf.get(CLUSTERS)
  if(!map) {
    map = {}
  }
  const exists = map.hasOwnProperty(kafka.name)
  map[kafka.name] = kafka
  conf.set(CLUSTERS, map)
  return exists ? 'updated' : 'added'
}

const remCluster = (kafka) => {
  let map = conf.get(CLUSTERS)
  if(!map) {
    map = {}
  }
  delete map[kafka.name]
  conf.set(CLUSTERS, map)
}

// CONFIG OPTIONS SECTION

const CONFIG_BANNER = 'banner-mode'
const CONFIG_VERBOSE = 'verbose'
const CONFIG_DISPLAY = 'display'

const configValues = [
  {config: CONFIG_BANNER, message: 'Show banner', values: ['true', 'false'], default: 'true'},
  {config: CONFIG_VERBOSE, values: ['true', 'false'], default: 'true'},
  {config: CONFIG_DISPLAY, values: ['table', 'tsv', 'json'], default: 'table'}
]

const getDefaultConfig = () => {
  let c = {}
  configValues.forEach(v => c[v.config] = v.default)
  return c
}

const getConfig = () => {
  let c = conf.get(CONFIG)
  if (!c) {
    c = getDefaultConfig()
    conf.set(CONFIG, c)
  }
  return c
}

const setConfig = (c) => {
  conf.set(CONFIG, c)
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
  getTopic,
  getGroup,
  getSelected,
  setTopic,
  setKafka,
  setGroup,
  getClusters,
  remCluster,
  putCluster,
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
