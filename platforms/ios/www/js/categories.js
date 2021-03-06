
document.addEventListener("deviceready", onDeviceReady, false);

var currentLatitude;
var currentLongitude;
var categories = ["clothing", "employment", "food", "healthcare", "housing"];
var usedResource = Array();
var k = 0;
var counter = 0;

$(function  (){
    // bind for the send mail button to make a post request with all the itmes required to be provided
    // it calls[post request] the backend to send mail with the data
    $("#sendMail").bind("click",function() {
      
      var checkRes = $('#homeList').find('input[name=resCheck]:checked').map(function(){
        return  this.value;
      }).get();
      localStorage.setItem("selectedResources", JSON.stringify(checkRes));
      window.location.href = "./emailSelectedResources.html";
    });
    
});

function onDeviceReady() {
    $('#busy').show();
    
    getCurrentLocation();
}

/*gets the data from the categories database*/
function getData() {
    
    for(var i=0; i<5; i++){
        var currentCategory = categories[i];
        
        $.ajax({
               type:"POST",
               data: {category:currentCategory},
               url: 'http://students.engr.scu.edu/~kdedoshk/seniorDesign/categories.php',
               dataType: 'json',
               async: false,
               success: function(data)
               {
                    setResource(data);
               },
               error: function(data, status)
               {
                    alert("Connection Failed");
           
               }
           });
    }
    
}

function setResource(dataPassed) {
    var closestResourceLength = 100.00;
    var closestResource;
    var resourceLat;
    var resourceLong;
    var distance;
    var resourceFlag = 0;
        // need to loop through all resourced in one category and pick the one closest to the
        // users current location
        for(var j=0; j< dataPassed.length; j++){
            var resource = JSON.parse(dataPassed[j]);
            resourceLat = resource[7];
            resourceLong = resource[8];
            distance = parseFloat(calculateDistance(resourceLat, resourceLong));

            //get the resource closest to the users current location - per category
            if(distance < closestResourceLength){
                for(var l=0; l < usedResource.length; l++){
                    if(resource[1].localeCompare(usedResource[l]) == 0){
                        resourceFlag = 1;
                    }
                }
                
                //only count the resource as closest if it hasn't already been used in a previous category
                // do not want to duplicate resources -- each category has a unique featured resource
                if(resourceFlag == 0){
                    closestResourceLength = distance;
                    closestResource = resource;
                }
            }
        }
    
        usedResource.push(closestResource[1]);
    
    var catName = categories[k].substring(0, 1).toUpperCase() + categories[k].substring(1);
    $('#homeList').append(function () {
              return $('<div>' +
                                  '<ul data-role="listview" data-inset="true">' +
                                  '<li id="greenBar1">' + catName + '</li>' +
                                  '<li class="subRow" id="'+resource[1]+'">' +
                                  '<img id="clothingImg" class="ui-li-thumb" src="img/' + catName + '.png" />' +
                                  '<h2>' + resource[1] + '</h2>' +
                                  '<p>' + resource[2] + ', ' + resource[3] + ', ' + resource[6] + '</p>'+
                                  '<input class="resCheckBox" type="checkbox" name="resCheck" value="'+resource[1]+","+resource[2]+","+resource[3]+'" style="visibility: hidden" />'+'</li>' +
                                  '</ul></div>').bind("click", '#'+resource[1], function(event, ui) {
                                            if($(this).find("input[type='checkbox']").prop('checked')){
                                              $(this).find("input[type='checkbox']").prop('checked', false).checkboxradio('refresh');
                                              $(this).find(".subRow").css("background-color","white");
                                            }
                                            else{
                                              $(this).find("input[type='checkbox']").prop('checked', true).checkboxradio('refresh');
                                              $(this).find(".subRow").css("background-color","#97c83c");
                                            }
                                  });
                                }).trigger("create");
    
    //update the counter to track what category it is on
    k = k + 1;
}

/*calculate the distance between two longitude/latitude coordinates*/
function calculateDistance(resLat, resLong) {
    var point1 = new google.maps.LatLng(currentLatitude, currentLongitude);
    var point2 = new google.maps.LatLng(resLat, resLong);
    var distance = (google.maps.geometry.spherical.computeDistanceBetween(point1, point2) / 1000).toFixed(2);
    return distance;
}

/*get the users current location*/
function getCurrentLocation(){
    
    var options = {
        enableHighAccuracy: true,
        timeout: 100
    };
    
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
}

/*onSuccess of geolocation fetch set the coordinates and call the getData function*/
function onSuccess(position) {
    $('#busy').hide();
    currentLatitude = position.coords.latitude;
    currentLongitude = position.coords.longitude;
    getData();
}

/* onError, the fuction calls the rigResources function to display resources. (THIS IS FOR THE SENIOR DESIGN DEMO) */
function onError(error) {
    
        for(var i=0; i<5; i++){
            var currentCategory = categories[i];
            
            $.ajax({
                   type:"POST",
                   data: {category:currentCategory},
                   url: 'http://students.engr.scu.edu/~kdedoshk/seniorDesign/categories.php',
                   dataType: 'json',
                   async: false,
                   success: function(data)
                   {
                        rigResources(data);
                   },
                   error: function(data, status)
                   {
                        alert("Connection Failed");
                   
                   }
        });
    }
}


/* displays selected resources if the database fetch fails*/
function rigResources(dataPassed2) {

    $('#busy').hide();
    
    var resourcesToDisplay = ["Bill Wilson Drop-In Center", "Bill Wilson Center Peacock Commons", "CityTeam Ministries", "Bill Wilson Center", "West Valley Community Services"];
    

    for(var j=0; j< dataPassed2.length; j++){
        var resource = JSON.parse(dataPassed2[j]);
        
        var catName = categories[counter].substring(0, 1).toUpperCase() + categories[counter].substring(1);
        
        if(resource[1] == resourcesToDisplay[counter]){
            $('#homeList').append(function () {
              return $('<div>' +
                                  '<ul data-role="listview" data-inset="true">' +
                                  '<li id="greenBar1">' + catName + '</li>' +
                                  '<li class="subRow" id="'+resource[1]+'">' +
                                  '<img id="clothingImg" class="ui-li-thumb" src="img/' + catName + '.png" />' +
                                  '<h2>' + resource[1] + '</h2>' +
                                  '<p>' + resource[2] + ', ' + resource[3] + ', ' + resource[6] + '</p>'+
                                  '<input class="resCheckBox" type="checkbox" name="resCheck" value="'+resource[1]+","+resource[2]+","+resource[3]+'" style="visibility: hidden" />'+'</li>' +
                                  '</ul></div>').bind("click", '#'+resource[1], function(event, ui) {
                                            if($(this).find("input[type='checkbox']").prop('checked')){
                                              $(this).find("input[type='checkbox']").prop('checked', false).checkboxradio('refresh');
                                              $(this).find(".subRow").css("background-color","white");
                                            }
                                            else{
                                              $(this).find("input[type='checkbox']").prop('checked', true).checkboxradio('refresh');
                                              $(this).find(".subRow").css("background-color","#97c83c");
                                            }
                                  });
                                }).trigger("create");
        
        }
       
    }
    counter = counter + 1;
}


