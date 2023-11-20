// python3 -m http.server 8000
// Math.random() * (max - min) + min;
let cnv = document.getElementById('myCanvas');
let ctx = cnv.getContext('2d');
ctx.imageSmoothingEnabled= false;

let all_img = [];
let img_x = 16*7;
let img_y = 32*4;
let pos_x = 0 ; 
let pos_y = cnv.height - img_y; 

let background = new Image();
background.src = "./assets/images/background.png"

let goutte = new Image();
goutte.src = "./assets/images/goutte.png"

let nuage = new Image();
nuage.src = "./assets/images/nuage.png"

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
            this.y = Math.random() * 20;
            this.x = Math.random() * cnv.width;
        }
        if (this.img.alpha >= 256){
            this.img.alpha = 0;
        }
        this.img.alpha += 1;
        this.y = this.y + 10;
    }
    draw(){
        ctx.drawImage(this.img, this.x, this.y, this.dx, this.dy);
    }
    
}

class Nuage{
    constructor(img, x, y, dx, dy){
        this.img = img;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.img.alpha = 0.0;
        this.alph = 0.1;
    }

    move(){
        if (this.x < -(this.dx)){
            this.x = cnv.width;
            this.y = (Math.random() * 180-150 + 180 );
        }
        if (this.img.alpha >= 1.0){ 
            this.img.alpha = 1.0
            this.alph = -this.alph
        }
        this.img.alpha += this.alph;
        this.x = this.x - 10;
    }
    draw(){
        ctx.globalAlpha = this.img.alpha;
        ctx.drawImage(this.img, this.x, this.y, this.dx, this.dy);
        ctx.globalAlpha = 1.0; 
    }
    
}

for(let i = 0; i < 8; i += 1) {
    let img = new Image();
    img.src = "./assets/images/walk"+i.toString()+".png";
    // img.onload = function() { ctx.drawImage(img, 16*4*i, 0, 16*4, 32*4);};
    all_img.push(img);
}
let img_right_id = 0;

let all_goutte = [];
let nbr_goutte = 200
for(let i=0; i<nbr_goutte; i++) {
    all_goutte[i] = new Goutte(goutte, Math.random() * cnv.width, Math.random() * cnv.height, 2, 5);
}

let all_nuage = [];
let nbr_nuage = 20
for(let i=0; i<nbr_nuage; i++) {
    all_nuage[i] = new Nuage(nuage, Math.random() * cnv.width, (Math.random() * 180-150 + 180), Math.random() * (180-50)+180, 50);
}

function update() {
    // ctx.clearRect(0, 0, cnv.width, cnv.height);
    // ctx.beginPath();
    img_right_id += 1;

    // gestion de position x
    pos_x += 10;
    if (pos_x > cnv.width) { pos_x = -img_x; }
    
    // Boucle notre image
    if(img_right_id == 4) { img_right_id = 0; }
    
    // efface la page
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    ctx.closePath();
    
    // Draw le fond
    ctx.drawImage(background, 0, 0, cnv.width, cnv.height);
    
    // Draw notre personnage
    ctx.drawImage(all_img[img_right_id], pos_x, pos_y, img_x, img_y);
    
    
    // Draw la pluie
    for(let i=0; i<nbr_goutte; i++) {
        all_goutte[i].draw();   
        all_goutte[i].move();
    }
    // Draw effet nuage
    for(let i=0; i<nbr_nuage; i++) {
        all_nuage[i].draw(); 
        all_nuage[i].move();
    }
    ctx.globalAlpha = 1;
}
setInterval(update, 100);

