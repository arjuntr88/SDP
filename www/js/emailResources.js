/* gets the information to send the results in an email to the health provider.*/


document.addEventListener("deviceready", onDeviceReady, false);


/*set the email address and content and take the user into the mail application*/
console.log("file loaded");
$(function  (){
    
    // bind for the send mail button to make a post request with all the itmes required to be provided
    // it calls[post request] the backend to send mail with the data
    
    
});

function onDeviceReady() {
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
}
