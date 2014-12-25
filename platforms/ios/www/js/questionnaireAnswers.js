/* get the answers from the medical questionnaire after the submit button is pressed*/

$(function  (){
  
  var answers = [];
  var arrayJSON = [];
  var temp;
  var numOfQuestions = 14;
  var i;
  var radioPrefixes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E"];
  
  $("#submitAnswers").click(function() {
    for(i=0; i<numOfQuestions; i++){
       var index = radioPrefixes[i];
       var inputName = "input[name*=radio-choice-"+index+"]:checked";
                            
                            /*set the value to no answer selected if the user does not select an answer*/
                            if($(inputName).val() == null){
                                answers[i] = "No Answer Selected";
                                arrayJSON[i] = "No Answer Selected";
                            }
                            else{
                                answers[i] = $(inputName).val();
                                arrayJSON[i] = $(inputName).val();
                            }
        }
        
        /*store the answers into localStorage to be accessed on another page*/
        localStorage.setItem("arrayValues", JSON.stringify(arrayJSON));

  });
});
