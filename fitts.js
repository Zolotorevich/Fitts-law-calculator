//global Fitts's law varibles
var fittsMT = 1000;
var fittsA = 570;
var fittsB = 150;
var fittsID = 2.3;
var fittsD = 300;
var fittsW = 160;
var fittsRatio = 4;

var calculateSize = true;
var fittsMTsaved = 1000;

//reset formula backups
var fittsMTbackup;
var fittsAbackup;
var fittsBbackup;
var formulaRestorable = false;

//reset formula values
function resetFormula() {

	if (!formulaRestorable) {
		//check what type of mesure
		if (calculateSize) {
			//save current MT value
			fittsMTbackup = fittsMT;

			//apply default value
			fittsMT = 1000;
		}

		//save current values
		fittsAbackup = fittsA;
		fittsBbackup = fittsB;

		//apply default values
		fittsA = 570;
		fittsB = 150;

		//change title
		$('#resetFormulaCtrl').html('Undo reset');

		//make restorable
		formulaRestorable = true;
		
	} else {
		//restore formula values
		fittsA = fittsAbackup;
		fittsB = fittsBbackup;
		if (calculateSize) { fittsMT = fittsMTbackup; }	

		//make formula not restorable
		makeFormulaNotResorable();
	}

	//recalculate formula
	fitts();
}

//make formula not restorable
function makeFormulaNotResorable() {
	//change title
	$('#resetFormulaCtrl').html('Reset formula');

	//make formula not restorable
	formulaRestorable = false;
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

	//add scale
	fittsD = Math.round(fittsD / imageScale * 100);

	//check what to calculate
	if (calculateSize) {
		//W = D * 2 ^ ( ((a - MT) / b) + 1 )
		exponent = ((fittsA - fittsMT) / fittsB) + 1;
		fittsW = Math.round(fittsD * (2 ** exponent));

		//calc and round ID
		fittsID = Math.log(2 * fittsD / fittsW) / Math.log(2);
		fittsID = Math.round(fittsID * 10) / 10;

		//calculate target height
		targetHeight = Math.round(fittsW / 4);

		//check if width positive
		if (fittsW > 0) {
			//update marker label
			$('#result').html(fittsW + ' × ' + targetHeight + ' px');
		} else {
			//update marker label
			$('#result').html('— px');
		}
		

		//update marker size
		updateMarkerSize(fittsW, targetHeight);

	} else {
		//calc and round ID
		fittsID = Math.log(2 * fittsD / fittsW) / Math.log(2);
		fittsID = Math.round(fittsID * 10) / 10;
		
		//measure and round time
		fittsMT = fittsA + (fittsB * fittsID);
		fittsMT = Math.round(fittsMT * 10) / 10

		//update marker label
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

//TODO change measure type
function changeMeasure() {
	if(calculateSize) {
		//change title
		$('#imageControlMeasureValue').html('Calculate size');

		//disable time input
		$('#formulaInputMT input').prop( "disabled", true );

		//save time input
		fittsMTsaved = $('#formulaInputMT input').val();

		//TODO save width ???

		//enable width input
		$('#formulaInputW input').prop( "disabled", false );

		//change type
		calculateSize = false;

	} else {
		//change title
		$('#imageControlMeasureValue').html('Measure time');

		//enable time input
		$('#formulaInputMT input').prop( "disabled", false );

		//restore time value
		fittsMT = fittsMTsaved;

		//disable width input
		$('#formulaInputW input').prop( "disabled", true );

		//change type
		calculateSize = true;
	}

	//make formula not restorable
	makeFormulaNotResorable();

	//recalculate
	fitts();
}

//update formula inputs
function updateFormulaInputs() {
	$('#formulaInputMT input').val(fittsMT);
	$('#formulaInputA input').val(fittsA);
	$('#formulaInputB input').val(fittsB);

	//check if ID positive
	if (fittsID >= 0 && fittsID != Infinity) {
		$('#formulaInputID input').val(fittsID);
	} else {
		$('#formulaInputID input').val('∞');
	}
	
	//check if width positive and not too big
	if (fittsW > 0 && fittsW <= 9000) {
		$('#formulaInputW input').val(fittsW);
	} else {
		$('#formulaInputW input').val('—');
	}

	$('#formulaInputD input').val(fittsD);
}

//check and get values from inputs
function getValues(textInput) {

	//get input value
	newValue = $(textInput).val();

	//check if value not zero
	if (newValue > 0) {
		//update MT
		if (textInput.includes('formulaInputMT')) {
			fittsMT = newValue;
		}

		//update A
		if (textInput.includes('formulaInputA')) {
			fittsA = newValue;
		}

		//update B
		if (textInput.includes('formulaInputB')) {
			fittsB = newValue;
		}

		//update W
		if (textInput.includes('formulaInputW')) {
			fittsW = newValue;

			//calculate height
			newHeight = Math.round(newValue / 4);

			//update marker width
			updateMarkerSize(newValue, newHeight);
		}

		//recalculate
		fitts();

		//make formula not restorable
		makeFormulaNotResorable();

	}

	
}