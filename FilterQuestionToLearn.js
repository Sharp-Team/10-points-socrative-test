const fs = require('fs')
const data = require('./data/Questions/data_test2.json')
const questions = data.questions

let theoryID = 0
let debitCreditID = 0
let theoryData = []
let debitCreditData = []
const pathQuestions = __dirname + '/data/Questions/'
const pathDebitCredit = __dirname + '/data/FilterQuestions/Debit-Credit/'
const pathTheories = __dirname + '/data/FilterQuestions/Theories/'

const writeFile = (path, data, fileName) => {
  fs.writeFile(path + fileName, JSON.stringify(data, null, 2), err => {
    if (err) throw err
    // console.log(path.split('/'))
    console.log(`Write file ${fileName} to ${path.split('/')[path.split('/').length - 2]} folder successfully!`)
  })
}

fs.readdirSync(pathQuestions).forEach(fileName => {
  // Get list questions in the data
  const { questions } = require(pathQuestions + fileName)
  Array.from(questions).forEach(({ question_text, answers }) => {
    let temp = {}
    // Check that question text contains number
    if (/\d/.test(question_text) || question_text.includes('record')) {
      temp.id = debitCreditID
      temp.question = question_text
      temp.answers = answers
      debitCreditData.push(temp)
      debitCreditID++
    } else {
      temp.id = theoryID
      temp.question = question_text
      temp.answers = answers
      theoryData.push(temp)
      theoryID++
    }
  })
})

writeFile(pathDebitCredit, debitCreditData, 'records.json')
writeFile(pathTheories, theoryData, 'theories.json')
