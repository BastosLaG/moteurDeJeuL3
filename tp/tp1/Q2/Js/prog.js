// python3 -m http.server 8000
// Math.random() * (max - min) + min;
let cnv = document.getElementById('myCanvas');
let ctx = cnv.getContext('2d');
ctx.imageSmoothingEnabled= false;

let background = new Image();
background.src = "./assets/images/background.png"

let goutte = new Image();
goutte.src = "./assets/images/goutte.png"


class Goutte {
    constructor(img, x, y, dx, dy){
        this.img = img;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }

    move(){
        if (this.y > cnv.height){
            this.y = Math.random() * 50;
            this.x = Math.random() * cnv.width;
        }
        this.y = this.y + 20;
    }
    draw(){
        ctx.drawImage(this.img, this.x, this.y, this.dx, this.dy);
    }
    
}

let all_goutte = [];
let nbr_goutte = 200
for(let i=0; i<nbr_goutte; i++) {
    all_goutte[i] = new Goutte(goutte, Math.random() * cnv.width, Math.random() * cnv.height, 2, 5);
}

function update() {
    // ctx.clearRect(0, 0, cnv.width, cnv.height);
    // ctx.beginPath();
    
    // efface la page
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    ctx.closePath();
    
    // Draw le fond
    ctx.drawImage(background, 0, 0, cnv.width, cnv.height);

    // Draw la pluie
    for(let i=0; i<nbr_goutte; i++) {
        all_goutte[i].draw();   
        all_goutte[i].move();
    }
}
setInterval(update, 200);

