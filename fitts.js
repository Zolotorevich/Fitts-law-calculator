//global Fitts's law varibles
indexOfDifficulty = 2.2;
widthMultiplier = 4;
shannonFormula = true;
minimalWidth = 64; //in px

//calculate Fitts's law
function fitts() {
	//get position of start element
	startPosition = $('#start').position();

	//get position of end element
	endPosition = $('#end').position();

	//get center points positions
	startPositionX = startPosition.left + ($('#start').width() / 2);
	startPositionY = startPosition.top + ($('#start').height() / 2);
	endPositionX = endPosition.left + ($('#end').width() / 2);
	endPositionY = endPosition.top + ($('#end').height() / 2);

	//calculate distance between centers
	horizontalDistance = Math.abs(startPositionX - endPositionX);
	verticalDistance = Math.abs(startPositionY - endPositionY);

	//calculate absolute distance
	absoluteDistance = Math.round(Math.sqrt((verticalDistance ** 2) + (horizontalDistance ** 2)));

	//check what formula to use
	if (shannonFormula) {
		//using Shannon formula: ID = Log2( D/W + 1 )
		//W = D / (ID^2-1)
		tagetWidth = absoluteDistance / ((indexOfDifficulty ** 2) - 1);
	} else {
		//using Fitts formula: ID = log2( 2 * D/W )
		//W = 2*D / 2^ID
		tagetWidth = (2 * absoluteDistance) / (indexOfDifficulty ** 2);
	};

	//round tagetWidth
	tagetWidth = Math.round(tagetWidth);

	//check if size is too small
	if (tagetWidth <= minimalWidth) {
		//replace tagretWidth with minimal
		tagetWidth = minimalWidth;
	};

	//apply new size
	$('#end').css({
		'width':tagetWidth + 'px',
		'height':(tagetWidth / widthMultiplier) + 'px'
	});

	//show result
	$("#result").html(tagetWidth + ' × ' + Math.round((tagetWidth / widthMultiplier)) + 'px');

	
	//TODO correct position

};
