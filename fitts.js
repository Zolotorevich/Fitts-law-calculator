//global Fitts's law varibles
var fittsMT = 1000;
var fittsA = 570;
var fittsB = 200;
var fittsID = 2.3;
var fittsD = 300;
var fittsW = 160;
var fittsRatio = 4;

var minimalWidth = 64; //px
var calculateSize = true;

//reset formula values
function resetFormula() {
	//init default values
	fittsA = 570;
	fittsB = 200;

	//check what type of mesure
	if (calculateSize) {
		fittsMT = 1000;
	}

	//recalculate formula
	fitts();
}

//calculate Fitts's law
function fitts() {
	//get position of start element
	startPosition = $('#start').offset();

	//get position of end element
	endPosition = $('#end').offset();

	//get center points positions
	startPositionX = startPosition.left + ($('#start').width() / 2);
	startPositionY = startPosition.top + ($('#start').height() / 2);
	endPositionX = endPosition.left + ($('#end').width() / 2);
	endPositionY = endPosition.top + ($('#end').height() / 2);

	//calculate distance between centers
	horizontalDistance = Math.abs(startPositionX - endPositionX);
	verticalDistance = Math.abs(startPositionY - endPositionY);

	//calculate absolute distance
	fittsD = Math.round(Math.sqrt((verticalDistance ** 2) + (horizontalDistance ** 2)));

	//check what to calculate
	if (calculateSize) {
		//W = D * 2 ^ ( ((a - MT) / b) + 1 )
		exponent = ((fittsA - fittsMT) / fittsB) + 1;
		fittsW = Math.round(fittsD * (2 ** exponent));

		fittsID = Math.round(Math.log(2 * fittsD / fittsW) / Math.log(2) * 10) / 10;

		//calculate target height
		targetHeight = Math.round(fittsW / 4);

		//update marker label
		$('#result').html(fittsW + ' × ' + targetHeight + ' px');

		//TODO scale

		//update marker size
		updateMarkerSize(fittsW, targetHeight);

	} else {
		//measure time
		fittsID = Math.round(Math.log(2 * fittsD / fittsW) / Math.log(2) * 10) / 10;
		fittsMT = Math.round(fittsA + (fittsB * fittsID) * 10) / 10;

		//TODO update marker label
		$('#result').html(fittsMT + ' ms');

	}

	//update formula inputs
	updateFormulaInputs();

};

function updateMarkerSize(width,height) {

	var marker = $('#end');

	//apply image scale
	width = Math.round(width * imageScale / 100);
	height = Math.round(height * imageScale / 100);

	//check if size too small
	if (width >= 72) {
		//calculate delta for reposition
		widthDelta = (marker.width() - width) / 2;
		heightDelta = (marker.height() - height) / 2;

		//correct position
		newLeftPosition = marker.offset().left + widthDelta;
		newTopPosition = marker.offset().top + heightDelta;
		marker.offset({ top: newTopPosition, left: newLeftPosition });
		
	} else {
		//size too small, ignore correct position
		width = 72;
		height = 18;
	}

	//apply size
	marker.css({
		'width' : width,
		'height' : height
	});

	//update line position
	updateLines();
}

//change measure type
function changeMeasure() {
	if(calculateSize) {
		//change title
		$('#imageControlMeasureValue').html('Calculate size');

		//disable time input
		$('#formulaInputMT input').prop( "disabled", true );

		//enable width input
		$('#formulaInputW input').prop( "disabled", false );

		//change type
		calculateSize = false;

	} else {
		//change title
		$('#imageControlMeasureValue').html('Measure time');

		//enable time input
		$('#formulaInputMT input').prop( "disabled", false );

		//disable width input
		$('#formulaInputW input').prop( "disabled", true );

		//change type
		calculateSize = true;
	}

	//recalculate
	fitts();
}

//update formula inputs
function updateFormulaInputs() {
	$('#formulaInputMT input').val(fittsMT);
	$('#formulaInputA input').val(fittsA);
	$('#formulaInputB input').val(fittsB);

	//check if ID positive
	if (fittsID >= 0) {
		$('#formulaInputID input').val(fittsID);
	} else {
		$('#formulaInputID input').val('∞');
	}
	
	//check if width positive and not too big
	if (fittsW >= 0 && fittsW <= 9000) {
		$('#formulaInputW input').val(fittsW);
	} else {
		$('#formulaInputW input').val('∞');
	}

	$('#formulaInputD input').val(fittsD);
}

//TODO check and get values from inputs
function getValues() {
	
}