/*function Array()
{
    //this.array=[];
    this.size=null;
    this.index=null;
    this.json = {
        array: []
    };

    this.insertSize = function(val){
        this.size=val;
    }

    this.InsertVal = function(val){
        this.json.array.push(val);
        //return arr;
    }
}
var arr = new Array();*/
function Node(val = null) {
	this.value = val;
	this.parent = null;
	this.height = null;
	this.left = null;
	this.right = null;
	this.json = {
		color: "steelblue",
		name: this.value,
		direction: null,
		children: []
    };
    
}


var stepDelay = 900;

var algorithim=['Add a root for the tree','Add Child At Left','Add Child at Right','If Parent value Bigger than current-SWICH'];

function Heap(){

       
        this.storage=[];
   


/*
    this.Insert = function(cur, val) {
        if (cur == null)
            cur = new Node(val);
        else if (val <= cur.value) {
            cur.left = this.Insert(cur.left, val);
            cur.left.parent = cur;
            // GUI
            cur.left.json.direction = 'left';
            cur.json.children.push(cur.left.json);
        } else {
            cur.right = this.Insert(cur.right, val);
            cur.right.parent = cur;
            // GUI
            cur.right.json.direction = 'right';
            cur.json.children.push(cur.right.json);
        }
        cur.UpdateHeight();
        cur = this.balance(cur);
        return cur;
    }
    this.InsertVal = function(val) {
        this.elements.push(val);
        this.root = this.Insert(this.root, val);
       
    }*/


    this.insert = function(value) {
       if(GetSize==false)
       {
           alert("Please Enter a Size of Heap")
       }
       else{

        if(this.storage.length<sizeArray){
        // Grab value from form if not provided
        if (value === undefined) {
          value = parseInt(document.getElementById('value').value);
          document.getElementById('value').value = '';
        }
        
        // Push to storage array
        this.storage.push(value);
        // Update visualization based on added node
        insertNode(value);
      
        var that = this;
      
        // Recursive function to handle swaps, input index
        var reheapify = function(index) {
           
          // Get parent index
          var parentInd = Math.ceil(index/2-1);
          // Base Case : value < parent or parent is null
          if (parentInd < 0 || that.storage[index] <= that.storage[parentInd]) {
            return 'value added to index '+index;
          }
          // Recursive Case: swap with parent and make recursive call
          that.storage[index] = that.storage[index] ^ that.storage[parentInd];
          that.storage[parentInd] = that.storage[index] ^ that.storage[parentInd];
          that.storage[index] = that.storage[index] ^ that.storage[parentInd];
          // Update visualization based on swapped nodes
          swapNodes(index, parentInd);
          
          setTimeout(function(){
            return reheapify(parentInd);
          }, stepDelay);
        };
        setTimeout(function() {
          return reheapify(that.storage.length-1);
        }, stepDelay);

     //  n=that.storage;
     //  update();
      }
      else{
        alert('Heap Is Full');
    }
    }
 //   n=that.storage;
 //   update();
    };
      
// Heap remove max method on prototype
// Remove the max value from a heap, reorder the heap, and return the max value
Heap.prototype.removeMax = function() {
    // Check if heap is currently empty
    if (this.storage.length === 0) {
      // If nothing to remove then return null
      return null;
    } else if (this.storage.length === 1) {
      // If heap only has one element in it then pop off the lone element in the storage array and return it
      var removed = this.storage.pop();
  
      // Reset inital state
      restoreInitial();
  
      return removed;
    }
  
    // Handle all other cases where heap has more than one node
    // Preserve the max value in order to return it
    var maxValue = this.storage[0];
    // Replace the root node with the last node of the heap and remove the last node
    this.storage[0] = this.storage.pop();
  
    swapRoot();
  
    // Preserve context for inner recursive helper function
    var that = this;
  
    // Recursive function to restore the heap property of the heap
    var reheapify = function(index) {
      // Set index of max value to current node's index
      var maxIndex = index;
  
      // Check first child node's value against current node
      if ((2*index + 1 < that.storage.length) && (that.storage[2*index + 1] > that.storage[index])) {
        // If greater then set index of max value to first child node's index
        maxIndex = 2*index + 1;
      }
      // Check second child node's value against current max node
      if ((2*index + 2 < that.storage.length) && (that.storage[2*index + 2] > that.storage[maxIndex])) {
        // If greater then set index of max value to second child node's index
        maxIndex = 2*index + 2;
      }
      // If the index of the max value is not equal to the index of the current node
      // Then swap the nodes and reheapify at the new index of the current node
      if (maxIndex !== index) {
        // Swap node values
        that.storage[index] = that.storage[index] ^ that.storage[maxIndex];
        that.storage[maxIndex] = that.storage[index] ^ that.storage[maxIndex];
        that.storage[index] = that.storage[index] ^ that.storage[maxIndex];
        n=this.storage;
       
        swapNodes(maxIndex, index);
  
        // Reheapify at new index of current node
        setTimeout(function() {
         // update();
          reheapify(maxIndex);
        }, stepDelay);
      }
    
    
    };
  
    // Recursively move the swapped node down the heap until it's greater than both of its children
    setTimeout(function() {
      n=this.storage;
      reheapify(0);
    }, stepDelay);
    //update();
    // Return the removed max value from the heap
    return maxValue;

  };
  
  
}

var hp = new Heap();






