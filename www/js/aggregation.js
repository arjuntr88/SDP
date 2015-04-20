
/* get the answers from the medical questionnaire after the submit button is pressed*/
var alphabet="abcdefghijklmnopqrstuvwxyz";
$(function  (){
  
  

  $.ajax({
               type:"GET",
               url: 'http://salauno.engr.scu.edu/aggregation.php',
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

  
  
});

function loadData(data){
    var i=1, total = data.total;
    var listString='<ul data-role="listview" data-inset="true" class="aggregation-listview">'+
      '<li data-role="list-divider" >Total number of responses: '+total+'</li></ul>';
    $("#main-content").append(listString).trigger("create");
    $.each(data, function(k, v) {
    //display the key and value pair

      if(k !== "total"){
         listString = '<ul data-role="listview" data-inset="true" class="aggregation-listview">'+
        '<li class="blue-bg">'+ i++ +'. '+k+'</li>';
        for (var j = 0; j <= v.length - 1; j++) {
         var percentage = (v[j][1]*100/total);
         //listString+='<li>'+ v[j][0] +' : '+percentage.toFixed(0)+'%</li>';
         listString+='<li>'+percentage.toFixed(0)+'% '+v[j][0]+
         /*'<br/><svg width="100%" height="20">'+
          '<rect width="'+percentage.toFixed(0)+'%" height="18" style="fill:rgb(51, 181, 229);stroke-width:0;stroke:rgb(194, 232, 247)" />'+
          '</svg>' +*/
         '</li>';
        }

        listString+='</ul>';
        $("#main-content").append(listString).trigger("create");
        
      }
    });

  }
