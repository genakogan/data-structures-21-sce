var textBox = document.getElementById('value');
var msg = document.getElementById('msg');
// || getRandomInt(0, 1000)
function InsertNode() {
	update();
	if (textBox.value != '') {
	var val = Number(textBox.value);
	bst.InsertVal(val);
	}
	else{
		msg.innerHTML="Please Enter A value to Insert";
	}
	textBox.value = '';
	msg.innerHTML = '';
	textBox.focus();
	drawTree();
}

function RandomTreeNode() {
	for( var i=0 ; i<10 ;i++){
		var val = Number(getRandomInt(0, 1000));
		bst.InsertVal(val);}
	textBox.value = '';
	msg.innerHTML = '';
	textBox.focus();
	drawTree();
}

function DeleteNode() {
	if (textBox.value != '') {
		var val = Number(textBox.value);
		bst.DeleteVal(val);
     
		textBox.value = '';
		drawTree();
	}
	else{
		msg.innerHTML='Please Enter A value to Delete it!';
	}
	msg.innerHTML = '';
	textBox.focus();
}

function SearchNode() {
	if (textBox.value != '') {
		var val = Number(textBox.value);
		var node = bst.Search(val);
		if (node == -1 )
			msg.innerHTML = 'not found';
		else{
			update();

			//node.color="blue"
			msg.innerHTML = 'found';
		}

	}
	else{
		msg.innerHTML='Pleas Enter a Value to Search';
	}
	textBox.value = '';
	textBox.focus();
	bst.UpDateColorSearch(val);
}

function InOrder(){
	//bst.inorderColor();
	Print(bst.inorder);
	
}

function PrintPng3(){
	if (window.navigator.msSaveBlob)
	{
		window.navigator.msSaveBlob(document.querySelector("#mycanvas").toBlob(),"canvas-image.png")
	}
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

function Successor() {
	if (textBox.value != '') {
		var val = Number(textBox.value);
		var secc=bst.successor(val);
		if(secc == -1){
		   msg.innerHTML="There is no successor for ";
		   msg.innerHTML=val;}
		else{
            msg.innerHTML=secc;
		}
		
		
		
	//var node = bst.successor(val);
	//if (node == -1){
	//	msg.innerHTML = 'not found';
	//	return null;}
	//else{
	//	msg.innerHTML = node.value;
	//	return node.value;}
	}
	else{
		msg.innerHTML='Please Enter a Value to Find Successor';
	}
	textBox.value = '';
	textBox.focus();
}
function Predecessor() {
	if (textBox.value != '') {
		var val = Number(textBox.value);
		var node = bst.predecessor(val);
		if (node == -1)
			msg.innerHTML = 'not found';
		else
			msg.innerHTML = node;
	}
	else{
		msg.innerHTML='Please Enter a Value to Find Predecessor!';
	}
	textBox.value = '';
	textBox.focus();
}
// traversal is a function
function Print(traversal) {
	var numbers = traversal.call(bst);
	msg.innerHTML = numbers.join(', ');
	textBox.focus();
}

function handleKeyPress(e) {
	var key = e.keyCode || e.which;
	msg.innerHTML = '';
	if (key == 13)
		InsertNode();
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function Go(){
	Clear();
	var toValue=Number(document.getElementById('RangeTo').value);
	var FromValue=Number(document.getElementById('RangeFrom').value);
	var NumNodes=Number(document.getElementById('NumNodes').value);
	if (toValue < FromValue)
		msg.innerHTML = 'You should choose legal Range';
	else{
		if(toValue!=FromValue){
			for( var i=0 ; i<NumNodes ;i++)
			{
				if(toValue-FromValue==1)
					val=Number(getRandomInt(FromValue,toValue));
				else 
				    //var val=Math.floor((Math.random() * toValue) + FromValue);
				    var val = Number(Math.ceil((Math.random() * (toValue - FromValue )) + FromValue));
				bst.InsertVal(val);
				
			}
			drawTree();
		}
		else{
			for( var i=0 ; i<NumNodes ;i++)
			{	
				bst.InsertVal(toValue);
			}
			drawTree();

		}
	}
	//textBox.getElementById('RangeTo').value='';
	//textBox.getElementById('RangeFrom').value='';
	//textBox.getElementById('NumNodes').value='';
	//textBox.getElementById('RangeTo').focus();
	//textBox.getElementById('RangeFrom').focus();
	//textBox.getElementById('NumNodes').focus();
//
	//textBox.value = '';
	//textBox.focus();
	////drawTree();
	//textBox.getElementById('RangeTo').value='';
	//textBox.getElementById('RangeFrom').value='';
	//textBox.getElementById('NumNodes').value='';
	//textBox.getElementById('RangeTo').focus();
	//textBox.getElementById('RangeFrom').focus();
	//textBox.getElementById('NumNodes').focus();
}
function Clear(){
	bst.clear();
	treeData=[];
	d3.select("svg").remove();
}

function update(){
	drawTree();
}

// Draws the tree in treeData
function drawTree() {

	// Clear the canvas
	d3.select("svg").remove();

	// This json represents the tree
	var treeData;
	// If the tree is not empty
	if (bst.root)
		treeData = bst.root.json;
	else
		return;

	// set the dimensions and margins of the diagram
	var margin = {
			top:40,
			right: 90,
			bottom: 50,
			left: 90
		},
		width=1000,
		height=600;
		//width = window.innerWidth - 10 - margin.left - margin.right,
		//height = window.innerHeight - 45 - margin.top - margin.bottom;
		

	// declares a tree layout and assigns the size
	var treemap = d3.tree()
		.size([width, height]);

	//  assigns the data to a hierarchy using parent-child relationships
	var nodes = d3.hierarchy(treeData);

	// maps the node data to the tree layout
	nodes = treemap(nodes);

//console.log(nodes);

	//create ordinail scales
	var color=d3.scaleOrdinal(['#C90676']);

	// append the svg obgect to the body of the page
	// appends a 'group' element to 'svg'
	// moves the 'group' element to the top left margin
	var svg = d3.select("article").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom),
		g = svg.append("g")
		.attr("transform",
			"translate(" + margin.left + "," + margin.top + ")");

	// adds the links between the nodes
	var link = g.selectAll(".link")
		.data(nodes.descendants().slice(1))
		.enter().append("path")
		.attr("class", "link")
		.transition()
		.attr("d", function(d) {
			// If its child is the only one
			// move it to the right or to the left
			// (the D3.js tree's default will put the node
			// exactly below its parent)
			if (d.parent && d.parent.children.length == 1) {
				if (d.data.direction == 'right') {
					if (d.parent.parent)
						d.x += Math.abs(d.parent.x - d.parent.parent.x) / 2;
					else
						d.x += width / 4;
				} else {
					if (d.parent.parent)
						d.x -= Math.abs(d.parent.x - d.parent.parent.x) / 2;
					else
						d.x -= width / 4;
				}
			}

			return "M" + d.x + "," + d.y +
				"C" + (d.x + d.parent.x) / 2 + "," + (d.y + d.parent.y) / 2 +
				" " + (d.x + d.parent.x) / 2 + "," + (d.y + d.parent.y) / 2 +
				" " + d.parent.x + "," + d.parent.y;
		});

	// adds each node as a group
	var node = g.selectAll(".node")
		.data(nodes.descendants())
		.enter().append("g")
		.attr("class", function(d) {
			return "node" +
				(d.children ? " node--internal" : " node--leaf");
		})
		.attr("transform", function(d) {
			return "translate(" + d.x + "," + d.y + ")";
		});
		//.ease(d3.easeLinear)
       // .duration(2000)attr("duration",10200);


	// adds the circle to the node
	node.append("circle")
		.attr("r", 30)
		.attr("stroke",function(d){
			return d.data.color;})
		.style("fill",function(d){
			if(d.data.color=="linear-gradient(to right, #67b26b, #4ca2cb) !important")
			  return d3.rgb( 204, 230, 255 )
			})

	// adds the text to the node
	node.append("text")
		.attr("dy", ".35em")
		.attr("y", function(d) {
			return 0;
		})
		.style("text-anchor", "middle")
		.text(function(d) {
			return d.data.name;
		});
	//	var duration = 0.75*970;

	//var t = svg.transition()
	//	        .duration(duration);
	////t.selectAll(".link")
	////	.attr("d", link);
	//t.selectAll("circle")
	//	.attr("fill", function(d) {if (d.data.color=="blue" )
	//	 return d3.rgb( 204, 230, 255 );  });
	

	}

	function updateTree(){
		var duration = 0.75*900;

		// Clear the canvas
		d3.select("svg").remove();

		// This json represents the tree
		var treeData;
		// If the tree is not empty
		if (bst.root)
			treeData = bst.root.json;
		else
			return;
	
		// set the dimensions and margins of the diagram
		var margin = {
				top:40,
				right: 90,
				bottom: 50,
				left: 90
			},
			width=1000,
			height=600;
			//width = window.innerWidth - 10 - margin.left - margin.right,
			//height = window.innerHeight - 45 - margin.top - margin.bottom;
			
	
		// declares a tree layout and assigns the size
		var treemap = d3.tree()
			.size([width, height]);
	
		//  assigns the data to a hierarchy using parent-child relationships
		var nodes = d3.hierarchy(treeData);
	
		// maps the node data to the tree layout
		nodes = treemap(nodes);
	
	//console.log(nodes);
	
		//create ordinail scales
		var color=d3.scaleOrdinal(['#C90676']);
	
		// append the svg obgect to the body of the page
		// appends a 'group' element to 'svg'
		// moves the 'group' element to the top left margin
		var svg = d3.select("article").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom),
			g = svg.append("g")
			.attr("transform",
				"translate(" + margin.left + "," + margin.top + ")");
	
		// adds the links between the nodes
		var link = g.selectAll(".link")
			.data(nodes.descendants().slice(1))
			.enter().append("path")
			.attr("class", "link")
			.transition()
			.attr("d", function(d) {
				// If its child is the only one
				// move it to the right or to the left
				// (the D3.js tree's default will put the node
				// exactly below its parent)
				if (d.parent && d.parent.children.length == 1) {
					if (d.data.direction == 'left') {
						if (d.parent.parent)
							d.x -= Math.abs(d.parent.x - d.parent.parent.x) / 2;
						else
							d.x -= width / 4;
					} else {
						if (d.parent.parent)
							d.x += Math.abs(d.parent.x - d.parent.parent.x) / 2;
						else
							d.x += width / 4;
					}
				}
	
				return "M" + d.x + "," + d.y +
					"C" + (d.x + d.parent.x) / 2 + "," + (d.y + d.parent.y) / 2 +
					" " + (d.x + d.parent.x) / 2 + "," + (d.y + d.parent.y) / 2 +
					" " + d.parent.x + "," + d.parent.y;
			});
	
		// adds each node as a group
		var node = g.selectAll(".node")
			.data(nodes.descendants())
			.enter().append("g")
			.attr("class", function(d) {
				return "node" +
					(d.children ? " node--internal" : " node--leaf");
			})
			.attr("transform", function(d) {
				return "translate(" + d.x + "," + d.y + ")";
			});
			//.ease(d3.easeLinear)
		   // .duration(2000)attr("duration",10200);
	
		//var t = svg.transition()
		//   .duration(duration);
		// adds the circle to the node
		node.append("circle")
			.attr("r", 30)
			.attr("stroke",function(d){
				return d.data.color;})

			.style("fill",function(d){
			//	if(d.data.color=="linear-gradient(to right, #67b26b, #4ca2cb) !important")
			//	  return d3.rgb( 204, 230, 255 )
				if(d.data.color=="blue")
					return d3.rgb(255,0,0)
			    else{
					return "Black";
				}
				});
	
		// adds the text to the node
		node.append("text")
			.attr("dy", ".35em")
			.attr("y", function(d) {
				return 0;
			})
			.style("text-anchor", "middle")
			.text(function(d) {
				return d.data.name;
			});
		//	var duration = 0.75*970;
	
		var t = svg.transition()
			        .duration(duration);
		//t.selectAll(".link")
		//	.attr("d", link);
		t.selectAll("circle")
			.duration(duration)
			.attr("fill", function(d) {if (d.data.color=="blue" )
			 return d3.rgb( 204, 230, 255 );  })
			 .duration(duration);
			  
	  
	  }
		  
