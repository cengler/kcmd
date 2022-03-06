import {AssignerProtocol, CompressionCodecs, CompressionTypes, Kafka, logLevel} from "kafkajs"
import {SnappyCodec} from 'kafkajs-snappy'
import {v4} from 'uuid'
import config from './config'
import {logCreator} from '../util/display'
import _ from 'lodash'

CompressionCodecs[CompressionTypes.Snappy] = SnappyCodec

const clientId = 'my-cli';

const k = (brokers) => {
  const verbose = config.getBooleanConfig(config.CONFIG_VERBOSE)
  return new Kafka({
    clientId,
    brokers: brokers.split(','),
    logLevel: verbose ? logLevel.INFO : logLevel.ERROR,
    logCreator: logCreator
  })
}

const topics = async (brokers) => {
  const kafka = k(brokers)
  const admin = kafka.admin()
  await admin.connect()
  const ts = await admin.listTopics()
  await admin.disconnect()
  return ts.sort()
}

const brokers = async (brokers) => {
  const kafka = k(brokers)
  const admin = kafka.admin()
  await admin.connect()
  const cluster = await admin.describeCluster()
  await admin.disconnect()
  return _.sortBy(cluster.brokers, 'nodeId')
}

const consumer = async (brokers, topic, cb) => {
  const kafka = k(brokers)
  const consumer = kafka.consumer({groupId: `${clientId}-${v4()}`})
  await consumer.connect()
  await consumer.subscribe({topic, fromBeginning: false})
  await consumer.run({
    autoCommit: false,
    eachMessage: async ({topic, partition, message, heartbeat}) => {
      cb(message, partition)
    },
  })
}

const topicOffsets = async (brokers, topic) => {
  const kafka = k(brokers)
  const admin = kafka.admin()
  await admin.connect()
  const ts = await admin.fetchTopicOffsets(topic)
  await admin.disconnect()
  return _.sortBy(ts, 'partition')
}

const topicMetadata = async (brokers, topic) => {
  const kafka = k(brokers)
  const admin = kafka.admin()
  await admin.connect()
  const ts = await admin.fetchTopicMetadata({topics: [topic]})
  await admin.disconnect()
  return _.sortBy(ts.topics[0].partitions, 'partitionId')
}

const decodeMA = (memberAssignment) => {
  const assignment = AssignerProtocol.MemberAssignment.decode(memberAssignment).assignment
  return Object.keys(assignment)[0] + ':' + assignment[Object.keys(assignment)[0]]
}

const decodeMM = (memberMetadata) => {
  return AssignerProtocol.MemberMetadata.decode(memberMetadata).topics[0]
}

const groupMetadata = async (brokers, group) => {
  const kafka = k(brokers)
  const admin = kafka.admin()
  await admin.connect()
  const gs = await admin.describeGroups([group])
      .then(({groups}) => {
        return groups.map(g => {
          g.members = g.members.map(m => {
            m.memberMetadata = decodeMM(m.memberMetadata)
            m.memberAssignment = decodeMA(m.memberAssignment)
            return m
          })
          return g
        })
      })
  await admin.disconnect()
  return gs.length > 0 ? gs[0] : null
}

const groupOffsets = async (brokers, groupId) => {
  const kafka = k(brokers)
  const admin = kafka.admin()
  await admin.connect()
  const ts = await admin.fetchOffsets({groupId})
  await admin.disconnect()
  const topicPartitionList = _.flatMap(ts , td => td.partitions.map(p => ({topic: td.topic, ...p})))
  return _.sortBy(topicPartitionList, ['topic', 'partition'])
}

const groups = async (brokers) => {
  const kafka = k(brokers)
  const admin = kafka.admin()
  await admin.connect()
  const ts = (await admin.listGroups()).groups
  await admin.disconnect()
  return _.sortBy(ts, 'groupId')
}

module.exports = {
  topics,
  consumer,
  topicOffsets,
  groupOffsets,
  groups,
  topicMetadata,
  brokers,
  groupMetadata
}
