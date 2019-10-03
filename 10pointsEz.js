const data = require('./data.json')
const questions = data.questions

const result = []

questions.forEach(({ question_text, answers }) => {
  const temp = {}
  const res = answers.filter(({ is_correct }) => is_correct === true)
  temp.question = question_text
  temp.answer = res[0].text
  result.push(temp)
})

console.log(result)
