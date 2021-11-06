var textBox = document.getElementById('value');
var msg = document.getElementById('msg');

function InsertNode() {
	update();
	if (textBox.value != '') {
	    var val = Number(textBox.value);
		bstT.InsertVal(val);
	}
	else{
		msg.innerHTML='Please Enter a Number to Insert it!';
	}
	textBox.value = '';
	msg.innerHTML = '';
	textBox.focus();
	drawTree();
}

function RandomTreeNode() {
	for( var i=0 ; i<10 ;i++){
		var val = Number(getRandomInt(0, 1000));
		bstT.InsertVal(val);}
	textBox.value = '';
	msg.innerHTML = '';
	textBox.focus();
	drawTree();
}

function DeleteNode() {
	if (textBox.value != '') {
		var val = Number(textBox.value);
		bstT.DeleteVal(val);
		textBox.value = '';
		drawTree();
	}
	else{
		msg.innerHTML = 'Please Enter a value to delete it';
	}
	msg.innerHTML = '';
	textBox.focus();
}

function SearchNode() {
	if (textBox.value != '') {
		var val = Number(textBox.value);
		var node = bstT.Search(val);
		if (node == -1)
			msg.innerHTML = 'not found';
		else{
			update();

			//node.color="blue"
			msg.innerHTML = 'found';
		}
		bstT.UpDateColorSearch(val);

	}
	else{
		msg.innerHTML = 'Please Enter a value to Search';
	}
	bstT.UpDateColorSearch(val);
	
	textBox.value = '';
	textBox.focus();
	
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
		var node = bstT.successor(val);
		if (node == -1){
			msg.innerHTML = 'not found';
			return null;}
		else{
			msg.innerHTML = node;
			//return node;
		}
	}
	else{
		msg.innerHTML='Please Enter a Value to find Successor'
	}
	textBox.value = '';
	textBox.focus();
}
function Predecessor() {
	if (textBox.value != '') {
		var val = Number(textBox.value);
		var node = bstT.predecessor(val);
		if (node == -1)
			msg.innerHTML = 'not found';
		else
			msg.innerHTML = node;
	}
	else{
		msg.innerHTML='Please Enter a Value to Find Predecessor'
	}
	textBox.value = '';
	textBox.focus();
}
// traversal is a function
function Print(traversal) {
	var numbers = traversal.call(bstT);
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
				var val = Math.ceil((Math.random() * (toValue - FromValue + 1)) + FromValue)-1;
				bstT.InsertVal(val);
			}
		}
		else{
			for( var i=0 ; i<NumNodes ;i++)
			{	
				bstT.InsertVal(toValue);
			}

		}
	}
	textBox.value = '';

	textBox.focus();
	drawTree();
}
function Clear(){
	bstT.clear();
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
	if (bstT.root)
		treeData = bstT.root.json;
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
		.attr("d", function(d) {
			// If its child is the only one
			// move it to the right or to the left
			// (the D3.js tree's default will put the node
			// exactly below its parent)
			/*
			if (d.parent  && d.parent.children.length == 1) {
				if (d.data.direction == 'left') {
					if (d.parent.parent)
					//d.x -= width / 2;
						d.x -= Math.abs(d.parent.x - d.parent.parent.x) / 2;
					else
						d.x -= width / 4;
				} else {
					if (d.parent.parent)
					//d.x += width / 2;

						d.x += Math.abs(d.parent.x - d.parent.parent.x) / 2;
					else
						d.x += width / 4;
				}
			}

			return "M" + d.x + "," + d.y +
				"C" + (d.x + d.parent.x) / 2 + "," + (d.y + d.parent.y) / 2 +
				" " + (d.x + d.parent.x) / 2 + "," + (d.y + d.parent.y) / 2 +
				" " + d.parent.x + "," + d.parent.y;*/
				if (d.parent && d.parent.children.length == 1) {
					if (d.data.direction == 'right') {
						if (d.parent.parent)
							d.x += Math.abs(d.parent.x - d.parent.parent.x) / 2;
						else
							d.x += width / 4;
					}if (d.data.direction == 'left') {
						if (d.parent.parent)
							d.x -= Math.abs(d.parent.x - d.parent.parent.x) / 2;
						else
							d.x -= width / 4;
					}
				}
				else{
					if (d.data.direction == 'right') {
						if (d.parent.parent)
							d.x += Math.abs(d.parent.x - d.parent.parent.x) / 2;
						else
							d.x += width / 4;
					}if (d.data.direction == 'left') {
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
	//	.attr("stroke-dasharray","225 225")
	//	.attr("stroke-dashoffset",225)
	//	.transtion()
	//	.attr("stroke-dashoffset",0);
/*
// Updates the offset of dashes every 50ms:
var offset = 1;
setInterval( function() {
  link.style('stroke-dashoffset', offset);
  offset += 1; 
}, 50);*/

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
			});

/*
	node.append("searchStroke")
			.attr("r",30)
			.attr("stroke","black")
			.transition()
			.delay(250)
			.duration(1000)
			.ease("linear")
			.tween("pathTween", function(){return pathTween(path)});
			
	
		
*/
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

/*
	move();
	function move()
	{
		circle.transition()
		.duration(17500)
		.ease(d3.easeLinear)
		.attrTween("transform",animateOnPath(drownPath.node()))
		.on("end",move)
	}
	function animateOnPath(path){
		var l=path.getTotalLength();
		return function(i){
			return function(t){
				var p=path.getPointAtLength(t*l);
				return "translate("+p.x+","+p.y+")";
			}
		}
	}*/
	}
