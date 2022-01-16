var markersColor = '#df2222';
var line;
var linesArr = [];

//transition from start screen to image view
function hideStartScreen() {
	//hide start screen container
	$('#startScreen').hide();

	//display image view bar
	$('#imageControlsBar').css({'display' : 'flex'});

	//display image view container
	$('#imageViewContainer').show();

	//scroll image view container to the top
	$([document.documentElement, document.body]).animate({
        scrollTop: $("#imageControlsBar").offset().top
    }, 1000);

	//show small lines
	setTimeout(function(){
		showSmallLines();
	}, 1000);
	
	//recalculate line position
	updateLines();
	
}

//Select marker color
function disaplayMarkersPalette(inputColor) {

	if ($('#markerColorPalette').css('display') == 'none') {
		//hide color control
		$('#imageControlColor').hide();

		//display palette
		$('#markerColorPalette').css({'display' : 'block'});
	
	} else {
		//hide palette
		$('#markerColorPalette').css({'display' : 'none'});
		
		//show color control
		$('#imageControlColor').show();
	}

}

//recolor markers and color controls
function recolorMarkers(inputColor,saveGlobal) {

	//check if color needs to be saved
	if (saveGlobal) {
		//update global color
		markersColor = inputColor;
	}
	
	//color selectors
	$('.paletteCtrl').each(function (){ 
		 $(this).css({'background-color' : $(this).attr( "data-selectedColor" )});
	});

	//change main indicator color
	$('#imageControlColor div').css({'background-color' : inputColor});

	//change start marker color
	$('#start div').css({'background-color' : inputColor});
	$('#start').css({'border' : '2px solid ' + inputColor});

	//change end marker color
	$('#end').css({'background-color' : inputColor + 'C0'});

	//recolor lines
	updateLinesColor(inputColor);
}


//Easter egg
function easterEgg() {
	recolorMarkers('#e9ca2c', true);
}

//reset markers position
function resetMarkersPosition() {
	//reset start marker
	$('#start').css({
		'top' : 'calc(100% - 100px)',
		'left' : 'calc(50% - 100px)'
	});

	//reset end marker
	$('#end').css({
		'top' : 'calc(100% - 100px)',
		'left' : 'calc(50% + 100px)'
	});

	//recalculate
	fitts();

}

//draw lines
function drawLines() {
	//get elements
	startElement = document.getElementById('start');
	endElement = document.getElementById('end');

	//main line
    line = new LeaderLine(LeaderLine.pointAnchor(startElement), LeaderLine.pointAnchor(endElement),
	{
		startPlug: 'behind',
		endPlug: 'behind',
		color: markersColor,
		size: 2,
		path: 'straight',
		startSocket: 'auto',
		endSocket: 'auto'
	});

	//create array of small lines
	for (let i = 0; i < 8; i++) {
		smallLine = new LeaderLine(LeaderLine.pointAnchor(startElement), LeaderLine.pointAnchor(endElement),
		{
			startPlug: 'behind',
			endPlug: 'behind',
			color: markersColor + '40',
			size: 2,
			path: 'fluid',
			startSocket: 'auto',
			endSocket: 'auto',
			startSocketGravity: [getRandomInt(100), getRandomInt(100)],
			endSocketGravity: [getRandomInt(100), getRandomInt(100)]
		});

		linesArr.push(smallLine);

	}
	
}

//update lines position
function updateLines() {
	line.position();
	linesArr.forEach(item => {
		item.position();
	});
}

//update lines color
function updateLinesColor(newColor) {
	line.color = newColor;
	linesArr.forEach(item => {
		item.color = newColor + '40';
	});
}

//hide small lines
function hideSmallLines() {
	linesArr.forEach(item => {
		item.hide('none');
	});
}

//show small lines
function showSmallLines() {
	//check if we not at start screen
	if ($('#startScreen').css('display') == 'none') {
		//show lines
		linesArr.forEach(item => {
			item.setOptions({
				startSocketGravity: [getRandomInt(100), getRandomInt(100)],
				endSocketGravity: [getRandomInt(100), getRandomInt(100)]
			});
			item.show('draw');
		});
	}
	
}