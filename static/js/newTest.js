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
function Heap(){
    this.storage=[];

	this.insertNode = function(cur, val) {
		if (cur == null)
			cur = new Node(val);
		else if (val <= cur.value && cur.json.children.length==0) {
			cur.left = this.Insert(cur.left, val);
			cur.left.parent = cur;

			// GUI
			cur.left.json.direction = 'left';
			cur.json.children.push(cur.left.json);}
        if (val <= cur.value && cur.json.children.length==0) {
			cur.right = this.Insert(cur.right, val);
			cur.right.parent = cur;

			// GUI
			cur.right.json.direction = 'right';
			cur.json.children.push(cur.right.json);
		}

		return cur;
	}
    

    this.insert = function(value,cur=root) {
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
         
         insertNode(cur,value);
         // Push to storage array
         this.storage.push(value);
         // Update visualization based on added node

         cur=new Node(value);

         var that = this;
       
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
     //  n=that.storage;
     //  update();
     };
       
}