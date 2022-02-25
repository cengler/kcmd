const conf = new (require('conf'))()

const getSelected = () => {
  return conf.get("select")
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

module.exports = {
  getSelected,
  setTopic,
  setKafka,
  setGroup,
  getKafkaList,
  addKafka,
  getKafka
}
