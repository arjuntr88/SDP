/* gets the information to send the results in an email to the health provider.*/

$("#main_body").removeClass("doc");


/*set the email address and content and take the user into the mail application*/
$(function  (){
  $("#emailButton2").click(function() {
                        var emailAddress;
                        var messageBody="";
                        emailAddress = $("#emailAddr1").val();
                        var answersArray = JSON.parse(localStorage.getItem("answersArray"));
                        
                        for (var i = 0; i < answersArray.length; i++) {
                            var answerArray = answersArray[i].split(':');
                            messageBody = messageBody +"<b>"+ answerArray[0] + "</b>\n Answer: " + answerArray[1]  + "\n\n";
                            
                        }
                       
                        $.ajax({
                             data: {mailto: emailAddress, message: messageBody, subject : "Questionnaire Answers"},
                             type:"POST",
                             url: 'http://salauno.engr.scu.edu/emailReferrals.php',
                             error: function(data){
                                navigator.notification.alert("Unable to send email right now, Continue?", function(){window.location.href = "./homePage.html";}, "StreetConnect for Youth", "Ok");
                                //alert(Text);
                             },
                             success: function(data){
                                navigator.notification.alert("Email will be sent to the entered address!", function(){window.location.href = "./homePage.html";}, "StreetConnect for Youth", "Ok");
                             }
                             
                             });
                        
                    });
  
  });