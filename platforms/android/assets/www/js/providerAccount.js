/* gets the information to send the results in an email to the health provider.*/

$("#main_body").removeClass("doc");


/*set the email address and content and take the user into the mail application*/
$(function  (){
    if(localStorage.getItem("providerEmail")!=null){
        $("#cEmail").text("Current login Email: "+localStorage.getItem("providerEmail"));
    }
  $("#emailButton2").click(function() {
                        var emailAddress;
                        var messageBody="";
                        emailAddress = $("#emailAddr1").val();
                        var answersArray = JSON.parse(localStorage.getItem("answersArray"));
                        
                        navigator.notification.alert("Email verified", function(){localStorage.setItem("providerEmail", emailAddress);window.location.href = "./homePage.html";}, "StreetConnect for Youth", "Ok");
                        
                        
                        
                    });
  
  });