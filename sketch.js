let hexagon // = new Hexagon();;
let player = 1,
  ai = 2,
  turn = 1,
  finished = 0,
  source = -1,
  target = -1;
let count = 0;

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

  let bestScore = {
    val: -Infinity,
    depth: Infinity
  };
  let move;
  for (let i = 0; i < hexagon.edges.length; i++) {
    for (let j = i + 1; j < hexagon.edges.length; j++) {
      if (hexagon.edges[i][j] == 0) {
        hexagon.addEdge(i, j, ai);
        let score = hexagon.triangleIsformed(i) ? {
          val: -1,
          depth: 1
        } : miniMax(1, bestScore, {
          val: Infinity,
          depth: Infinity
        }, false)
        hexagon.removeEdge(i, j);
        if (score.val > bestScore.val) {
          bestScore = score;
          move = {
            i,
            j
          };

        }
        if (bestScore.val == score.val) {
          if (score.val < 0 && score.depth > bestScore.depth) {
            bestScore = score;
            move = {
              i,
              j
            };
          } else if (score.val > 0 && score.depth < bestScore.depth) {
            bestScore = score;
            move = {
              i,
              j
            };
          }
        }
      }
      console.log(bestScore, i, j)
      if (bestScore.val > 0) break;
    }
    if (bestScore.val > 0) break;
  }
  hexagon.addEdge(move.i, move.j, ai);
  if (hexagon.triangleIsformed(move.i))
    turn = finished;
  else
    turn = player;
}

function miniMax(depth, alpha, beta, isMaximizing) {
  count++;
  let bestScore;
  if (isMaximizing) {
    bestScore = {
      val: -Infinity,
      depth: Infinity
    };
    for (let i = 0; i < hexagon.edges.length; i++) {
      for (let j = i + 1; j < hexagon.edges[i].length; j++) {
        if (hexagon.edges[i][j] == 0) {
          hexagon.addEdge(i, j, ai);
          let score = hexagon.triangleIsformed(i) ? {
            val: -1,
            depth
          } : miniMax(depth + 1, alpha, beta, false)
          hexagon.removeEdge(i, j);
          if (score.val > bestScore.val) {
            bestScore = score;
          } else if (score.val == bestScore.val) {
            if (score.val < 0 && score.depth > bestScore.depth) {
              bestScore = score;
            } else if (score.val > 0 && score.depth < bestScore.depth) {
              bestScore = score;
            }
          }
          if (score.val > alpha.val) {
            alpha = score;
          } else if (score.val == alpha.val) {
            if (score.val < 0 && score.depth > alpha.depth || score.val > 0 && score.depth < alpha.depth)
              alpha = score
          }
          if (beta.val <= alpha.val || bestScore.val > 0)
            return bestScore;
        }


      }

    }
  } else {
    bestScore = {
      val: Infinity,
      depth
    };
    for (let i = 0; i < hexagon.edges.length; i++) {
      for (let j = i + 1; j < hexagon.edges.length; j++) {
        if (hexagon.edges[i][j] == 0) {
          hexagon.addEdge(i, j, player);
          let score = hexagon.triangleIsformed(i) ? {
            val: 1,
            depth
          } : miniMax(depth + 1, alpha, beta, true)
          hexagon.removeEdge(i, j);
          if (score.val < bestScore.val) {
            bestScore = score;
          } else if (score.val == bestScore) {
            if (score.val > 0 && score.depth > bestScore.depth || score.val < 0 && score.depth < bestScore.depth)
              bestScore = score;
          }
          if (score.val < beta.val) {
            beta = score;
          } else if (score.val == beta.val) {
            if (score.val > 0 && score.depth > beta.depth || score.val < 0 && score.depth < beta.depth)
              beta = score;
          }
          if (beta.val <= alpha.val || bestScore < 0)
            return bestScore;
        }
      }

    }

  }
  return bestScore;
}