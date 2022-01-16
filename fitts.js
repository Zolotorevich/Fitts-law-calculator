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

		//TODO update markers

	} else {
		//measure time
		fittsID = Math.round(Math.log(2 * fittsD / fittsW) / Math.log(2) * 10) / 10;
		fittsMT = Math.round(fittsA + (fittsB * fittsID) * 10) / 10;

		//TODO update marker label
	}

	//update formula inputs
	updateFormulaInputs();

};

	//check if size is too small
	// if (tagetWidth <= minimalWidth) {
	// 	//replace tagretWidth with minimal
	// 	tagetWidth = minimalWidth;
	// };

	// //apply new size
	// $('#end').css({
	// 	'width':tagetWidth + 'px',
	// 	'height':(tagetWidth / widthMultiplier) + 'px'
	// });

	// //show result
	// $("#result").html(tagetWidth + ' × ' + Math.round((tagetWidth / widthMultiplier)) + 'px');


//update formula inputs
function updateFormulaInputs() {
	$('#formulaInputMT input').val(fittsMT);
	$('#formulaInputA input').val(fittsA);
	$('#formulaInputB input').val(fittsB);
	$('#formulaInputID input').val(fittsID);
	$('#formulaInputW input').val(fittsW);
	$('#formulaInputD input').val(fittsD);
}

//reset formula values
function resetFormula() {
	//init default values
	fittsA = 570;
	fittsB = 50;

	//check what type of mesure
	if (calculateSize) {
		fittsMT = 1;
	}

	//recalculate formula
	fitts();
}

//change measure type
function changeMeasure() {
	if(calculateSize) {
		//change title
		$('#imageControlMeasureValue').html('Calculate size');

		//change type
		calculateSize = false;

	} else {
		//change title
		$('#imageControlMeasureValue').html('Measure time');

		//change type
		calculateSize = true;
	}

	//recalculate
	fitts();
}

//check and get values from inputs
function getValues() {
	
}