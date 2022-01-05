//global image input varibles
imageScale = 1; //1 is 100%
imageOriginalWidth = 0;

//show image from input
function showImageFromFileInput() {
	//TODO add fade in and out effects

	//clear current image
	$("#imageContainer").html("");

	//regx of image file name
	var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;

	//check if user upload image
	if (regex.test($("#fileupload").val().toLowerCase())) {
		//add image tag in div
		$("#imageContainer").show();
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

	} else {
		//TODO display error: it's not an image
		alert("Please upload a valid image file.");
	}

};

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
function scaleImage(targetScale) {
	//apply image new width
	$('#imageContainer img').css({
		'width':(imageOriginalWidth * targetScale) + 'px'
	});

	//save new scale
	imageScale = targetScale;
};