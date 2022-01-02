// $(function () {

// 	//preview image from inout
//     $("#fileupload").change(function () {
// 		//clear current image
//         $("#dvPreview").html("");

// 		//regx of image file name
//         var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;

// 		//check if user upload image
//         if (regex.test($(this).val().toLowerCase())) {
// 			//add image tag in div
// 			$("#dvPreview").show();
// 			$("#dvPreview").append("<img />");

// 			//create FileReader obj
// 			var reader = new FileReader();

// 			//get file name from input
// 			reader.onload = function (e) {
// 				//add image to container
// 				$("#dvPreview img").attr("src", e.target.result);
// 			}

// 			//read file from input
// 			reader.readAsDataURL($(this)[0].files[0]);

//         } else {
// 			//display error: it's not an image
//             alert("Please upload a valid image file.");
//         }
//     });

// });

function showImg() {
	//clear current image
	$("#dvPreview").html("");

	//regx of image file name
	var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;

	//check if user upload image
	if (regex.test($("#fileupload").val().toLowerCase())) {
		//add image tag in div
		$("#dvPreview").show();
		$("#dvPreview").append("<img />");

		//create FileReader obj
		var reader = new FileReader();

		//get file name from input
		reader.onload = function (e) {
			//add image to container
			$("#dvPreview img").attr("src", e.target.result);
		}

		//read file from input
		reader.readAsDataURL($("#fileupload")[0].files[0]);

	} else {
		//display error: it's not an image
		alert("Please upload a valid image file.");
	}
}

// Wait for HTML document to get ready
window.addEventListener('load', function() {

    startElement = document.getElementById('start');
	endElement = document.getElementById('end');
    line = new LeaderLine(LeaderLine.pointAnchor(startElement), LeaderLine.pointAnchor(endElement),
      {
		  startPlug: 'behind',
		  endPlug: 'behind',
		  color: 'red',
		  size: 2,
		  path: 'straight',
		  startSocket: 'auto',
		  endSocket: 'auto'
		});


  new PlainDraggable(startElement, {
    onMove: function() {
      line.position();
    },
    zIndex: false
  });

  new PlainDraggable(endElement, {

    onMove: function() {
      line.position();
    },
    zIndex: false
  });





  //window load
  });