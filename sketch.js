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
  let playerFirstBtn = createButton('Player').parent('row1').class('col-3');
  playerFirstBtn.mouseClicked(()=>reset(player));
  let AiFirstBtn = createButton('Bot').parent('row1').class('col-3');
  AiFirstBtn.mouseClicked(()=>{reset(ai)});
  let difficultyRadio = createRadio().parent('row2');
  difficultyRadio.option(15,'Hard');
  difficultyRadio.option(8,'Medium');
  difficultyRadio.selected('8')
  difficultyRadio.mouseClicked(()=>maxDepth = int(difficultyRadio.value()))

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