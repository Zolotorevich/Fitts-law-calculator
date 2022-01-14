//Global variables
var selectedColor = '#000';

//events handlers
$(document).ready(function(){

	//click on upload in mainScreen
	$('#startScreenUploadBtn').on('click', function() {
		$("#fileupload").click();
	});

	// //file input has a new image
	// $("#fileupload").change( function() {
	// 	showImageFromFileInput();
	// });

	// //make image b/w
	// $('#bwFilter').on('click', function() {
	// 	changeImageFilter();
	// });

	//dragable elements
	startElement = document.getElementById('start');
	endElement = document.getElementById('end');

	//lines between dragable
    line = new LeaderLine(LeaderLine.pointAnchor(startElement), LeaderLine.pointAnchor(endElement),
      {
		  startPlug: 'behind',
		  endPlug: 'behind',
		  color: 'rgba(223, 34, 34, 0.8)',
		  size: 2,
		  path: 'straight',
		  startSocket: 'auto',
		  endSocket: 'auto',
		  zIndex: 100
		});

	new DragObject(startElement);
	new DragObject(endElement);

	// //click on image
	// $('.dragContainer').on('click', function( event ) {
	// 	moveStartPositionToClick(event.pageX, event.pageY);
	// });

});


//window scroll event
// $( document ).scroll(function() {
// 	line.position();
// 	lineB.position();
// 	fitts();
// });

// //
// function moveStartPositionToClick(cursorX, cursorY) {
// 	//check if click wasn't inside end element
	
// 	//change start element position
// 	$('#start').offset({ top: cursorY, left: cursorX });

// 	//redraw lines
// 	line.position();
// 	lineB.position();
// 	fitts();

// }