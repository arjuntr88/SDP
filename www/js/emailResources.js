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
                        var answersArray = localStorage.getItem("selectedResources");
                        var answerValues = JSON.parse(answersArray);
                        for(var i=0; i<=answerValues; i++){
                            messageBody = messageBody + answerValues[i] + "%0A%0A";
                        }
                        
                         $.ajax({
                             data: {mailto: emailAddress, message: messageBody,subject : "Resources selected"},
                             type:"post",
                             url: 'http://salauno.engr.scu.edu/emailReferral.php',
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