import {
  AssignerProtocol,
  CompressionCodecs,
  CompressionTypes,
  Kafka,
  logLevel,
  logCreator,
  LogEntry,
  GroupOverview, GroupDescription, MemberDescription, MemberAssignment, MemberMetadata
} from 'kafkajs'
// @ts-ignore
import {SnappyCodec} from 'kafkajs-snappy'
import {v4} from 'uuid'
import config from './config'
import display from '../util/display'
import _ from 'lodash'

CompressionCodecs[CompressionTypes.Snappy] = SnappyCodec

export type MemberDesc = {
  clientHost: string
  clientId: string
  memberId: string
  memberAssignment: string
  topic: string
}
export type ConsumerGroupState = 'Unknown' | 'PreparingRebalance' | 'CompletingRebalance' | 'Stable' | 'Dead' | 'Empty';

export type GroupDesc = {
  groupId: string
  members: MemberDesc[]
  protocol: string
  protocolType: string
  state: ConsumerGroupState
}

const clientId = 'my-cli'

const logCreator: logCreator= (logLevel: logLevel) => (entry: LogEntry) => {
  const {timestamp, logger, message, ...others} = entry.log
  if (entry.label === 'ERROR') {
    display.error(`${entry.label} [${entry.namespace}] ${message}`,JSON.stringify(others))
  } else {
    display.info(`${entry.label} [${entry.namespace}] ${message} ${JSON.stringify(others)}`)
  }
}

function k(brokers: string[]): Kafka {
  const verbose = config.getConfig().config.verbose
  return new Kafka({
    clientId,
    brokers,
    connectionTimeout: 10000,
    requestTimeout: 30000,
    logLevel: verbose ? logLevel.INFO : logLevel.ERROR,
    logCreator: logCreator
  })
}

async function topics(brokers: string[]): Promise<string[]> {
  const kafka = k(brokers)
  const admin = kafka.admin()
  await admin.connect()
  const ts = await admin.listTopics()
  await admin.disconnect()
  return ts.sort()
}

const brokers = async (brokers: string[]) => {
  const kafka = k(brokers)
  const admin = kafka.admin()
  await admin.connect()
  const cluster = await admin.describeCluster()
  await admin.disconnect()
  return _.sortBy(cluster.brokers, 'nodeId')
}

const consumer = async (brokers: string[], topic: string) => {
  const kafka = k(brokers)
  const consumer = kafka.consumer({groupId: `${clientId}-${v4()}`})
  await consumer.connect()
  await consumer.subscribe({topic, fromBeginning: false})
  await consumer.run({
    autoCommit: false,
    eachMessage: async ({topic, partition, message, heartbeat}) => {
      display.raw(message.value ? message.value.toString(): '')
    },
  })
}

const topicOffsets = async (brokers: string[], topic: string) => {
  const kafka = k(brokers)
  const admin = kafka.admin()
  await admin.connect()
  const ts = await admin.fetchTopicOffsets(topic)
  await admin.disconnect()
  return _.sortBy(ts, 'partition')
}

const topicMetadata = async (brokers: string[], topic: string) => {
  const kafka = k(brokers)
  const admin = kafka.admin()
  await admin.connect()
  const ts = await admin.fetchTopicMetadata({topics: [topic]})
  await admin.disconnect()
  return _.sortBy(ts.topics[0].partitions, 'partitionId')
}

function decodeMA(group: string, memberAssignment: Buffer) {
  try {
    const a: MemberAssignment | null = AssignerProtocol.MemberAssignment.decode(memberAssignment)
    if(a) {
      const topic = Object.keys(a.assignment)[0]
      return topic + ':' + a.assignment[topic]
    } else {
      return '<error_ma>'
    }
  } catch (e) {
    display.error(`Error reading memberAssignment of group ${group}`, e)
    return '<error_ma>'
  }
}

function decodeMM(group: string, memberMetadata: Buffer) {
  try {
    const mm: MemberMetadata | null = AssignerProtocol.MemberMetadata.decode(memberMetadata)
    if (mm) {
      return mm.topics[0]
    } else {
      return '<error_mm>'
    }
  } catch (e) {
    display.error(`Error reading memberMetadata of group ${group}`, e)
    return '<error_mm>'
  }
}

function toMemberDesc(groupId: string, md: MemberDescription): MemberDesc {
  return {
    clientHost: md.clientHost,
    clientId: md.clientId,
    memberId: md.memberId,
    memberAssignment: decodeMA(groupId, md.memberAssignment),
    topic: decodeMM(groupId, md.memberMetadata),
  }
}

function toGroupDesc(gd: GroupDescription): GroupDesc {
  return {
    groupId: gd.groupId,
    members: gd.members.map(m => toMemberDesc(gd.groupId, m)),
    protocol: gd.protocol,
    protocolType: gd.protocolType,
    state: gd.state
  }
}

async function groupMetadata(brokers: string[], group: string): Promise<GroupDesc> {
  const kafka = k(brokers)
  const admin = kafka.admin()
  await admin.connect()
  const gs = await admin.describeGroups([group])
      .then(({groups}) => groups.map(g => toGroupDesc(g)))
  await admin.disconnect()
  if(gs.length > 0)
    return gs[0]
  throw Error(`error getting metadata of ${group}`)
}

const groupOffsets = async (brokers: string[], group: string) => {
  const kafka = k(brokers)
  const admin = kafka.admin()
  await admin.connect()
  const ts = await admin.fetchOffsets({groupId: group})
  await admin.disconnect()
  const topicPartitionList = _.flatMap(ts , td => td.partitions.map(p => ({topic: td.topic, ...p})))
  return _.sortBy(topicPartitionList, ['topic', 'partition'])
}

async function groups(brokers: string[]): Promise<GroupOverview[]> {
  const kafka = k(brokers)
  const admin = kafka.admin()
  await admin.connect()
  const ts = (await admin.listGroups()).groups
  await admin.disconnect()
  return _.sortBy(ts, 'groupId')
}

async function topicsByGroup(brokers: string[]): Promise<{topics: string[], groupId: string}[]> {
  const gs: GroupOverview[] = await groups(brokers)
  const gds: GroupDesc[] = await Promise.all(gs.map(group => groupMetadata(brokers, group.groupId)))
  return gds.map(gd => ({
    topics: _.uniq(gd.members.map(m => m.topic)),
    groupId: gd.groupId
  }))
}

module.exports = {
  topics,
  consumer,
  topicOffsets,
  groupOffsets,
  groups,
  topicMetadata,
  brokers,
  groupMetadata,
  topicsByGroup
}
