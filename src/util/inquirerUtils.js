import _ from 'lodash'
import inquirer from 'inquirer'
import fuzzy from 'fuzzy'

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

function searchInArray (arrayData) {
  return (answers, input = '') =>
   new Promise((resolve) => {
     setTimeout(() => {
       const results = fuzzy.filter(input, arrayData).map((el) => el.original);
       results.splice(5, 0, new inquirer.Separator());
       results.push(new inquirer.Separator());
       resolve(results);
     }, Math.random() * 470 + 30)
   });
}

const selectOneAuto = (choices, startElement, message, field = null) => {
  const question = {
    type: 'autocomplete',
    name: 'value',
    message,
    searchText: 'searching...',
    emptyText: 'Nothing found!',
    source: searchInArray(choices),
  }
  if (choices.length && field && startElement) {
    question.default = _.findIndex(choices, [field, startElement[field]])
  } else if (choices.length && startElement) {
    question.default = startElement
  }
  return inquirer.prompt([question]).then(a => a.value)
}

module.exports = {
  selectOne,
  selectOneAuto
}
