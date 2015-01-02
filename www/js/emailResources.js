/* gets the information to send the results in an email to the health provider.*/
alert("here!");
$("#main_body").removeClass("doc");


/*set the email address and content and take the user into the mail application*/

$(function  (){
    
    // bind for the send mail button to make a post request with all the itmes required to be provided
    // it calls[post request] the backend to send mail with the data
    $("#emailButton").bind("click",function() {
      console.log("init");
      var emailAddress;
                        var messageBody="";
                        console.log("here");
                        emailAddress = $("#emailAddr1").val();
                        var answersArray = localStorage.getItem("selectedResources");
                        var answerValues = JSON.parse(answersArray);
                        console.log(answersArray);
                        for(var i=0; i<=answerValues; i++){
                            messageBody = messageBody + answerValues[i] + "%0A%0A";
                        }
                        
                        var mailToAddress = "mailto:" + emailAddress + "?subject=Medical Questionnaire Results&body=" + messageBody;
                        window.location.href = mailToAddress;
      
    });
    
});