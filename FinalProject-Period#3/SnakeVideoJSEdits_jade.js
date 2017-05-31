/**
 * Created by BabcockChij1158 on 5/26/2017.
 */
//settings
var snakeX = 2;
var snakeY = 2;
var snakeX2 = 25;
var snakeY2 = 25;

//size of the screen
var height = 30;
var width = 30;
//how often the game updates
var interval = 100;//every 1/10 of a second =100
var increment = 4; //how much out snake grows each time


//game variables
var length = 0;
var tailX = [snakeX];
var tailY = [snakeY];
var tailX2 = [snakeX2];
var tailY2 = [snakeY2];
//coordinates of the fruit/food
var fX;
var fY;
var fX2;
var fY2;
var running = false;
var gameOver = false;
var direction = -1; //up = 0, down = -1, left  = 1, right  = 2, can change this later if want
var int; //short for interval, this is the identifier for the interval we set eariler
var score = 0;

/**
 Entry point of the game
 */
function run(){
    init();
    int = setInterval(gameLoop, interval); //what setInterval does: runs gameloop every interval
}
function init(){
    createMap();
    createSnake();
    createFruit();
    createSnake2();
}

/**
 Generates the map for the snake
 */
function createMap(){
    document.write("<table>");//going to use a table to create an array of table cells which we will use as pixels in the game.
    for(var y = 0;  y < height; y++){
        document.write("<tr>");
        for(var x = 0;  x < width; x++){
            if(x == 0 || x == width -1 || y == 0 || y == height -1){
                document.write("<td class = 'wall' id='"+x+"-"+y+"'></td>");
            }else{
                document.write("<td class = 'blank' id='"+x+"-"+y+"'></td>");

            }	//checks that if block we are placing is a wall
        }
        document.write("</tr>");
    }
    document.write("</table>");
}

function createSnake(){
    set(snakeX, snakeY, "snake");
}

//snake2 start position
function createSnake2(){
    set(snakeX2, snakeY2, "snake2");
}
function get(x,y){
    return document.getElementById(x+"-"+y);
}

function set(x,y,value){
    if(x!= null && y!=null)
        get(x,y).setAttribute("class",value);
}

function rand(min, max){
    return Math.floor(Math.random() * (max-min) + min);
}

function getType(x,y){
    return get(x,y).getAttribute("class");
}

function createFruit(){
    var found = false;
    while(!found && (length < (width-2)*(height-2)+1)){  //something in here makes sure the snake or fruit is not the volume of the entire page so it does not create an infinite loop
        var fruitX = rand(1,width-1);
        var fruitY  = rand(1,height-1);
        if(getType(fruitX, fruitY)=="blank")
            found = true;

    }
    set(fruitX, fruitY, "fruit"); //set to fruit type
    fX = fruitX;
    fY = fruitY;
}

//snake
window.addEventListener("keypress", function key(){
    //if key is W set direction
    var key = event.keyCode;//want to restrict them from going strait from down to up
    if(direction != -1 && (key == 119 || key == 87)) //key codes for upper and lower case "w"
        direction = 0;
    //if key is S set direction down;
    else if(direction != 0 && (key == 115 || key == 83)) //key codes for upper and lower case "s"
        direction = -1; //sets direction down
    //if key is A set direction left
    else if(direction != 2 && (key == 97 || key == 65)) //key codes for upper and lower case "a"
        direction = 1; //sets direction left
    //if key is D set direction right
    else if(direction != 1 && (key == 100 || key == 68)) //key codes for upper and lower case "d"
        direction = 2; //sets direction right
    if(!running)
        running = true;
    else if(key == 32)//space bar
        running = false; // will allow you to pause game without restarting


});

//snake2
window.addEventListener("keypress", function key2(){
    var key2 = event.keyCode;
    if(direction != -1 &&(key2 == 38))
        direction = 0;
    else if(direction != 0 &&(key2 == 40))
        direction =  -1;
    else if(direction != 2 &&(key2 == 37))
        direction = 1;
    else if(direction != 1 &&(key2 == 39))
        direction = 2;
    if(!running)
        running = true;
    else if(key2 == 32)
        running = false;
});



function gameLoop(){
    if(running && !gameOver){
        update();
    }else if(gameOver){
        clearInterval(int);
    }
}

function update() {
    set(fX, fY, "fruit");
    updateTail();
    set(tailX[length], tailY[length], "blank");
    if (direction == 0)
        snakeY--;
    else if (direction == -1)
        snakeY++; //is going down
    else if (direction == 1)
        snakeX--;
    else if (direction == 2)
        snakeX++;
    set(snakeX, snakeY, "snake");
    for (var i = tailX.length - 1; i >= 0; i--){
        if (snakeX == tailX[i] && snakeY == tailY[i]) {
            gameOver = true;
            break;
        }
    }
    if (snakeX == 0 || snakeY == width - 1 || snakeY == 0 || snakeY == height - 1)
        gameOver = true;
    else if(snakeX == fX && snakeY == fY){
        score+=4;
        createFruit();
        length+=increment;

    }
    document.getElementById("score").innerHTML = "Score: " + score;
}

function updateTail(){
    for (var i = length; i > 0; i--){//going from back to front of array
        tailX[i] = tailX[i-1];
        tailY[i] = tailY[i-1];
    }
    tailX[0] = snakeX;
    tailY[0] = snakeY;//update the front of the tail to the head of the tail
}





function gameLoop(){
    if(running && !gameOver){
        update2();
    }else if(gameOver){
        clearInterval(int);
    }
}

function update2() {
    set(fX2, fY2, "fruit");
    updateTail2();
    set(tailX2[length], tailY2[length], "blank");
    if (direction == 0)
        snakeY2--;
    else if (direction == -1)
        snakeY2++; //is going down
    else if (direction == 1)
        snakeX2--;
    else if (direction == 2)
        snakeX2++;
    set(snakeX2, snakeY2, "snake2");
    for (var i = tailX2.length - 1; i >= 0; i--){
        if (snakeX2 == tailX2[i] && snakeY2 == tailY2[i]) {
            gameOver = true;
            break;
        }
    }
    if (snakeX2 == 0 || snakeY2 == width - 1 || snakeY2 == 0 || snakeY2 == height - 1)
        gameOver = true;
    else if(snakeX2 == fX2 && snakeY2 == fY2){
        score+=4;
        createFruit();
        length+=increment;

    }
    document.getElementById("score").innerHTML = "Score: " + score;
}

function updateTail2(){
    for (var i = length; i > 0; i--){//going from back to front of array
        tailX2[i] = tailX2[i-1];
        tailY2[i] = tailY2[i-1];
    }
    tailX2[0] = snakeX2;
    tailY2[0] = snakeY2;//update the front of the tail to the head of the tail
}







run();