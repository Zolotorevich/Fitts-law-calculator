//Global variables
var selectedColor = '#000';
var easerCounter = 0;

//events handlers
$(document).ready(function(){

	//click on upload in mainScreen
	$('#startScreenUploadBtn').on('click', function() {
		$("#fileupload").click();
	});

	//click on upload in top bar
	$('#imageControlFile').on('click', function() {
		$("#fileupload").click();
	});

	//make image b/w
	$('#imageControlBW').on('click', function() {
		changeImageFilter();
	});

	//Change reaction time in formula
	$('#valueA150').on('click', function() {
		$('#formulaInputA input').val('150');
		fittsA = 250;
		fitts();
	});

	$('#valueA570').on('click', function() {
		$('#formulaInputA input').val('570');
		fittsA = 570;
		fitts();
	});
	
	//Easter egg
	$('.startScreenHint span').on('click', function() {
		easerCounter++;
		if (easerCounter == 5) {
			//show easter egg
			easterEgg();
		}
	});

	//file input has a new image
	$("#fileupload").change( function() {
		showImageFromFileInput();
	});

	//scale plus and minus
	$('#imageControlScalePlus').on('click', function() {
		scaleImage(25);
	});

	$('#imageControlScaleMinus').on('click', function() {
		scaleImage(-25);
	});

	//reset formula
	$('#resetFormulaCtrl').on('click', function() {
		resetFormula();
	});

	//change measure type
	$('#imageControlMeasureValue').on('click', function() {
		changeMeasure();
	});
	
	




	//OLD

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

});


//window scroll event
$( document ).scroll(function() {
	line.position();
	// lineB.position();
	// fitts();
});
