//global image input varibles
var imageScale = 100;
var imageOriginalWidth = 1;

//show image from input
function showImageFromFileInput() {

	var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;

	//check if user upload image
	if (regex.test($("#fileupload").val().toLowerCase())) {

		//check if we on start screen
		if ($('#startScreen').css('display') != 'none') {
			hideStartScreen();
		}

		//clear current image container
		$("#imageContainer").html("");

		//add image tag in div
		$("#imageContainer").append("<img />");

		//create FileReader obj
		var reader = new FileReader();

		//read file from storage
		reader.readAsDataURL($("#fileupload")[0].files[0]);

		//add image to container
		reader.onload = function (e) {
			$("#imageContainer img").attr("src", e.target.result);
		}

		//save image width after its loads
		$("#imageContainer img").on('load', function(){
			imageOriginalWidth = $('#imageContainer img').width();
		});

		//Update filename
		$('#imageControlFile').html($("#fileupload")[0].files[0].name);

		//reset image scale
		resetImageScale();

	} else {
		//error: it's not an image
		displayErrorImageType();
	}

};

//Display upload image error
function displayErrorImageType() {
	//check if we on start screen
	if ($('#startScreen').css('display') != 'none') {
		//disaply error
		$('#startScreenUploadBtn h1').html('Select .png or .jpg file');

		//shake upload button and change it color
		$('#startScreenUploadBtn').addClass('shakeAndRed');

		setTimeout(function(){
			$('#startScreenUploadBtn').removeClass('shakeAndRed');			
		}, 1000);

	} else {
		//save current image name
		currentFileName = $('#imageControlFile').html();

		//display error
		$('#imageControlFile').html('Select .png or .jpg file');

		//shake upload button
		$('#imageControlFile').addClass('shakeAndRed');

		//stop shaking
		setTimeout(function(){
			$('#imageControlFile').removeClass('shakeAndRed');
		}, 1000);

		//get file name back
		setTimeout(function(){
			$('#imageControlFile').html(currentFileName);
		}, 2000);
	}
}

//change image filter
function changeImageFilter() {
	//check if image dont have filter
	if ($('#imageContainer img').css('filter') == 'none') {
		//make image bw
		$('#imageContainer img').css({'filter':'grayscale()'});
	} else {
		//make image color
		$('#imageContainer img').css({'filter':'none'});
	};
};

//scale image
function scaleImage(scaleDelta) {

	//check if minimum or maximum scale reqested
	if (
		(imageScale == 25 && scaleDelta < 0)
		|| (imageScale == 300 && scaleDelta > 0)
		) {
		return false;
	}

	//calculate new scale
	imageScale = imageScale + scaleDelta;


	//apply image new width
	$('#imageContainer img').css({
		'width' : (imageOriginalWidth * imageScale / 100) + 'px'
	});

	//display new scale
	$('#imageControlScale').html(imageScale + '%');

	//recalculate Fitts' law
	fitts();
};

//reset image scale
function resetImageScale() {
	//set default scale
	imageScale = 100;

	//display new scale
	$('#imageControlScale').html(imageScale + '%');
}