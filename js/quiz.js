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
var selectedAnswers = []
var options = []

var currentQuestionNum = 0
var urlParams = new URLSearchParams(window.location.search)
const question = document.getElementById("question")
const description = document.getElementById("description")

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

function selectAnswer(event) {
    let selectedOption = options[event.currentTarget.number]

    //disable the buttons to prevent spamming
    Array.from(document.getElementsByClassName('answerChoice')).forEach(element => {
        element.disabled = true
    })

    if (answers[currentQuestionNum]['options'][selectedOption]) {
        //TODO display correct answer animation
        document.getElementById("screen").style.animation = "correct 1s"
        console.log("correct!")
        
    } else {
        //TODO display incorrect answer animation
        console.log("incorrect!")
    }
    //TODO make animation
    Bar.targetProgress = (currentQuestionNum + 1) * amountToUpdate

    selectedAnswers.push(selectedOption)

    if (currentQuestionNum + 1 === questions) {
        //finish
        console.log("FINISHED")
        //TODO display answers
        console.log(selectedAnswers)
        //TODO find better way to exit
        return
    } 

    update(currentQuestionNum + 1)
    
}
//There is probably a better way to do this
setInterval(function() {
    Bar.setProgress(Bar.progress + Math.ceil((Bar.targetProgress - Bar.progress) / 100 /* <<<< Increase to slow down */))
    
}, 10)
