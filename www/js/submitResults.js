/* alert user after the submit the questionnaire answers */

$(function  (){
	var answers = localStorage.getItem("answersArray");
	var answersArray = JSON.parse(answers);
	
	for (var i = 0; i < answersArray.length; i++) {
    if(i<4){
      answerArray = answersArray[i].split(':');
      var listString = '<ul data-role="listview" data-inset="true">'+
      '<li data-role="list-divider" >'+answerArray[0]+'</li>'+
      '<li><h2>'+answerArray[1]+'</h2></li></ul>';
      $("#questionAnswers1").append(listString);
    }
    else if(i>3 && i<9){
      answerArray = answersArray[i].split(':');
      var listString = '<ul data-role="listview" data-inset="true">'+
      '<li data-role="list-divider" >'+answerArray[0]+'</li>'+
      '<li><h2>'+answerArray[1]+'</h2></li></ul>';
      $("#questionAnswers2").append(listString);
    }
    else{
      answerArray = answersArray[i].split(':');
      var listString = '<ul data-role="listview" data-inset="true">'+
      '<li data-role="list-divider" >'+answerArray[0]+'</li>'+
      '<li><h2>'+answerArray[1]+'</h2></li></ul>';
      $("#questionAnswers3").append(listString);
    }
		
	};


  $("#submit").click(function() {
  	var answers = localStorage.getItem("answersArray");	
    console.log(answers);
  	var providerEmail = localStorage.getItem("providerEmail");
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
				var answersArray = JSON.parse(localStorage.getItem("answersArray"));
                var messageBody="<h2>Questionnaire Results</h2>";        
                for (var i = 0; i < answersArray.length; i++) {
                    var answerArray = answersArray[i].split(':');
                    messageBody = messageBody +'<b>'+ answerArray[0] + "</b><br/> Answer: " + answerArray[1]  + "<br/>";
                    
                }
                if(providerEmail!=null || providerEmail!=''){
                $.ajax({
                     data: {mailto: providerEmail, message: messageBody, subject : "Questionnaire Answers"},
                     type:"POST",
                     url: 'http://salauno.engr.scu.edu/emailReferrals.php',
                     error: function(data){
                        navigator.notification.alert("Unable to send email right now, Continue?", function(){window.location.href = "./homePage.html";}, "StreetConnect for Youth", "Ok");
                        //alert(Text);
                     },
                     success: function(data){
                        navigator.notification.alert("Thank You. Please return the tablet to your Service Provider to complete the Questionnaire.	", function(){window.location.href = "./homePage.html";}, "StreetConnect for Youth", "Ok");
                     }
                     
                     });
            }
            else{
				navigator.notification.alert("Thank You. Please return the tablet to your Service Provider to complete the Questionnaire.",function(){window.location.href = "./emailResults.html";}, "Questionnaire Complete", "Ok");
            }
   			
			}

		});
		});
     
  });
