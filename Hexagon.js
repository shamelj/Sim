let inintialColor = '#eef5a6',
    playerColor = 'blue',
    aiColor = 'red';
class Hexagon {
    constructor() {
        this.vertices = [];
        this.edges = [];
        this.initializeVertices();
        this.initializeEdges();
    }
    initializeVertices() {
        const margin = 10
        // added in clockwise order starting from top
        this.vertices.push(new Vertex(width / 2, margin)); // top
        this.vertices.push(new Vertex(width - margin, height / 3.0)); // top right
        this.vertices.push(new Vertex(width - margin, height * 2 / 3.0)); // bottom right
        this.vertices.push(new Vertex(width / 2, height - margin)); // bottom
        this.vertices.push(new Vertex(margin, height * 2 / 3.0)); // bottom left
        this.vertices.push(new Vertex(margin, height / 3.0)); // top left
        this.renderVertices();
    }
    renderVertices() {
        for (let vertex of this.vertices)
            vertex.show();
    }
    initializeEdges() {
        for (let i = 0; i < 6; i++) {
            this.edges.push([0, 0, 0, 0, 0, 0]);
        }
        this.showEdges()
    }
    showEdges() {
        for (let i = 0; i < this.edges.length; i++)
            for (let j = i + 1; j < this.edges[i].length; j++)
                this.showEdge(i, j, inintialColor);

    }
    showEdge(i, j, color) {
        let vertex1 = {
            x: this.vertices[i].x,
            y: this.vertices[i].y
        };
        let vertex2 = {
            x: this.vertices[j].x,
            y: this.vertices[j].y
        };
        strokeWeight(1)
        stroke(color)
        line(vertex1.x, vertex1.y, vertex2.x, vertex2.y)
    }
    getVertex(x, y) {
        for (let i = 0; i < this.vertices.length; i++)
            if (dist(x, y, this.vertices[i].x, this.vertices[i].y) <= 10)
                return i;
        return -1;
    }
    addEdge(src, dest, submitter) {
        if (this.edges[src][dest] != 0 || this.edges[dest][src] != 0)
            return false;
        this.edges[src][dest] = submitter;
        this.edges[dest][src] = submitter;
        //this.showEdge(src, dest, submitter == ai ? aiColor : playerColor)
        return true;
    }
    removeEdge(src, dest) {
        this.edges[src][dest] = 0;
        this.edges[dest][src] = 0;
        this.showEdge(src, dest, inintialColor)

    }
    triangleIsformed(vertex) {
        const n = this.edges[vertex].length
        for (let i = 0; i < n; i++) {
            if (i == vertex || this.edges[vertex][i] == 0) continue;
            for (let j = i + 1; j < n; j++)
                if (this.edges[vertex][j] == this.edges[vertex][i] && this.edges[i][j] == this.edges[vertex][i]) {
                    //console.log(this.edges, this.edges[vertex][i])
                    return true;
                }
        }
        return false;
    }
}