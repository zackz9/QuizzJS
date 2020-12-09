// Declaration from the DOM's elements
const questionNumber = document.querySelector('.questionNumber');
const questionText = document.querySelector('.questionText');
const optionContainer = document.querySelector('.optionContainer');
const answersIndicatorContainer = document.querySelector('.answersIndicator');
const homeBox = document.querySelector(".homeBox");
const quizBox = document.querySelector(".quizBox");
const resultBox = document.querySelector(".resultBox");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

//Pushing the questions into availableQuestions array
function setAvailableQuestions() {

    const totalQuestions = quiz.length;
    for(let i=0; i<totalQuestions;i++){

        availableQuestions.push(quiz[i]);

    }

}




function answersIndicator(){

    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for (let i=0; i<totalQuestion; i++){

        const indicator = document.createElement("div");

        answersIndicatorContainer.appendChild(indicator);

    }
}

function updateAnswerIndicator(markType) {
    answersIndicatorContainer.children[questionCounter - 1].classList.add(markType);
}



//get the result of the quizz
function quizResult(){

    resultBox.querySelector(".totalQuestion").innerHTML = quiz.length;
    resultBox.querySelector(".totalAttempt").innerHTML = attempt; 
    resultBox.querySelector(".totalCorrect").innerHTML = correctAnswers;
    resultBox.querySelector(".totalWrong").innerHTML = attempt - correctAnswers;

    const percentage = (correctAnswers/quiz.length) * 100 ;

    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + " %" ;
    resultBox.querySelector(".totalScore").innerHTML = correctAnswers +" / "+ quiz.length ;
}

//Setting question number and options
function getNewQuestion(){
    //Set question number
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

    //Set question text
    //Get a random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    //get the position of the questionIndex from availableQuestion Array
    const index1 = availableQuestions.indexOf(questionIndex);

    //remove this questionIndex from availableQuestion Array, so that thze question doesn't repeat
    availableQuestions.splice(index1, 1);

    //Set options
    //Get the length of options
    const optionLen = currentQuestion.options.length;

    //Push options into availableOptions Array

    for(let i=0;i<optionLen; i++) {
        availableOptions.push(i);
    }

    optionContainer.innerHTML = '';

    let animationDelay = 0.2;

    //create options in html
    for (let i=0; i<optionLen;i++){

        //Random Option
        const optionIndex  = availableOptions[Math.floor(Math.random() * availableOptions.length)];

        //Get the position of the optionIndex from availableOptions Array
        const index2 = availableOptions.indexOf(optionIndex);


        //Remove the optionIndex from availableOption Array, to prevent repeat
        availableOptions.splice(index2, 1);  

        const option = document.createElement('div');
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + .15;
        option.className ='option';
        optionContainer.appendChild(option);
        option.setAttribute('onclick', "getResult(this)")
    }

    questionCounter++;


}

//Get result of the current attempt question
function getResult(element){
    const id  = parseInt(element.id);
    

    //Comparing the id of the option clicked and get the answer 
    if(id === currentQuestion.answer){

        //Setting the greenColor for the correct answer 
        element.classList.add('correct');

        //Add the indicator to the correct mark
        updateAnswerIndicator("correct");

        correctAnswers++;

    }
    else {
        //Setting the redColor for the wrong answer 
        element.classList.add('wrong');

         //Add the indicator to the wrong mark
         updateAnswerIndicator("wrong");

        //if answer not correct, then show the correct option by adding greenColor to the correct option
        const optionLen = optionContainer.children.length;
        for(let i=0;i<optionLen;i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                
                optionContainer.children[i].classList.add('correct');
            }
        }
    }

    attempt++;
    //stop choosing once the select is done - Restriction
    unclickableOptions();
}


function next() {
    if(questionCounter === quiz.length){

        finishOfQuiz();
    }
    else {
        getNewQuestion();
    }
}

function unclickableOptions(){
    const optionLen = optionContainer.children.length;

    for(let i=0; i<optionLen;i++){
        optionContainer.children[i].classList.add("no-repeat");
    }

}


function resetQuiz(){

    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;

}

function tryAgainQuiz(){

    //Hide the resultBox
    resultBox.classList.add('hide');
    //Then show the quizBox
    quizBox.classList.remove('hide');
    resetQuiz();
    startQuiz();

}


function toHome(){
    //Hiding the result box
    resultBox.classList.add('hide');

    //Show the home box
    homeBox.classList.remove('hide');
    resetQuiz();
}

function finishOfQuiz(){
    //hidind the quizbox

    quizBox.classList.add("hide");

    // show the resultBox
    resultBox.classList.remove("hide");
    quizResult();
}

function startQuiz() {

    //Hiding the homeBox
    homeBox.classList.add('hide');
    //Showing the quizBox
    quizBox.classList.remove('hide');
    
    //Setting all the questions first in availableQuestionsArray
    setAvailableQuestions();
    //Then call items
    getNewQuestion();
    //create  indicators of answers
    answersIndicator();

}

window.onload = function() {
    homeBox.querySelector(".totalQuestion").innerHTML = quiz.length;
}

