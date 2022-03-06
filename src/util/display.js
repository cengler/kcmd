// display according configuration
import config from './../services/config'
import chalk from "chalk";

function convertToTSV(arr) {
  if (arr.length === 0) return ''
  else if (typeof arr[0] === 'string') return arr.join('\n')
  
  const array = [Object.keys(arr[0])].concat(arr)
  return array.map(row => {
    return Object.values(row).join('\t')
  }).join('\n')
}

const print = (data, columns) => {
  const d = config.getStringConfig(config.CONFIG_DISPLAY)
  if (d === 'table') {
    if(columns)
      console.table(data, columns)
    else
      console.table(data)
  } else if (d === 'tsv') {
    console.log(convertToTSV(data))
  } else {
    data.forEach(r => console.log(r))
  }
}

const logCreator = logLevel => ({namespace, label, log}) => {
  const {timestamp, logger, message, ...others} = log
  if (label === 'ERROR') {
    error(`${label} [${namespace}] ${message} ${JSON.stringify(others)}`)
  } else {
    info(`${label} [${namespace}] ${message} ${JSON.stringify(others)}`)
  }
}

const error = (message) => {
  console.log(chalk.red.bold(message))
}

const info = (message) => {
  console.log(chalk.blue.bold(message))
}

const success = (message) => {
  console.log(chalk.green.bold(message))
}

module.exports = {
  print,
  logCreator,
  error,
  info,
  success
}
