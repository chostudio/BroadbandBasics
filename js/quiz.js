"use strict"
import * as Utilities from './utils.js'
//NOTE: Does not work in internet explorer
const Utils = Utilities.default
var Bar = {
    element: document.getElementById("progressBar"),
    progress: 0,
    targetProgress: 0,

    setProgress(value) {
        this.element.style.width = value + "%"
        this.progress = value
        if (this.progress === 0) 
            Bar.element.style.display = "none"
        else
            Bar.element.style.display = "block"
    },
    set width(value) {
        this.element.style.width = value
    },
    get width() {
        return this.element.style.width
    },
}
Bar.setProgress(0)
async function fetchAnswers(chapter, lesson) {
    try {
        const response = await fetch(`../answers/chapter_${chapter}/lesson_${lesson}.json`)
        const exam = await response.json()
        return exam
    } catch (error) {
        //TODO maybe check for the error type (404)
        urlParams.set("lesson", "1")
        urlParams.set("chapter", "1")
        window.location.search = urlParams.toString()
        try {
            const response = await fetch(`../answers/chapter_${chapter}/lesson_${lesson}.json`)
            const exam = await response.json()
            return exam
        } catch (fileNotFound) {
            console.error(fileNotFound)
        }
    }
}

//init variables
var selectedAnswerNames = []
var selectedAnswerBools = []
var options = []

var currentQuestionNum = 0
var urlParams = new URLSearchParams(window.location.search)
//elements
const question = document.getElementById("question")
const description = document.getElementById("description")

const correctOverlay = document.getElementById('correctOverlay')
const incorrectOverlay = document.getElementById('incorrectOverlay')
const incorrectText = document.getElementById('incorrectText')
const correctText = document.getElementById('correctText')

const finishHeader = document.getElementById('finishHeader')
const finishDescription = document.getElementById('finishDescription')
const totalQuestions = document.getElementById('totalQuestions')
const correctQuestions = document.getElementById('correctQuestions')
const finishScore = document.getElementById('finishScore')
const finishDiv = document.getElementById('finishDiv')
const quizDiv = document.getElementById('quiz')


var lessonNumber = urlParams.get("lesson")
if (lessonNumber === null) {
    urlParams.set("lesson", "1")
    window.location.search = urlParams.toString()
}

var chapterNumber = urlParams.get("chapter")
if (chapterNumber === null) {
    urlParams.set("chapter", "1")
    window.location.search = urlParams.toString()
}

var answers = await fetchAnswers(chapterNumber, lessonNumber)
var questions = Object.keys(answers).length
var amountToUpdate = 100 / questions

//init functions
function update(questionNum) {
    currentQuestionNum = questionNum        
    options = Object.keys(answers[currentQuestionNum.toString()]['options'])
    let randomize = answers[currentQuestionNum]['randomize']
    //randomize's default value is true
    if (randomize === undefined || randomize)
        Utils.shuffle(options)
    
    console.log(`Question ${questionNum} with options`, options)
    question.textContent = answers[currentQuestionNum]['question']
    description.textContent = answers[currentQuestionNum]['description']

    Array.from(document.getElementsByClassName('answerChoice')).forEach(element => {
        //TODO find a less stupid solution for getting the id of the button
        let elementContents = options[element.id.slice(-1)]
        if (elementContents === undefined) {
            element.style.visibility = "hidden"
            element.disabled = true
        } else {
            Utils.replaceButtonText(element, elementContents)
            element.style.visibility = "visible"
            //for the sake of D R Y
            element.disabled = false  
        }
    })
        
    
}
update(0)

//TODO Loop?
registerAnswerChoiceButton(0)
registerAnswerChoiceButton(1)
registerAnswerChoiceButton(2)
registerAnswerChoiceButton(3)

function registerAnswerChoiceButton(number) {
    const button = document.getElementById(`answerChoice${number}`)
    button.addEventListener("click", selectAnswer)
    button.number = number
}

async function sendResults(correctIncorrect, names, score) {
    let json = {
        "correctIncorrect": correctIncorrect,
        "answerNames": names,
        score
    }
    console.log(json)
    // Creating a XHR object
    let xhr = new XMLHttpRequest();
    let url = "/results";

    // open a connection
    xhr.open("POST", url, true);

    // Set the request header i.e. which type of content you are sending
    xhr.setRequestHeader("Content-Type", "application/json");

    // Create a state change callback
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            // Print received data from server
            result.innerHTML = this.responseText;

        }
    };

    // Converting JSON data to string
    var data = JSON.stringify(json);
    console.log(`Post sent data: ${data}`)
    // Sending data with the request
    xhr.send(data);
}
function selectAnswer(event) {
    let selectedOption = options[event.currentTarget.number]

    //disable the buttons to prevent spamming
    Array.from(document.getElementsByClassName('answerChoice')).forEach(element => {
        element.disabled = true
    })
    let selectedAnswerCorrect = answers[currentQuestionNum]['options'][selectedOption]
    selectedAnswerBools.push(selectedAnswerCorrect)
    if (selectedAnswerCorrect) {
        //TODO display correct answer animation
        //document.getElementById("screen").style.animation = "correct 1s"
        console.log("correct!")
        incorrectOverlay.style.display = "none";
        correctOverlay.style.display = "block";
        correctText.style.display = "inline-block";

        setTimeout(() => {
            correctOverlay.style.display = "none";
            correctText.style.display = "none";
            
        }, 1000);
    } else {
        //TODO display incorrect answer animation
        console.log("incorrect!")
        correctOverlay.style.display = "none";
        incorrectOverlay.style.display = "block";
        incorrectText.style.display = "inline-block";

        setTimeout(() => {
            incorrectOverlay.style.display = "none";
            incorrectText.style.display = "none";
            
        }, 1000);
    }
    //TODO make animation
    Bar.targetProgress = (currentQuestionNum + 1) * amountToUpdate

    selectedAnswerNames.push(selectedOption)

    if (currentQuestionNum + 1 === questions) {
        //finish
        console.log("FINISHED")
        //TODO display answers
        
        let correctQuestions = 0
        selectedAnswerBools.forEach(bool => {
            if (bool)
                correctQuestions += 1
        })
        let score = correctQuestions / questions
        /*
        finishDiv.style.display = 'block'
        quizDiv.style.display = 'none'

        finishHeader.style.display = 'block'
        finishDescription.style.display = 'block'
        finishScore.textContent = score.toString()
        */
        console.log(selectedAnswerBools, selectedAnswerNames, score)

        sendResults(selectedAnswerBools, selectedAnswerNames, score)
        
        //TODO find better way to exit
        console.log("AAAAAAAAA")
        window.location.assign(document.location.origin + "/quiz-finished.html")
        console.log("AAAAAAAAA")

        return
    } 
    else
        update(currentQuestionNum + 1)
    
}


//There is probably a better way to do this
setInterval(function() {
    Bar.setProgress(Bar.progress + Math.ceil((Bar.targetProgress - Bar.progress) / 100 /* <<<< Increase to slow down */))
    
}, 10)
