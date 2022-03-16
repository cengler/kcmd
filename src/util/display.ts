// display according configuration
import config, {DisplayType, LevelType} from '../services/config'
import chalk from 'chalk'

function convertToTSV(arr: Array<any>, columns: string[] | undefined = undefined): string {
  if (arr.length === 0) return ''
  else if (typeof arr[0] === 'string') return arr.join('\n')
  
  const array = [Object.keys(arr[0])].concat(arr)
  return array.map(row => {
    return Object.values(row).join('\t')
  }).join('\n')
}

const print = (data: any, columns: string[] | undefined = undefined) => {
  const d: DisplayType = config.getConfig().config.display
  if (d === DisplayType.table) {
    if(columns)
      console.table(data, columns)
    else
      console.table(data)
  } else if (d === DisplayType.tsv) {
    console.log(convertToTSV(data, columns))
  } else {
    //data.forEach(r => console.log(r))
    // TODO ver diferencias array o no
    // TODO ver json print
    console.log(data)
  }
}

const error = (message: string, e: any | undefined = undefined) => {
  if(LevelType.ERROR >= config.getLogLevel()) {
    if(e) {
      if (config.getConfig().config.verbose) {
        console.error(chalk.red.bold(message, e))
      } else {
        console.error(chalk.red.bold(message, 'See more with -v'))
      }
    } else {
      console.error(chalk.red.bold(message))
    }
  }
}

const info = (message: string) => {
  if(LevelType.INFO >= config.getLogLevel())
    console.log(chalk.blue.bold(message))
}

const success = (message: string) => {
  if(LevelType.SUCCESS >= config.getLogLevel())
    console.log(chalk.green.bold(message))
}

const debug = (message: string) => {
  if(LevelType.DEBUG >= config.getLogLevel())
    console.log(chalk.rgb(255, 165, 0).bold(message))
}

const raw = (message: string) => {
  console.log(message)
}

export default {
  print,
  //logCreator,
  error,
  debug,
  info,
  raw,
  success
}
