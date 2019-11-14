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
const handleAnswers = arr => {
  let answer = arr.map(({ text, is_correct }) => {
    return {
      text,
      isCorrect: is_correct,
    }
  })
  let trueAnswer = []
  let falseAnswer = []
  answer.forEach(data => {
    data.isCorrect === true ? trueAnswer.push(data) : falseAnswer.push(data)
  })
  return trueAnswer.concat(falseAnswer)
}

const handleData = (typeID, question, answers, data) => {
  let temp = {}
  temp.id = typeID
  temp.question = question
  // Just get specific attributes
  temp.answers = handleAnswers(answers)
  data.push(temp)
}

fs.readdirSync(pathQuestions).forEach(fileName => {
  // Get list questions in the data
  const { questions } = require(pathQuestions + fileName)
  Array.from(questions).forEach(({ question_text, answers }) => {
    // Check that question text contains number || contains "record" => debit/credit
    if (/\d/.test(question_text) || question_text.includes('record')) {
      handleData(debitCreditID, question_text, answers, debitCreditData)
      debitCreditID++
    } else {
      handleData(theoryID, question_text, answers, theoryData)
      theoryID++
    }
  })
})

writeFile(pathDebitCredit, debitCreditData, 'records.json')
writeFile(pathTheories, theoryData, 'theories.json')
