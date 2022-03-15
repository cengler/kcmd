import config, {ConfigValues, LevelType} from './../services/config'

function updateConfig () {
  let actualConfig: ConfigValues = config.getConfig().config
  // TODO
  /*const qs = config.configValues.map(
    c => ({
      type: 'list',
      name: c.config,
      message: c.message ? c.message : `Set ${c.config} config`,
      default: cs[c.config],
      choices: c.values,
    })
  )
  inquirer.prompt(qs)
    .then(answers => {
      Object.keys(answers).forEach(c => cs[c] = answers[c])
      config.setConfig(cs)
    })

   */
}

export default updateConfig
