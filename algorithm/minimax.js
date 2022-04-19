let maxDepth = 8;

function mouseClicked() {
    let vertex = hexagon.getVertex(mouseX, mouseY);
    if (vertex == -1 || turn == finished)
        return;
    playerTurn(vertex);
}

function playerTurn(vertex) {
    if (source == -1 || vertex == source) {
        source = vertex;
        return;
    }
    target = vertex;
    let isAdded = hexagon.addEdge(source, target, player);

    if (isAdded) {
        round++;
        hexagon.showEdge(source, target, playerColor);
        if (hexagon.triangleIsformed(target))
            turn = finished;
        else
            turn = ai;

    }
    source = -1;
    target = -1;

}

function roundLessThanfour() {
    if (round <= 3) {
        let i = 0,
            j = int(random(1, 6))
        while (!hexagon.addEdge(i, j, ai)) j = int(random(1, 6));
        hexagon.showEdge(i, j, aiColor);
        round++;
        turn = player;
        return true;
    } else if (round == 4) { // for safety considerations the depth is limited for mobile users
        maxDepth = 10;
    } else maxDepth = 15;
    return false;
}

function aiTurn() {
    if (roundLessThanfour())
        return;
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
                bestScore = getBestScoreForAi(score, bestScore);
                move = getBestMove(move, score, bestScore, i, j);
            }
            console.log(bestScore, i, j)
            if (bestScore.val > 0) break;
        }
        if (bestScore.val > 0) break;
    }
    hexagon.addEdge(move.i, move.j, ai);
    hexagon.showEdge(move.i, move.j, aiColor);
    if (hexagon.triangleIsformed(move.i))
        turn = finished;
    else
        turn = player;
    round++;
}

function miniMax(depth, alpha, beta, isMaximizing) {
    let bestScore;
    if (isMaximizing) {
        if (depth == maxDepth)
            return {
                val: Infinity,
                depth
            };
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
                    bestScore = getBestScoreForAi(score, bestScore);
                    alpha = getBestScoreForAi(score, alpha);
                    if (beta.val <= alpha.val || bestScore.val > 0)
                        return bestScore;
                }
            }
        }
    } else {
        if (depth == maxDepth)
            return {
                val: -Infinity,
                depth
            };
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
                    bestScore = getBestScoreForPlayer(score, bestScore);
                    beta = getBestScoreForPlayer(score, beta);
                    if (beta.val <= alpha.val || bestScore < 0)
                        return bestScore;
                }
            }

        }

    }
    return bestScore;
}

function getBestScoreForAi(score, bestScore) {
    if (score.val > bestScore.val) {
        bestScore = score;
    }
    if (bestScore.val == score.val) {
        if (score.val < 0 && score.depth > bestScore.depth) {
            bestScore = score;
        } else if (score.val > 0 && score.depth < bestScore.depth) {
            bestScore = score;
        }
    }
    return bestScore;
}

function getBestMove(move, score, bestScore, i, j) {
    if (bestScore.val == score.val && bestScore.depth == score.depth)
        return {
            i,
            j
        };
    return move;
}

function getBestScoreForPlayer(score, bestScore) {
    if (score.val < bestScore.val) {
        bestScore = score;
    } else if (score.val == bestScore) {
        if (score.val > 0 && score.depth > bestScore.depth || score.val < 0 && score.depth < bestScore.depth)
            bestScore = score;
    }
    return bestScore;
}