"use strict";
class Utils {

    static shuffle(array) {
        let currentIndex = array.length, randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    
        return array;
    }
    static replaceButtonTextId(buttonId, text) {
        if (document.getElementById) {
          var button=document.getElementById(buttonId);
          if (button) {
            if (button.childNodes[0]) {
                button.childNodes[0].nodeValue=text;
            }
            else if (button.value) {
                button.value=text;
            }
            else if (button.innerHTML) {
                button.innerHTML=text;
            }
          }
        }
    }
    static replaceButtonText(button, text) {
        if (button) {
            if (button.childNodes[0]) {
                button.childNodes[0].nodeValue=text;
            }
            else if (button.value) {
                button.value=text;
            }
            else if (button.innerHTML) {
                button.innerHTML=text;
            }
        }
    }

    
}
export default Utils;