//settings
var snakeX = 2;
var snakeY = 2;
//size of the screen
var height = 30;
var width = 30;
//how often the game updates
var interval = 100; //every 1/10 of a second =100
var increment = 1; //how much out snake grows each time


//game variables
var tailX = [snakeX];
var tailY = [snakeY];
//coordinates of the fruit/food
var fX;
var fY;
var running;
var gameOver;
var direction = -1; //up = 0, down = -1, left  = 1, right  = 2, can change this later if want
var interval = 100;
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
                document.write("<td class = "wall" id='"+x+"-"+y+"'></td>");
            }else{
                document.write("<td class = "blank" id='"+x+"-"+y+"'></td>");

            }	//checks that if block we are placing is a wall
        }
        document.write("</tr>">);
    }
    document.write("</table>");
}

run();