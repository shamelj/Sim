class Vertex {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    show() {
        strokeWeight(10)
        stroke('black')
        point(this.x,this.y);
    }
}