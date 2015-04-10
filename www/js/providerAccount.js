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

                        $.ajax({
                             data: {email: emailAddress},
                             type:"POST",
                             url: 'http://salauno.engr.scu.edu/verifyProvider.php',
                             error: function(data){
                                navigator.notification.alert("Unable to connect", function(){}, "StreetConnect for Youth", "Ok");
                                //alert(Text);
                             },
                             success: function(data){
                                console.log(data.toLowerCase());
                                if(data.toLowerCase().indexOf("provider found")!=-1){
                                    navigator.notification.alert("Email verified", function(){localStorage.setItem("providerEmail", emailAddress);window.location.href = "./homePage.html";}, "StreetConnect for Youth", "Ok");
                                }
                                else{
                                    navigator.notification.alert("Email not found", function(){}, "StreetConnect for Youth", "Ok");
                                }
                             }
                             
                             });
                        
                    });
  
  });