import config, {AllConfig, ConfigValues, DisplayType, LevelType} from './../services/config'
import inquirer from "inquirer";

function updateConfig () {
  let conf: AllConfig = config.getConfig()
  let configValues = [
      {name: 'display', message: 'Set display', default: conf.config.display, choices: Object.keys(DisplayType)},
      {name: 'level', message: 'Set log level', default: conf.config.level, choices: ['DEBUG', 'INFO','ERROR','SUCCESS']},
      {name: 'verbose', message: 'Set verbose', default: conf.config.verbose, choices: ['true', 'false']},
      {name: 'banner', message: 'Set banner', default: conf.config.banner, choices: ['true', 'false']}
  ]
  const qs = configValues.map(
    c => ({
      type: 'list',
      name: c.name,
      message: c.message,
      default: c.default,
      choices: c.choices,
    })
  )
  inquirer.prompt(qs)
    .then(answers => {
        conf.config.display = answers.display
        conf.config.level = answers.level
        conf.config.verbose = answers.verbose
        conf.config.banner = answers.banner
        config.setConfig(conf)
    })
}

export default updateConfig
