$(function  (){
    // bind for the send mail button to make a post request with all the itmes required to be provided
    // it calls[post request] the backend to send mail with the data
    $("#continue").bind("click",function() {
      
      var checkRes = $('input[name=agreeCheckbox]').is(':checked');
      if(!checkRes){
      	navigator.notification.alert("Please agree to the confidentiality", function(){}, "StreetConnect for Youth", "Ok");
        return;                       
      }
      window.location.href = "./registerAccount.html";
      //localStorage.setItem("selectedResources", JSON.stringify(checkRes));
      //window.location.href = "./emailSelectedResources.html";
    });
    
});