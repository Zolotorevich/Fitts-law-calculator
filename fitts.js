//default Fitts's law varibles
var fittsMTdefault = 1000;
var fittsAdefault = 570;
var fittsBdefault = 150;
var fittsRatio = 4;

//Fitts's law varibles
var fittsMT = fittsMTdefault;
var fittsA = fittsAdefault;
var fittsB = fittsBdefault;
var fittsID = 3; //TODO calculate for start screen
var fittsD = 300; //TODO calculate for start screen
var fittsW = 160; //TODO calculate for start screen

//values for change measure type
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
			fittsMT = fittsMTdefault;
		}

		//save current values
		fittsAbackup = fittsA;
		fittsBbackup = fittsB;

		//apply default values
		fittsA = fittsAdefault;
		fittsB = fittsBdefault;

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
		targetHeight = Math.round(fittsW / fittsRatio);

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

		//update marker label
		$('#result').html(Math.round(fittsMT) + ' ms');

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
	$('#formulaInputMT input').val(Math.round(fittsMT));
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
function getValues(inputName, newValue) {

	//check MT value
	if (inputName == 'formulaInputMT') {

		MTvalid = !isNaN(newValue) && newValue >= 500;

		//check if its valid
		if (MTvalid) {
			//update value
			fittsMT = newValue;

			//recalculate
			fitts();

			//make formula not restorable
			makeFormulaNotResorable();

		} else {
			//update text input
			$('#formulaInputMT input').val(fittsMT);

			//shake input and change it color
			shakeInput($('#formulaInputMT input'));
		}
	}

	//check A value
	if (inputName == 'formulaInputA') {

		Avalid = !isNaN(newValue) && newValue >= 100;

		//check if its valid
		if (Avalid) {
			//update value
			fittsA = newValue;

			//recalculate
			fitts();

			//make formula not restorable
			makeFormulaNotResorable();

		} else {
			//update text input
			$('#formulaInputA input').val(fittsA);

			//shake input and change it color
			shakeInput($('#formulaInputA input'));
		}
	}

	//check B value
	if (inputName == 'formulaInputB') {

		Bvalid = !isNaN(newValue) && newValue >= 10 && newValue <= 1000;

		//check if its valid
		if (Bvalid) {
			//update value
			fittsB = newValue;

			//recalculate
			fitts();

			//make formula not restorable
			makeFormulaNotResorable();

		} else {
			//update text input
			$('#formulaInputB input').val(fittsB);

			//shake input and change it color
			shakeInput($('#formulaInputB input'));
		}
	}

	//check W value
	if (inputName == 'formulaInputW') {

		Wvalid = !isNaN(newValue) && newValue >= 10 && newValue <= 2500;

		//check if its valid
		if (Wvalid) {
			//update value
			fittsW = newValue;

			//recalculate
			fitts();

			//change marker size
			updateMarkerSize(newValue, Math.round(newValue / fittsRatio));

			//make formula not restorable
			makeFormulaNotResorable();

		} else {
			//update text input
			$('#formulaInputW input').val(fittsW);

			//shake input and change it color
			shakeInput($('#formulaInputW input'));
		}
	}

}

//shake text input
function shakeInput(inputObj) {
	//shake input and change it color
	inputObj.css({
		'animation' : 'shake 0.2s',
		'animation-iteration-count' : 'infinite',
		'background-color' : '#df2222'
	});

	setTimeout(function(){
		//stop shaking
		inputObj.css({
			'animation' : '',
			'animation-iteration-count' : '',
			'background-color' : '#000'
		});
	}, 500);
}