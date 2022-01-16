//Global variables
var easerCounter = 0;
var line;

//events handlers
$(document).ready(function(){

	//DEBUG hide start screen
	// hideStartScreen();
	
	//recolor markers
	recolorMarkers(markersColor, false);

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
		if (easerCounter == 5) { easterEgg(); }
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

	//reset markers position
	$('#resetMarksCtrl').on('click', function() {
		resetMarkersPosition();
	});

	//change measure type
	$('#imageControlMeasureValue').on('click', function() {
		changeMeasure();
	});

	//select color
	$('#imageControlColor').on('click', function() {
		disaplayMarkersPalette();
	});

	$('#markerColorPalette div').on('click', function() {
		disaplayMarkersPalette();
		recolorMarkers($(this).children( 'div' ).attr( "data-selectedColor" ), true);
	});

	$('#markerColorPalette div').on('mouseover', function() {
		recolorMarkers($(this).children( 'div' ).attr( "data-selectedColor" ), false);
	});

	$('#markerColorPalette div').on('mouseout', function() {
		recolorMarkers(markersColor, false);
	});

	$('.paletteCtrl').on('click', function() {
		disaplayMarkersPalette();
	});
	
	//make start draggable
	$('#start').draggable(
	{
		containment: "document",

		scroll: false,

		drag: function() {
			line.position();
			fitts();
		},

		stop: function(event, ui)
		{           
			var top = getTop(ui.helper);
			ui.helper.css('position', 'fixed');
			ui.helper.css('top', top+"px");
		}
	});

	//make end draggable
	$('#end').draggable(
	{
		containment: "document",

		scroll: false,

		drag: function() {
			line.position();
			fitts();
		},

		stop: function(event, ui)
		{           
			var top = getTop(ui.helper);
			ui.helper.css('position', 'fixed');
			ui.helper.css('top', top+"px");
		}
	});

	function getTop(ele)
	{
		var eTop = ele.offset().top;
		var wTop = $(window).scrollTop();
		var top = eTop - wTop;

		return top; 
	}

	
	//OLD

	//dragable elements
	startElement = document.getElementById('start');
	endElement = document.getElementById('end');

	//lines between markers
    line = new LeaderLine(LeaderLine.pointAnchor(startElement), LeaderLine.pointAnchor(endElement),
      {
		  startPlug: 'behind',
		  endPlug: 'behind',
		  color: 'rgba(223, 34, 34, 0.8)',
		  size: 2,
		  path: 'straight',
		  startSocket: 'auto',
		  endSocket: 'auto'
		});

	//calculate and apply marker size
	fitts();
	line.position();
});


//window scroll event
$( document ).scroll(function() {
	line.position();
});
