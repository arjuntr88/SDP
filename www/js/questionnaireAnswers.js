
/* get the answers from the medical questionnaire after the submit button is pressed*/
var alphabet="abcdefghijklmnopqrstuvwxyz";
$(function  (){
  
  var answers = [];
  var arrayJSON = [];
  var temp;
  var numOfQuestions = 15;
  var i;
  var radioPrefixes = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E"];
  

  $.ajax({
               type:"GET",
               url: 'http://salauno.engr.scu.edu/questions.php',
               dataType: 'json',
               async: false,
               success: function(data)
               {
                  loadData(data);
               },
               error: function(data, status)
               {
                    alert("Connection Failed");
           
               }
           });

  
  $("#submitAnswers").click(function() {
    var answersArray = [];
    $("[id*=question-]").each(function(){
      var question = $(this).find("li").text();
      var answer = $(this).find("input:checked").val();
      if( answer!=null)
        answersArray.push(question+':'+answer);//answersArray.push({ question : answer });
      else
        answersArray.push(question+':No answer selected');
        //answersArray.push({ question: answer });

    });
    localStorage.setItem("answersArray", JSON.stringify(answersArray));
    
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

function loadData(data){
    for (var i = 0; i <= data.length - 1; i++) {
      
      var answers = data[i][1].split(';');
      var formString="";
      formString = '<form id="question-'+i+'">'+
          '<fieldset data-role="controlgroup" data-type="vertical">'+
          '<li class="ui-li ui-li-divider ui-btn ui-bar-a ui-corner-top" id="greenBar" data-role="list-divider">'+(i+1)+'. '+data[i][0]+'</li>';
       
      for (var j = 0; j <= answers.length - 1; j++) {
       // console.log(alphabet.charAt(j));
        
          formString+='<input type="radio" name="radio-choice-'+i+'" id="radio-choice-'+i+alphabet.charAt(j)+'" value="'+answers[j]+'">'+
          '<label for="radio-choice-'+i+alphabet.charAt(j)+'">'+answers[j]+'</label>';
         
        
      };
      formString += '</fieldset>'+
          '</form>';
          
      $("#main-content").append(formString).trigger("create");
    };
  }
