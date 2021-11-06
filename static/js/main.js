let sorted = false;

$(document).ready(() => {

	// Sort button

	$("#sort").click(() => {
        if (sorted) {
            $('section.errors p').text('Already sorted!');
            return;
        }
        $("section.errors p").text("");
        let $array = getArrayValue();
        sort($array[0]);
        sorted = true;
    });
    
    // Unsort button

    $("#unsort").click(() => {
        if (!sorted) {
            $("section.errors p").text("Already unsorted!");
            return;
        }
        $("section.errors p").text("");
        let sortedArray = $('div.array-container')[0];
        let unsortedArray = [];
        for (let i = sortedArray.childNodes.length - 1; i >= 0 ; i--)
            unsortedArray.push($(sortedArray.childNodes[i]).text());
        unsort(unsortedArray);
        sorted = false;
    });
});


function PrintJpg() {

	var node = document.getElementById('vis');

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

function PrintPdf(){
    print();
}