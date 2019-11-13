const fs = require('fs')
const data = require('./data/Questions/data_test3.json')
const questions = data.questions

const result = []
// Thêm ID để chia ra => Mỗi thành viên sẽ có result.length / n(số thành viên) câu hỏi => Ez game!!!
let id = 0
// Lưu kết quả vào file
const fileResult = 'data/Results/result2.json'

questions.forEach(({ question_text, answers }) => {
  const temp = {}
  const res = answers.filter(({ is_correct }) => is_correct === true)
  temp.id = id
  // Vì câu hỏi đôi khi sẽ dài => cắt ngắn cho dễ nhìn!
  // temp.question = question_text.substring(0, 60)
  temp.question = question_text
  temp.answer = res
  result.push(temp)
  id++
})

fs.writeFile(fileResult, JSON.stringify(result, null, 2), err => {
  if (err) throw err
  console.log('Result saved!')
})

// JWT hash default - API

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsaW5rQVBJIjoiaHR0cHM6Ly9hcGkuc29jcmF0aXZlLmNvbS9xdWl6emVzL2FwaS9xdWl6LzM3NDE4OTQ3P3Jvb21fbmFtZT1GQUxMMTlUSEFPR1RNIn0.Z9hyeftoRQqOlX_wQPj4cwbp638jldXTJtJE7WqPOos
