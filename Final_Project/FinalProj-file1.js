var canvas = document.querySelector('#canvas1');
var context = canvas.getContext('2d');

var xPos = 0;
var yPos = 0;

context.rect(xPos, yPos, 50, 50);
context.stroke();

function move(e){
    alert(e.keyCode);
    if(e.keyCode==39){
        xPos+=5;
    }
    if(e.keyCode==37){
        xPos-=5;
    }
    if(e.keyCode == 38){
        yPos-=5;
    }
    if(e.keyCode == 40){
        yPos+=5;
    }

    canvas.width = canvas.width;
    context.rect(xPos, yPos, 50, 50);
    context.stroke();
}
document.onkeydown = move;