/* alert user after the submit the questionnaire answers */

$(function  (){
  $("#submit").click(function() {
                     navigator.notification.alert("Thank You. Please return the tablet to your service provide to complete the questionnaire.",function(){window.location.href = "./emailResults.html";}, "Questionnaire Complete", "Ok");
                     });
  });
