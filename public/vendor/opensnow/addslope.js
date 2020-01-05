var newsLetterReminder;

var tips = ['Give the slope\'s full name', 
	'You should not post misinformation! You may affect other\'s people health',
	'Use exact coordinates'];

$(document).ready(function(){
	addSubmitEvent();	
	addNewsLetterForm();
	checkNewsLetterReminder();
	while(tips.length) {
		$("body").prepend("<p>" + tips.pop() + "</p>");
	}
});

function checkNewsLetterReminder()
{
	//if it doesn't exist in localstorage || the user isn't registered for newsletter
	if(localStorage.getItem('registeredForNewsLetter') != 1) {
		newsLetterReminder = setInterval(remindNewsLetter, 5000);
	}
}

function remindNewsLetter()
{
	alert("Please sign up for our newsletter!");
}

function addNewsLetterForm()
{
	var form = '<form id="newsletterForm"><input id="name" type="text" placeholder="Nume&Prenume"><br>' +
		'<span id="error"></span>' +
		'<input type="email" placeholder="Email"><br>' +
		'<input type="password" id="password" placeholder="Parola pentru vizualizare"><br>' +
		'<select><option value="18">18 ani</select><br>' +
		'<input type="checkbox" name="yes" value="Yes">Sunt de acord cu termenii<br>' +
		'<input type="radio" name="gender" value="male"> Male<br>' +
  		'<input type="radio" name="gender" value="female"> Female<br>' +
  		'<input type="radio" name="gender" value="other"> Other<br>' +
  		'Newsletter frequency: <input type="range" name="points" min="0" max="10">' +
		'<input type="submit">' +
		'</form>';	
	$('#newsletter').append(form);
	$("#newsletterForm").submit(submitRegisterNewsletter);
	$("#newsletterForm #name").on('keyup', function(){
		var content = $(this).val();
		if(content.trim().indexOf(' ') == -1) {
			$("#newsletterForm #error").html("Use both firstname and lastname<br>");
		}
		else {
			$("#newsletterForm #error").html("Great!<br>");
		}
	});
}

function submitRegisterNewsletter(e)
{
	e.preventDefault();
	var password = $("#password").val();
	if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
		localStorage.setItem('registeredForNewsLetter', 1);
		clearInterval(newsLetterReminder);
		setTimeout(function(){
			alert("Thank you for newsletter subscribe!");
		}, 5000);
		Swal.fire({
  		title: 'Thank you!',
  		html: 'Te-ai inregistrat pentru newsletter\n' + password,
  		icon: 'success',
  		confirmButtonText: 'Continue'
	});
	}
	else {
		Swal.fire({
  		title: 'Oops!',
  		html: 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  		icon: 'error',
  		confirmButtonText: 'Retry'
	});
	}
}

function addSubmitEvent()
{		
	$('#add-slope-form').submit(function(e){
		e.preventDefault();
		var name = $('#name').val();
		var lat = $('#lat').val();
		var long = $('#long').val();

		if(name === '' || lat === '' || long === '') {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Fields empty!'
			});
			return;
		}

		$.ajax({
			type: 'POST',
			url:  '/slope',
			dataType: 'json',
			data: {"name": name, "lat": lat, "long":long},
			success: function(data){
				console.log(data);
			},
			error: function(request) {
				console.log(request);
			},
			async:false
		});
	});		
}
