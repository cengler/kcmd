import Conf from 'conf'
const conf = new Conf()

const CONFIG_NAME: string = 'config4'

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
  DEBUG = "DEBUG",
  INFO = "INFO",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS"
}

export type ConfigValues = {
  banner: boolean,
  level: LevelType,
  verbose: boolean,
  display: DisplayType
}

export type AllConfig = {
  config: ConfigValues,
  selected: Selected,
  clusters: Map<string, string[]>
}

const defaultConfig: AllConfig = {
  config: {
    display: DisplayType.table,
    level: LevelType.INFO,
    banner: false,
    verbose: false
  },
  selected: {
    topic: undefined,
    group: undefined,
    kafka: undefined
  },
  clusters: new Map<string, string[]>()
}

// TODO aca tengo que hacer magia para recuperar un map
function getConfig(): AllConfig {
  let c:AllConfig | undefined = <AllConfig>conf.get(CONFIG_NAME)
  if(!c)
    setConfig(defaultConfig)
  const res: any = conf.get(CONFIG_NAME)
  res.clusters = new Map(Object.entries(res.clusters))
  const r = <AllConfig>res
  return r
}

function setConfig(config: AllConfig) {
  const w: any = config
  w.clusters = Object.fromEntries(w.clusters)
  return conf.set(CONFIG_NAME, w)
}

function getSelectedCluster(): KafkaCluster | undefined {
  return process.env.CLUSTER ? getClusterByName(process.env.CLUSTER) : getConfig().selected.kafka
}

function setSelectedCluster(cluster: KafkaCluster) {
  const config = getConfig()
  config.selected.kafka = cluster
  setConfig(config)
}

function getSelectedTopic(): string | undefined {
  return process.env.TOPIC ? process.env.TOPIC : getConfig().selected.topic
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

function getSelectedGroup(): string | undefined {
  return process.env.GROUP ? process.env.GROUP : getConfig().selected.group
}

function getClusterByName(name: string): KafkaCluster | undefined {
  const brokers: string[] | undefined = getConfig().clusters.get(name)
  return brokers ? {name, brokers} : undefined
}

/**
 * return true is cluster was added and false if was updated
 */
const putCluster = (kafka: KafkaCluster): boolean => {
  let c: AllConfig = getConfig()
  const added = !c.clusters.get(kafka.name)
  c.clusters.set(kafka.name, kafka.brokers)
  setConfig(c)
  return added
}

const deleteCluster = (name: string): boolean => {
  let c: AllConfig = getConfig()
  const deleted = c.clusters.delete(name)
  setConfig(c)
  return deleted
}

const remCluster = (name: string) => {
  let c: AllConfig = getConfig()
  c.clusters.delete(name)
  setConfig(c)
}

function getClusters(): KafkaCluster[] {
  let clusters: Map<string, string[]> = getConfig().clusters
  return Array.from(clusters.entries()).map(c => ({name: c[0], brokers: c[1]}))
}

export default {
  getConfig,
  setConfig,
  getClusters,
  getClusterByName,
  setSelectedTopic,
  getSelectedCluster,
  setSelectedGroup,
  setSelectedCluster,
  getSelectedGroup,
  getSelectedTopic,
  putCluster,
  remCluster,
  deleteCluster
}
