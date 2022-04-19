let hexagon // = new Hexagon();;
let player = 1,
  ai = 2,
  turn,
  finished = 0,
  source = -1,
  target = -1,
  round;

function setup() {
  let side = min(windowHeight, windowWidth) * 0.8
  createCanvas(side, side).parent('canvas');
  reset(player);
  let playerFirstBtn = createButton('Player start first').parent('buttons');
  //playerFirstBtn.style('display: block;margin:10px auto')
  playerFirstBtn.mouseClicked(()=>reset(player));
  let AiFirstBtn = createButton('Bot start first').parent('buttons');
  //AiFirstBtn.style('display: block;margin:10px auto')
  AiFirstBtn.mouseClicked(()=>{reset(ai)});
 

}

function reset(firstTurn) {
  round = 1;
  turn = firstTurn;
  source = -1;
  target = -1;
  background(220);
  hexagon = new Hexagon();
}

function draw() {
  if (turn == ai)
    aiTurn()
  if (turn == finished){
    textSize(30)
    noStroke()
  text('Game Over',10,50)
}
}