//Global variables
var easerCounter = 0;


$(document).ready(function(){

	//values inputs
	inputMT = $('#formulaInputMT input');
	inputA = $('#formulaInputA input');
	inputB = $('#formulaInputB input');
	inputW = $('#formulaInputW input');

	//check input values on focus
	inputMT.focusout(function(){
		getValues('formulaInputMT', $(this).val());
	});
	
	inputA.focusout(function(){
		getValues('formulaInputA', $(this).val());
	});

	inputB.focusout(function(){
		getValues('formulaInputB', $(this).val());
	});

	inputW.focusout(function(){
		getValues('formulaInputW', $(this).val());
	});

	//check input values on enter key
	inputMT.on('keypress',function(e) {
		if(e.which == 13) {
			getValues('formulaInputMT', $(this).val());
		}
	});

	inputA.on('keypress',function(e) {
		if(e.which == 13) {
			getValues('formulaInputA', $(this).val());
		}
	});

	inputB.on('keypress',function(e) {
		if(e.which == 13) {
			getValues('formulaInputB', $(this).val());
		}
	});

	inputW.on('keypress',function(e) {
		if(e.which == 13) {
			getValues('formulaInputW', $(this).val());
		}
	});
	
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
		makeFormulaNotResorable();
		fitts();
	});

	$('#valueA570').on('click', function() {
		$('#formulaInputA input').val('570');
		fittsA = 570;
		makeFormulaNotResorable();
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

		start: function() {
			hideSmallLines();
			makeFormulaNotResorable();
		},

		drag: function() {
			updateLines();
			fitts();
		},

		stop: function(event, ui)
		{           
			var top = getTop(ui.helper);
			ui.helper.css('position', 'fixed');
			ui.helper.css('top', top+"px");
			showSmallLines();
		}
	});

	//make end draggable
	$('#end').draggable(
	{
		containment: "document",

		scroll: false,

		start: function() {
			hideSmallLines();
			makeFormulaNotResorable();
		},

		drag: function() {
			updateLines();
			fitts();
		},

		stop: function(event, ui)
		{           
			var top = getTop(ui.helper);
			ui.helper.css('position', 'fixed');
			ui.helper.css('top', top+"px");
			showSmallLines();
		}
	});

	function getTop(ele)
	{
		var eTop = ele.offset().top;
		var wTop = $(window).scrollTop();
		var top = eTop - wTop;

		return top; 
	}

	
	//draw lines
	drawLines();

	//calculate and apply marker size
	fitts();

	//update lines position
	updateLines();

	//hide small lines
	hideSmallLines();

	//recolor markers
	recolorMarkers(markersColor, false);

	//update lines one more time because it not straight
	setTimeout(updateLines(),500);
	
});


//window scroll event
$( document ).scroll(function() {
	updateLines();
});

