"use strict";
import * as Utilities from './utils.js';
//NOTE: Does not work in internet explorer
const Utils = Utilities.default
var Bar = {
    element: document.getElementById("progressBar"),
    //TODO something smells broken :/
    set progress(value) {
        this.element.style.width = value + "%";
    },
    set progressPercent(value) {
        this.element.style.width = value;
    },
    get progressPercent() {
        return this.element.style.width
    },
    get progress() {
        return this.element.style.width.slice(0, -1)
    }

}
async function fetchAnswers(id) {
    try {
        const response = await fetch(`../answers/lesson_${id}.json`);
        const exam = await response.json();
        return exam;
    } catch (error) {
        //TODO maybe check for the error type (404)
        window.location = "/page-not-found.html";
    }
}


//init variables
var selectedAnswers = []
var options;

var amountToUpdate = 100 / questions
var currentQuestionNum = 0;
const urlParams = new URLSearchParams(window.location.search);

const quizNumber = urlParams.get("quiz");
if (quizNumber === null) {
    window.location = "/page-not-found.html";
}
var answers;

answers = await fetchAnswers(quizNumber);


var questions = Object.keys(answers).length;

//init functions
function update(questionNum) {
    console.log(questionNum);
    currentQuestionNum = questionNum;
    options = Object.keys(answers[currentQuestionNum.toString()]['options']);
    Utils.shuffle(options);
    console.log(options);

    Array.from(document.getElementsByClassName('answerChoice')).forEach(element => {
        //TODO find a less stupid solution for getting the id of the button
        let elementContents = options[element.id.substring(12)];
        if (elementContents === undefined) {
            element.style.visibility = "hidden";
            element.disabled = true;
        } else {
            Utils.replaceButtonText(element, elementContents)
            element.style.visibility = "visible";
            //for the sake of D R Y
            element.disabled = false;
        }
    });

}
update(0)

//TODO Loop?
registerAnswerChoiceButton(0);
registerAnswerChoiceButton(1);
registerAnswerChoiceButton(2);
registerAnswerChoiceButton(3);

function registerAnswerChoiceButton(number) {
    const button = document.getElementById(`answerChoice${number}`)
    button.addEventListener("click", selectAnswer, false)
    button.number = number;

}
function selectAnswer(event) {
    let selectedOption = options[event.currentTarget.number]

    //disable the buttons to prevent spamming
    Array.from(document.getElementsByClassName('answerChoice')).forEach(element => {
        element.disabled = true;
    });

    if (answers[currentQuestionNum]['options'][selectedOption]) {
        //TODO display correct answer animation
        console.log("correct!")
        
    } else {
        //TODO display incorrect answer animation
        console.log("incorrect!")
    }
    
    Bar.progress = (currentQuestionNum + 1) * amountToUpdate;
    
    selectedAnswers.push(selectedOption);

    if (currentQuestionNum + 1 === questions) {
        //finish
        console.log("FINISHED")
        //TODO display answers
        console.log(selectedAnswers)
        return
    } 

    update(currentQuestionNum + 1)


}

