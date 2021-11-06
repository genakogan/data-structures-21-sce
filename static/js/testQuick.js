var replaced;
function parse(str) {
     replaced = str.replace(/\s/g, ''); /*remove space from string */
    return JSON.parse(replaced);
}


var arr;
$(document).ready(() => {

$('#save-settings').click(() => {
    try {
        if ($('#arr').val() != '') {
            arr = parse($('#arr').val());
            generateBlocks(arr);
            //$container = displayArray(arr);
            sorted = false;
        }
        $("#settings-error").text("");
        
        $('p#success').text('Saved!');
    }
    catch (e) {
        $("p#success").text("");
        $('#settings-error').text(e);
    }
});
});


var container = document.getElementById("array");
var containerAlgo=document.getElementById("algo");
var value,count=0;

//generate blocks with specific array
function generateBlocks(array){
    for (var i = 0; i < array.length; i++) {
        // Return a value from 1 to 100 (both inclusive)
         value =array[i];
    
        // Creating element div
        var array_ele = document.createElement("div");
    
        // Adding class 'block' to div
        array_ele.classList.add("block");
    
        // Adding style to div
        array_ele.style.height = `${30 * 1}px`;
        array_ele.style.transform = `translate(${i * 30}px)`;
    
        // Creating label element for displaying
        // size of particular block
        var array_ele_label =
        document.createElement("label");
        array_ele_label.classList.add("block_id");
        array_ele_label.innerText = value;
    
        // Appending created elements to quickPage.html
        array_ele.appendChild(array_ele_label);
        container.appendChild(array_ele);
    }


}

//generate array with specific blocks
function generatearray_specif() {
  //  for (var i = 0; i < v; i++) {
        // Return a value from 1 to 100 (both inclusive)
        // var value = Math.ceil(Math.random() * 100);
    if(count!=val){
        value=Number(document.getElementById("value").value);
        count++;
    
        // Creating element div
        var array_ele = document.createElement("div");
    
        // Adding class 'block' to div
        array_ele.classList.add("block");
    
        // Adding style to div
        array_ele.style.height = `${30 * 1}px`;
        array_ele.style.transform = `translate(${count * 30}px)`;
    
        // Creating label element for displaying
        // size of particular block
        var array_ele_label =
        document.createElement("label");
        array_ele_label.classList.add("block_id");
        array_ele_label.innerText = value;
    
        // Appending created elements to quickPage.html
        array_ele.appendChild(array_ele_label);
        container.appendChild(array_ele);
   }else{
	   alert("Full Elements!")
   }

   // }
    }
// Function to generate the array of random blocks
function generatearray(v) {
for (var i = 0; i < v; i++) {
	// Return a value from 1 to 100 (both inclusive)
	 value = Math.ceil(Math.random() * 100);

	// Creating element div
	var array_ele = document.createElement("div");

	// Adding class 'block' to div
	array_ele.classList.add("block");

	// Adding style to div
	array_ele.style.height = `${30 * 1}px`;
	array_ele.style.transform = `translate(${i * 30}px)`;

	// Creating label element for displaying
	// size of particular block
	var array_ele_label =
	document.createElement("label");
	array_ele_label.classList.add("block_id");
	array_ele_label.innerText = value;

	// Appending created elements to quickPage.html
	array_ele.appendChild(array_ele_label);
	container.appendChild(array_ele);
}
}


// Function to generate indexes
var count_container =
document.getElementById("count");
function generate_idx(v) {
        for (var i = 0; i <v; i++) {
        	// Creating element div
        	var array_ele2 = document.createElement("div");
        
        	// Adding class 'block2' to div
        	array_ele2.classList.add("block2");
        
        	// Adding style to div
        	array_ele2.style.height = `${20}px`;
        	array_ele2.style.transform = `translate(${i * 30}px)`;
        
        	// Adding indexes
        	var array_ele_label2 =
        	document.createElement("label");
        	array_ele_label2.classList.add("block_id3");
        	array_ele_label2.innerText = i;
        
        	// Appending created elements to index.html
        	array_ele2.appendChild(array_ele_label2);
        	count_container.appendChild(array_ele2);
        }
 }
 var array_ele2Algo;
async function lometo_partition(l, r, delay = 700) {
        var blocks = document.querySelectorAll(".block");
        document.getElementById("alg1").style.backgroundColor="white"
        document.getElementById("alg2").style.backgroundColor="white"
        document.getElementById("alg3").style.backgroundColor="white"
        document.getElementById("alg4").style.backgroundColor="white"


        // Storing the value of pivot element
        var pivot =
        Number(blocks[r].childNodes[0].innerHTML);
        var i = l - 1;
        blocks[r].style.backgroundColor = "red";
        document.getElementById("alg1").style.backgroundColor="red"
        document.
        getElementsByClassName("range")[0].innerText = `[${l},${r}]`;

 /** 
        
        // Creating element div
         array_ele2Algo = document.createElement("div");
        // Adding class 'block2' to div
        array_ele2Algo.classList.add("block5");
        // Adding style to div
        array_ele2Algo.style.height = `${30}px`;
        array_ele2Algo.style.width = `${100}px`;
        array_ele2Algo.style.transform = `translate(${i * 30}px)`;

        var array_ele_label2 =
        document.createElement("label");
        array_ele_label2.classList.add("block_id3");
        array_ele_label2.innerText = "Pivot is "+pivot;

        array_ele2Algo.appendChild(array_ele_label2);
        count_container.appendChild(array_ele2Algo);

/** */

        for (var j = l; j <= r - 1; j++) {
        	// To change background-color of the
        	// blocks to be compared
        	blocks[j].style.backgroundColor = "yellow";
        	// To wait for 700 milliseconds
        	await new Promise((resolve) =>
        	setTimeout(() => {
        		resolve();
        	}, delay)
        	);
        	var value =
        	Number(blocks[j].childNodes[0].innerHTML);
        
        	// To compare value of two blocks
        	if (value < pivot) {
        	i++;
        	var temp1 = blocks[i].style.height;
        	var temp2 = blocks[i].childNodes[0].innerText;
        	blocks[i].style.height = blocks[j].style.height;
        	blocks[j].style.height = temp1;
        	blocks[i].childNodes[0].innerText =
        	blocks[j].childNodes[0].innerText;
        	blocks[j].childNodes[0].innerText = temp2;
        	blocks[i].style.backgroundColor = "orange";
            document.getElementById("alg2").style.backgroundColor="orange"
        	if (i != j) {blocks[j].style.backgroundColor = "pink"; document.getElementById("alg3").style.backgroundColor="pink"; }

        	//To wait for 700 milliseconds
        	await new Promise((resolve) =>
        		setTimeout(() => {
        		resolve();
        		}, delay)
        	);
        	} else {blocks[j].style.backgroundColor = "pink" ; document.getElementById("alg3").style.backgroundColor="pink";  };
        }
// Swapping the ith with pivot element
        i++;
        var temp1 = blocks[i].style.height;
        var temp2 = blocks[i].childNodes[0].innerText;
        blocks[i].style.height = blocks[r].style.height;
        blocks[r].style.height = temp1;
        blocks[i].childNodes[0].innerText =
        blocks[r].childNodes[0].innerText;
        blocks[r].childNodes[0].innerText = temp2;
        blocks[r].style.backgroundColor = "pink";
        blocks[i].style.backgroundColor = "green";
        document.getElementById("alg4").style.backgroundColor="green"

        // To wait for 2100 milliseconds
        await new Promise((resolve) =>
        	setTimeout(() => {
        	resolve();
        	}, delay * 3)
        );
        document.getElementsByClassName("range")[0].innerText = "";
        for (var k = 0; k < v; k++){
        blocks[k].style.backgroundColor = "#6b5b95";
       

        }

        document.getElementById("alg1").style.backgroundColor="white"
        document.getElementById("alg2").style.backgroundColor="white"
        document.getElementById("alg3").style.backgroundColor="white"
        document.getElementById("alg4").style.backgroundColor="white"
        return i;

     

   
}

// Asynchronous QuickSort function
async function QuickSort(l, r, delay = 100) {
        if (l < r) 
        {
        	// Storing the index of pivot element after partition
        	var pivot_idx = await lometo_partition(l, r);
        	// Recursively calling quicksort for left partition
        	await QuickSort(l, pivot_idx - 1);
            //document.getElementById("alg3").style.backgroundColor="orange";
        	// Recursively calling quicksort for right partition
        	await QuickSort(pivot_idx + 1, r);
            //
            //document.getElementById("alg4").style.backgroundColor="orange";
        }
}

/*
var val;
function NumElements(){
    //get value of num index
    val=Number(document.getElementById("value").value);
  

}*/
function QuickSortStart(){
        QuickSort(0, arr.length-1);
        generate_idx(arr.length);

}

/*Print  rightContainer in html (vizual area) as jpg */
function PrintPng() {

	var node = document.getElementById('rightContainer');

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


/**Help function to download uri for image */
function downloadURI(uri, name) {
	var link = document.createElement("a");
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	delete link;
}

var v;
/* Insert values one by one */
function Start(){

  v = Math.ceil(Math.random() * 20);
// Calling generatearray function
 generatearray(v);
 // Calling generate_idx function
 generate_idx(v);

 QuickSort(0,v-1);
} 

 