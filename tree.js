// tree.js

let currentTreeData = null;
let currentAlgorithm = null;
let traversalResult = [];
let nodeIdCounter = 0;
const algorithmCodeDisplay = document.getElementById("algorithm-code");

const algorithmsCode = {
  Preorder: `
  ALGORITHM 

Step 1 -> The root node of the subtree is visited first.
Step 2 -> Then the left subtree  is traversed.
Step3 -> At last, the right subtree is traversed.

CODE

// Structure of a Binary Tree Node
class Node {
  constructor(v) {
    this.data = v;
    this.left = null;
    this.right = null;
  }
}

// Function to print preorder traversal
function printPreorder(node) {
  if (node === null) {
    return;
  }

  // Deal with the node
  console.log(node.data);

  // Recur on left subtree
  printPreorder(node.left);

  // Recur on right subtree
  printPreorder(node.right);
}

// Driver code
function main() {
  const root = new Node(1);
  root.left = new Node(2);
  root.right = new Node(3);
  root.left.left = new Node(4);
  root.left.right = new Node(5);
  root.right.right = new Node(6);

  // Function call
  console.log("Preorder traversal of binary tree is:");
  printPreorder(root);
}

main();
TIME COMPLEXITY

Average case time complexity: O(n)
Worst-case time complexity: O(n)
Best case time complexity: O(n)



  `,
  Inorder: `
ALGORITHM

Step 1: Check for base case that if the current node is null, return the void function.
Step 2: Invoke the inorder function on the left child to traverse the entire left subtree first.
Step 3: Push the value of the current node into the preorder traversal array.
Step 4: After visiting the current node, we invoke the inorder function on the right child to traverse the right subtree in the end.



CODE

// C++ program for inorder traversals

#include <bits/stdc++.h>
using namespace std;

// Structure of a Binary Tree Node
struct Node {
    int data;
    struct Node *left, *right;
    Node(int v)
    {
        data = v;
        left = right = nullptr;
    }
};

// Function to print inorder traversal
void printInorder(struct Node* node)
{
    if (node == nullptr)
        return;

    // First recur on left subtree
    printInorder(node->left);

    // Now deal with the node
    cout << node->data << " ";

    // Then recur on right subtree
    printInorder(node->right);
}

// Driver code
int main()
{
    struct Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->right = new Node(6);

    // Function call
    cout << "Inorder traversal of binary tree is: \n";
    printInorder(root);

    return 0;
}
TIME COMPLEXITY

Average case time complexity: O(n)
Worst-case time complexity: O(n)
Best case time complexity: O(n)


  `,
  Postorder: `

ALGORITHM

1.Traverse the left subtree by recursively calling the post-order function.
2.Traverse the right subtree by recursively calling the post-order function.
3.Return the root node value.


CODE

// C++ program for postorder traversals

#include <bits/stdc++.h>
using namespace std;

// Structure of a Binary Tree Node
struct Node {
    int data;
    struct Node *left, *right;
    Node(int v)
    {
        data = v;
        left = right = nullptr;
    }
};

// Function to print postorder traversal
void printPostorder(struct Node* node)
{
    if (node == nullptr)
        return;

    // First recur on left subtree
    printPostorder(node->left);

    // Then recur on right subtree
    printPostorder(node->right);

    // Now deal with the node
    cout << node->data << " ";
}

// Driver code
int main()
{
    struct Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->right = new Node(6);

    // Function call
    cout << "Postorder traversal of binary tree is: \n";
    printPostorder(root);

    return 0;
}
TIME COMPLEXITY

Best case time complexity: O(n)
Average and worst-case time complexity: O(n)

  `,
  BSTSearch: `

ALGORITHM

1.Read the search element from the user 
2.Compare the search element to the value of the root node 
3.If the search element and root node are equal, display "Given node is found" and terminate the function 
4.If the search element and root node are not equal, determine if the search element is smaller or larger than the root node 
5.If the search element is smaller, continue searching in the left subtree 
6.If the search element is larger, continue searching in the right subtree 
7.Repeat steps 1–6 until the search element is found or until the search element is compared to a leaf node 
8.If the search element is found, display "Element is found" and terminate the function 
9.If the search element is not found at the leaf node, display "Element is not found" and terminate the function 

CODE

#include <iostream>
using namespace std;

struct Node {
    int key;
    Node* left;
    Node* right;
    Node(int item) {
        key = item;
        left = right = NULL;
    }
};

// function to search a key in a BST
Node* search(Node* root, int key) {
  
    // Base Cases: root is null or key 
    // is present at root
    if (root == NULL || root->key == key)
        return root;

    // Key is greater than root's key
    if (root->key < key)
        return search(root->right, key);

    // Key is smaller than root's key
    return search(root->left, key);
}

// Driver Code
int main() {
  
    // Creating a hard coded tree for keeping 
    // the length of the code small. We need 
    // to make sure that BST properties are 
    // maintained if we try some other cases.
    Node* root = new Node(50);
    root->left = new Node(30);
    root->right = new Node(70);
    root->left->left = new Node(20);
    root->left->right = new Node(40);
    root->right->left = new Node(60);
    root->right->right = new Node(80);
  
    (search(root, 19) != NULL)? cout << "Found\n": 
                               cout << "Not Found\n";

  
    (search(root, 80) != NULL)? cout << "Found\n": 
                               cout << "Not Found\n";

    return 0;
}

TIME COMPLEXITY

Best case time complexity: O(1)
Average case time complexity:O(log₂(n))
Worst-case time complexity: O(n)



  `,
  BSTInsert: `

  ALGORITHM

1.(Base Condition) Examine the root if it is null, create BST node with given value and return the node pointer.
2.If the given value is lesser than the root's, recursively insert the new node to the left subtree.
3.If the given value is greater than the root's, recursively insert the new node to the right subtree.


CODE

#include <iostream>
using namespace std;

struct Node {
    int key;
    Node* left;
    Node* right;    
    Node(int item) {
        key = item;
        left = NULL;
        right = NULL;
    }
};

// A utility function to insert a new node with 
// the given key
Node* insert(Node* node, int key) {
  
    // If the tree is empty, return a new node
    if (node == NULL) 
        return new Node(key);    
    
    // If the key is already present in the tree,
    // return the node
    if (node->key == key) 
        return node;
    
    // Otherwise, recur down the tree/ If the key
    // to be inserted is greater than the node's key,
    // insert it in the right subtree
    if (node->key < key) 
        node->right = insert(node->right, key);
    
    // If the key to be inserted is smaller than 
    // the node's key,insert it in the left subtree
    else 
        node->left = insert(node->left, key);
    
    // Return the (unchanged) node pointer
    return node;
}

// A utility function to do inorder tree traversal
void inorder(Node* root) {
    if (root != NULL) {
        inorder(root->left);
        cout << root->key << " ";
        inorder(root->right);
    }
}

// Driver program to test the above functions
int main() {
    // Creating the following BST
    //      50
    //     /  \
    //    30   70
    //   / \   / \
    //  20 40 60 80

    Node* root = new Node(50);
    root = insert(root, 30);
    root = insert(root, 20);
    root = insert(root, 40);
    root = insert(root, 70);
    root = insert(root, 60);
    root = insert(root, 80);

    // Print inorder traversal of the BST
    inorder(root);

    return 0;
}
TIME COMPLEXITY

Best case time complexity: O(1)
Average case time complexity:O(log₂(n))
Worst-case time complexity: O(n)



    `,
  BSTDelete: `
  ALGORITHM

1.Start from the root.

    If the tree is empty, there’s nothing to delete. Return None.
2.Search for the node to delete.

  If the key is smaller than the current node, move to the left subtree.
  If the key is greater than the current node, move to the right subtree.
  If the key matches the current node, proceed to delete the node.
3.Delete based on the three cases:

Case 1: No children (Leaf Node):
  Remove the node by returning None to its parent.
Case 2: One child:
  Return the non-None child to replace the node.
Case 3: Two children:
  Find the inorder successor or inorder predecessor.
  Replace the value of the current node with the value of the successor/predecessor.
  Recursively delete the successor/predecessor from its original position.
4.Return the updated subtree.


CODE

#include <bits/stdc++.h>
using namespace std;

struct Node {
    int key;
    Node* left;
    Node* right;
    Node(int k){
        key = k;
        left = right = nullptr;
    }
};

// Note that it is not a generic inorder
// successor function. It mainly works
// when right child is not empty which is 
// the case wwe need in BST delete
Node* getSuccessor(Node* curr){
    curr = curr->right;
    while (curr != nullptr && curr->left != nullptr)
        curr = curr->left;
    return curr;
}

// This function deletes a given key x from
// the give BST and returns modified root of
// the BST (if it is modified)
Node* delNode(Node* root, int x){

    // Base case
    if (root == nullptr)
        return root;

    // If key to be searched is in a subtree
    if (root->key > x)
        root->left = delNode(root->left, x);
    else if (root->key < x)
        root->right = delNode(root->right, x);

    // If root matches with the given key
    else {

        // Cases when root has 0 children
        // or only right child
        if (root->left == nullptr) {
            Node* temp = root->right;
            delete root;
            return temp;
        }

        // When root has only left child
        if (root->right == nullptr) {
            Node* temp = root->left;
            delete root;
            return temp;
        }

        // When both children are present
        Node* succ = getSuccessor(root);
        root->key = succ->key;
        root->right = delNode(root->right, succ->key);
    }
    return root;
}

// Utility function to do inorder
// traversal
void inorder(Node* root){
    if (root != nullptr) {
        inorder(root->left);
        cout << root->key << " ";
        inorder(root->right);
    }
}

int main(){
    Node* root = new Node(10);
    root->left = new Node(5);
    root->right = new Node(15);
    root->right->left = new Node(12);
    root->right->right = new Node(18);
    int x = 15;

    root = delNode(root, x);
    inorder(root);
    return 0;
}
TIME COMPLEXITY
Best case time complexity: O(logn)
Average case time complexity:O(logn)
Worst-case time complexity: O(n)


`,
FromPostIn: `
ALGORITHM

1.Start with the postorder traversal list:
  Given an array postorder[] of size n representing the postorder traversal of a BST.

2.Construct the BST from Postorder Traversal:

  Use a recursive function to insert elements from the postorder array into the BST.
  Start inserting elements in reverse order (from the last element of the postorder array).
  For each insertion, find the correct position in the BST (based on the BST property).
  Insertion Steps:

    The last element of the postorder traversal is the root of the BST.
    Each subsequent element is inserted by comparing it with the current root. 
    If it’s smaller, it goes to the left subtree; otherwise, it goes to the right subtree.
    Recursively repeat the process for each element.

3.Perform Inorder Traversal: Once the BST is constructed, perform an inorder traversal to get the sorted order of the elements.


CODE

#include <iostream>
#include <vector>
using namespace std;

// Definition for BST Node
struct Node {
    int data;
    Node* left, * right;

    Node(int val) {
        data = val;
        left = right = nullptr;
    }
};

// Function to insert a new node in the BST
Node* insert(Node* root, int data) {
    if (root == nullptr) {
        return new Node(data);
    }

    if (data < root->data) {
        root->left = insert(root->left, data);
    } else {
        root->right = insert(root->right, data);
    }

    return root;
}

// Function to construct the BST from the postorder traversal
Node* constructBSTFromPostorder(vector<int>& postorder, int& index, int minVal, int maxVal) {
    if (index < 0) return nullptr;

    int current = postorder[index];

    // If current value doesn't lie in the valid range, return null
    if (current < minVal || current > maxVal) {
        return nullptr;
    }

    // Decrement index for next recursive calls
    index--;

    // First, construct right subtree (as we're traversing postorder in reverse)
    Node* right = constructBSTFromPostorder(postorder, index, current, maxVal);

    // Then, construct left subtree
    Node* left = constructBSTFromPostorder(postorder, index, minVal, current);

    // Create a new node with current value and link left and right subtrees
    Node* node = new Node(current);
    node->left = left;
    node->right = right;

    return node;
}

// Function to perform inorder traversal
void inorder(Node* root) {
    if (root == nullptr) return;

    inorder(root->left);   // Traverse left subtree
    cout << root->data << " ";  // Print current node
    inorder(root->right);  // Traverse right subtree
}

int main() {
    vector<int> postorder = {40, 30, 35, 80, 100, 60, 50}; // Example postorder traversal
    int index = postorder.size() - 1;

    // Construct the BST from postorder
    Node* root = constructBSTFromPostorder(postorder, index, INT_MIN, INT_MAX);

    // Perform inorder traversal to get the sorted order
    cout << "Inorder Traversal: ";
    inorder(root);
    cout << endl;

    return 0;
}

TIME COMPLEXITY

Best and Average time complexity: O(n log n)
Worst-case time complexity: O(n2)

`,
FromPreIn: `
ALGORITHM

1.Initialize an empty BST.
2.Build the BST:
  Start with the first value of the Preorder sequence as the root.
  Insert the remaining values one by one using the BST property.
3.Perform an Inorder Traversal:
  Traverse the left subtree recursively.
  Print/store the root value.
  Traverse the right subtree recursively.
4.Return the Inorder Traversal sequence.



CODE

#include <iostream>
#include <vector>
using namespace std;

// Definition of a Node in the BST
struct Node {
    int value;
    Node* left;
    Node* right;
    Node(int val) {
        value = val;
        left = nullptr;
        right = nullptr;
    }
};

// Function to insert a value into the BST
Node* insertIntoBST(Node* root, int key) {
    if (root == nullptr) {
        return new Node(key);
    }
    if (key < root->value) {
        root->left = insertIntoBST(root->left, key);
    } else {
        root->right = insertIntoBST(root->right, key);
    }
    return root;
}

// Function to perform Inorder Traversal
void inorderTraversal(Node* root, vector<int>& inorder) {
    if (root != nullptr) {
        inorderTraversal(root->left, inorder);
        inorder.push_back(root->value); // Visit the root
        inorderTraversal(root->right, inorder);
    }
}

// Function to convert Preorder to Inorder
vector<int> preorderToInorder(vector<int>& preorder) {
    // Step 1: Build the BST from Preorder
    Node* root = nullptr;
    for (int key : preorder) {
        root = insertIntoBST(root, key);
    }

    // Step 2: Perform Inorder Traversal
    vector<int> inorder;
    inorderTraversal(root, inorder);
    return inorder;
}

// Main function
int main() {
    // Example Preorder Input
    vector<int> preorder = {8, 5, 1, 7, 10, 12};

    // Convert Preorder to Inorder
    vector<int> inorder = preorderToInorder(preorder);

    // Output the Inorder Traversal
    cout << "Inorder Traversal: ";
    for (int val : inorder) {
        cout << val << " ";
    }
    cout << endl;

    return 0;
}

TIME COMPLEXITY

Best case time complexity: O(nlogn)
Average case time complexity(Balanced BST):O(nlogn)
Worst-case time complexity(Skewed BST): O(n2)


`



  
};


// Event listener to display algorithm code
document.getElementById("algorithmSelect").addEventListener("change", (e) => {
  const selectedAlgorithm = e.target.value;
  algorithmCodeDisplay.textContent = algorithmsCode[selectedAlgorithm] || "Code not available.";
});

// Event Listeners
document.getElementById("visualizeBtn").addEventListener("click", visualizeTree);
document.getElementById("runAlgoBtn").addEventListener("click", runWithRefresh);
document.getElementById("algorithmSelect").addEventListener("change", updateInputVisibility);

// Initialize Input Visibility
updateInputVisibility();

// Global Delay Function for Animations
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Update Input Fields Based on Selected Algorithm
function updateInputVisibility() {
  const algo = document.getElementById("algorithmSelect").value;
  // Hide all extra inputs initially
  document.getElementById("search-block").style.display = "none";
  document.getElementById("insert-block").style.display = "none";
  document.getElementById("delete-block").style.display = "none";
  document.getElementById("construct-pre-in-block").style.display = "none";
  document.getElementById("construct-post-in-block").style.display = "none";
  document.getElementById("nodes-block").style.display = "block";

  if (algo === "BSTSearch") {
    document.getElementById("search-block").style.display = "block";
  } else if (algo === "BSTInsert") {
    document.getElementById("insert-block").style.display = "block";
  } else if (algo === "BSTDelete") {
    document.getElementById("delete-block").style.display = "block";
  } 
  else if (algo === "FromPreIn") {
    document.getElementById("nodes-block").style.display = "none";
    document.getElementById("construct-pre-in-block").style.display = "block";
  } else if (algo === "FromPostIn") {
    document.getElementById("nodes-block").style.display = "none";
    document.getElementById("construct-post-in-block").style.display = "block";
  }
}

// Run Algorithm with a slight delay to re-render tree first
function runWithRefresh() {
  visualizeTree();
  setTimeout(runAlgorithm, 500);
}

// Visualize Tree Based on Input
async function visualizeTree() {
  const algo = document.getElementById("algorithmSelect").value;
  
  let nodes;
  if (algo === "FromPreIn") {
    const preorder = document.getElementById("preInput").value.trim().split(",").map(x=>x.trim()).map(Number);
    const inorder = document.getElementById("inInput").value.trim().split(",").map(x=>x.trim()).map(Number);
    if (!preorder.length || !inorder.length) {
      alert("Please provide valid preorder and inorder inputs.");
      return;
    }
    document.getElementById("explanationText").innerHTML = "Constructing the tree from Preorder and Inorder...";
    // Animate construction
    currentTreeData = { root: null };
    const root = await animateBuildFromPreIn(preorder, inorder);
    currentTreeData.root = root;
    addExplanationStep("Tree construction from Pre/In completed.");
    renderTree(currentTreeData.root);
    return;
  } else if (algo === "FromPostIn") {
    const postorder = document.getElementById("postInput").value.trim().split(",").map(x=>x.trim()).map(Number);
    const inorder = document.getElementById("inInput2").value.trim().split(",").map(x=>x.trim()).map(Number);
    if (!postorder.length || !inorder.length) {
      alert("Please provide valid postorder and inorder inputs.");
      return;
    }
    document.getElementById("explanationText").innerHTML = "Constructing the tree from Postorder and Inorder...";
    // No animation requested for post-in (but could be done similarly)
    let root = buildTreeFromPostIn(postorder, inorder);
    currentTreeData = { root };
    renderTree(currentTreeData.root);
    addExplanationStep("Tree construction from Post/In completed.");
    return;
  } else {
    const nodesInput = document.getElementById("nodesInput").value;
    nodes = nodesInput.split(",").map(x => x.trim()).map(Number).filter(x=>!isNaN(x));

    if (!nodes || nodes.length === 0) {
      alert("Please provide valid node input.");
      return;
    }

    let root = null;
    for (let val of nodes) {
      root = insertNode(root, val);
    }

    currentTreeData = { root };
    renderTree(currentTreeData.root);
    document.getElementById("explanationText").innerHTML = `BST visualized. Select an algorithm and run it.`;
  }
}

// Basic BST Insert (Non-animated, used for initial tree build)
function insertNode(root, key) {
  if (root == null) {
    return { key, left: null, right: null };
  }
  if (key < root.key) {
    root.left = insertNode(root.left, key);
  } else if (key > root.key) {
    root.right = insertNode(root.right, key);
  }
  return root;
}

// Animated Construction from Pre/In
async function animateBuildFromPreIn(preorder, inorder) {
  // This function will recursively build and animate
  // We'll define a helper that returns a subtree
  async function build(pre, ino) {
    if (!pre.length || !ino.length) return null;
    let rootVal = pre[0];
    let mid = ino.indexOf(rootVal);
    if (mid === -1) {
      alert("Invalid Preorder and Inorder traversal inputs.");
      return null;
    }

    // Highlight the root selection step
    addExplanationStep(`Current Preorder: [${pre.join(", ")}], Inorder: [${ino.join(", ")}]`);
    addExplanationStep(`Root is chosen from Preorder: ${rootVal}`);

    // Splitting inorder
    let leftIn = ino.slice(0, mid);
    let rightIn = ino.slice(mid+1);
    addExplanationStep(`Inorder is split into left subtree: [${leftIn.join(", ")}] and right subtree: [${rightIn.join(", ")}]`);

    // Splitting preorder (excluding the root)
    let leftPre = pre.slice(1, 1+leftIn.length);
    let rightPre = pre.slice(1+leftIn.length);

    addExplanationStep(`Preorder for left subtree: [${leftPre.join(", ")}], Preorder for right subtree: [${rightPre.join(", ")}]`);

    // Create the root node
    let root = { key: rootVal, left: null, right: null };
    // Render partial tree (just root for now)
    // We'll render after each insertion to visualize the construction steps:
    renderTree(root);
    highlightNodeByKey(rootVal, 'node-final');
    addExplanationStep(`Placing node ${rootVal} as the root (highlighted).`);
    await delay(1000);
    clearHighlights('node-final');

    // Recursively build left and right subtree
    root.left = await build(leftPre, leftIn);
    renderTree(root);
    await delay(500);

    root.right = await build(rightPre, rightIn);
    renderTree(root);
    await delay(500);

    // Return the built subtree
    return root;
  }

  return await build(preorder, inorder);
}

// Build Tree from Postorder and Inorder Traversals (No animation requested)
function buildTreeFromPostIn(postorder, inorder) {
  if (!postorder.length || !inorder.length) return null;
  let rootVal = postorder[postorder.length-1];
  let mid = inorder.indexOf(rootVal);
  if (mid === -1) {
    alert("Invalid Postorder and Inorder traversal inputs.");
    return null;
  }
  let leftIn = inorder.slice(0, mid);
  let rightIn = inorder.slice(mid+1);
  let leftPost = postorder.slice(0, leftIn.length);
  let rightPost = postorder.slice(leftIn.length, postorder.length-1);
  let root = { key: rootVal, left: null, right: null };
  root.left = buildTreeFromPostIn(leftPost, leftIn);
  root.right = buildTreeFromPostIn(rightPost, rightIn);
  return root;
}

// Render Tree with Animations and Unique IDs
function renderTree(root) {
  const visualizer = document.getElementById("visualizer");
  visualizer.innerHTML = "";
  if (!root) return;

  const svgNS = "http://www.w3.org/2000/svg";
  const width = visualizer.clientWidth || 800;
  const height = visualizer.clientHeight || 600;
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  visualizer.appendChild(svg);

  let layout = getTreeLayout(root, width, height);

  // Assign unique IDs to nodes
  for (let i = 0; i < layout.length; i++) {
    layout[i].id = "node-" + (nodeIdCounter++);
  }

  // Draw Edges
  for (let nodeInfo of layout) {
    let n = nodeInfo.node;
    if (n.left) {
      let leftInfo = layout.find(x => x.node === n.left);
      drawEdge(svg, nodeInfo.x, nodeInfo.y, leftInfo.x, leftInfo.y, nodeInfo.id, leftInfo.id);
    }
    if (n.right) {
      let rightInfo = layout.find(x => x.node === n.right);
      drawEdge(svg, nodeInfo.x, nodeInfo.y, rightInfo.x, rightInfo.y, nodeInfo.id, rightInfo.id);
    }
  }

  // Draw Nodes
  for (let nodeInfo of layout) {
    drawNode(svg, nodeInfo);
  }
}

// Get Tree Layout Positions
function getTreeLayout(root, width, height) {
  let coords = [];
  function inorder(n, depth) {
    if (!n) return;
    inorder(n.left, depth + 1);
    coords.push({ node: n, depth });
    inorder(n.right, depth + 1);
  }
  inorder(root, 0);

  let count = coords.length;
  let xUnit = width / (count + 1);
  for (let i = 0; i < coords.length; i++) {
    coords[i].x = (i + 1) * xUnit;
    coords[i].y = 80 * (coords[i].depth + 1);
  }
  return coords;
}

// Draw Edge Between Nodes
function drawEdge(svg, x1, y1, x2, y2, parentId, childId) {
  const line = document.createElementNS(svg.namespaceURI, "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("class", "edge-line");
  line.dataset.parent = parentId;
  line.dataset.child = childId;
  svg.appendChild(line);
}

// Draw Individual Node
function drawNode(svg, info) {
  const r = 20;
  const circle = document.createElementNS(svg.namespaceURI, "circle");
  circle.setAttribute("cx", info.x);
  circle.setAttribute("cy", info.y);
  circle.setAttribute("r", r);
  circle.setAttribute("class", "node-circle");
  circle.setAttribute("id", info.id);
  circle.dataset.key = info.node.key; 
  svg.appendChild(circle);

  const text = document.createElementNS(svg.namespaceURI, "text");
  text.setAttribute("x", info.x);
  text.setAttribute("y", info.y + 5);
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("class", "node-text");
  text.textContent = info.node.key;
  svg.appendChild(text);
}

// Highlight a Node by Its Key
function highlightNodeByKey(key, className) {
  const circle = [...document.querySelectorAll('.node-circle')]
                  .find(c => Number(c.dataset.key) === key);
  if (circle) {
    circle.classList.add(className);
  }
}

// Remove a Specific Highlight Class from All Nodes
function clearHighlights(className) {
  document.querySelectorAll('.' + className).forEach(el => el.classList.remove(className));
}

// Add Incremental Explanation Steps
function addExplanationStep(text) {
  const expl = document.getElementById("explanationText");
  expl.innerHTML += text + "<br/>";
  expl.scrollTop = expl.scrollHeight;
}

// Traversal Animations
async function animateInorder(node) {
  if (!node) return;
  await animateInorder(node.left);
  highlightNodeByKey(node.key, 'node-current');
  addExplanationStep("Visiting node " + node.key + " in inorder traversal");
  await delay(500); 
  highlightNodeByKey(node.key, 'node-visited');
  clearHighlights('node-current');
  await animateInorder(node.right);
}

async function animatePreorder(node) {
  if (!node) return;
  highlightNodeByKey(node.key, 'node-current');
  addExplanationStep("Visiting node " + node.key + " in preorder traversal");
  await delay(500);
  highlightNodeByKey(node.key, 'node-visited');
  clearHighlights('node-current');
  await animatePreorder(node.left);
  await animatePreorder(node.right);
}

async function animatePostorder(node) {
  if (!node) return;
  await animatePostorder(node.left);
  await animatePostorder(node.right);
  highlightNodeByKey(node.key, 'node-current');
  addExplanationStep("Visiting node " + node.key + " in postorder traversal");
  await delay(500);
  highlightNodeByKey(node.key, 'node-visited');
  clearHighlights('node-current');
}

// Animated BST Search with full path highlight on find
async function animateBSTSearch(node, key) {
  let current = node;
  let path = [];
  while (current) {
    highlightNodeByKey(current.key, 'node-current');
    addExplanationStep("Checking node " + current.key);
    await delay(500);
    clearHighlights('node-current');
    path.push(current.key);
    if (key === current.key) {
      addExplanationStep("Key " + key + " found!");
      // Highlight entire path
      for (let pKey of path) {
        highlightNodeByKey(pKey, 'node-final');
      }
      return true;
    } else if (key < current.key) {
      addExplanationStep("Going left");
      current = current.left;
    } else {
      addExplanationStep("Going right");
      current = current.right;
    }
  }
  addExplanationStep("Key " + key + " not found.");
  return false;
}

// Animated BST Insert
async function animateBSTInsert(node, key) {
  let current = node;
  let parent = null;
  while (current) {
    highlightNodeByKey(current.key, 'node-current');
    addExplanationStep("Comparing key " + key + " with node " + current.key);
    await delay(500);
    if (key < current.key) {
      addExplanationStep("Going left");
      parent = current;
      current = current.left;
    } else if (key > current.key) {
      addExplanationStep("Going right");
      parent = current;
      current = current.right;
    } else {
      addExplanationStep("Key " + key + " already exists. No insertion performed.");
      highlightNodeByKey(current.key, 'node-final');
      clearHighlights('node-current');
      return { inserted: false, newRoot: node };
    }
    clearHighlights('node-current');
  }
  // Insert the new node
  const newNode = { key, left: null, right: null };
  if (parent) {
    if (key < parent.key) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }
    highlightNodeByKey(newNode.key, 'node-final');
    addExplanationStep("Inserted key " + key + " as a child of node " + parent.key);
  } else {
    // If no parent, the tree was empty
    node = newNode;
    highlightNodeByKey(newNode.key, 'node-final');
    addExplanationStep("Inserted key " + key + " as the root node.");
  }
  return { inserted: true, newRoot: node };
}

// Animated BST Delete
async function animateBSTDelete(node, key) {
  let current = node;
  let parent = null;
  while (current) {
    highlightNodeByKey(current.key, 'node-current');
    addExplanationStep("Searching for key " + key + " to delete.");
    await delay(500);
    if (key < current.key) {
      addExplanationStep("Going left");
      parent = current;
      current = current.left;
    } else if (key > current.key) {
      addExplanationStep("Going right");
      parent = current;
      current = current.right;
    } else {
      addExplanationStep("Found node " + key + ". Proceeding to delete.");
      highlightNodeByKey(current.key, 'node-final');
      await delay(500);
      // Handle deletion cases
      if (current.left == null && current.right == null) {
        if (parent == null) {
          node = null;
        } else if (parent.left === current) {
          parent.left = null;
        } else {
          parent.right = null;
        }
        addExplanationStep("Deleted leaf node " + key + ".");
      } else if (current.left == null) {
        if (parent == null) {
          node = current.right;
        } else if (parent.left === current) {
          parent.left = current.right;
        } else {
          parent.right = current.right;
        }
        addExplanationStep("Deleted node " + key + " with only right child.");
      } else if (current.right == null) {
        if (parent == null) {
          node = current.left;
        } else if (parent.left === current) {
          parent.left = current.left;
        } else {
          parent.right = current.left;
        }
        addExplanationStep("Deleted node " + key + " with only left child.");
      } else {
        // Node with two children: Find inorder successor
        let successorParent = current;
        let successor = current.right;
        while (successor.left) {
          highlightNodeByKey(successor.key, 'node-current');
          addExplanationStep("Finding inorder successor for node " + key + ".");
          await delay(500);
          successorParent = successor;
          successor = successor.left;
          clearHighlights('node-current');
        }
        addExplanationStep("Inorder successor found: " + successor.key + ".");
        current.key = successor.key;
        if (successorParent.left === successor) {
          successorParent.left = successor.right;
        } else {
          successorParent.right = successor.right;
        }
        addExplanationStep("Replaced node " + key + " with successor " + successor.key + ".");
      }
      return { deleted: true, newRoot: node };
    }
    clearHighlights('node-current');
  }
  addExplanationStep("Key " + key + " not found. No deletion performed.");
  return { deleted: false, newRoot: node };
}

// Run Algorithm Based on Selection
async function runAlgorithm() {
  if (!currentTreeData || !currentTreeData.root) {
    alert("Please visualize the tree first!");
    return;
  }
  const algo = document.getElementById("algorithmSelect").value;
  currentAlgorithm = algo;
  traversalResult = [];
  document.getElementById("explanationText").innerHTML = ""; // Clear previous explanation

  let root = currentTreeData.root;

  if (algo === "Preorder") {
    addExplanationStep("Starting Preorder Traversal");
    await animatePreorder(root);
    addExplanationStep("Preorder Traversal completed.");
  } else if (algo === "Inorder") {
    addExplanationStep("Starting Inorder Traversal");
    await animateInorder(root);
    addExplanationStep("Inorder Traversal completed.");
  } else if (algo === "Postorder") {
    addExplanationStep("Starting Postorder Traversal");
    await animatePostorder(root);
    addExplanationStep("Postorder Traversal completed.");
  } else if (algo === "BSTSearch") {
    const key = parseInt(document.getElementById("searchInput").value);
    if (isNaN(key)) { alert("Please enter a valid search key."); return; }
    addExplanationStep("Starting BST Search for key: " + key);
    const found = await animateBSTSearch(root, key);
    if (found) {
      addExplanationStep("BST Search completed. Key " + key + " found.");
    } else {
      addExplanationStep("BST Search completed. Key " + key + " not found.");
    }
  } else if (algo === "BSTInsert") {
    const key = parseInt(document.getElementById("insertInput").value);
    if (isNaN(key)) { alert("Please enter a valid insert key."); return; }
    addExplanationStep("Starting BST Insertion for key: " + key);
    const insertResult = await animateBSTInsert(root, key);
    if (insertResult.inserted) {
      currentTreeData.root = insertResult.newRoot;
      renderTree(currentTreeData.root);
      addExplanationStep("BST Insertion completed. Key " + key + " inserted.");
    } else {
      addExplanationStep("BST Insertion completed. Key " + key + " already exists.");
    }
  } else if (algo === "BSTDelete") {
    const key = parseInt(document.getElementById("deleteInput").value);
    if (isNaN(key)) { alert("Please enter a valid delete key."); return; }
    addExplanationStep("Starting BST Deletion for key: " + key);
    const deleteResult = await animateBSTDelete(root, key);
    if (deleteResult.deleted) {
      currentTreeData.root = deleteResult.newRoot;
      renderTree(currentTreeData.root);
      addExplanationStep("BST Deletion completed. Key " + key + " deleted.");
    } else {
      addExplanationStep("BST Deletion completed. Key " + key + " not found.");
    }
  } else if (algo === "FromPreIn" || algo==="FromPostIn") {
    addExplanationStep("Tree constructed from the given traversals. No further actions.");
  }
}

// Basic Traversal Functions (Without Animation)
function preorderTraversal(node, result) {
  if (!node) return;
  result.push(node.key);
  preorderTraversal(node.left, result);
  preorderTraversal(node.right, result);
}

function inorderTraversal(node, result) {
  if (!node) return;
  inorderTraversal(node.left, result);
  result.push(node.key);
  inorderTraversal(node.right, result);
}

function postorderTraversal(node, result) {
  if (!node) return;
  postorderTraversal(node.left, result);
  postorderTraversal(node.right, result);
  result.push(node.key);
}

// BST Search (Non-Animated)
function bstSearch(node, key) {
  let current = node;
  let path = [];
  while (current) {
    path.push(current.key);
    if (key === current.key) {
      return { found: true, path };
    } else if (key < current.key) {
      current = current.left;
    } else {
      current = current.right;
    }
  }
  return { found: false, path };
}

// Non-Animated Insert (not used for main animations)
function bstInsert(node, key) {
  if (node == null) {
    return { inserted: true, newRoot: { key, left: null, right: null } };
  }
  if (key < node.key) {
    const leftInsert = bstInsert(node.left, key);
    if (leftInsert.inserted) {
      node.left = leftInsert.newRoot;
      return { inserted: true, newRoot: node };
    } else {
      return { inserted: false, newRoot: node };
    }
  } else if (key > node.key) {
    const rightInsert = bstInsert(node.right, key);
    if (rightInsert.inserted) {
      node.right = rightInsert.newRoot;
      return { inserted: true, newRoot: node };
    } else {
      return { inserted: false, newRoot: node };
    }
  } else {
    return { inserted: false, newRoot: node };
  }
}

// Non-Animated Delete (not used for main animations)
function bstDelete(node, key) {
  if (node == null) {
    return { deleted: false, newRoot: null };
  }
  if (key < node.key) {
    const leftDelete = bstDelete(node.left, key);
    node.left = leftDelete.newRoot;
    return { deleted: leftDelete.deleted, newRoot: node };
  } else if (key > node.key) {
    const rightDelete = bstDelete(node.right, key);
    node.right = rightDelete.newRoot;
    return { deleted: rightDelete.deleted, newRoot: node };
  } else {
    // Node to be deleted found
    if (node.left == null && node.right == null) {
      return { deleted: true, newRoot: null };
    } else if (node.left == null) {
      return { deleted: true, newRoot: node.right };
    } else if (node.right == null) {
      return { deleted: true, newRoot: node.left };
    } else {
      // Node with two children: Get inorder successor
      let successor = getMin(node.right);
      node.key = successor.key;
      const rightDelete = bstDelete(node.right, successor.key);
      node.right = rightDelete.newRoot;
      return { deleted: true, newRoot: node };
    }
  }
}

// Get Minimum Value Node
function getMin(node) {
  while (node.left != null) {
    node = node.left;
  }
  return node;
}
