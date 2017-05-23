//settings
var snakeX = 2;
var snakeY = 2;
//size of the screen
var height = 30;
var width = 30;
//how often the game updates
var interval = 100;//every 1/10 of a second =100
var increment = 1; //how much out snake grows each time


//game variables
var tailX = [snakeX];
var tailY = [snakeY];
//coordinates of the fruit/food
var fX;
var fY;
var running = false;
var gameOver = false;
var direction = -1; //up = 0, down = -1, left  = 1, right  = 2, can change this later if want
var int; //short for interval, this is the identifier for the interval we set eariler

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

function gameLoop(){
    if(running && !gameOver){
        update();
    }else if(gameOver){
        clearInterval(int);
    }
}

function update(){
    set(fX, fY, "fruit");
    set(tailX[length], tailY[length], "blank");
    if(direction == 0)
        snakeY--;
    else if(direction == -1)
        snakeY++; //is going down
    else if(direction == 1)
        snakeX--;
    else if(direction == 2)
        snakeX++;
    set(snakeX, snakeY, "snake");


}

function updateTail(){
    for (var i = length; i > 0; i--){//going from back to front of array
        tailX[i] = tailX[i-1];
        tailY[i] = tailY[i-1];
    }
    tailX[0] = snakeX;
    tailY[0] = snakeY;//update the front of the tail to the head of the tail
}
run();