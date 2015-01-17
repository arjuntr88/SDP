/* alert user after the submit the questionnaire answers */

$(function  (){
	var answers = localStorage.getItem("answersArray");
	console.log(answersArray);
	var answersArray = JSON.parse(answers);
	console.log(answersArray);
	for (var i = 0; i < answersArray.length; i++) {
		answerArray = answersArray[i].split(':');
		var listString = '<ul data-role="listview" data-inset="true">'+
		'<li data-role="list-divider" id="greenBar">'+answerArray[0]+'</li>'+
		'<li>'+answerArray[1]+'</li></ul>';
		$("#questionAnswers").append(listString);
	};


  $("#submit").click(function() {
     navigator.notification.alert("Thank You. Please return the tablet to your service provide to complete the questionnaire.",function(){window.location.href = "./emailResults.html";}, "Questionnaire Complete", "Ok");
   });
  });
