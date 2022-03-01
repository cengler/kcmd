import _ from 'lodash'
import inquirer from 'inquirer'

const selectOne = (choices, startElement, message, field = null) => {
  const question = {
    type: 'list',
    name: 'value',
    message,
    choices,
  }
  if (choices.length && field && startElement) {
    question.default = _.findIndex(choices, [field, startElement[field]])
  } else if (choices.length && startElement) {
    question.default = startElement
  }
  return inquirer.prompt([question]).then(a => a.value)
}

module.exports = {
  selectOne
}
