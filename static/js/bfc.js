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
var source,target,test,start,q;
var edge;
var stepDelay = 900;
var data={"nodes":[],"links":[],"colors":[]}
var neighbor=[],d=[],v=[], qExist=[],currentNaighbor=[];
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
           alert("Please Enter a Size of Nodes")
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

        //append in json data
        node={"value":value,"id":this.storage.length,"x":coorxy[this.storage.length-1][0],"y":coorxy[this.storage.length-1][1]};
        data.nodes.push(node);

      
        if(sizeArray-this.storage.length==0)
        {
            //this.storage.push(value);
            //insertNode(value);
            drowGraph();
        }
        var that = this;
      /*
        // Recursive function to handle swaps, input index
        var reheapify = function(index) {
           
          // Get parent index
          var parentInd = Math.ceil(index/2-1);
          // Base Case : value < parent or parent is null
          if (parentInd < 0 || that.storage[index] >= that.storage[parentInd]) {
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
        };*/
       // setTimeout(function() {
       //   return reheapify(that.storage.length-1);
       // }, stepDelay);
//
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
this.initArrays=function(val){
   start=val;
   q.enqueue(Number(start));
    d[0]=0;
    v[0]="NIL";
    for(var i=0;i<sizeArray;i++)
    {
      if(i==0)
      {
        d[0]=0;
        v[0]="NIL";

      }
      else{
        d[i]="infinity";
        v[i]="NIL";
      }
      if(this.storage[i]!=val)
          data["colors"].push({"node":this.storage[i],"color":"White"});
      else{
          data["colors"].push({"node":this.storage[i],"color":"Gray"});
      }
    }
    CreateInit();
   // CreateInitArrays();
}
/********************    Queue Section   ******************************** */
function Queue() {
  this.elements = [];
}
Queue.prototype.enqueue = function (e) {
  this.elements.push(e);
};

// remove an element from the front of the queue
Queue.prototype.dequeue = function () {
  return this.elements.shift();
};

// check if the queue is empty
Queue.prototype.isEmpty = function () {
  return this.elements.length == 0;
};

// get the element at the front of the queue
Queue.prototype.peek = function () {
  return !this.isEmpty() ? this.elements[0] : undefined;
};

Queue.prototype.length = function() {
  return this.elements.length;
}

 q = new Queue();
 //qExist=new Queue();




/********************************************************************* */
function IsContains(arr,e){
  var flag=false;
    for(var i=0;i<arr.length;i++)
    {
      if(arr[i]==e)
        flag=true;
    }
    return flag;

}

function GetIndexOfNode(n){
  for(var i=0;i<sizeArray;i++)
  {
    if(data.colors[i]["node"]==n)
       return i;
  }
}


function GetIndexOfXYnode(n){
  for(var i=0;i<sizeArray;i++)
  {
    if(data.nodes[i]["value"]==n)
       return i;
  }
}
//---------------------------------------------
this.updateArrays=function(){
  var nx,ny;
  start=q.dequeue();
  qExist.push(start);
  //qExist.enqueue(start)

   for(var i=0;i<sizeArray-1;i++)
   {
    if(data.links[i]["source"] ==Number(start))
    {
      
        data.colors[GetIndexOfNode(data.links[i]["source"])]["color"]="Black";
        if(IsContains(qExist,data.links[i]["target"])==false)
        {
          d[nodesArray.indexOf(data.links[i]["target"])]=Number(d[nodesArray.indexOf((Number(start)))])+1;
          v[nodesArray.indexOf(data.links[i]["target"])]=data.links[i]["source"];
          q.enqueue(data.links[i]["target"]);
          data.colors[GetIndexOfNode(data.links[i]["target"])]["color"]="Gray";
          nx=data.nodes[GetIndexOfXYnode(data.links[i]["target"])]["x"];
          ny=data.nodes[GetIndexOfXYnode(data.links[i]["target"])]["y"];
         // currentNaighbor.push(data.links[i]["target"])
        //  UpdateNodeColor(nx,ny,currentNaighbor);
        }
       // UpdateNodeColor(nx,ny);

      
    }
    if(data.links[i]["target"] ==Number(start))
    {
      data.colors[GetIndexOfNode(data.links[i]["target"])]["color"]="Black";
        if(IsContains(qExist,data.links[i]["source"])==false)
        {
          d[nodesArray.indexOf(data.links[i]["source"])]=Number(d[nodesArray.indexOf(Number(start))])+1;
          v[nodesArray.indexOf(data.links[i]["source"])]=data.links[i]["target"];
          q.enqueue(data.links[i]["source"])
          data.colors[GetIndexOfNode(data.links[i]["source"])]["color"]="Gray";
          nx=data.nodes[GetIndexOfXYnode(data.links[i]["source"])]["x"];
          ny=data.nodes[GetIndexOfXYnode(data.links[i]["source"])]["y"];
         // currentNaighbor.push(data.links[i]["source"])

         // UpdateNodeColor(nx,ny,data.links[i]["source"]);
         
        }        
    } 
    //UpdateNodeColor();

   }
   UpdateNodeColor();

   upDateRows(d,v);
   //UpdateNodeColor(nx,ny);
  

}



this.bfs=function(val){
     for(var i=0;i<data.links.length;i++)
     {
         if(data.links[i]["source"]==val)
         {
            neighbor.push(data.links[i]["target"]);
         }
         if(data.links[i]["target"]==val)
         {
            neighbor.push(data.links[i]["source"]);
         }
     }

   if(neighbor.length!=0)
   {
       CreateNeighborArray(neighbor);

   }


}
this.insertedge=function(val){
    
    
    source=Number(val[1]);
    target=Number(val[3]);
    if(isNaN(source) || isNaN(target)){
        alert('error edge,Please choose in this format:(a,b) or (1,3)');
    }
    else{
        link={"source":source,"target":target};
        data.links.push(link); 
        for(var i=0;i<data.nodes.length;i++)
        {
            if(data.nodes[i]["value"]==source){
                    sourcex=data.nodes[i]["x"];
                    sourcey=data.nodes[i]["y"];}
            if(data.nodes[i]["value"]==target){
                    targetx=data.nodes[i]["x"];
                    targety=data.nodes[i]["y"];}
            
        }
    }

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
    var maxValue = this.storage[-1];
    // Replace the root node with the last node of the heap and remove the last node
    this.storage[-1] = this.storage.pop();
  
    swapRoot();
  
    // Preserve context for inner recursive helper function
    var that = this;
  
    // Recursive function to restore the heap property of the heap
    var reheapify = function(index) {
      // Set index of max value to current node's index
      var maxIndex = index;
      
          // Check first child node's value against current node
      if ((2*index + 1 < that.storage.length) && (that.storage[2*index + 1] < that.storage[index])) {
        // If greater then set index of max value to first child node's index
        maxIndex = 2*index + 1;
      }
     // Check second child node's value against current max node
     if ((2*index + 2 < that.storage.length) && (that.storage[2*index + 2] < that.storage[index])) {
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
     // n=this.storage[-1];
      reheapify(0);
    }, stepDelay);
    //update();
    // Return the removed max value from the heap
    return maxValue;

  };
  
  
}

var hp = new Heap();






