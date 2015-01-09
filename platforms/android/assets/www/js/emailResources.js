/* gets the information to send the results in an email to the health provider.*/

$("#main_body").removeClass("doc");


/*set the email address and content and take the user into the mail application*/

$(function  (){
    
    // bind for the send mail button to make a post request with all the itmes required to be provided
    // it calls[post request] the backend to send mail with the data
    $("#emailButton").click(function() {
                        var emailAddress;
                        var messageBody="";
                        emailAddress = $("#emailAddr1").val();
                        var email_check = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i;
                        if(!email_check.test(emailAddress)){
                            navigator.notification.alert("Please enter a valid email", function(){}, "StreetConnect for Youth", "Ok");
                            return;
                        }
                        var answersArray = localStorage.getItem("selectedResources");
                        var answerValues = JSON.parse(answersArray);
                        for(var i=0; i<=answerValues.length; i++){
                            messageBody = messageBody + answerValues[i] + "%0A%0A";
                        }
                        
                         $.ajax({
                             data: {mailto: emailAddress, message: messageBody, subject : "Resources selected"},
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