// graph.js

let currentGraphData = null;
const algorithmCodeDisplay = document.getElementById("algorithm-code");
const algorithmsCode = {
  DFS: `
  ALGORITHM 

1.First, create a stack with the total number of vertices in the graph.
2.Now, choose any vertex as the starting point of traversal, and push that vertex into the stack.
3.After that, push a non-visited vertex (adjacent to the vertex on the top of the stack) to the top of the stack.
4.Now, repeat steps 3 and 4 until no vertices are left to visit from the vertex on the stack's top.
5.If no vertex is left, go back and pop a vertex from the stack.
6.Repeat steps 2, 3, and 4 until the stack is empty.

CODE

#include <bits/stdc++.h>
using namespace std;

// Recursive function for DFS traversal
void DFSRec(vector<vector<int>> &adj, vector<bool> &visited, int s){
  
    visited[s] = true;

    // Print the current vertex
    cout << s << " ";

    // Recursively visit all adjacent vertices
    // that are not visited yet
    for (int i : adj[s])
        if (visited[i] == false)
            DFSRec(adj, visited, i);
}

// Main DFS function that initializes the visited array
// and call DFSRec
void DFS(vector<vector<int>> &adj, int s){
    vector<bool> visited(adj.size(), false);
    DFSRec(adj, visited, s);
}

// To add an edge in an undirected graph
void addEdge(vector<vector<int>> &adj, int s, int t){
    adj[s].push_back(t); 
    adj[t].push_back(s); 
}

int main(){
    int V = 5; 
    vector<vector<int>> adj(V);
  
    // Add edges
    vector<vector<int>> edges={{1, 2},{1, 0},{2, 0},{2, 3},{2, 4}};
    for (auto &e : edges)
        addEdge(adj, e[0], e[1]);

    int s = 1; // Starting vertex for DFS
    cout << "DFS from source: " << s << endl;
    DFS(adj, s); // Perform DFS starting from the source vertex

    return 0;
}

TIME COMPLEXITY

Average case time complexity: O(V + E)
Worst-case time complexity: O(V + E)
Best case time complexity: O(V + E)



  `,
  BFS: `
ALGORITHM

1.Start at a node, such as the root of a tree or an arbitrary node of a graph 
2.Mark the starting node as visited and add it to a queue 
3.In each iteration, remove a node from the queue and add it to the solution vector 
4.Visit all unvisited adjacent nodes of the removed node and add them to the queue 

CODE

// C++ program for BFS of an undirected graph
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

// BFS from given source s
void bfs(vector<vector<int>>& adj, int s) 
{
    // Create a queue for BFS
    queue<int> q;  
    
    // Initially mark all the vertices as not visited
    // When we push a vertex into the q, we mark it as 
    // visited
    vector<bool> visited(adj.size(), false);

    // Mark the source node as visited and 
    // enqueue it
    visited[s] = true;
    q.push(s);

    // Iterate over the queue
    while (!q.empty()) {
      
        // Dequeue a vertex from queue and print it
        int curr = q.front();
        q.pop();
        cout << curr << " ";

        // Get all adjacent vertices of the dequeued 
        // vertex curr If an adjacent has not been 
        // visited, mark it visited and enqueue it
        for (int x : adj[curr]) {
            if (!visited[x]) {
                visited[x] = true;
                q.push(x);
            }
        }
    }
}

// Function to add an edge to the graph
void addEdge(vector<vector<int>>& adj,
                          int u, int v) 
{
    adj[u].push_back(v);
    adj[v].push_back(u); // Undirected Graph
}

int main() 
{
    // Number of vertices in the graph
    int V = 5;

    // Adjacency list representation of the graph
    vector<vector<int>> adj(V);

    // Add edges to the graph
    addEdge(adj, 0, 1);
    addEdge(adj, 0, 2);
    addEdge(adj, 1, 3);
    addEdge(adj, 1, 4);
    addEdge(adj, 2, 4);

    // Perform BFS traversal starting from vertex 0
    cout << "BFS starting from 0 : \n";
    bfs(adj, 0);

    return 0;
}

TIME COMPLEXITY

Average case time complexity: O(V + E)
Worst-case time complexity: O(V + E)
Best case time complexity: O(V + E)


  `,
  Dijkstra: `

ALGORITHM

1. Mark the ending vertex
Set the ending vertex's distance to zero and mark it as the current vertex. 
2. Find the distances to the current vertex
Find all vertices that lead to the current vertex and calculate their distances to the end. 
3. Mark the current vertex as visited
Once all the neighbors of the current vertex are visited, mark the current vertex as visited. 
4. Repeat
Select the vertex with the smallest distance as the current vertex and repeat steps 2 and 3. 

CODE

// Program to find Dijkstra's shortest path using
// priority_queue in STL
#include <bits/stdc++.h>
using namespace std;
#define INF 0x3f3f3f3f

// iPair ==> Integer Pair
typedef pair<int, int> iPair;

// This class represents a directed graph using
// adjacency list representation
class Graph {
    int V; // No. of vertices

    // In a weighted graph, we need to store vertex
    // and weight pair for every edge
    list<pair<int, int> >* adj;

public:
    Graph(int V); // Constructor

    // function to add an edge to graph
    void addEdge(int u, int v, int w);

    // prints shortest path from s
    void shortestPath(int s);
};

// Allocates memory for adjacency list
Graph::Graph(int V)
{
    this->V = V;
    adj = new list<iPair>[V];
}

void Graph::addEdge(int u, int v, int w)
{
    adj[u].push_back(make_pair(v, w));
    adj[v].push_back(make_pair(u, w));
}

// Prints shortest paths from src to all other vertices
void Graph::shortestPath(int src)
{
    // Create a priority queue to store vertices that
    // are being preprocessed. This is weird syntax in C++.
    // Refer below link for details of this syntax
    // https://www.geeksforgeeks.org/implement-min-heap-using-stl/
    priority_queue<iPair, vector<iPair>, greater<iPair> >
        pq;

    // Create a vector for distances and initialize all
    // distances as infinite (INF)
    vector<int> dist(V, INF);

    // Insert source itself in priority queue and initialize
    // its distance as 0.
    pq.push(make_pair(0, src));
    dist[src] = 0;

    /* Looping till priority queue becomes empty (or all
    distances are not finalized) */
    while (!pq.empty()) {
        // The first vertex in pair is the minimum distance
        // vertex, extract it from priority queue.
        // vertex label is stored in second of pair (it
        // has to be done this way to keep the vertices
        // sorted distance (distance must be first item
        // in pair)
        int u = pq.top().second;
        pq.pop();

        // 'i' is used to get all adjacent vertices of a
        // vertex
        list<pair<int, int> >::iterator i;
        for (i = adj[u].begin(); i != adj[u].end(); ++i) {
            // Get vertex label and weight of current
            // adjacent of u.
            int v = (*i).first;
            int weight = (*i).second;

            // If there is shorted path to v through u.
            if (dist[v] > dist[u] + weight) {
                // Updating distance of v
                dist[v] = dist[u] + weight;
                pq.push(make_pair(dist[v], v));
            }
        }
    }

    // Print shortest distances stored in dist[]
    printf("Vertex Distance from Source\n");
    for (int i = 0; i < V; ++i)
        printf("%d \t\t %d\n", i, dist[i]);
}

// Driver program to test methods of graph class
int main()
{
    // create the graph given in above figure
    int V = 7;
    Graph g(V);

    // making above shown graph
    g.addEdge(0, 1, 2);
    g.addEdge(0, 2, 6);
    g.addEdge(1, 3, 5);
    g.addEdge(2, 3, 8);
    g.addEdge(3, 4, 10);
    g.addEdge(3, 5, 15);
    g.addEdge(4, 6, 2);
    g.addEdge(5, 6, 6);
    g.shortestPath(0);

    return 0;
}
TIME COMPLEXITY

Best case time complexity: O((V + E) log V)
Average and worst-case time complexity: O((V + E) log V)
Worst-case time complexity:O((V2) log V)
  `,
  Prim: `

ALGORITHM

Divide: Split the unsorted array into two sub-arrays of roughly equal size. 
Repeat: Continue to divide the sub-arrays until each sub-array has only one element. 
Merge: Compare the smallest elements from each sub-array and copy the smaller one to a temporary array. Move the pointer of the sub-array with the smaller element forward. 
Repeat: Repeat step 3 until one of the sub-arrays is empty. 
Copy: Copy the remaining elements from the non-empty sub-array to the temporary array. 
Copy back: Copy the elements back from the temporary array to the original list.

CODE

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    int leftArr[n1], rightArr[n2];

    for (int i = 0; i < n1; i++) leftArr[i] = arr[left + i];
    for (int j = 0; j < n2; j++) rightArr[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
}

void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

TIME COMPLEXITY

Best and Average time complexity: O(n log n)
Worst-case time complexity: O(n log n)



  `,
  Kruskal: `

  ALGORITHM

Step 1: Determine an arbitrary vertex as the starting vertex of the MST.
Step 2: Follow steps 3 to 5 till there are vertices that are not included in the MST (known as fringe vertex).
Step 3: Find edges connecting any tree vertex with the fringe vertices.
Step 4: Find the minimum among these edges.
Step 5: Add the chosen edge to the MST if it does not form any cycle.
Step 6: Return the MST and exit


CODE

 // A C++ program for Prim's Minimum
// Spanning Tree (MST) algorithm. The program is
// for adjacency matrix representation of the graph

#include <bits/stdc++.h>
using namespace std;

// Number of vertices in the graph
#define V 5

// A utility function to find the vertex with
// minimum key value, from the set of vertices
// not yet included in MST
int minKey(vector<int> &key, vector<bool> &mstSet) {
  
    // Initialize min value
    int min = INT_MAX, min_index;

    for (int v = 0; v < V; v++)
        if (mstSet[v] == false && key[v] < min)
            min = key[v], min_index = v;

    return min_index;
}

// A utility function to print the
// constructed MST stored in parent[]
void printMST(vector<int> &parent, vector<vector<int>> &graph) {
    cout << "Edge \tWeight\n";
    for (int i = 1; i < V; i++)
        cout << parent[i] << " - " << i << " \t"
             << graph[parent[i]][i] << " \n";
}

// Function to construct and print MST for
// a graph represented using adjacency
// matrix representation
void primMST(vector<vector<int>> &graph) {
  
    // Array to store constructed MST
    vector<int> parent(V);

    // Key values used to pick minimum weight edge in cut
    vector<int> key(V);

    // To represent set of vertices included in MST
    vector<bool> mstSet(V);

    // Initialize all keys as INFINITE
    for (int i = 0; i < V; i++)
        key[i] = INT_MAX, mstSet[i] = false;

    // Always include first 1st vertex in MST.
    // Make key 0 so that this vertex is picked as first
    // vertex.
    key[0] = 0;
  
    // First node is always root of MST
    parent[0] = -1;

    // The MST will have V vertices
    for (int count = 0; count < V - 1; count++) {
        
        // Pick the minimum key vertex from the
        // set of vertices not yet included in MST
        int u = minKey(key, mstSet);

        // Add the picked vertex to the MST Set
        mstSet[u] = true;

        // Update key value and parent index of
        // the adjacent vertices of the picked vertex.
        // Consider only those vertices which are not
        // yet included in MST
        for (int v = 0; v < V; v++)

            // graph[u][v] is non zero only for adjacent
            // vertices of m mstSet[v] is false for vertices
            // not yet included in MST Update the key only
            // if graph[u][v] is smaller than key[v]
            if (graph[u][v] && mstSet[v] == false
                && graph[u][v] < key[v])
                parent[v] = u, key[v] = graph[u][v];
    }

    // Print the constructed MST
    printMST(parent, graph);
}

// Driver's code
int main() {
      vector<vector<int>> graph = { { 0, 2, 0, 6, 0 },
                                { 2, 0, 3, 8, 5 },
                                { 0, 3, 0, 0, 7 },
                                { 6, 8, 0, 0, 9 },
                                { 0, 5, 7, 9, 0 } };

    // Print the solution
    primMST(graph);

    return 0;
}


TIME COMPLEXITY

Best case time complexity: O(E log V)
Average case time complexity:O((V + E) log V)
Worst-case time complexity: O((V + E) log V)

    `
  
};


// Event listener to display algorithm code
document.getElementById("graph-algorithm").addEventListener("change", (e) => {
  const selectedAlgorithm = e.target.value;
  algorithmCodeDisplay.textContent = algorithmsCode[selectedAlgorithm] || "Code not available.";
});


document.getElementById("visualizeBtn").addEventListener("click", visualizeGraph);

document.getElementById("startGraphBtn").addEventListener("click", () => {
  const algorithm = document.getElementById("graph-algorithm").value;
  if (!currentGraphData) {
    alert("Please visualize the graph first!");
    return;
  }

  const startVertexInput = document.getElementById("startVertexInput");
  const goalVertexInput = document.getElementById("goalVertexInput");

  let start = startVertexInput ? startVertexInput.value.trim() : null;
  let goal = goalVertexInput ? goalVertexInput.value.trim() : null;

  if (algorithm === "BFS") {
    if (!start || !goal) {
      alert("Please enter both start and goal vertices for BFS.");
      return;
    }
    runBFS(start, goal);
  } else if (algorithm === "DFS") {
    if (!start) {
      alert("Please enter a start vertex for DFS.");
      return;
    }
    runDFS(start, goal || null);
  } else if (algorithm === "Dijkstra") {
    if (!start || !goal) {
      alert("Please enter both start and goal vertices for Dijkstra's algorithm.");
      return;
    }
    runDijkstra(start, goal);
  } else if (algorithm === "Prim") {
    if (!start || !currentGraphData.vertices.includes(start)) {
      start = currentGraphData.vertices[0];
    }
    runPrim(start);
  } else if (algorithm === "Kruskal") {
    runKruskal();
  } else {
    alert("Selected algorithm not implemented.");
  }
});

function visualizeGraph() {
  const graphType = document.getElementById("graphType").value; 
  const numVertices = parseInt(document.getElementById("numVertices").value, 10);
  const edgesInput = document.getElementById("edgesInput").value.trim();

  const visualizer = document.getElementById("visualizer");
  visualizer.innerHTML = "";

  if (!numVertices || numVertices < 1) {
    alert("Please enter a valid number of vertices.");
    return;
  }

  if (!edgesInput) {
    alert("Please enter at least one edge.");
    return;
  }

  const edgeList = edgesInput.split(",")
    .map(e => e.trim())
    .filter(e => e.length > 0);

  let edges = [];
  const verticesSet = new Set();

  function parseEdge(edgeStr) {
    let start, end, weight = null;

    if (graphType === "directed") {
      if (edgeStr.includes("->")) {
        [start, end] = edgeStr.split("->").map(v => v.trim());
      } else if (edgeStr.includes("<-")) {
        let parts = edgeStr.split("<-").map(v => v.trim());
        start = parts[1];
        end = parts[0];
      } else if (edgeStr.includes("-")) {
        [start, end] = edgeStr.split("-").map(v => v.trim());
      } else {
        alert(`Invalid directed edge format: ${edgeStr}`);
        return null;
      }
    } else {
      // Undirected
      let parts;
      if (edgeStr.includes("->")) {
        parts = edgeStr.split("->").map(v => v.trim());
      } else if (edgeStr.includes("<-")) {
        parts = edgeStr.split("<-").map(v => v.trim()).reverse();
      } else if (edgeStr.includes("-")) {
        parts = edgeStr.split("-").map(v => v.trim());
      } else {
        alert(`Invalid undirected edge format: ${edgeStr}`);
        return null;
      }
      [start, end] = parts;
    }

    function extractWeight(vertexStr) {
      const match = vertexStr.match(/\((\d+)\)$/);
      if (match) {
        const w = parseInt(match[1], 10);
        vertexStr = vertexStr.replace(/\(\d+\)$/, "");
        return { vertexStr, w };
      }
      return { vertexStr, w: null };
    }

    let res = extractWeight(end);
    end = res.vertexStr;
    if (res.w !== null) weight = res.w;

    if (weight === null) {
      let startRes = extractWeight(start);
      start = startRes.vertexStr;
      if (startRes.w !== null) weight = startRes.w;
    }

    if (weight === null) {
      weight = 1;
    }

    return { start, end, weight };
  }

  for (let edge of edgeList) {
    const parsed = parseEdge(edge);
    if (!parsed) return;
    const { start, end, weight } = parsed;
    verticesSet.add(start);
    verticesSet.add(end);
    edges.push({ start, end, weight });
  }

  const vertices = Array.from(verticesSet);
  const width = visualizer.clientWidth || 800;
  const height = visualizer.clientHeight || 300;

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  visualizer.appendChild(svg);

  // Layout vertices in a circle
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 50;
  const angleStep = (2 * Math.PI) / vertices.length;

  const positions = {};
  vertices.forEach((v, i) => {
    const angle = i * angleStep;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    positions[v] = { x, y };
  });

  const edgeCountMap = {};
  const selfLoopCount = {};

  function getEdgeKey(a, b) {
    return a + "->" + b;
  }

  edges.forEach(({ start, end }) => {
    if (start === end) {
      if (!selfLoopCount[start]) selfLoopCount[start] = 0;
      selfLoopCount[start]++;
    } else {
      const key = getEdgeKey(start, end);
      if (!edgeCountMap[key]) edgeCountMap[key] = 0;
      edgeCountMap[key]++;
    }
  });

  function drawWeightText(x, y, weight) {
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("fill", "#000");
    text.setAttribute("font-size", "14");
    text.setAttribute("font-weight", "bold");
    text.textContent = weight;
    svg.appendChild(text);
  }

  const vertexElements = {};
  const edgeElements = [];

  // Draw edges
  edges.forEach(({ start, end, weight }) => {
    const startPos = positions[start];
    const endPos = positions[end];

    if (start === end) {
      // Self-loop
      let loopIndex = selfLoopCount[start];
      selfLoopCount[start]--;

      const loopRadius = 20;
      const loopOffset = 30 * (loopIndex - 1);
      const cx = startPos.x + loopOffset + 25;
      const cy = startPos.y;

      const pathData = [
        `M ${cx} ${cy - loopRadius}`,
        `A ${loopRadius} ${loopRadius} 0 1 1 ${cx} ${cy + loopRadius}`,
        `A ${loopRadius} ${loopRadius} 0 1 1 ${cx} ${cy - loopRadius}`
      ].join(" ");

      const loopPath = document.createElementNS(svgNS, "path");
      loopPath.setAttribute("d", pathData);
      loopPath.setAttribute("class", "edge-default");
      svg.appendChild(loopPath);

      let arrow = null;
      if (currentGraphData && currentGraphData.graphType === "directed") {
        const arrowSize = 10;
        const tipX = cx + arrowSize;
        const tipY = cy - loopRadius;
        const leftBaseX = cx;
        const leftBaseY = tipY - arrowSize / 2;
        const rightBaseX = cx;
        const rightBaseY = tipY + arrowSize / 2;

        arrow = document.createElementNS(svgNS, "polygon");
        arrow.setAttribute("points", `${leftBaseX},${leftBaseY} ${rightBaseX},${rightBaseY} ${tipX},${tipY}`);
        arrow.setAttribute("class", "arrow-default");
        svg.appendChild(arrow);

        if (weight != null) {
          drawWeightText(tipX + 15, tipY, weight);
        }
      } else {
        if (weight != null) {
          drawWeightText(cx, (cy - loopRadius) - 15, weight);
        }
      }

      edgeElements.push({ type: 'loop', loopPath, arrow, start, end });
    } else {
      // Normal edge
      const key = getEdgeKey(start, end);
      const count = edgeCountMap[key];
      const offsetDistance = 10 * (count - 1);
      const directionMultiplier = (count % 2 === 0) ? 1 : -1;
      const finalOffset = directionMultiplier * Math.ceil((count - 1) / 2) * offsetDistance;

      const dx = endPos.x - startPos.x;
      const dy = endPos.y - startPos.y;
      const length = Math.sqrt(dx * dx + dy * dy);

      const ux = dx / length;
      const uy = dy / length;

      const nx = -uy;
      const ny = ux;

      const startX = startPos.x + nx * finalOffset;
      const startY = startPos.y + ny * finalOffset;
      const endX = endPos.x + nx * finalOffset;
      const endY = endPos.y + ny * finalOffset;

      const ddx = endX - startX;
      const ddy = endY - startY;
      const newLen = Math.sqrt(ddx * ddx + ddy * ddy);
      const uux = ddx / newLen;
      const uuy = ddy / newLen;

      const line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", startX);
      line.setAttribute("y1", startY);
      line.setAttribute("x2", endX);
      line.setAttribute("y2", endY);
      line.setAttribute("class", "edge-default");
      svg.appendChild(line);

      const mx = (startX + endX) / 2;
      const my = (startY + endY) / 2;

      let arrow = null;
      if (currentGraphData && currentGraphData.graphType === "directed") {
        const arrowSize = 10;
        const halfBase = arrowSize / 2;
        const height = arrowSize;

        const tipX = mx + height * uux;
        const tipY = my + height * uuy;
        const leftBaseX = mx - halfBase * (-uuy);
        const leftBaseY = my - halfBase * (uux);
        const rightBaseX = mx + halfBase * (-uuy);
        const rightBaseY = my + halfBase * (uux);

        arrow = document.createElementNS(svgNS, "polygon");
        arrow.setAttribute("points", `${leftBaseX},${leftBaseY} ${rightBaseX},${rightBaseY} ${tipX},${tipY}`);
        arrow.setAttribute("class", "arrow-default");
        svg.appendChild(arrow);

        if (weight != null) {
          const weightOffset = 15;
          const wx = mx - uuy * weightOffset;
          const wy = my + uux * weightOffset;
          drawWeightText(wx, wy, weight);
        }

        edgeElements.push({ type: 'directed', line, arrow, start, end });
      } else {
        // Undirected
        if (weight != null) {
          const weightOffset = 15;
          const wx = mx - uuy * weightOffset;
          const wy = my + uux * weightOffset;
          drawWeightText(wx, wy, weight);
        }

        edgeElements.push({ type: 'undirected', line, start, end });
      }

      edgeCountMap[key]--;
    }
  });

  // Draw vertices
  vertices.forEach(v => {
    const { x, y } = positions[v];
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", 20);
    circle.setAttribute("class", "vertex-default");
    svg.appendChild(circle);

    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y + 5);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "#fff");
    text.setAttribute("font-size", "14");
    text.setAttribute("font-weight", "bold");
    text.textContent = v;
    svg.appendChild(text);

    vertexElements[v] = { circle, text };
  });

  const explanationText = document.getElementById("explanationText");
  explanationText.textContent = `
Graph with ${vertices.length} vertices and ${edges.length} edges has been visualized.
The graph is "${graphType.toUpperCase()}".
Now select an algorithm and start it to see a step-by-step visualization.
  `;

  currentGraphData = { vertices, edges, graphType, vertexElements, edgeElements, positions };
}

// Helper to reset all highlights before each step
function resetHighlights() {
  const { vertexElements, edgeElements } = currentGraphData;
  // Reset all vertices
  for (let v in vertexElements) {
    const { circle } = vertexElements[v];
    circle.setAttribute("class", "vertex-default dimmed");
  }

  // Reset all edges
  for (let e of edgeElements) {
    if (e.type === 'loop') {
      e.loopPath.setAttribute("class", "edge-default dimmed");
      if (e.arrow) e.arrow.setAttribute("class", "arrow-default dimmed");
    } else {
      e.line.setAttribute("class", "edge-default dimmed");
      if (e.arrow) e.arrow.setAttribute("class", "arrow-default dimmed");
    }
  }
}

// Highlight helpers
function highlightVertex(v, highlightClass) {
  const { vertexElements } = currentGraphData;
  if (vertexElements[v]) {
    const { circle } = vertexElements[v];
    circle.setAttribute("class", "vertex-default " + highlightClass);
  }
}

function highlightEdge(u, v, highlightClass) {
  const { edgeElements } = currentGraphData;
  for (let e of edgeElements) {
    if ((e.start === u && e.end === v) || (e.start === v && e.end === u)) {
      if (e.type === 'loop') {
        e.loopPath.setAttribute("class", "edge-default " + highlightClass);
        if (e.arrow) e.arrow.setAttribute("class", "arrow-default " + highlightClass);
      } else {
        e.line.setAttribute("class", "edge-default " + highlightClass);
        if (e.arrow) e.arrow.setAttribute("class", "arrow-default " + highlightClass);
      }
    }
  }
}

// Build adjacency list
function buildAdjList(vertices, edges, directed) {
  const adj = {};
  vertices.forEach(v => adj[v] = []);
  edges.forEach(({ start, end, weight }) => {
    adj[start].push({ vertex: end, weight: (weight == null ? 1 : weight) });
    if (!directed && start !== end) {
      adj[end].push({ vertex: start, weight: (weight == null ? 1 : weight) });
    }
  });
  return adj;
}

// BFS
function runBFS(start, goal) {
  const { vertices, edges, graphType } = currentGraphData;
  const directed = (graphType === "directed");
  const adj = buildAdjList(vertices, edges, directed);

  if (!vertices.includes(start)) {
    alert("Start vertex not found in the graph.");
    return;
  }
  if (!vertices.includes(goal)) {
    alert("Goal vertex not found in the graph.");
    return;
  }

  const queue = [start];
  const visited = new Set([start]);
  const parent = {};
  parent[start] = null;

  let steps = [];
  steps.push({ action: 'explain', text: `Starting BFS from vertex ${start}` });

  while (queue.length > 0) {
    const current = queue.shift();
    steps.push({ action: 'visit', vertex: current, text: `Visiting vertex ${current}` });

    if (current === goal) {
      // Found goal, reconstruct path
      steps.push({ action: 'explain', text: `Goal ${goal} found. Reconstructing path...` });
      const path = [];
      let node = goal;
      while (node != null) {
        path.push(node);
        node = parent[node];
      }
      path.reverse();

      steps.push({ action: 'final_path', path: path });
      break;
    }

    for (let { vertex: neigh } of adj[current]) {
      steps.push({ action: 'edge', u: current, v: neigh, text: `Checking edge (${current} -> ${neigh})` });
      if (!visited.has(neigh)) {
        visited.add(neigh);
        parent[neigh] = current;
        queue.push(neigh);
        steps.push({ action: 'enqueue', vertex: neigh, text: `Vertex ${neigh} discovered and added to queue` });
      }
    }
  }

  if (!visited.has(goal)) {
    steps.push({ action: 'no_path' });
  }

  runSteps(steps, "BFS", start, goal);
}

// DFS
function runDFS(start, goal) {
  const { vertices, edges, graphType } = currentGraphData;
  const directed = (graphType === "directed");
  const adj = buildAdjList(vertices, edges, directed);

  if (!vertices.includes(start)) {
    alert("Start vertex not found.");
    return;
  }
  if (goal && !vertices.includes(goal)) {
    alert("Goal vertex not found.");
    return;
  }

  const stack = [start];
  const visited = new Set([start]);
  const parent = {};
  parent[start] = null;

  let steps = [];
  steps.push({ action: 'explain', text: `Starting DFS from vertex ${start}` });

  let foundGoal = false;

  while (stack.length > 0) {
    const current = stack.pop();
    steps.push({ action: 'visit', vertex: current, text: `Visiting vertex ${current}` });

    if (goal && current === goal) {
      foundGoal = true;
      steps.push({ action: 'explain', text: `Goal ${goal} found. Reconstructing path...` });
      const path = [];
      let node = goal;
      while (node != null) {
        path.push(node);
        node = parent[node];
      }
      path.reverse();
      steps.push({ action: 'final_path', path: path });
      break;
    }

    for (let { vertex: neigh } of adj[current]) {
      steps.push({ action: 'edge', u: current, v: neigh, text: `Checking edge (${current} -> ${neigh})` });
      if (!visited.has(neigh)) {
        visited.add(neigh);
        parent[neigh] = current;
        stack.push(neigh);
        steps.push({ action: 'push', vertex: neigh, text: `Vertex ${neigh} discovered and added to stack` });
      }
    }
  }

  if (goal && !foundGoal) {
    steps.push({ action: 'no_path' });
  } else if (!goal) {
    steps.push({ action: 'explain', text: `DFS complete. All reachable vertices visited.` });
  }

  runSteps(steps, "DFS", start, goal);
}

// Dijkstra's
function runDijkstra(start, goal) {
  const { vertices, edges, graphType } = currentGraphData;
  const directed = (graphType === "directed");
  const adj = buildAdjList(vertices, edges, directed);

  if (!vertices.includes(start) || !vertices.includes(goal)) {
    alert("Start or goal vertex not found.");
    return;
  }

  const dist = {};
  const prev = {};
  for (let v of vertices) {
    dist[v] = Infinity;
    prev[v] = null;
  }
  dist[start] = 0;

  let steps = [];
  steps.push({ action: 'explain', text: `Starting Dijkstra from ${start} to find shortest path to ${goal}` });

  let Q = new Set(vertices);

  function extractMin() {
    let minV = null;
    let minD = Infinity;
    for (let v of Q) {
      if (dist[v] < minD) {
        minD = dist[v];
        minV = v;
      }
    }
    Q.delete(minV);
    return minV;
  }

  while (Q.size > 0) {
    let u = extractMin();
    if (u === null) break;
    steps.push({ action: 'visit', vertex: u, text: `Visiting vertex ${u} with current distance ${dist[u]}` });

    if (u === goal) {
      break;
    }

    for (let { vertex: w, weight } of adj[u]) {
      steps.push({ action: 'edge', u, v: w, text: `Checking edge (${u} -> ${w}) with weight ${weight}` });
      let alt = dist[u] + weight;
      if (alt < dist[w]) {
        dist[w] = alt;
        prev[w] = u;
        steps.push({ action: 'relax', u, v: w, dist: alt, text: `Relaxing edge, updating distance of ${w} to ${alt}` });
      }
    }
  }

  if (dist[goal] === Infinity) {
    steps.push({ action: 'no_path' });
  } else {
    steps.push({ action: 'explain', text: `Shortest path found. Distance = ${dist[goal]}. Reconstructing path...` });
    // Reconstruct path
    const path = [];
    let node = goal;
    while (node != null) {
      path.push(node);
      node = prev[node];
    }
    path.reverse();
    steps.push({ action: 'final_path', path: path, finalDist: dist[goal] });
  }

  runSteps(steps, "Dijkstra", start, goal, dist[goal]);
}

// Prim's Algorithm (MST)
function runPrim(start) {
  const { vertices, edges, graphType } = currentGraphData;
  const directed = (graphType === "directed");
  if (directed) {
    alert("Prim's algorithm is typically for undirected graphs. Proceeding anyway.");
  }
  const adj = buildAdjList(vertices, edges, false);

  if (!vertices.includes(start)) {
    alert("Start vertex not found. Using the first vertex as start.");
    start = vertices[0];
  }

  const key = {};
  const parent = {};
  const inMST = {};
  vertices.forEach(v => {
    key[v] = Infinity;
    parent[v] = null;
    inMST[v] = false;
  });
  key[start] = 0;

  let steps = [];
  steps.push({ action: 'explain', text: `Starting Prim's Algorithm from ${start}` });

  let count = vertices.length;
  while (count > 0) {
    let u = null;
    let minKey = Infinity;
    for (let v of vertices) {
      if (!inMST[v] && key[v] < minKey) {
        minKey = key[v];
        u = v;
      }
    }

    if (u === null) break;
    inMST[u] = true;
    steps.push({ action: 'visit', vertex: u, text: `Adding vertex ${u} to the MST` });
    count--;

    for (let { vertex: w, weight } of adj[u]) {
      steps.push({ action: 'edge', u, v: w, text: `Checking edge (${u} -> ${w}) with weight ${weight}` });
      if (!inMST[w] && weight < key[w]) {
        key[w] = weight;
        parent[w] = u;
        steps.push({ action: 'relax', u, v: w, dist: weight, text: `Updating MST connection for ${w} (weight = ${weight})` });
      }
    }
  }

  steps.push({ action: 'explain', text: `MST constructed. Highlighting MST edges...` });
  for (let v of vertices) {
    if (parent[v] != null) {
      steps.push({ action: 'final_path_edge', u: parent[v], v });
    }
  }

  runSteps(steps, "Prim", start, null);
}

// Kruskal's Algorithm (MST)
function runKruskal() {
  const { vertices, edges } = currentGraphData;

  let weightedEdges = edges.map(e => ({ ...e, weight: (e.weight == null ? 1 : e.weight) }));
  weightedEdges.sort((a, b) => a.weight - b.weight);

  const parent = {};
  const rank = {};
  for (let v of vertices) {
    parent[v] = v;
    rank[v] = 0;
  }

  function find(x) {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  function union(x, y) {
    let rx = find(x), ry = find(y);
    if (rx !== ry) {
      if (rank[rx] < rank[ry]) {
        parent[rx] = ry;
      } else if (rank[ry] < rank[rx]) {
        parent[ry] = rx;
      } else {
        parent[ry] = rx;
        rank[rx]++;
      }
      return true;
    }
    return false;
  }

  let steps = [];
  steps.push({ action: 'explain', text: `Starting Kruskal's Algorithm` });

  let mstEdgeChosen = false;

  for (let e of weightedEdges) {
    steps.push({ action: 'edge', u: e.start, v: e.end, text: `Checking edge (${e.start} - ${e.end}) weight = ${e.weight}` });
    if (union(e.start, e.end)) {
      mstEdgeChosen = true;
      steps.push({ action: 'final_path_edge', u: e.start, v: e.end });
    }
  }

  if (!mstEdgeChosen) {
    steps.push({ action: 'explain', text: `No MST edges chosen. The graph may be disconnected or has no edges suitable for MST.` });
  } else {
    steps.push({ action: 'explain', text: `MST constructed by Kruskal's algorithm.` });
  }

  runSteps(steps, "Kruskal", null, null);
}

// Step runner
function runSteps(steps, algorithm, start, goal, finalDist = null) {
  let index = 0;
  const explanationText = document.getElementById("explanationText");

  let finalPathToHighlight = null;
  let mstEdgesToHighlight = [];

  function setExplanation(text) {
    explanationText.textContent = text;
  }

  function stepAction(s) {
    resetHighlights();

    if (s.action === 'explain') {
      setExplanation(s.text);
      return;
    }

    switch (s.action) {
      case 'visit':
        highlightVertex(s.vertex, "vertex-visited");
        setExplanation(s.text);
        break;
      case 'edge':
        highlightEdge(s.u, s.v, "edge-current");
        highlightVertex(s.u, "vertex-current");
        highlightVertex(s.v, "vertex-current");
        setExplanation(s.text);
        break;
      case 'enqueue':
      case 'push':
        highlightVertex(s.vertex, "vertex-current");
        setExplanation(s.text);
        break;
      case 'relax':
        highlightEdge(s.u, s.v, "edge-relax");
        highlightVertex(s.u, "vertex-relax");
        highlightVertex(s.v, "vertex-relax");
        setExplanation(s.text);
        break;
      case 'final_path':
        // We'll highlight final path after steps complete
        finalPathToHighlight = s.path;
        setExplanation(s.text || "Final path found, highlighting soon...");
        break;
      case 'final_path_edge':
        // MST edges, collect them for final highlighting
        mstEdgesToHighlight.push({u: s.u, v: s.v});
        break;
      case 'no_path':
        alert(`No path found for ${algorithm}.`);
        setExplanation(`No path found.`);
        break;
    }
  }

  function runStep() {
    if (index < steps.length) {
      let s = steps[index];
      stepAction(s);
      index++;
      setTimeout(runStep, 1000);
    } else {
      // After all steps, we attempt final highlighting
      if (finalPathToHighlight && finalPathToHighlight.length > 1) {
        setExplanation("Highlighting the final path step-by-step...");
        highlightFinalPath(finalPathToHighlight);
      } else if (mstEdgesToHighlight.length > 0) {
        setExplanation("Highlighting the MST edges step-by-step...");
        highlightMSTEdges(mstEdgesToHighlight);
      } else {
        // If no final path or mst edges highlight needed
        updateFinalExplanation(algorithm, steps, start, goal, finalDist);
      }
    }
  }
  runStep();

  function highlightFinalPath(path) {
    let i = 0;
    function highlightNext() {
      resetHighlights();
      // Dim everything
      for (let v in currentGraphData.vertexElements) {
        currentGraphData.vertexElements[v].circle.setAttribute("class", "vertex-default dimmed");
      }
      for (let e of currentGraphData.edgeElements) {
        if (e.type === 'loop') {
          e.loopPath.setAttribute("class", "edge-default dimmed");
          if (e.arrow) e.arrow.setAttribute("class", "arrow-default dimmed");
        } else {
          e.line.setAttribute("class", "edge-default dimmed");
          if (e.arrow) e.arrow.setAttribute("class", "arrow-default dimmed");
        }
      }

      for (let k = 0; k <= i; k++) {
        highlightVertex(path[k], "vertex-final-path");
        if (k > 0) {
          highlightEdge(path[k-1], path[k], "edge-final-path");
        }
      }

      if (i < path.length - 1) {
        i++;
        setTimeout(highlightNext, 800);
      } else {
        // Done highlighting final path
        updateFinalExplanation(algorithm, steps, start, goal, finalDist);
      }
    }
    highlightNext();
  }

  function highlightMSTEdges(mstEdges) {
    let i = 0;
    function highlightNext() {
      resetHighlights();
      // Dim everything
      for (let v in currentGraphData.vertexElements) {
        currentGraphData.vertexElements[v].circle.setAttribute("class", "vertex-default dimmed");
      }
      for (let e of currentGraphData.edgeElements) {
        if (e.type === 'loop') {
          e.loopPath.setAttribute("class", "edge-default dimmed");
          if (e.arrow) e.arrow.setAttribute("class", "arrow-default dimmed");
        } else {
          e.line.setAttribute("class", "edge-default dimmed");
          if (e.arrow) e.arrow.setAttribute("class", "arrow-default dimmed");
        }
      }

      // Highlight all previously selected MST edges incrementally
      for (let k = 0; k <= i; k++) {
        highlightVertex(mstEdges[k].u, "vertex-final-path");
        highlightVertex(mstEdges[k].v, "vertex-final-path");
        highlightEdge(mstEdges[k].u, mstEdges[k].v, "edge-final-path");
      }

      if (i < mstEdges.length - 1) {
        i++;
        setTimeout(highlightNext, 800);
      } else {
        // Done highlighting MST
        updateFinalExplanation(algorithm, steps, start, goal, finalDist);
      }
    }

    highlightNext();
  }

  function updateFinalExplanation(algorithm, steps, start, goal, finalDist) {
    let explanation = "";
    switch (algorithm) {
      case "BFS":
        explanation += "Breadth-First Search (BFS) explores neighbors in layers, guaranteeing shortest paths in unweighted graphs.\n";
        if (steps.some(s => s.action === 'no_path')) {
          explanation += `No path found from ${start} to ${goal}.`;
        } else {
          explanation += `A shortest path from ${start} to ${goal} was found and is highlighted in red.`;
        }
        break;
      case "DFS":
        explanation += "Depth-First Search (DFS) explores deep along a path before backtracking. It does not guarantee shortest paths.\n";
        if (goal) {
          if (steps.some(s => s.action === 'no_path')) {
            explanation += `No path found from ${start} to ${goal}.`;
          } else {
            explanation += `A path from ${start} to ${goal} was found and is highlighted in red.`;
          }
        } else {
          explanation += `DFS visited all reachable vertices starting from ${start}.`;
        }
        break;
      case "Dijkstra":
        explanation += "Dijkstra's Algorithm finds the shortest path in weighted graphs with non-negative weights.\n";
        if (steps.some(s => s.action === 'no_path')) {
          explanation += `No path found from ${start} to ${goal}.`;
        } else {
          explanation += `The shortest path from ${start} to ${goal} was found with total distance = ${finalDist}. Red edges show the shortest path.`;
        }
        break;
      case "Prim":
        explanation += "Prim's Algorithm constructs a Minimum Spanning Tree by adding edges with the smallest weight that expands the tree.\n";
        explanation += `The MST edges are highlighted in red.`;
        break;
      case "Kruskal":
        explanation += "Kruskal's Algorithm builds the MST by selecting edges in order of increasing weight, avoiding cycles.\n";
        if (!steps.some(s => s.action === 'final_path_edge')) {
          explanation += "No MST edges were selected, possibly due to a disconnected graph or no suitable edges.";
        } else {
          explanation += "The MST edges are highlighted in red.";
        }
        break;
      default:
        explanation += "Algorithm steps are complete.";
        break;
    }

    setExplanation(explanation);
  }
}
