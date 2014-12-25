/* gets the information to send the results in an email to the health provider.*/

$("#main_body").removeClass("doc");

var quizQuestions = [[2, "Have you filled this form before?", "Yes", "No"],
                     [2, "Have you ever had sexual intercourse?", "Yes", "No"],
                     [8, "How old were you when you had sexual intercourse for the first time?", "I have never had sexual intercourse", "11 years old or younder", "12 years old", "13 years old", "14 years old", "15 years old", "16 years old", "17 years old or older"],
                     [7, "During your life, with how many people have you had sexual intercourse?", "I have never had sexual intercourse", "1 person", "2 people", "3 people", "4 people", "5 people", "6 or more people"],
                     [8, "During the past 3 months, with how many people did you have sexual intercourse?", "I have never had sexual intercourse", "I have had sexual intercourse, but not during the past 3 months", "1 person", "2 people", "3 people", "4 people", "5 people", "6 or more people"],
                     [3, "Did you drink alcohol or use drugs before you had sexual intercourse the last time?", "I have never had sexual intercourse", "Yes", "No"],
                     [3, "The last time you had sexual intercourse, did you or your partner use a condom?", "I have never had sexual intercourse", "Yes", "No"],
                     [8, "The last time you had sexual intercourse, what one method did you or your partner use to prevent pregnancy? (Select only one response.)", "I have never had sexual intercourse", "No method was used to prevent pregnancy", "Birth control pills", "Condoms", "An IUD (such as Mirena or Paragard) or impant (such as Implanon or Nexplanon)", "A shot (such as Depo-Provera), patch (such as Ortho Evra), or birth control ring (such as NuvaRing)", "Withdrawal or some other method", "Not sure"],
                     [4, "How many of your friends who are having sexual intercourse are using condoms?"],
                     [7, "During the past 12 months, what was the main reason you did not get condoms when you needed them? (Select only one response.)"],
                     [4, "Does at least one of your parents or legal guardians know you have had sexual intercourse?"],
                     [8, "During the past 12 months, what is the main reason you have not received sexual health care services such as birth control, pregnancy testing, or STD testing? (Select only one response.)"],
                     [2, "Have you ever been physically forced to have sexual intercourse when you did not want to?"],
                     [6, "During the past 12 months, how many times did someone you were dating or going out with physically hurt you on purpose? (Count such things as being hit, slammed into something, or injured with an object or weapon.)"],
                     [6, "During the past 12 months, how many times did someone you were dating or going out with force you to do sexual things that you did not want to do? (Count such things as kissing, touching, or being physically forced to have sexual intercourse.)"]
]


/*set the email address and content and take the user into the mail application*/
$(function  (){
  $("#emailButton2").click(function() {
                        var emailAddress;
                        var messageBody="";
                        emailAddress = $("#emailAddr1").val();
                        var answersArray = localStorage.getItem("arrayValues");
                        var answerValues = JSON.parse(answersArray);
                        
                        for(var i=1; i<=14; i++){
                            messageBody = messageBody + i + ". " + quizQuestions[i-1][1] + "%0A Answer: " + answerValues[i-1] + "%0A%0A";
                        }
                        
                        var mailToAddress = "mailto:" + emailAddress + "?subject=Medical Questionnaire Results&body=" + messageBody;
                        window.location.href = mailToAddress;
                    });
  
  });