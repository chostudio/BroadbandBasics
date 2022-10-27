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