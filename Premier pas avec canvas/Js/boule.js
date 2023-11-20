let cnv = document.getElementById("myCanvas2");
let ctx = cnv.getContext("2d");
let ballSize = 30;
let vX = 2.0;
let hY = 200.0;
let posX = 0;
let posY = 400-1.0*Math.abs(hY*Math.sin(0.0));

function draw() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.beginPath();
    ctx.arc(posX, posY, ballSize, 0, 2*Math.PI);
    ctx.fillStyle = "#0000FF";
    ctx.fill();
    ctx.closePath();
}
function update_pos() {
    posX += vX;
    posY = 400-1.0*Math.abs(hY*Math.sin(Math.PI*posX/60));
    if(posX >= cnv.width) posX = 0;
}

function update() {
    update_pos();
    draw();
}
setInterval(update, 10);