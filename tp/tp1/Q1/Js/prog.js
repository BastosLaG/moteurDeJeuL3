// python3 -m http.server 8000
// Math.random() * (max - min) + min;
let cnv = document.getElementById('myCanvas');
let ctx = cnv.getContext('2d');
ctx.imageSmoothingEnabled= false;

let img_names = ["walk0","walk1", "walk2","walk3"];
let all_img = [];
let img_x = 16*7;
let img_y = 32*4;
let pos_x = 0 ; 
let pos_y = cnv.height - img_y; 

for(let i = 0; i < 4; i += 1) {
    let img = new Image();
    img.src = "./assets/images/"+img_names[i]+".png";
    // img.onload = function() { ctx.drawImage(img, 16*4*i, 0, 16*4, 32*4);};
    all_img.push(img);
}
let img_right_id = 3;


function update() {
    // ctx.clearRect(0, 0, cnv.width, cnv.height);
    // ctx.beginPath();
    img_right_id += 1;

    // Boucle notre image
    if(img_right_id == 4) { img_right_id = 0; }
    
    // efface la page
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    ctx.closePath();
    
    // Draw notre personnage
    ctx.drawImage(all_img[img_right_id], pos_x, pos_y, img_x, img_y);
}
setInterval(update, 200);

