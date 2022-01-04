//Global variables
var selectedColor = '#000';

//events handlers
$(document).ready(function(){

	//file input has a new image
	$("#fileupload").change( function() {
		showImageFromFileInput();
	});

	//make image b/w
	$('#bwFilter').on('click', function() {
		changeImageFilter();
	});

	//dragable elements
	startElement = document.getElementById('start');
	endElement = document.getElementById('end');

	//lines between dragable
    line = new LeaderLine(LeaderLine.pointAnchor(startElement), LeaderLine.pointAnchor(endElement),
      {
		  startPlug: 'behind',
		  endPlug: 'behind',
		  color: 'red',
		  size: 4,
		  path: 'straight',
		  startSocket: 'auto',
		  endSocket: 'auto',
		  zIndex: 100
		});

	lineB = new LeaderLine(LeaderLine.pointAnchor(startElement), LeaderLine.pointAnchor(endElement),
	{
		startPlug: 'behind',
		endPlug: 'behind',
		color: 'black',
		size: 2,
		startSocket: 'auto',
		endSocket: 'auto',
		zIndex: 100
		});

	//make draggable
	new PlainDraggable(startElement, {
		onMove: function() {
			line.position();
			lineB.position();
		},
		zIndex: 100
	});

	new PlainDraggable(endElement, {

		onMove: function() {
			line.position();
			lineB.position();
		},
		zIndex: 100
	});

});
