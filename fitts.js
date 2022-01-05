//global Fitts's law varibles
indexOfDifficulty = 2.2;
widthMultiplier = 4.1;
fittsFormula = false;

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

	//check if we use original formula
	if (fittsFormula) {
		//using original Fitts formula: ID = log2( 2 * D/W )
		//W = 2*D / 2^ID
		tagetWidth = (2 * absoluteDistance) / (indexOfDifficulty ** 2);
	} else {
		//using Shannon formula: ID = Log2( D/W + 1 )
		//W = D / (ID^2-1)
		tagetWidth = absoluteDistance / ((indexOfDifficulty ** 2) - 1);
	};

	//round tagetWidth
	tagetWidth = Math.round(tagetWidth);

	//check if size is greater than minimal 64px x 16px
	if (tagetWidth >= 64) {
		//apply new size
		$('#end').css({
			'width':tagetWidth,
			'height':(tagetWidth / widthMultiplier)
		});

		//show result
		$("#result").html(tagetWidth + ' × ' + Math.round((tagetWidth / widthMultiplier)) + 'px');

	} else {
		//apply minimal size
		$('#end').css({
			'width':'64px',
			'height':'16px'
		});

		//show result
		$("#result").html('64 × 16 px');

	};

	

	//TODO correct position
	//TODO show information

};
