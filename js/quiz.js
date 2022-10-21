requirejs(["helper/util"], function(util) {



});


var Bar = {
    element: document.getElementById("progressBar"),

    set progress(value) {
        this.element.style.width = value + "%";
    },
    get progress() {
        return this.element.style.width
    },

}

Bar.progress = 10
const answers = require('../answers/lesson_1.json'); 

console.log(answers)

function selectAnswer(id) {
    switch (id) {
        case 0: {
            
        }
    }
}

/*
object.property
object.getProperty

object.property = 1
object.setProperty(1)


*/