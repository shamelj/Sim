let hexagon // = new Hexagon();;
let player = 1,
  ai = 2,
  turn = 1,
  finished = 0,
  source = -1,
  target = -1;


function setup() {
  let side = min(windowHeight, windowWidth) * 0.9
  createCanvas(side, side);
  background(220);
  hexagon = new Hexagon();
  hexagon.addEdge(0, 1, ai);
}

function draw() {
  //if (turn == ai)
   // aiTurn()




}

function playerTurn(vertex) {
  if (source == -1 || vertex == source) {
    source = vertex;
    return;
  }
  target = vertex;
  let isAdded = hexagon.addEdge(source, target, player);
  if (hexagon.triangleIsformed(target))
    turn = finished;
  else
    turn = ai;
  source = -1;
  target = -1;
}

function mousePressed() {
  let vertex = hexagon.getVertex(mouseX, mouseY);
  if (vertex == -1 || turn == finished)
    return;
  playerTurn(vertex);
  if (turn == player || turn == finished)
    return;
  aiTurn();


}

function aiTurn() {

  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < hexagon.edges.length; i++) {
    for (let j = i + 1; j < hexagon.edges.length; j++) {
      if (hexagon.edges[i][j] == 0) {
        hexagon.addEdge(i, j, ai);
        let score = hexagon.triangleIsformed(i) ? -1 : miniMax(20, bestScore, Infinity, false)
        hexagon.removeEdge(i, j);
        if (score > bestScore) {
          bestScore = score;
          move = {
            i,
            j
          };

        }
      }
      console.log(bestScore,i,j)
      if (bestScore == 1) break;
    }
    if (bestScore == 1) break;
  }
  hexagon.addEdge(move.i, move.j, ai);
  if (hexagon.triangleIsformed(move.i))
    turn = finished;
  else
    turn = player;
}

function miniMax(depth, alpha, beta, isMaximizing) {
  let bestScore;
  if (isMaximizing) {
    if (depth == 0) return Infinity;
    bestScore = -Infinity;
    for (let i = 0; i < hexagon.edges.length; i++) {
      for (let j = i + 1; j < hexagon.edges[i].length; j++) {
        if (hexagon.edges[i][j] == 0) {
          hexagon.addEdge(i, j, ai);
          let score = hexagon.triangleIsformed(i) ? -1 : miniMax(depth - 1, alpha, beta, false)
          hexagon.removeEdge(i, j);
          bestScore = max(bestScore, score);
          alpha = max(alpha, score)
          if (beta <= alpha || bestScore >0)
            return bestScore;
        }
        

      }

    }
  } else {
    if (depth == 0) return -Infinity;
    bestScore = Infinity;
    for (let i = 0; i < hexagon.edges.length; i++) {
      for (let j = i + 1; j < hexagon.edges.length; j++) {
        if (hexagon.edges[i][j] == 0) {
          hexagon.addEdge(i, j, player);
          let score = hexagon.triangleIsformed(i) ? 1 : miniMax(depth - 1, alpha, beta, true)
          hexagon.removeEdge(i, j);
          bestScore = min(bestScore, score);
          beta = min(beta, score)
          if (beta <= alpha || bestScore <0)
            return bestScore;
        }
      }

    }

  }
  return bestScore;
}