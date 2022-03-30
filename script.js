const randomNumGenerator=(num)=>{
  return Math.floor(Math.random()*num)
}


function createQuestion() {
  return {
    firstNum: randomNumGenerator(10),
    secondNum: randomNumGenerator(10),
    operator: ['+', '-', 'x'][randomNumGenerator(3)]
    }
  }


let storeQuestion = createQuestion()
let userScore=0
let numofquestions=10
const questionField = document.getElementById("questionArea")


startQuiz=()=>{
  document.getElementById("start").style.display="none"
  document.getElementById("form").style.display="block"
  document.querySelector(".progress").style.display="inline-flex" 
  questionField.innerHTML=`${storeQuestion.firstNum} ${storeQuestion.operator} ${storeQuestion.secondNum}`
}

document.getElementById("start").addEventListener("click",startQuiz)

nextQuestion=(e)=>{
  e.preventDefault();
  numofquestions-=1;
  checkAnswer();
  showResult();
  storeQuestion=createQuestion()
  questionField.innerHTML=`${storeQuestion.firstNum} ${storeQuestion.operator} ${storeQuestion.secondNum}`;
  document.getElementById("answerField").value = ""
}

document.querySelector(".answerBtn").addEventListener("click", nextQuestion)

checkAnswer=()=>{
  
  let userAnswer = document.getElementById("answerField").value;
  let correctAnswer;
  switch(storeQuestion.operator){
    case "+":
      correctAnswer=storeQuestion.firstNum+storeQuestion.secondNum;
      break;
    case "-":
      correctAnswer=storeQuestion.firstNum-storeQuestion.secondNum;
      break;
    case "x":
      correctAnswer=storeQuestion.firstNum*storeQuestion.secondNum;
      break;  
  }
    (parseInt(userAnswer)==correctAnswer) ? (userScore+=1, document.querySelector("#progress-bar").style.width=`${userScore*10}%`) : userAnswer
} 


const scoreInfo = document.querySelector(".score-info")
const restartBtn = document.querySelector(".restart")

showResult=()=>{
  if(parseInt(numofquestions)==0){
    scoreInfo.textContent = `Your score is ${userScore*10}/100`
    document.body.classList.add("displayResult")
    setTimeout(() => restartBtn.focus(), 335)
  }
 }

restart=()=>{
   document.body.classList.remove("displayResult")
   document.querySelector("#progress-bar").style.width="0%"
   userScore=0
   numofquestions=10
   createQuestion()
 }

document.querySelector(".restart").addEventListener("click", restart)



