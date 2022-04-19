class Vertex {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    show() {
        strokeWeight(width*0.03)
        stroke('#6820ab')
        point(this.x,this.y);
    }
}