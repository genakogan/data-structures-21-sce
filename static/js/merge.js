/*-----------------------varibales-------------------------------------*/
var textBox = document.getElementById('value');
var msg = document.getElementById('msg');
var IndexRow=[];
var sizeArray;
var elements=[];
var count=0;
var stepDelay = 900;
var GetSize= false;



/*-----------------------Functions------------------------------------- */

function BuildArray() {
    //update();
    
	//var val = Number(textBox.value);
    sizeArray=Number(textBox.value)
    if(GetSize==true){
        alert("Heap Already Has Size!!");
    }
    else{
        
         GetSize=true;
	     indexRow(sizeArray);
	     updateTable();
    }
        //create_table();
    //newdata(sizeArray);
	textBox.value = '';
	msg.innerHTML = '';
    textBox.focus();
   
    //drowTable();
}

function handleKeyPress(e) {
	var key = e.keyCode || e.which;
	msg.innerHTML = '';
	if (key == 13)
		InsertValue();
}

function InsertValue(){
    var val = Number(textBox.value);
    hp.insert(val);
  //  elements.push(val);
    update();
    textBox.value = '';
    msg.innerHTML = '';
    textBox.focus();
    
}

function PrintPng() {

	var node = document.getElementById('mycanvas');

	domtoimage.toPng(node)
		.then(function (dataUrl) {
			var img = new Image();
			img.src = dataUrl;
			downloadURI(dataUrl, "records.jpg")
		})
		.catch(function (error) {
			console.error('oops, something went wrong!', error);
		});

}



function downloadURI(uri, name) {
	var link = document.createElement("a");
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	delete link;
}


function Clear(){
    root = {};
nodes = tree(root);
root.parent = root;
root.px = root.x;
root.py = root.y;

 // remove exit nodes
 node = node.data(tree.nodes(root), function(d) { return d.id; });
 node.exit().remove();
 link = link.data(tree.links(nodes), function(d) { return d.source.id + "-" + d.target.id; });
  
// Add entering links
link.enter().insert("path", ".node")
    .attr("class", "link")
    .attr("d", function(d) {
      var o = {x: d.source.px, y: d.source.py};
      
      return diagonal({source: o, target: o});
    });
  
// Remove exit links
link.exit().remove();
 link.exit().remove();
 hp.storage=[];
 d3.select("drowTable").remove();
 d3.select("row").selectAll("td").remove();
 d3.select('.mycanvasArray').append('table').attr('class','drowTable').remove();
 d3.select("valColumn").selectAll("td").remove();
 d3.select("cells").selectAll("td").remove();

}

function Print() {
  print();
  }
  

/***************    --------    Heap Tree         -------------***************/

//'use strict';

// D3 code for tree visualization
//var width = 500,
//    height = 500;

var margin = {
    top:0,
    right: 90,
    bottom: 80,
    left: 0
},
width=500,
height=500;

var tree = d3.layout.tree()
    .size([width , height ]);

var root = {},
    nodes = tree(root);

root.parent = root;
root.px = root.x;
root.py = root.y;



var diagonal = d3.svg.diagonal();
var svg = d3.select("article").append("svg")
	//.attr("width",600)
	//.attr("height",500),
	.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(30,50)");

var initialNode = svg.selectAll(".node"),
    node = initialNode,
    links = tree.links(nodes);
    //link = svg.selectAll(".link");

var duration = 0.75*stepDelay;


// Restore to initial state
var restoreInitial = function() {
  // Reset root and nodes to initial state
  root = {};
  nodes = tree(root);
  root.parent = root;
  root.px = root.x;
  root.py = root.y;

  // Remove node from DOM
  animateSwap();

  // Reset node to initial state
  node = initialNode;
};


// Update the array of nodes for the d3 tree layout based on adding nodes during Heap methods
var insertNode = function(value) {
  
  if (nodes[0].value === undefined) {
    // If first value is added to heap, modify root node
    nodes[0].value = value;
    nodes[0].id = 0;
    AlertAlgo(0);
    elements.push(value);
  } else {
    // Add a new node to its parent in the heap.
    var n = {id: nodes.length, value: value},
        p = nodes[Math.ceil((nodes.length-2)/2)];
    if (p.children) {p.children.push(n); AlertAlgo(2) } else {p.children = [n]; AlertAlgo(1);}
    nodes.push(n);
    elements.push(value);
  
  }
 // d3.select("svg").remove();
  // Recompute the layout and data join
  node = node.data(tree.nodes(root), function(d) { return d.id; });
  //links = links.data(tree.links(nodes), function(d) { return d.source.id + "-" + d.target.id; });
  links = tree.links(nodes);

  var nodeEnter = node.enter().append('g')
      .attr('class', 'node');

  // Add entering nodes in the parent’s old position.
  nodeEnter.append("circle")
      .attr("r", 28)
    // .attr("d",function(d){     
    //   if (d.target.parent && d.target.parent.children.length == 1  ) {
    //   
    //       if (d.target.parent.parent)
    //         d.target.cx -= Math.abs(d.target.parent.x - d.target.parent.parent.x) / 2;
    //       else
    //       {
    //         d.target.cx -= width / 4;
    //       }		
    //     }
    // })
      .attr("cx", function(d) { return d.parent.px; })
      .attr("cy", function(d) { return d.parent.py; });

  // Add text to entering nodes
  nodeEnter.append('text')
      .attr("x", function(d) { return d.parent.px; })
      .attr("y", function(d) { return d.parent.py; })
      .attr('text-anchor', 'middle')
      //.attr('text-anchor', function(d) {
      //  return d.children || d._children ? 'end' : 'start'; })
      .text(function(d) { return d.value; })
      .style('fill-opacity', 1);
/*
  // Add entering links in the parent’s old position.
  links.enter().insert("path", ".node")
      .attr("class", "link")
      .attr("d", function(d) {
        return d.source.id +"->"+ d.target.id;
      })
      .attr('x1', function(d){return d.source.x;})
.attr('x2',function(d){return d.target.x;})
.attr('y1',function(d){return d.source.y;})
.attr('y2',function(d){return d.target.y;});*/
d3.select("#link").remove();
d3.select("#links").remove();
var linkWrapper = svg.append("g").attr("id","links").selectAll("path.link")
.data(links, function(d) { return d.target.id; });
linkWrapper.enter()
.append("line", "g")
.attr("class", "link")
.attr("id",function(d){
  return d.source.id +"->"+ d.target.id;
})
.attr("d",function(d){     
 // if (d.target.parent && d.target.parent.children.length == 1  ) {
     if(d.target.parent && d.target.parent.children.length == 1  && d.source.children.length==1){
	
			if (d.target.parent.parent)
				d.target.x -= Math.abs(d.target.parent.x - d.target.parent.parent.x) / 2;
			else
      {
				d.target.x -= width / 4;
  		}	
          if(d.source.children.length==1 && d.target.id==1 && nodes.length==2)	
             d.target.x -= width / 4;
    }
})

.attr('x1', function(d){return d.source.x;})
.attr('x2',function(d){return d.target.x;})
.attr('y1',function(d){return d.source.y+28;})
.attr('y2',function(d){return d.target.y-28;});
  // Transition nodes and links to their new positions.
  var t = svg.transition()
      .duration(duration);

  t.selectAll(".link")
      .attr("d", linkWrapper);

  t.selectAll("circle")
      .attr("cx", function(d) { return d.px = d.x; })
      .attr("cy", function(d) { return d.py = d.y; });

  t.selectAll("text")
      .attr("x", function(d) { return d.px = d.x; })
      .attr("y", function(d) { return d.py = d.y; });
};


// Update the array of nodes for the d3 tree layout based on swapping during Heap methods
var swapNodes = function(index, parentInd) {

  // Update nodes array
  // Find nodes at index and parentInd
  var current = nodes[index];
  var parent = nodes[parentInd];

  // Swap the x,y coordinates between node at index and node at parentInd
  current.x = current.x ^ parent.x;
  parent.x = current.x ^ parent.x;
  current.x = current.x ^ parent.x;

  current.px = current.px ^ parent.px;
  parent.px = current.px ^ parent.px;
  current.px = current.px ^ parent.px;

  current.y = current.y ^ parent.y;
  parent.y = current.y ^ parent.y;
  current.y = current.y ^ parent.y;

  current.py = current.py ^ parent.py;
  parent.py = current.py ^ parent.py;
  current.py = current.py ^ parent.py;

  // Swap the depth between node at index and node at parentInd
  current.depth = current.depth ^ parent.depth;
  parent.depth = current.depth ^ parent.depth;
  current.depth = current.depth ^ parent.depth;

  // Reassign children
  // Store non-index node child of parent (if it has one)
  parent.children = parent.children || [];

  // Track index of orphan node
  var orphanIndex;

  var parentOrphan = parent.children.filter(function(child, index) {
    if (child.id !== current.id) orphanIndex = index;
    return child.id !== current.id;
  });
  // Store current children for assigning correct parent
  var currentOrphans = current.children || [];
  // Assign parentInd node the children of index node
  parent.children = current.children;
  // Keep track of order of current children nodes
  // and assign parentOrphan to correct position in children array
  current.children = [parent];

  // Assign parentInd node and its child (that isn't the index node) as the child of index node
  if (orphanIndex !== undefined) {
    current.children.splice(orphanIndex,0,parentOrphan[0]);
  }
  // For grandParent's children, overwrite parent with current
  parent.parent.children = parent.parent.children || [];
  parent.parent.children.forEach(function(child, i, children) {
    if (child.id === parent.id) {
      children[i] = current;
    }
  });

  // Reassign parents
  // Assign parent of parentInd node as parent of index node
  current.parent = parent.parent === parent ? current : parent.parent;
  // Assign index node as the parent of parentInd node
  parent.parent = current;
  // Assign parent of parentOrphan node as index node
  parentOrphan.forEach(function(child) {
    child.parent = current;
  });
  // Assign parent of currentOrphans as parent node
  currentOrphans.forEach(function(child) {
    child.parent = parent;
  });


  // Swap actual nodes in nodes array
  var temp = nodes[index];
  nodes[index] = nodes[parentInd];
  nodes[parentInd] = temp;

  // Update root if one of the swapped nodes was at index zero of the nodes array
  if (index === 0 || parentInd === 0) {
    root = nodes[0];
    root.parent = root;
    root.px = root.x;
    root.py = root.y;
  }

  // Animate the swapping of the nodes
  animateSwap();
};


// For removeMax move last node to root
var swapRoot = function() {
  // Take last node and make root (put in nodes[0])
  var newRoot = nodes.pop();
  var oldRoot = nodes[0];
  nodes[0] = newRoot;
  root = newRoot;
  // Update x,y,px,py,depth
  newRoot.x = oldRoot.x;
  newRoot.y = oldRoot.y;
  newRoot.px = oldRoot.px;
  newRoot.py = oldRoot.xpy
  newRoot.depth = oldRoot.depth;
  // Update parents and children for new root
  oldRoot.children.forEach(function(child) {
    child.parent = newRoot;
  });
  newRoot.children = oldRoot.children;
  newRoot.parent.children = newRoot.parent.children.filter(function(child) {
    return child.id !== newRoot.id;
  });
  newRoot.parent = newRoot;
  newRoot.px = newRoot.x;
  newRoot.py = newRoot.y;
 // update();
  // Animate
  animateSwap();
};

// Perform animation of swapping of nodes and re-establishing links between swapped nodes
var animateSwap = function() {

  // remove exit nodes
  node = node.data(tree.nodes(root), function(d) { return d.id; });
  node.exit().remove();

  // Recompute links between nodes post swapping
  //link = link.data(tree.links(nodes), function(d) { return d.source.id + "-" + d.target.id; });
  d3.select("#link").remove();
d3.select("#links").remove();
  links = tree.links(nodes);



  // Add entering links
  /*
  links.enter().insert("path", ".node")
      .attr("class", "link")
      .attr("d", function(d) {
        
        return d.source.id +"->"+ d.target.id;
        
      })
      .attr('x1', function(d){return d.source.x;})
      .attr('x2',function(d){return d.target.x;})
      .attr('y1',function(d){return d.source.y;})
      .attr('y2',function(d){return d.target.y;});*/

  var linkWrapper = svg.append("g").attr("id","links").selectAll("path.link")
  .data(links, function(d) { return d.target.id; });
  linkWrapper.enter()
  .append("line", "g")
  .attr("class", "link")
  .attr("id",function(d){
    return d.source.id +"->"+ d.target.id;
  })

  .attr("d",function(d){     
    if (d.target.parent && d.target.parent.children.length == 1  && d.source.children.length==1) {
    
        if (d.target.parent.parent)
          d.target.x -= Math.abs(d.target.parent.x - d.target.parent.parent.x) / 2;
        else
        {
          d.target.x -= (width / 4);

        }	
        if(nodes.length==2)	
             d.target.x -= width / 4;	
      }
  })
  
  .attr('x1', function(d){return d.source.x;})
  .attr('x2',function(d){return d.target.x;})
  .attr('y1',function(d){return d.source.y+28;})
  .attr('y2',function(d){return d.target.y-28;});
  
  // Remove exit links
  linkWrapper.exit().remove();

  // Transition nodes and links to new positions
  var t = svg.transition()
      .duration(duration);
  AlertAlgo(3);
  t.selectAll(".link")
      .attr("d", linkWrapper);

  t.selectAll("circle")
      .attr("cx", function(d) { return d.px = d.x; })
      .attr("cy", function(d) { return d.py = d.y; });

  t.selectAll("text")
      .attr("x", function(d) { return d.px = d.x; })
      .attr("y", function(d) { return d.py = d.y; });
};




/*****************     Table  visualizate   *************** */

/* Function to do array of index */
function indexRow(val){
	var i;
     for(i=0;i<val;i++){
		IndexRow.push(i+1)
	 }
}

function updateTable(){
	d3.select('drowTable').remove();
    thead.append('tr')
    .selectAll('th')
    .data(IndexRow)
    .enter()
    .append('th')
    .html(function(col_names) {
       return col_names;
	});
	
	//update();
}
    
d3.select('drowTable').remove();

//var data = elements; // generate data array of elements
// create table, etc.
var table = d3.select('.mycanvasArray').append('table').attr('class','drowTable');
var thead = table.append('thead');
var tbody = table.append('tbody');
var row=tbody.append('tr').attr("class", "valColumn");

// append the header row
thead.append('tr')
    .selectAll('th')
    .data(IndexRow)
    .enter()
    .append('th')
    .html(function(col_names) {
       return col_names;
    });
    
function Update(){
    d3.select("row").selectAll("td").remove();
    var cells = row.selectAll("td")
    .attr('class','td-val')
  // .data(hp.storage)
   .data(hp.storage.sort(function(a, b){return b-a}))
    //.sort(d3.ascending)
    .enter()
    .append("td")
    .attr("style", "font-family: Courier")
    .attr("background-color","steelblue")
    .html(function(d) { 
        return (d);
     });
}
    
function update(){
    //alert(n);
   
      //  var sortFunction = d3.ascending;
// Instead of the line above, you could write some logic
// to decide whether sortFunction is d3.ascending or d3.descending

// Then you can write:
      //  tr.sort(function(a, b) {
      //   return sortFunction(a[k], b[k]);
      // })
       // hp.storage.sort(function(a, b){return a - b});
       //sortSheet();
   //   d3.select("tbody").selectAll("valColumn").remove();
      d3.select("row").selectAll("td").remove();
     //  tbody = table.append('tbody');
     //  row=tbody.append('tr').attr("class", "valColumn");
      
            //console.log(elements);
          //  var ident = function(d) { return d; };
         // hp.storage.sort(d3.ascending);

        // SwapCells();
      ///  console.log(n);
         var cells = row.selectAll("td")
         .attr('class','td-val')
        .data(hp.storage)
        //.data(hp.storage.sort(function(a, b){return b-a}))
         //.sort(d3.ascending)
         .enter()
         .append("td")
         .attr("style", "font-family: Courier")
         .attr("background-color","steelblue")
         .html(function(d) { 
             return (d);
          });
}
/*
function SwapCells(){

// remove exit cells
d3.select("valColumn").remove();


// Recompute links between nodes post swapping
//link = link.data(tree.links(nodes), function(d) { return d.source.id + "-" + d.target.id; });

  
// Add entering links
var cells = row.selectAll("td")
.attr('class','td-val')
// .data([1,2,3,6,5,2,1])
.data(hp.storage)
 // .sort(d3.ascending)
.enter()
.append("td")
.attr("style", "font-family: Courier")
.attr("background-color","steelblue")
.html(function(d) { 
    return ( d);
 });
  
// Remove exit links
d3.select("valColumn").remove();
// Transition nodes and links to new positions
var t = svg.transition()
    .duration(duration);
t.selectAll("td-val")
.attr("style", "font-family: Courier")
.attr("background-color","steelblue")
.html(function(d) { 
    return ( d);
 });


}*/
/* ------------------------------------------------------ algorithim bar ------------------------------------------------ */  
  
 d3.select("#algo").selectAll("div").remove();
var algorithim=["Add a root for the tree","Add Child At Left","Add Child at Right","If Parent value Smaller than current-SWITCH"];

var s=d3.select("#algo")
  .selectAll("div")
  .attr("class","algDIV")
  .data(algorithim)
  .enter()
  .append("div")
  .text(function(d){
    return d;
  })
  .attr("background-color"," steelblue")
 //.attr("style",function(d){
//    return d==algorithim[ind] ? "background-color: Red; " : "background-color: linear-gradient(to right, #77b1f3, #edacf3) !important";
// })

// bar for adding
function AlertAlgo(ind){   

   d3.select("#algo").selectAll("div").remove();
   var algorithim=["Add a root for the tree","Add Child At Left","Add Child at Right","If Parent value Smaller than current-SWITCH"];
   
   var s=d3.select("#algo")
     .selectAll("div")
     .attr("class","algDIV")
     .data(algorithim)
     .enter()
     .append("div")
     .text(function(d){
       return d;
     })
     .attr("style",function(d){
        return d==algorithim[ind] ? "background-color: AliceBlue " : "background-color: PapayaWhip";
     })
   // .transition().duration(2000000000000).attr("style","background-color: red");
  
   }


//bar for delete

function DeleteAlertAlgo(ind){   
    d3.select("#algo").selectAll("div").remove();
    var algorithim=["delete root","Add Child At Left","Add Child at Right","If Parent value Smaller than current-SWITCH"];
    
    var s=d3.select("#algo")
      .selectAll("div")
      .attr("class","algDIV")
      .data(algorithim)
      .enter()
      .append("div")
      .text(function(d){
        return d;
      })
      .attr("style",function(d){
         return d==algorithim[ind] ? "background-color: AliceBlue " : "background-color: PapayaWhip";
      })
    // .transition().duration(2000000000000).attr("style","background-color: red");
   
    }