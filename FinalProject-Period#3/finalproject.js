<!doctype html>
<html>
<meta charset="utf-8">
    <title>Canvas</title>
    <style>
#canvas{
    outline: 1px solid #000;
}
</style>
</head>
<body>

<canvas id="canvas" height="400" width="600"></canvas>

    <script>

var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');

var xpos = 0;
var ypos = 0;

cantext.rect(xPos, yPos, 50, 50);
context.stroke();

function move(e){

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

    canvas.width=canvas.width;
    context.rect(xPos, ypos, 50, 50);
    context.stroke();
}

document.onkeydown = move;


</script>
</body>
</html>