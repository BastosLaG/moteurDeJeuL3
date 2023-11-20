let cnv = document.getElementById("myCanvas6");
let ctx = cnv.getContext("2d");
let ballSize = 30, ballX = 0, ballY = 0;
let mouseX = 0, mouseY = 0;
let trace_size = 200;
let trace_mouse = [[ballX,ballY]];
function drawBall(x,y,size,fillColor) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2*Math.PI);
    ctx.fillStyle = fillColor;
    ctx.fill(); ctx.closePath();
}
function draw() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    for (let i = 0; i < trace_mouse.length; i++) {
        ctx.beginPath();
        ctx.arc(trace_mouse[i][0], trace_mouse[i][1], ballSize/2, 0, 2*Math.PI);
        ctx.stroke(); ctx.closePath();
    }
    ctx.beginPath();
    ctx.moveTo(ballX,ballY);
    ctx.lineTo(mouseX,mouseY);
    ctx.strokeStyle = "#0000FF";
    ctx.stroke(); ctx.closePath();
    drawBall(ballX, ballY, ballSize,"#0000FF");
}
function update() {
    ballX_1 += (posX - ballX_1) * 0.1;
    ballY_1 += (posY - ballY_1) * 0.1;
    ballX_2 = lerp(ballX_2, posX, 0.1);
    ballY_2 = lerp(ballY_2, posY, 0.1);
    draw();
    requestAnimationFrame(update);
}
document.addEventListener("mousemove", mousemove_fun);
function mousemove_fun(e) {
    mouseX = e.clientX; mouseY = e.clientY;
    ballX += (mouseX - ballX) * 0.1; ballY += (mouseY - ballY) * 0.1;
    trace_mouse.push([ballX,ballY]);
    if(trace_mouse.length > trace_size) trace_mouse.shift();
}

requestAnimationFrame(update);