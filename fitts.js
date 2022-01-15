//global Fitts's law varibles
var fittsMT = 1;
var fittsA = 50;
var fittsB = 150;
var fittsID;
var fittsD;
var fittsW;
var fittsH;
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
		
	} else {

	}


	//update formula inputs
	updateFormulaInputs();

	//TODO correct position

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
	$('#formulaInputHeight input').val(fittsH);
	$('#formulaInputD input').val(fittsD);
	$('#formulaInputRatio input').val(fittsRatio);
}

//TODO reset formula values
function resetFormula() {
	//TODO check what type of mesure
	if (calculateSize) {
		//init default values
		fittsMT = 1;
		fittsA = 50;
		fittsB = 150;
		fittsRatio = 4;

	} else {
		//init default values
		fittsA = 50;
		fittsB = 150;
	}

	

	//recalculate formula
	fitts();
}