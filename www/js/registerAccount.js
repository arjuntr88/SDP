/* get the user inputed account info to register for StreetConnect*/

$(function  (){
  $("#registerAcctSC").click(function() {

    var accountInfo = [];
    var lengthNumber = $("#phoneNumberEntry").val().length;
    var condition1 = 0;
    var condition2 = 0;
                             
    /*make sure the inputed phone number is 10 digits*/
    if(lengthNumber != 10)
    {
        navigator.notification.alert("Invalid phone number. Please enter your 10 digit phone number with no spaces.", function(){}, "Oops!", "OK");
        condition2 = 1;
    }
                
    if(condition2 == 0)
    {
        /*get the current phone numbers currently stored in the sql database*/
        getPhoneNumbers();
    }
                             
  });
});

/*get current phone number from the yth users database*/
function getPhoneNumbers(){

    var inputFlag = 0;
    
  $.ajax({
         type:"GET",
         url: 'http://students.engr.scu.edu/~kdedoshk/seniorDesign/ythUsersDb.php',
         dataType: 'json',
         success: function(data)
         {
            var inputNumber = $("#phoneNumberEntry").val();
         
            for(var i=0; i < data.length; i++){
                var phoneNum = data[i];
                if(phoneNum == inputNumber){
                    inputFlag = 1;
                }
            }
         
            /*if the users phone number is already in the database then just go to the questionnaire*/
            if(inputFlag == 1){
                navigator.notification.alert("Login Sucessful",function(){window.location.href = "./healthQuestionnaire.html";}, "StreetConnect for Youth", "Ok");
            }
            else{
                /*if they are not already in the database, add the phone number*/
                registerNumber(inputNumber);
            }
        },
         
        error: function(data, status)
        {
            alert("Connection Failed");
        }
    });
}

/* add phone number to the yth users database */
var phoneNumberToAdd;
function registerNumber(phoneNumberToAdd){
  $.ajax({
         data: "num="+phoneNumberToAdd,
         type:"post",
         url: 'http://students.engr.scu.edu/~kdedoshk/seniorDesign/insertYthUser.php',
         success: function(data){
         navigator.notification.alert("Thank you for registering!", function(){window.location.href = "./healthQuestionnaire.html";}, "StreetConnect for Youth", "Ok");
         }
         
         });
  }
