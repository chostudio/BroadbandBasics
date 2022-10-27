//comment

document.getElementById('button').addEventListener("click", function(){
    document.getElementById('overlay').style.display = "block";
    document.getElementById('overlay2').style.display = "none";
    document.getElementById('correct').style.display = "inline-block";
});

document.getElementById('button2').addEventListener("click", function(){
    document.getElementById('overlay').style.display = "none";
    document.getElementById('overlay2').style.display = "block";
    document.getElementById('incorrect').style.display = "inline-block";
});    

document.getElementById('button3').addEventListener("click", function(){
    document.getElementById('overlay').style.display = "none";
    document.getElementById('overlay2').style.display = "block";
    document.getElementById('incorrect').style.display = "inline-block";
});    

document.getElementById('button4').addEventListener("click", function(){
    document.getElementById('overlay').style.display = "none";
    document.getElementById('overlay2').style.display = "block";
    document.getElementById('incorrect').style.display = "inline-block";
});    

document.getElementById('start').addEventListener("click", function(){
    document.getElementById('button').style.display = "block";
    document.getElementById('button2').style.display = "block";
    document.getElementById('button3').style.display = "block";
    document.getElementById('button4').style.display = "block";
});    