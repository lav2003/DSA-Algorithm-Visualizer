const problemSelect = document.getElementById("problemType");
const visualizeBtn = document.getElementById("visualizeBtn");
const startAlgorithmBtn = document.getElementById("startAlgorithmBtn");
const explanation = document.getElementById("explanationText");
const extraTables = document.getElementById("extraTables");

let currentProblemData = null; 
let steps = [];
let stepIndex = 0;

problemSelect.addEventListener("change", updateProblemVisibility);
visualizeBtn.addEventListener("click", visualizeProblem);
startAlgorithmBtn.addEventListener("click", startAlgorithm);

updateProblemVisibility();

/** Update which input blocks are visible based on selected problem. */
function updateProblemVisibility() {
  const problem = problemSelect.value;

  // Hide all input blocks
  document.querySelectorAll('.problem-input-block').forEach(div => div.style.display = 'none');
  
  // Hide all visualizers
  hideAllVisualizers();

  // Show relevant input block
  if (problem === 'tsp') {
    document.getElementById('tsp-inputs').style.display = 'block';
    explanation.textContent = 'Traveling Salesman Problem selected. Enter number of cities and algorithm, then visualize.';
  } else if (problem === 'hanoi') {
    document.getElementById('hanoi-inputs').style.display = 'block';
    explanation.textContent = 'Tower of Hanoi selected. Enter number of disks, then visualize.';
  } else if (problem === 'knapsack') {
    document.getElementById('knapsack-inputs').style.display = 'block';
    explanation.textContent = 'Knapsack Problem selected. Enter items and capacity, then visualize.';
  }

  currentProblemData = null;
  extraTables.innerHTML = '';
}

/** Hide all visualization areas */
function hideAllVisualizers() {
  document.getElementById("tspVisualizer").style.display = 'none';
  document.getElementById("hanoiVisualizer").style.display = 'none';
  document.getElementById("knapsackVisualizer").style.display = 'none';
}

/** Visualize the selected problem setup */
function visualizeProblem() {
  const problem = problemSelect.value;
  
  explanation.textContent = '';
  currentProblemData = null;
  steps = [];
  stepIndex = 0;
  extraTables.innerHTML = '';

  if (problem === 'tsp') {
    visualizeTSP();
    explanation.textContent = "TSP visualization ready. Click 'Start Algorithm' to run the solution steps.";
  } else if (problem === 'hanoi') {
    visualizeHanoi();
    explanation.textContent = "Tower of Hanoi visualization ready. Click 'Start Algorithm' to run the solution steps.";
  } else if (problem === 'knapsack') {
    visualizeKnapsack();
    explanation.textContent = "Knapsack DP table ready. Click 'Start Algorithm' to run the solution steps.";
  }
}

/** Start the algorithm steps automatically with slow transitions */
function startAlgorithm() {
  if (!currentProblemData) {
    alert("Please visualize the problem first!");
    return;
  }

  steps = [];
  stepIndex = 0;
  const problem = currentProblemData.problem;

  if (problem === 'tsp') {
    steps = getTspSteps();
  } else if (problem === 'hanoi') {
    steps = getHanoiSteps();
  } else if (problem === 'knapsack') {
    steps = getKnapsackSteps();
  }

  if (steps.length === 0) {
    explanation.textContent = "No steps generated for this configuration.";
    return;
  }

  explanation.textContent = "Running steps automatically. Please watch the visualization...";
  runSteps(steps);
}

/**
 * Runs the steps array automatically, one step per second.
 */
function runSteps(steps) {
  function doStep() {
    if (stepIndex >= steps.length) {
      explanation.textContent += "\nAll steps completed.";
      // If it's knapsack, show the final table
      if (currentProblemData.problem === 'knapsack') {
        showKnapsackResult();
      }
      return;
    }
    const s = steps[stepIndex];
    explanation.textContent = s.text || '';
    performStepAction(s);
    stepIndex++;
    setTimeout(doStep, 1000); // 1 second per step
  }
  doStep();
}

/****************************
 * VISUALIZATION FUNCTIONS  *
 ****************************/

/** TSP Visualization */
function visualizeTSP() {
  const numCities = parseInt(document.getElementById('tspCities').value,10);
  const svg = document.getElementById('tspVisualizer');
  svg.style.display = 'block';
  svg.innerHTML = '';
  const width = 800, height = 500;
  const centerX = width/2, centerY = height/2;
  const radius = Math.min(width,height)/2 - 50;

  let cities = [];
  for (let i=0; i<numCities; i++) {
    const angle = (2*Math.PI*i)/numCities;
    const x = centerX + radius*Math.cos(angle);
    const y = centerY + radius*Math.sin(angle);
    cities.push({id:i+1, x, y});
  }

  const svgns = "http://www.w3.org/2000/svg";
  // Draw cities as circles
  cities.forEach(c => {
    const circle = document.createElementNS(svgns,'circle');
    circle.setAttribute('cx', c.x);
    circle.setAttribute('cy', c.y);
    circle.setAttribute('r', 15);
    circle.setAttribute('fill','#4CAF50');
    circle.setAttribute('stroke','#333');
    circle.setAttribute('stroke-width','1');
    svg.appendChild(circle);

    const text = document.createElementNS(svgns,'text');
    text.setAttribute('x', c.x);
    text.setAttribute('y', c.y+5);
    text.setAttribute('text-anchor','middle');
    text.setAttribute('fill','#fff');
    text.setAttribute('font-size','14');
    text.textContent = c.id;
    svg.appendChild(text);
  });

  currentProblemData = { problem:'tsp', cities };
}

/** Tower of Hanoi Visualization */
function visualizeHanoi() {
  const numDisks = parseInt(document.getElementById('hanoiDisks').value,10);
  const container = document.getElementById('hanoiVisualizer');
  container.style.display = 'block';
  container.innerHTML = '';

  const pegWidth = 10, pegHeight = 150;
  const baseY = 300;
  const pegPositions = [150, 400, 650]; // positions for A,B,C

  // Draw 3 pegs
  pegPositions.forEach((x, index) => {
    const peg = document.createElement('div');
    peg.classList.add('peg');
    peg.style.left = (x - pegWidth/2) + 'px';
    peg.style.height = pegHeight + 'px';
    container.appendChild(peg);
  });

  // Create disks: largest at bottom
  let disks = [];
  for (let i = 0; i < numDisks; i++) {
    const diskNumber = numDisks - i;
    const disk = document.createElement('div');
    disk.classList.add('disk');
    disk.textContent = diskNumber;
    disk.style.width = (80 - i*10) + 'px';
    disk.style.left = (pegPositions[0] - parseInt(disk.style.width)/2) + 'px';
    disk.style.top = (baseY - (i+1)*22) + 'px';
    container.appendChild(disk);
    disks.push(disk);
  }
  const pegs = [disks, [], []];
  currentProblemData = { problem:'hanoi', numDisks, disks, pegPositions, baseY, pegs };
}

/** Knapsack Visualization */
function visualizeKnapsack() {
  const itemsStr = document.getElementById('knapsackItems').value.trim();
  const capacity = parseInt(document.getElementById('knapsackCapacity').value,10);
  const container = document.getElementById('knapsackVisualizer');
  container.style.display = 'block';
  container.innerHTML = '';

  let items = itemsStr.split(',').map(s=>s.trim()).filter(s=>s.length>0).map((it,i)=>{
    const parts = it.split('-').map(x=>parseInt(x,10));
    return {id:i+1, weight: parts[0], value: parts[1]};
  });

  const rows = items.length+1;
  const cols = capacity+1;

  let table = document.createElement('table');
  table.style.borderCollapse='collapse';

  let dp = Array(rows).fill(null).map(()=>Array(cols).fill(0));

  for (let r=0; r<rows; r++) {
    let tr = document.createElement('tr');
    for (let c=0; c<cols; c++) {
      let td = document.createElement('td');
      td.style.border='1px solid #ccc';
      td.style.width='50px';
      td.style.height='30px';
      td.style.textAlign='center';
      td.textContent = (r===0||c===0)?'0':''; 
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  container.appendChild(table);

  currentProblemData = { problem:'knapsack', items, capacity, table, dp };
}

/*******************************
 * STEP GENERATION FUNCTIONS   *
 *******************************/

/** TSP Steps (simulation) */
function getTspSteps() {
  const { cities } = currentProblemData;
  
  let tspSteps = [];
  tspSteps.push({action:'explain', text:'Starting brute force TSP approach...'});
  tspSteps.push({action:'explain', text:'Enumerating possible paths... (simulated)'}); 

  let permutations = generateFakePermutations(cities.map(c=>c.id), 3);
  permutations.forEach((perm, index) => {
    tspSteps.push({action:'check_path', path:perm, text:`Checking path: ${perm.join(' -> ')}`});
    if (index === permutations.length - 1) {
      tspSteps.push({action:'final_path', path:perm, text:`Selected best path: ${perm.join(' -> ')}`});
    }
  });
  
  return tspSteps;
}

function generateFakePermutations(arr, count) {
  let perms = [];
  for (let i=0;i<count;i++) {
    perms.push(shuffle([...arr]));
  }
  return perms;
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Hanoi Steps */
function getHanoiSteps() {
  const { numDisks } = currentProblemData;
  let hanoiSteps = [];
  hanoiSteps.push({action:'explain', text:`Solving Tower of Hanoi with ${numDisks} disks.`});

  function hanoi(n, from, to, aux) {
    if (n === 1) {
      hanoiSteps.push({action:'move', disk:n, from, to, text:`Move disk ${n} from ${from} to ${to}`});
      return;
    }
    hanoi(n-1, from, aux, to);
    hanoiSteps.push({action:'move', disk:n, from, to, text:`Move disk ${n} from ${from} to ${to}`});
    hanoi(n-1, aux, to, from);
  }
  hanoi(numDisks, 'A', 'C', 'B');

  return hanoiSteps;
}

/** Knapsack Steps (DP simulation) */
function getKnapsackSteps() {
  const { items, capacity } = currentProblemData;
  let knapsackSteps = [];
  knapsackSteps.push({action:'explain', text:'Filling DP table for Knapsack... dp[i][w] = max value for first i items and capacity w.'});

  for (let i=1; i<=items.length; i++) {
    for (let w=1; w<=capacity; w++) {
      const item = items[i-1];
      knapsackSteps.push({action:'consider_cell', i, w, item, text:`Consider item ${item.id} (Weight=${item.weight}, Value=${item.value}) for capacity ${w}`});
      if (item.weight <= w) {
        knapsackSteps.push({action:'compute_take', i, w, item, text:`Item fits. Compute max of taking vs not taking.`});
      } else {
        knapsackSteps.push({action:'compute_skip', i, w, item, text:`Item too heavy. Can't take.`});
      }
    }
  }

  knapsackSteps.push({action:'final', text:'DP computation complete. Optimal solution found in dp[last][capacity].'});
  return knapsackSteps;
}

/*****************************************
 * STEP ACTIONS                          *
 *****************************************/

function performStepAction(step) {
  switch(step.action) {
    case 'explain':
      break;
    case 'check_path':
      highlightTspPath(step.path);
      break;
    case 'final_path':
      highlightTspPath(step.path, true);
      break;
    case 'move':
      performHanoiMove(step.disk, step.from, step.to);
      break;
    case 'consider_cell':
      highlightKnapsackCell(step.i, step.w, '#FFD54F');
      break;
    case 'compute_take':
      performKnapsackCompute(step.i, step.w, step.item, true);
      break;
    case 'compute_skip':
      performKnapsackCompute(step.i, step.w, step.item, false);
      break;
    case 'final':
      break;
  }
}

/** Highlight a TSP path by drawing lines in SVG */
function highlightTspPath(path, final=false) {
  const svg = document.getElementById('tspVisualizer');
  svg.querySelectorAll('.temp-edge').forEach(l=>l.remove());
  const svgns = "http://www.w3.org/2000/svg";
  
  for (let i=0; i<path.length; i++) {
    let from = currentProblemData.cities.find(c=>c.id===path[i]);
    let to = currentProblemData.cities.find(c=>c.id===path[(i+1)%path.length]);
    const line = document.createElementNS(svgns,'line');
    line.setAttribute('x1',from.x);
    line.setAttribute('y1',from.y);
    line.setAttribute('x2',to.x);
    line.setAttribute('y2',to.y);
    line.setAttribute('stroke', final ? 'blue' : 'red');
    line.setAttribute('stroke-width','3');
    line.setAttribute('class','temp-edge');
    svg.appendChild(line);
  }
}

/** Perform Hanoi disk move */
function performHanoiMove(diskNumber, fromPeg, toPeg) {
  const { pegPositions, pegs, baseY } = currentProblemData;
  const pegMap = {A:0, B:1, C:2};
  let fromIndex = pegMap[fromPeg], toIndex=pegMap[toPeg];

  let disk = pegs[fromIndex].pop();
  pegs[toIndex].push(disk);

  let stackHeight = pegs[toIndex].length;
  disk.style.left = (pegPositions[toIndex] - parseInt(disk.style.width)/2) + 'px';
  disk.style.top = (baseY - stackHeight*22) + 'px';
}

/** Highlight a cell in the Knapsack DP table */
function highlightKnapsackCell(i,w,color) {
  const { table } = currentProblemData;
  const cell = table.rows[i].cells[w];
  cell.style.background = color;
}

/** Compute DP for Knapsack at given cell */
function performKnapsackCompute(i,w,item,take) {
  const { dp, table } = currentProblemData;
  
  if (take) {
    const notTake = dp[i-1][w];
    const takeVal = dp[i-1][w-item.weight] + item.value;
    dp[i][w] = Math.max(notTake, takeVal);
  } else {
    dp[i][w] = dp[i-1][w];
  }

  const cell = table.rows[i].cells[w];
  cell.textContent = dp[i][w];
  cell.style.background='#fff';
}

/** Show final knapsack result */
function showKnapsackResult() {
  const { dp, items, capacity } = currentProblemData;
  let html = '<h3>Knapsack Optimal Value: ' + dp[items.length][capacity] + '</h3>';

  // Backtracking to find selected items
  let w = capacity;
  let selectedItems = [];
  for (let i = items.length; i > 0; i--) {
    if (dp[i][w] !== dp[i-1][w]) {
      selectedItems.push(items[i-1]);
      w -= items[i-1].weight;
    }
  }

  html += '<h4>Selected Items:</h4><ul>';
  selectedItems.reverse().forEach(item => {
    html += `<li>Item ${item.id} (Weight: ${item.weight}, Value: ${item.value})</li>`;
  });
  html += '</ul>';

  extraTables.innerHTML = html;
}
