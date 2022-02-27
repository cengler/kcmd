import {Kafka, CompressionCodecs, CompressionTypes, logLevel} from "kafkajs"
import chalk from "chalk"
import { SnappyCodec } from 'kafkajs-snappy'
import {v4} from 'uuid'
import config from './config'

CompressionCodecs[CompressionTypes.Snappy] = SnappyCodec

const clientId = 'my-cli';

const k = (brokers) => {
  const verbose = config.getBooleanConfig(config.CONFIG_VERBOSE)
  return new Kafka({
    clientId,
    brokers: brokers.split(','),
    logLevel: verbose ? logLevel.INFO : logLevel.ERROR
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

const consumer = async (brokers, topic, cb) => {
  const kafka = k(brokers)
  const consumer = kafka.consumer({groupId: `${clientId}-${v4()}` })
  await consumer.connect()
  await consumer.subscribe({topic, fromBeginning: false})
  await consumer.run({
    autoCommit: false,
    eachMessage: async ({topic, partition, message, heartbeat}) => {
      cb(message, partition)
    },
  })
}

const offsets = async (brokers, topic) => {
  const kafka = k(brokers)
  const admin = kafka.admin()
  await admin.connect()
  const ts = await admin.fetchTopicOffsets(topic)
  await admin.disconnect()
  return ts
}

const topicMetadata = async (brokers, topic) => {
  const kafka = k(brokers)
  const admin = kafka.admin()
  await admin.connect()
  const ts = await admin.fetchTopicMetadata({topics:[topic]})
  await admin.disconnect()
  return ts.topics[0].partitions
}

const groupOffsets = async (brokers, groupId) => {
  const kafka = k(brokers)
  const admin = kafka.admin()
  await admin.connect()
  const ts = await admin.fetchOffsets({ groupId })
  await admin.disconnect()
  return ts
}

const groups = async (brokers) => {
  const kafka = k(brokers)
  const admin = kafka.admin()
  await admin.connect()
  const ts = (await admin.listGroups()).groups
  await admin.disconnect()
  return ts
}

module.exports = {
  topics,
  consumer,
  offsets,
  groupOffsets,
  groups,
  topicMetadata
}
