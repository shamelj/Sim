let hexagon;
let player = 0,
  ai = 1,
  turn = 0,
  source = -1,
  target = -1;

function setup() {
  let side = min(windowHeight, windowWidth) * 0.9
  createCanvas(side, side);
  background(220);
  hexagon = new Hexagon();
}


function draw() {





}

function mousePressed() {
  let vertex = hexagon.getVertex(mouseX, mouseY);
  if (vertex == -1)
    return;
  if (source==-1){
    source= vertex;
    return;
  }
  target = vertex;
  let isAdded = hexagon.addEdge(source,target);
  if (!isAdded){
    source =-1
    target=-1;
  }

}