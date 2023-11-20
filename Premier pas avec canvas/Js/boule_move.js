let cnv = document.getElementById("myCanvas5");
let ctx = cnv.getContext("2d");
let ballSize = 30;
let ballX_1 = 0, ballY_1 = 0;
let ballX_2 = 0, ballY_2 = 0;
let posX = 0, posY = 0;
let trace_size = 100;
let trace_mouse = [[posX,posY]];

function drawBall(x,y,size,fillColor) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2*Math.PI);
    ctx.fillStyle = fillColor;
    ctx.fill(); ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.beginPath();
    ctx.moveTo(ballX_1,ballY_1);
    ctx.lineTo(posX,posY);
    ctx.strokeStyle = "#FF0000";
    ctx.stroke(); ctx.closePath();
    drawBall(ballX_1, ballY_1, ballSize,"#FF0000");
    drawBall(ballX_2, ballY_2, ballSize/2,"#0000FF");
}

function lerp (start, end, amt){ return (1-amt)*start+amt*end }
function update() {
    ballX_1 += (posX - ballX_1) * 0.1;
    ballY_1 += (posY - ballY_1) * 0.1;
    ballX_2 = lerp(ballX_2, posX, 0.1);
    ballY_2 = lerp(ballY_2, posY, 0.1);
    draw();
    requestAnimationFrame(update);
}

document.addEventListener("mousemove", mousemove_fun);
function mousemove_fun(e) { posX = e.clientX; posY = e.clientY; }
requestAnimationFrame(update);