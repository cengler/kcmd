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

const print = (data) => {
  const d = config.getStringConfig(config.CONFIG_DISPLAY)
  if (d === 'table') {
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
    console.log(
      chalk.redBright(`${label} [${namespace}] ${message} ${JSON.stringify(others)}`)
    )
  } else {
    console.log(
      chalk.blueBright(`${label} [${namespace}] ${message} ${JSON.stringify(others)}`)
    )
  }
}

module.exports = {
  print,
  logCreator
}
