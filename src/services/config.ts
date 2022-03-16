import Conf from 'conf'
const conf = new Conf()

const CONFIG_NAME: string = 'config5'

declare var process : {
  env: {
    CLUSTER: string | undefined,
    TOPIC: string | undefined,
    GROUP: string | undefined
  }
}

export type KafkaCluster = {
  name: string;
  brokers: string[];
};

type Selected = {
  kafka: KafkaCluster | undefined;
  topic: string | undefined;
  group: string | undefined;
};

export enum DisplayType {
  table = "table",
  tsv = "tsv",
  json = "json"
}

export enum LevelType {
  DEBUG,
  INFO,
  ERROR
}

export type ConfigValues = {
  banner: boolean,
  level: string,
  verbose: boolean,
  display: DisplayType
}

export type AllConfig = {
  config: ConfigValues,
  selected: Selected,
  clusters: any
}

const defaultConfig: AllConfig = {
  config: {
    display: DisplayType.table,
    level: "INFO",
    banner: false,
    verbose: false
  },
  selected: {
    topic: undefined,
    group: undefined,
    kafka: undefined
  },
  clusters: {}
}

export function getConfig(): AllConfig {
  let c:AllConfig = <AllConfig>conf.get(CONFIG_NAME)
  return c ? c : defaultConfig
}

export function setConfig(config: AllConfig) {
  return conf.set(CONFIG_NAME, config)
}

function getLogLevel(): LevelType {
  // @ts-ignore
  return LevelType[getConfig().config.level]
}

function setSelectedCluster(cluster: KafkaCluster) {
  const config = getConfig()
  config.selected.kafka = cluster
  setConfig(config)
}

function setSelectedTopic(topic: string) {
  const c = getConfig()
  c.selected.topic = topic
  setConfig(c)
}

function setSelectedGroup(group: string) {
  const c = getConfig()
  c.selected.group = group
  setConfig(c)
}

function getClusterByName(name: string): KafkaCluster | undefined {
  return getConfig().clusters[name]
}

/**
 * return true is cluster was added and false if was updated
 */
const putCluster = (kafka: KafkaCluster): boolean => {
  let c: AllConfig = getConfig()
  const added = !c.clusters.hasOwnProperty(kafka.name)
  c.clusters[kafka.name] = kafka
  setConfig(c)
  return added
}

const deleteCluster = (name: string): boolean => {
  let c: AllConfig = getConfig()
  const deleted = delete c.clusters[name]
  setConfig(c)
  return deleted
}

function getClusters(): KafkaCluster[] {
  return Object.values(getConfig().clusters)
}

export default {
  getConfig,
  setConfig,
  getClusters,
  getClusterByName,
  getLogLevel,
  setSelectedTopic,
  setSelectedGroup,
  setSelectedCluster,
  putCluster,
  deleteCluster
}
