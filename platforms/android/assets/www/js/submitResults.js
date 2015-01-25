/* alert user after the submit the questionnaire answers */

$(function  (){
	var answers = localStorage.getItem("answersArray");
	var answersArray = JSON.parse(answers);
	console.log('here:'+answersArray);
	for (var i = 0; i < answersArray.length; i++) {
		answerArray = answersArray[i].split(':');
		var listString = '<ul data-role="listview" data-inset="true">'+
		'<li data-role="list-divider" id="greenBar">'+answerArray[0]+'</li>'+
		'<li>'+answerArray[1]+'</li></ul>';
		$("#questionAnswers").append(listString);
	};


  $("#submit").click(function() {
  	var answers = localStorage.getItem("answersArray");	
  	var providerEmail = localStorage.getItem("providerEmail");
  	console.log(answers);
  	//inserting the answers in database
	$.ajax({
//
			type: 'POST',
			url: 'http://salauno.engr.scu.edu/storeAnswers.php',
			data: {
				answers1:answers,
				email: providerEmail
			},
			async: true,
			cache: false,
			success: function(result) {
			navigator.notification.alert("Thank You. Please return the tablet to your service provide to complete the questionnaire.",function(){window.location.href = "./emailResults.html";}, "Questionnaire Complete", "Ok");
   			
			console.log("stored answers");

			}

		});
		});
     
  });
