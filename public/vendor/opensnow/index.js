$("#send").on('click', sendData);

$("#bgColorButton").on('click', changeBgColor);

function changeBgColor()
{
	var color = $("#bgColorPicker").val();
	$("#navbar").css('background-color', color);
}

function sendData()
{
	var condition = $("#conditions").val();
	var conditionText = $("#conditions option:selected").text();
	var slopeId = $("#slopeId").val();
	$("#sendInfoModal").modal('hide');
	Swal.fire({
  		title: 'Thank you!',
  		html: 'Your submission will contribute to our data. In order to prevent spamming, your ip will be restricted for 6 hours. <br>' +
  		'You said: <b>' + conditionText + '</b>',
  		icon: 'success',
  		confirmButtonText: 'Continue'
	});
}
