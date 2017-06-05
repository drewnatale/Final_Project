/**
 * Created by BabcockChij1158 on 5/26/2017.
 */
//settings
var snakeX = 2;
var snakeY = 2;
var snakeX2 = 4;
var snakeY2 = 4;

//size of the screen
var height = 30;
var width = 30;
//how often the game updates
var interval = 100;
var interval2 = 100;//every 1/10 of a second =100
var increment = 4;
var increment2 = 4;//how much out snake grows each time


//game variables
var length = 0;
var length2 = 0;
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
var running2 = false;
var gameOver = false;
var gameOver2 = false;
var direction = -1;
var direction2 = -1;//up = 0, down = -1, left  = 1, right  = 2, can change this later if want
var int;
var int2;//short for interval, this is the identifier for the interval we set eariler
var score = 0;
var score2 = 0;

/**
 Entry point of the game
 */
function run(){
    init();
    int = setInterval(gameLoop, interval);
    //what setInterval does: runs gameloop every interval
}
function init(){
    createMap();
    createSnake();
    createSnake2();
    createFruit();

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
//snake
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
function get2(x,y){
    return document.getElementById(x+"-"+y);
}

function set2(x,y,value) {
    if (x != null && y != null)
        get2(x, y).setAttribute("class", value);
}

//fruit
function rand(min, max){
    return Math.floor(Math.random() * (max-min) + min);
}
//fruit
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
    if(direction != -1 && (key == 87)) //key codes for upper and lower case "w"
        direction = 0;
    //if key is S set direction down;
    else if(direction != 0 && (83)) //key codes for upper and lower case "s"
        direction = -1; //sets direction down
    //if key is A set direction left
    else if(direction != 2 && (key == 65)) //key codes for upper and lower case "a"
        direction = 1; //sets direction left
    //if key is D set direction right
    else if(direction != 1 && (key == 68)) //key codes for upper and lower case "d"
        direction = 2; //sets direction right
    if(!running)
        running = true;
    else if(key == 32)//space bar
        running = false; // will allow you to pause game without restarting

});

//snake2
window.addEventListener("keydown", function key2(){
    var key2 = event.keyCode;
    if(direction2 != -1 &&(key2 == 38))
        direction2 = 0;
    else if(direction2 != 0 &&(key2 == 40))
        direction2 = -1;
    else if(direction2 != 2 &&(key2 == 37))
        direction2 = 1;
    else if(direction2 != 1 &&(key2 == 39))
        direction2 = 2;
    if(!running2)
        running2 = true;


});



function gameLoop(){
    if(running && !gameOver){
        update();
    }
    else if(running2 && !gameOver2){
        update2();
    }
    else if(gameOver){
        clearInterval(int);                 //You should make a button pop up here
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

function update2() {
    set2(fX2, fY2, "fruit");
    updateTail2();
    set2(tailX2[length2], tailY2[length2], "blank");
    if (direction2 == 0)
        snakeY2--;
    else if (direction2 == -1)
        snakeY2++; //is going down
    else if (direction2 == 1)
        snakeX2--;
    else if (direction2 == 2)
        snakeX2++;
    set2(snakeX2, snakeY2, "snake2");
    for (var i = tailX2.length - 1; i >= 0; i--){
        if (snakeX2 == tailX2[i] && snakeY2 == tailY2[i]) {
            gameOver2 = true;
            break;
        }
    }
    if (snakeX2 == 0 || snakeY2 == width - 1 || snakeY2 == 0 || snakeY2 == height - 1)
        gameOver2 = true;
    else if(snakeX2 == fX2 && snakeY2 == fY2){
        score2+=4;
        createFruit();
        length2+=increment2;

    }
    document.getElementById("score2").innerHTML = "Score: " + score2;
}

function updateTail2(){
    for (var i = length2; i > 0; i--){//going from back to front of array
        tailX2[i] = tailX2[i-1];
        tailY2[i] = tailY2[i-1];
    }
    tailX2[0] = snakeX2;
    tailY2[0] = snakeY2;//update the front of the tail to the head of the tail
}


run();
//https://stackoverflow.com/questions/5203407/javascript-multiple-keys-pressed-at-once