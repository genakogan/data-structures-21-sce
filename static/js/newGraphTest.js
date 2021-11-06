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
