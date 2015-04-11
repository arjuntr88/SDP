/* gets the information to send the results in an email to the health provider.*/

$("#main_body").removeClass("doc");


/*set the email address and content and take the user into the mail application*/
$(function  (){
    if(localStorage.getItem("providerEmail")!=null){
        $("#cEmail").text("Current login Email: "+localStorage.getItem("providerEmail"));
    }
  $("#emailButton2").click(function() {
                        
                        var messageBody="";
                        messageBody = $("#emailAddr1").val();
                        
                        $.ajax({
                             data: {mailto: "arjun200034@gmail.com", message: messageBody, subject : "Update provider information"},
                             type:"POST",
                             url: 'http://salauno.engr.scu.edu/updateProvider.php',
                             error: function(data){
                                navigator.notification.alert("Unable to connect", function(){}, "StreetConnect for Youth", "Ok");
                                //alert(Text);
                             },
                             success: function(data){
                                console.log(data.toLowerCase());
                                
                                navigator.notification.alert("Details will be updated", function(){window.location.href = "./homePage.html";}, "StreetConnect for Youth", "Ok");
                                
                             }
                             
                             });
                        
                    });
  
  });