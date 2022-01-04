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

		//get file name from input
		reader.onload = function (e) {
			//add image to container
			$("#imageContainer img").attr("src", e.target.result);
		}

		//read file from input
		reader.readAsDataURL($("#fileupload")[0].files[0]);

	} else {
		//display error: it's not an image
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
	}
	
};

//TODO image scale