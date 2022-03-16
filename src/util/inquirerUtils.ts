import _ from 'lodash'
import inquirer from 'inquirer'
import {DistinctQuestion} from 'inquirer'
import fuzzy from 'fuzzy'
import {AutocompleteQuestionOptions} from "inquirer-autocomplete-prompt";

const selectOne = (choices: any[], startElement: any, message: string, field: string | undefined = undefined) => {
  const question: DistinctQuestion = {
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

function searchInArray (arrayData: any[]): (answersSoFar: any[], input: string | undefined) => Promise<any[]> {
  return (answers: any[], input = '') =>
   new Promise((resolve) => {
     setTimeout(() => {
       const results = fuzzy.filter(input, arrayData).map((el) => el.original)
       results.splice(5, 0, new inquirer.Separator())
       results.push(new inquirer.Separator())
       resolve(results)
     }, Math.random() * 470 + 30)
   });
}


const selectOneAuto = (choices: string[], startElement: string | undefined, message: string) => {
  const question: AutocompleteQuestionOptions<any> = {
    type: 'autocomplete',
    name: 'value',
    message,
    // TODO searchText: 'searching...',
    // TODO emptyText: 'Nothing found!',
    source: searchInArray(choices),
  }
  if (choices.length && startElement) {
    question.default = startElement
  }
  return inquirer.prompt([question]).then(a => a.value)
}

export default {
  selectOne,
  selectOneAuto
}
