const fs = require('fs')

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
    console.log(`Write file ${fileName} to ${path.split('/')[path.split('/').length - 2]} folder successfully!`)
  })
}

// TODO: Push the true answer in the first array!
// Get specific attributes
const getSpecificAttributes = arr =>
  arr.map(({ text, is_correct }) => {
    return {
      text,
      isCorrect: is_correct,
    }
  })

const handleData = (id, question, answers, data) => {
  let temp = {}
  temp.id = id
  temp.question = question
  // Just get specific attributes
  temp.answers = getSpecificAttributes(answers)
  data.push(temp)
  id++
}

fs.readdirSync(pathQuestions).forEach(fileName => {
  // Get list questions in the data
  const { questions } = require(pathQuestions + fileName)
  Array.from(questions).forEach(({ question_text, answers }) => {
    // Check that question text contains number || contains "record" => debit/credit
    if (/\d/.test(question_text) || question_text.includes('record')) {
      handleData(debitCreditID, question_text, answers, debitCreditData)
    } else {
      handleData(theoryID, question_text, answers, theoryData)
    }
  })
})

writeFile(pathDebitCredit, debitCreditData, 'records.json')
writeFile(pathTheories, theoryData, 'theories.json')
