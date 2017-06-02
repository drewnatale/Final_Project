var startScreen = (function(input) {
    var hue = 0;
    var direction = 1;
    var transitioning = false;
    var wasButtonDown = false;

function centerText(ctx, text, y){
        var measurement = ctx.measureText(text);
        var x = (ctx.canvas.width - measurement.width)/2;
        ctx.fillText(text, x, y);

    }
function draw(ctx, elapsed){
    var y = ctx.canvas.height /2;
    var color = 'rgd(' + hue + ',0,0)';
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '48px monospace';
    centerText(ctx, 'Period 3: Snake Game',y)
    ctx.fillStyle = color;
    ctx.font = '24px monospace';
    centerText(ctx, 'click to begin game', y +30);

}

function update() {
    hue += 1 * direction;
    if (hue > 225) direction = -1;
    if (hue < 0) direction = 1;
    var isButtonDown = input.isButtonDown();
    var mouseJustClicked = !isButtonDown && wasButtonDown;
    if (mouseJustClicked && !transitioning) {
        transitioning = true;
    }
    wasButtonDown = isButtonDown;
}
    return{
        draw:draw,
        update: update
    }

}());




