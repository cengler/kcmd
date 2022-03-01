import config from './../services/config'
import inquirer from 'inquirer'

function updateConfig () {
  let cs = config.getConfig()
  const qs = config.configValues.map(
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
}

module.exports = updateConfig
