/*-----------------------varibales-------------------------------------*/
var textBox = document.getElementById('value');
var msg = document.getElementById('msg');
var IndexRow=[];
var sizeArray;
var elements=[],nodesArray=[],NodeOne=["1"],getColors=[];
var count=0;
var stepDelay = 900;
var GetSize= false;
var sourcex,sourcey,targetx,targety;
var deg,valuee;
var systemON = false;
/*-----------------------Functions------------------------------------- */

function Build() {
    //update();
    
	//var val = Number(textBox.value);
    sizeArray=Number(textBox.value)
    if(GetSize==true){
        alert("You Already Choose Size!!");
    }
    else{
        
         GetSize=true;
         deg=360/sizeArray;

         CreateDataCoordinates(sizeArray);
         indexRow(sizeArray);
         CreateBasicTable(sizeArray);
        
         //DrowCircles();
	     
	    // DrowCircles(sizeArray);
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

function InsertNode(){
    var val = Number(textBox.value);
    hp.insert(val);
  //  elements.push(val);
  //  update();
    textBox.value = '';
    msg.innerHTML = '';
    textBox.focus();
    
}


//InsertEdges
function InsertEdges(){
    var val=(document.getElementById('valueEdge').value)
    //var val = Number(textBox.getElementById("valueEdge"));
    hp.insertedge(val);
  //  elements.push(val);
  //  update();
  if(sourcex!= undefined && sourcey !=undefined && targetx!= undefined && targety !=undefined)
         CreateLines();
    textBox.value = '';
    msg.innerHTML = '';
    textBox.focus();
    
}


function BfsSearch(){
  //  CreateButton();
  
  
    document.getElementById("Next").style.display = "block";
    
    var val=(document.getElementById('StartNode').value)
    nodesArray.push(Number(val));
    for(var i=0;i<sizeArray;i++)
    {
        if(data.nodes[i]["value"]!=val)
        {
            nodesArray.push(data.nodes[i]["value"]);
        }
    }
    hp.initArrays(val);
  //  hp.bfs(val);
}


function Next(){
    hp.updateArrays();
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

/******************************************************************************* */

var margin = {
    top:300,
    right: 300,
    bottom: 80,
    left: 500
},
width=300,
height=150;

var svg = d3.select(".mycanvasArray").append("svg")
	//.attr("width",600)
	//.attr("height",500),
	.attr("width",(width + margin.left + margin.right))
    .attr("height", (height + margin.top + margin.bottom))
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var lines = svg.attr("class", "line")


/********* SVG2  ********** */

/************ CREATE NODES **************/

var coorxy=[];
var coorx=[];
var coory=[];
var dataNodes=[];
var circles,circleAttributes,text;

var insertNode = function(value) {
   dataNodes.push(value);
   updateTable(dataNodes);

}

function CreateDataCoordinates(val){
    //deg=60;
    deg=360/sizeArray;
    temp=deg;
    for(var i=0;i<sizeArray+1;i++)
    {
        x=150*(Math.sin(Math.PI * 2 * temp / 360));
        y=150*(Math.cos(Math.PI * 2 * temp / 360));
        coorx.push(x);
        coory.push(y);
        coorxy.push([x,y]);
        temp+=deg;
    }
    DrowCircles(sizeArray);
    //drowGraph();

}


var DrowCircles= function(value){
   // svg.append("circle1")
   //     .attr("r", 150)
   //     .attr("stroke","red")
   //     .attr("fill","white");

}
var drowGraph=function(){

     circles = svg.selectAll("circle")
                              .data(coorxy)
                              .enter()
                              .append("circle")
    // circleAttributes = circles
                              .attr("cx", function (d) { return d[0]; })
                              .attr("cy", function (d) { return d[1]; })
                              .attr("r", 20 )
                              .attr("stroke","steelblue")
                              .attr("fill","white")
                              .style('position','relative');

     text =  svg .selectAll("text")
                    .data(coorxy)
                    .enter()
                    .append("text")
                    .attr("x", function (d) { return d[0]-4; })
                    .attr("y", function (d) { return d[1]+5; })
                    .data(dataNodes)
                    .text(function(d) {
                       return d;
                }).attr("style","color:Gray");
    
}

function CreateLines(){

     var lines = svg.append("line")
                   .style("stroke", "black")
                   .attr("x1", sourcex)
                   .attr("y1", sourcey)
                   .attr("x2", targetx)
                   .attr("y2", targety);
                   circles.raise();
                   text.raise();
  
}
function GetColor(){
    for(var i=0;i<sizeArray;i++){
        getColors.push(data.colors[i]["color"])
       }
    
}
function UpdateNodeColor(){
   // d3.select("mycanvasArray").select(svg).remove();
   //valuee=val;
   
  
   

    svg.selectAll("circle").remove();
    svg .selectAll("text").remove();
  //  circles.selectAll("circle").remove();
    circles = svg.selectAll("circle")
                           .data(coorxy)
                           .enter()
                           .append("circle")
 // circleAttributes = circles
                          .attr("cx", function (d) { return d[0]; })
                          .attr("cy", function (d) { return d[1]; })
                          .attr("r", 20 )
                          .attr("stroke","steelblue")
                          //.enter()
                           .data(data.colors)
                           .attr("fill",function(d,i){
                                    return data.colors[i]["color"];
                              
                           })
                           //.style('position','relative');
  text =  svg .selectAll("text")
                 .data(coorxy)
                 .enter()
                 .append("text")
                 .attr("x", function (d) { return d[0]-4; })
                 .attr("y", function (d) { return d[1]+5; })
                 .data(dataNodes)
                 .text(function(d) {
                    return d;
             })
             .style("color","Gray");
             
             text.raise();
}


/*********** CREATE BASIC TABLE **************/
function indexRow(val){
	var i;
     for(i=0;i<val;i++){
		IndexRow.push(i+1)
	 }
}

var table = d3.select('.mycanvasArray').append('table').attr('class','drowTable');
var thead = table.append('thead');
var tbody = table.append('tbody');
var row=tbody.append('tr').attr("class", "valColumn");

function CreateBasicTable(size){
            
    // append the header row
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

function updateTable(dataSelect){
    d3.select("row").selectAll("td").remove();
    var cells = row.selectAll("td")
    .attr('class','td-val')
  // .data(hp.storage)
   .data(dataSelect)
    //.sort(d3.ascending)
    .enter()
    .append("td")
    .attr("style", "font-family: Courier")
    .attr("background-color","steelblue")
    .html(function(d) { 
        return (d);
     });
 
}
var table_,thead_,tbody_;
var margin = {
    top:400,
    right: 300,
    bottom: 500,
    left: 50
},
width=500,
height=500;

//var svg2 = d3.select(".mycanvasBfs").append("svg")
//              
//                //.attr("width",600)
//                //.attr("height",500),
//                .attr("width", (width1 + margin2.left + margin2.right))
//                .attr("height", (height2 + margin2.top + margin2.bottom))
//                .style("color","red")
//                .append("g")
//                .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");             
//

var table1,thead1,tbody1,row1,row2;
function CreateInit(){
    
            table1 = d3.select(".mycanvas #tableBfs").append('table').attr('class','drowTable')
                       .attr("width",500)
                       .attr("height", 20)
                       .attr("top", 300)
                       .attr("right",200)
                       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            thead1 = table1.append('thead');
            tbody1 = table1.append('tbody');
            row1=tbody1.append('tr').attr("class", "valColumn");
            row2=tbody1.append('tr').attr("class", "valColumn");
            // append the header row
            thead1.append('tr')
                  .selectAll('th')
                  .data(nodesArray)
                  .enter()
                  .append('th')
                  .html(function(col_names) {
                  return col_names;
                  });
              
            d3.select("row").selectAll("td").remove();
            var cells = row1.selectAll("td")
                            .attr('class','td-val')
                            // .data(hp.storage)
                            .data(d)
                            //.sort(d3.ascending)
                            .enter()
                            .append("td")
                            .attr("style", "font-family: Courier")
                            .attr("background-color","steelblue")
                            .html(function(d) { 
                                return (d);
                             });
                         
            // d3.select("row").selectAll("td").remove();
                            row2.selectAll("td")
                             .attr('class','td-val')
                            // .data(hp.storage)
                            .data(v)
                             //.sort(d3.ascending)
                             .enter()
                             .append("td")
                             .attr("style", "font-family: Courier")
                             .attr("background-color","steelblue")
                             .html(function(d) { 
                                 return (d);
              });

}


/**  INIT ARRAYS**/
function CreateInitArrays(){
     table_ = d3.select(".mycanvas #tableBfs").selectAll('div').data(nodesArray).enter().append('div')//.attr('class','drowTable')
                   .attr("width", (width + margin.left + margin.right))
                   .attr("height", (height + margin.top + margin.bottom))
                   .attr("top", (  margin.top + margin.bottom))
                  //   .style("color","red")
                  //   .append("g")
                   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");;
    // thead_ = table_.append('thead');
    // tbody_ = table_.append('tbody');
    //var row1=tbody1.append('tr').attr("class", "valColumn");
   // var row2=tbody1.append('tr').attr("class", "valColumn");

        // append the header row
     //   var s=table_.append('table').attr('class','drowTable')
     //       .selectAll('div')
     //       .data(NodeOne)
     //       .enter();
           //.append('div')
           //.html(function(col_names) {
           //   return col_names;
           //});
          //  updateTable(d);
    //    //update();
    //   rows_ = s.selectAll('div')
    //                  .data(data.nodes)
    //                  .enter()
    //                  .append('p');

}

/***CREATE NEIGHBOR ARRAY* */

function CreateNeighborArray(arr){
 //d3.select(".mycanvasBfs")
    var table1 = table_.append('table').attr('class','drowTable')
         .attr("width",500)
         .attr("height", 20)
         .attr("top", 300)
        //   .style("color","red")
        //   .append("g")
  //  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");;
    var thead1 = table1.append('thead');
    var tbody1 = table1.append('tbody');
   // var row1=tbody1.append('tr').attr("class", "valColumn");
   // var row2=tbody1.append('tr').attr("class", "valColumn");
    // append the header row
    thead1.append('tr')
    .selectAll('th')
    .data(arr)
    .enter()
    .append('th')
    .html(function(col_names) {
    return col_names;
    });
}
var cells;

function GetIndexOfNode(n){
    for(var i=0;i<sizeArray;i++)
    {
      if(data.colors[i]["node"]==n)
         return i;
    }
  }
function upDateRows(data1,data2)
{
  // d3.select("tbody1").selectAll("td").remove();
  row1.selectAll("td").remove();
  row2.selectAll("td").remove();

 cells = row1.selectAll("td")
                .attr('class','td-val')
                // .data(hp.storage)
                .data(data1)
                //.sort(d3.ascending)
                .enter()
                .append("td")
                .attr("style", "font-family: Courier")
                .html(function(d) { 
                    return (d);
                 });
              // .data(data.colors)
              // .style("background-color",function(d){
              //     
              //     if(d["color"] =="Gray")
              //         return "red";
              //    
////
              // });

// d3.select("row").selectAll("td").remove();
                row2.selectAll("td")
                 .attr('class','td-val')
                // .data(hp.storage)
                .data(data2)
                 //.sort(d3.ascending)
                 .enter()
                 .append("td")
                 .attr("style", "font-family: Courier")
                // .attr("background-color","steelblue")
                 .html(function(d) { 
                     return (d)
                 });
             // .data(data.colors)
             // .style("background-color",function(d){
             //     if(d["color"] =="Gray")
             //         return "red";
             //    
             // });
  //
 // UpdateColors(data.colors);

}








































