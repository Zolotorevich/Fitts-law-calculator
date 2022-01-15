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
}