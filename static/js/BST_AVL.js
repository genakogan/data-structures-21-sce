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

	this.UpdateHeight = function() {
		var leftheigh = 0,
			rightheigh = 0;
		this.json.children = [];
		if (this.left) {
			leftheigh = this.left.height;

			// GUI
			this.json.children.push(this.left.json);
			this.left.json.direction = 'left';
		}
		if (this.right) {
			rightheigh = this.right.height;

			// GUI
			this.json.children.push(this.right.json);
			this.right.json.direction = 'right';
		}
		this.height = 1 + Math.max(leftheigh, rightheigh);
	}

	this.balancefactor = function() {
		var leftheigh = 0,
			rightheigh = 0;
		if (this.left)
			leftheigh = this.left.height;
		if (this.right)
			rightheigh = this.right.height;
		return leftheigh - rightheigh;
	}
}

function BSTAVL() {
	this.root = null;

	this.RotateRight = function(z) {
		var y = z.left,
			t3 = null;
		if (y)
			t3 = y.right;
		if (t3)
			t3.parent = z;

		y.right = z;
		z.left = t3;

		y.parent = z.parent;
		z.parent = y;

		z.UpdateHeight();
		y.UpdateHeight();

		if (z == this.root)
			this.root = y;

		return y;
	}

	this.RotateLeft = function(z) {
		var y = z.right,
			t2 = null;
		if (y)
			t2 = y.left;
		if (t2)
			t2.parent = z;


		y.left = z;
		z.right = t2;

		y.parent = z.parent;
		z.parent = y;

		z.UpdateHeight();
		y.UpdateHeight();

		if (z == this.root)
			this.root = y;

		return y;
	}

	this.balance = function(cur) {
		if (cur.balancefactor() == 2) ///left
		{
			if (cur.left.balancefactor() == -1) ///if this condition is valid so it is left right
				cur.left = this.RotateLeft(cur.left); ///here i convert it to left left

			/// when i do this i am pretty sure that i am in left left case so i convert it to a balance tree
			cur = this.RotateRight(cur);
		} else if (cur.balancefactor() == -2) ///right
		{

			if (cur.right.balancefactor() == 1) ///if this condition is valid so it is right left
				cur.right = this.RotateRight(cur.right); /// here i convert it to right right

			///when i do this i am pretty sure that i am in right right case so i convert it a balance tree
			cur = this.RotateLeft(cur);
		}
		return cur;
	}

	// Returns the node that contains val
	this.Search = function(val, cur = this.root) {
		if (cur == null)
			return -1;

		if (cur.value == val){
			cur.json.color="linear-gradient(to right, #67b26b, #4ca2cb) !important";

			return cur;
		}
		if (val > cur.value){
			cur.json.color="linear-gradient(to right, #67b26b, #4ca2cb) !important";

			return this.Search(val, cur.right);}
		else{
			cur.json.color="linear-gradient(to right, #67b26b, #4ca2cb) !important";

		return this.Search(val, cur.left);}

	}

	this.UpDateColorSearch= function(val,cur=this.root) {
		if (cur == null)
		    return -1;

	    if (cur.value == val){
		   cur.json.color="white";
		   return cur;
	    }
	    if (val > cur.value){
		  cur.json.color="white";
          return this.UpDateColorSearch(val, cur.right);}
	    else{
		  cur.json.color="white";

	return this.UpDateColorSearch(val, cur.left);}
		

	}



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
		this.root = this.Insert(this.root, val);
	}
	// Returns the node that contains val
	this.SearchForDelete = function(val, cur = this.root) {
		if (cur == null)
			return -1;

		if (cur.value == val){
			return cur;
		}
		if (val > cur.value){
			return this.SearchForDelete (val, cur.right);}
		else{
		return this.SearchForDelete (val, cur.left);}
	}


	
	this.DeleteVal = function(val) {
		var node = this.SearchForDelete (val);

		if (node == -1){
			alert("Value not found");
			//msg.innerHTML("Value Not Found :(");
			return ;
		}
		this.Delete(node);

		// If the tree is not empty
		if (this.root)
			this.root = this.balance(this.root)
	}

	this.Delete = function(cur) ///we will give it the pointer node we want to delete it , not the value , and after deleting we will call balance function given the cur
	{
		// If it is the only node in the tree
		if (cur.parent == null && cur.right == null && cur.left == null) {
			// Clear the tree
			this.root = null;
			return;
		}

		if (cur.right == null) {
			// If it's the root node
			if (cur.parent == null) {
				cur = cur.left;
				cur.parent = null;
			}

			else if (cur.parent.left == cur)
				cur.parent.left = cur.left;
			else
				cur.parent.right = cur.left;
			if (cur.left)
				cur.left.parent = cur.parent;

		} else if (cur.left == null) {
			// If it's the root node
			if (cur.parent == null) {
				cur = cur.right;
				cur.parent = null;
			}

			else if (cur.parent.left == cur)
				cur.parent.left = cur.right;
			else
				cur.parent.right = cur.right;
			if (cur.right)
				cur.right.parent = cur.parent;

		} else {
		var prev, temp = cur;
			temp = cur.left;
			prev = cur;
			while (temp.right != null) {
				prev = temp;
				temp = temp.right;
			}
			cur.value = temp.value;
			cur.json.name = cur.value;
			if (prev == cur)
				prev.left = temp.left;
			else
				prev.right = temp.left;

			prev.UpdateHeight();
			prev = this.balance(prev);
			while (prev.parent) {
				prev = prev.parent;
				prev.UpdateHeight();
				prev = this.balance(prev);
			}
			return;
		}

		while (cur.parent) {
			cur.UpdateHeight();
			cur = this.balance(cur);
			cur = cur.parent;
		}
		cur.UpdateHeight();
		this.root = this.balance(cur);
	}

	this.inorderColor=function(cur=this.root){
		if (cur != null) {

			this.inorderColor(cur.left);
			cur.json.color="blue";
			setTimeout(function() {
				 updateTree();
			}, 970);
			this.inorderColor(cur.right);
		}
		
//else{
//		cur.parent.json.color="blue";
//		setTimeout(function() {
//		drawTree();
//	   }, 970);
//		
//}	
		
	
		
	}
//	setTimeout(function() {
//		// update();
//		inorderColor(cur);
//	}, 970);
var duration = 0.75*900;

	this.inorder = function(cur = this.root) {
		var numbers = [];
		if (cur != null) {
			//cur.json.color="Red";
			numbers = this.inorder(cur.left);
			numbers.push(cur.value);
			//cur.json.color="Red";
			numbers = numbers.concat(this.inorder(cur.right));
			//cur.json.color="Red";

		}
		return numbers;
	}

	this.preorder = function(cur = this.root) {
		var numbers = [];
		if (cur != null) {
			numbers = [cur.value];
			numbers = numbers.concat(this.preorder(cur.left));
			numbers = numbers.concat(this.preorder(cur.right));
		}
		return numbers;
	}

	this.postorder = function(cur = this.root) {
		var numbers = [];
		if (cur != null) {
			numbers = numbers.concat(this.postorder(cur.left));
			numbers = numbers.concat(this.postorder(cur.right));
			numbers.push(cur.value);
		}
		return numbers;
	}

	this.max = function(cur = this.root) {
		var numbers = [], max=0;
		if (cur != null) {
			numbers = numbers.concat(this.postorder(cur.left));
			numbers = numbers.concat(this.postorder(cur.right));
			numbers.push(cur.value);
		}
		var i;
		for (i = 0; i < numbers.length; i++) {
		  if (max < numbers[i]){
				max = numbers[i] 
		  }
		}
		document.getElementById("msg").innerHTML = max;
	}

	this.min = function(cur = this.root) {
		var numbers = [];
		if (cur != null) {
			numbers = numbers.concat(this.postorder(cur.left));
			numbers = numbers.concat(this.postorder(cur.right));
			numbers.push(cur.value);
		}
		var i , min = numbers[0];
		for (i = 1; i < numbers.length; i++) {
		  if (min > numbers[i]){
				min = numbers[i] 
		  }
		}
		document.getElementById("msg").innerHTML = min;
	}
	this.Minimum= function(x){
		while(x.left != null)
			x=x.left;
		return x;
	}

	this.Maximum= function(x){
		while(x.right != null)
			x=x.right;
		return x;
	}
    
	this.successor = function(val,cur = this.root) {
		temp = new Node(null);
		temp=this.Search(val,cur);
		temp2=temp;
		var arr =[] ;
		arr = this.inorder(cur); 
		var i ;
		for (i=0 ; i < arr.length ; i++ ){
			if(i == arr.length)
			    return -1;
			if ( arr[i] == val ){
				return arr[i+1] ;
			}

		}
		/*
		if (temp.right != null)
			return this.Minimum(temp.right)
		temp=x.parent;
		while( temp2 != null && temp == temp2.right){
			temp=temp2;
			temp2=temp2.parent;
		}
		return temp2;
		*/
	}

	this.predecessor = function(val,cur = this.root) {
		var arr =[] ;
		arr = this.inorder(cur); 
		var i ;
		for (i=0 ; i < arr.length ; i++ ){
			//if(i+1 >arr.length)
			//	return -1;
			if ( arr[i] == val ){
				return arr[i-1] ;
			}
		}

	//	temp = new Node(null);
	//	temp=this.Search(val,cur);
	//	temp2=temp;
	//	if (temp.left != null)
	//		return this.Maximum(temp.left)
	//	temp=x.parent;
	//	while( temp2 != null && temp == temp2.left){
	//		temp=temp2;
	//		temp2=temp2.parent;
	//	}
	//	return temp2;
	}

	this.printTree = function (){
		print()
	}

	this.clear = function(){
		this.root=null;
		return this.root;
	
	   
	}
}

var bst = new BSTAVL();
