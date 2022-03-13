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
  table,
  tsv,
  json
}

export enum LevelType {
  DEBUG,
  INFO,
  ERROR,
  SUCCESS
}

type ConfigValues = {
  banner: boolean,
  level: LevelType,
  verbose: boolean,
  display: DisplayType
}

export type AllConfig = {
  config: ConfigValues,
  selected: Selected,
  clusters: Map<string, KafkaCluster>
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
  clusters: new Map<string, KafkaCluster>()
}

function getConfig(): AllConfig {
  let c:AllConfig | undefined = <AllConfig>conf.get(CONFIG_NAME)
  if(!c)
    setConfig(defaultConfig)
  return <AllConfig>conf.get(CONFIG_NAME)
}

function setConfig(config: AllConfig) {
  return conf.set(CONFIG_NAME, config)
}

function getSelectedCluster(): KafkaCluster | undefined {
  return process.env.CLUSTER ? getClusterByName(process.env.CLUSTER) : getConfig().selected.kafka
}

function getSelectedTopic(): string | undefined {
  return process.env.TOPIC ? process.env.TOPIC : getConfig().selected.topic
}

function getSelectedGroup(): string | undefined {
  return process.env.GROUP ? process.env.GROUP : getConfig().selected.group
}

function getClusterByName(name: string): KafkaCluster | undefined {
  return getConfig().clusters.get(name)
}

/**
 * return true is cluster was added and false if was updated
 */
const putCluster = (kafka: KafkaCluster): boolean => {
  let c: AllConfig = getConfig()
  const added = !c.clusters.get(kafka.name)
  c.clusters.set(kafka.name, kafka)
  setConfig(c)
  return added
}

const remCluster = (name: string) => {
  let c: AllConfig = getConfig()
  c.clusters.delete(name)
  setConfig(c)
}

export default {
  getConfig,
  setConfig,
  getSelectedCluster,
  getSelectedGroup,
  getSelectedTopic,
  putCluster,
  remCluster
}
