const f1 = (a,b) => a+b;

function f2(a,b) {
    return a+b;
}

let B = [[1,2,3,4,5], [1,2,3,4,5,6,7,8], [1,2,3]];
let B_size = B.map(B => B.length);

let b1 = Math.floor(Math.PI);
let b2 = Math.PI|0;

let x = 0;
let y = 0;
function move(dx, dy) {
    return [x+dx,y+dy];
}
function update() {
    [x,y] = move(1,1);
// ...
}
setInterval(update, 200);

class Pos {
    constructor(nx = 0, ny = 0) {
    this.x = nx;
    this.y = ny;
    }
    move(dx,dy) {
        this.x += dx;
        this.y += dy;
    }
}
let p = new Pos();
function update() {
    p.move(1,1);
    // ...
    }
setInterval(update, 200);

class Pt2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
};
class Pt3D extends Pt2D {
    constructor(x = 0, y = 0, z = 0) {
        super(x, y);
        this.z = z;
    }
};

class A {
    static f(x, y, z) {
    return Math.sqrt(x*x+y*y+z*z);
    }
};

let a = A.f(1.0,2.0,3.0);

