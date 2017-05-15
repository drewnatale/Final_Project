/**
 * Created by BabcockChij1158 on 5/12/2017.
 */
/**var canvas = ("#canvas")[0]**/
var w = ("#canvas").width();
var h = ("#canvas").height();
var x = document.getElementById("canvas");
canvas = x.getContext("2d");
var btn = document.getElementById("")



var snakeSize = 10;
var food;
var score = 0;
var snake;

var drawMod = (function (){
    var snakeBody = function(x, y){
        x.fillstyle = "green";
        x.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);

        x.strokeStyle = "darkgreen";
        x.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    }

    var yummy = function(x, y) {
        x.fillstyle = "red";
        x.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);

        x.strokeStyle = "yellow";
        x.strokeRect(x*snakeSize + 1, y*snakeSize +1, snakeSize-2, snakeSize-2);
    }
    var drawSnake = function() {
        var length = 4;
        snake = [];
        for (var i = length; i>=0; i--){
            snake.push({x:i, y:0});
        }
    }
    var paint = function() {
        x.fillstyle = "grey";
        x.fillRect = (0, 0, w, h);

        x.strokeStyle = "black";
        x.strokeRect = (0, 0, w, h);

        btn.setAttribute('disabled', true);

        var snakeX = snake[0].x;
        var snakeY = snake[0].y;

    }
    if (direction == 'right') {
        snakeX++;
    } else if (direction == 'left') {
        snakeX--;
    } else if (direction == 'up') {
        snakeY--;
    } else if (direction == 'down') {
        snakeY++;
    }

    /*
     If the snake touches the canvas path or itself, it will die!
     Therefore if x or y of an element of the snake, don't fit inside the canvas, the game will be stopped.
     If the check_collision is true, it means the the snake has crashed on its body itself, then the game will be stopped again.
     */
    if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize || check_collision(snakeX, snakeY, snake)) {
        //Stop the game.

        //Make the start button enabled again.
        btn.removeAttribute('disabled', true);

        //Clean up the canvas.
        x.clearRect(0, 0, w, h);
        gameloop = clearInterval(gameloop);
        return;
    }

    //If the snake eats food it becomes longer and this means that, in this case, you shouldn't pop out the last element of the array.
    if (snakeX == food.x && snakeY == food.y) {
        //Create a new square instead of moving the tail.
        var tail = {
            x: snakeX,
            y: snakeY
        };
        score++;

        //Create new food.
        createFood();
    } else {

        //Pop out the last cell.
        var tail = snake.pop();
        tail.x = snakeX;
        tail.y = snakeY;
    }

    //Puts the tail as the first cell.
    snake.unshift(tail);

    //For each element of the array create a square using the bodySnake function we created before.
    for (var i = 0; i < snake.length; i++) {
        bodySnake(snake[i].x, snake[i].y);
    }

    //Create food using the _pizza_ function.
    pizza(food.x, food.y);

    //Put the score text.
    scoreText();
}

    var init = function () {
        direction = 'down';
        drawSnake();
        createFood();
        gameloop = setInterval(paint, 80);
    }

    //You need to return only the _init_ function at the end of the Module.
    return {
        init: init
    };

    //Close the Module.
}());



    (function (window, document, drawModule, undefined) {

        //Connect the button in the html with the _init_ function.
        var btn = document.getElementById('btn');
        btn.addEventListener("click", function () {
            drawModule.init();
        });

        document.onkeydown = function (event) {

            keyCode = window.event.keyCode;
            keyCode = event.keyCode;

            switch (keyCode) {

                case 37:
                    if (direction != 'right') {
                        direction = 'left';
                    }
                    console.log('left');
                    break;

                case 39:
                    if (direction != 'left') {
                        direction = 'right';
                        console.log('right');
                    }
                    break;

                case 38:
                    if (direction != 'down') {
                        direction = 'up';
                        console.log('up');
                    }
                    break;

                case 40:
                    if (direction != 'up') {
                        direction = 'down';
                        console.log('down');
                    }
                    break;
            }
    }
})(window, document, drawMod);