
document.addEventListener("deviceready", onDeviceReady, false);

var currentLatitude;
var currentLongitude;
var categories = ["housing", "behavioral", "health", "court", "education", "addiction", "financial", "food", "clothing", "childcare", "transport"];
var usedResource = Array();
var k = 0;
var counter = 0;
 
var zip = JSON.parse(sessionStorage["zipcode"]);
//console.log(zip);
$(function(){
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
    
    if(zip == "No zipcode")
      getCurrentLocation();
    else
      getZipcodeLocation();
}

// get location by zipcode

function getZipcodeLocation(){

  var geocoder = new google.maps.Geocoder();
  var address = zip[0];

  geocoder.geocode( { 'address': address}, function(results, status) {

  if (status == google.maps.GeocoderStatus.OK) {
      $('#busy').hide();
      currentLatitude = results[0].geometry.location.lat();;
      currentLongitude = results[0].geometry.location.lng();
      getData();
      }
  else { onError(status);}
});
}

/*gets the data from the categories database*/
function getData() {
    
    for(var i=0; i<categories.length; i++){
        var currentCategory = categories[i];
        
        $.ajax({
               type:"POST",
               data: {category:currentCategory},
               url: 'http://salauno.engr.scu.edu/categories.php',
               dataType: 'json',
               async: false,
               success: function(data)
               {
                    console.log("getdata: "+data);
                    setResource(data, currentCategory);
               },
               error: function(data, status)
               {
                    alert("Connection Failed");
           
               }
           });
    }
    
}

function setResource(dataPassed, category) {
    var closestResourceLength = 10.00;
    var closestResource;
    var resourceLat;
    var resourceLong;
    var distance;
    var resourceFlag = 0;
        // need to loop through all resourced in one category and pick the one closest to the
        // users current location
        //console.log("here:"+dataPassed.length);
        for(var j=0; j< dataPassed.length; j++){
            var resource = JSON.parse(dataPassed[j]);
            resourceLat = resource[7];
            resourceLong = resource[8];
            distance = parseFloat(calculateDistance(resourceLat, resourceLong));

            //get the resource closest to the users current location - per category
            if(distance < closestResourceLength){
                /*for(var l=0; l < usedResource.length; l++){
                    if(resource[1].localeCompare(usedResource[l]) == 0){
                        resourceFlag = 1;
                    }
                }*/
                
                //only count the resource as closest if it hasn't already been used in a previous category
                // do not want to duplicate resources -- each category has a unique featured resource
                /*if(resourceFlag == 0){
                    closestResourceLength = distance;*/
                    closestResource = resource;
                /*}
            }
        }*/
    
        //usedResource.push(closestResource[1]);
    
    var catName = category;
    //console.log(resource);
    $('#homeList').append(function () {
              var res = '<div>' +
                                  '<ul data-role="listview" data-inset="true">' +
                                  '<li >' + 
                                  
                                  '<input class="resCheckBox" type="checkbox" name="resCheck" id="checkbox-'+k+'" value="'+catName+':'+closestResource[1]+":"+closestResource[2]+":"+closestResource[3]+':'+closestResource[6]+'" style="visibility:hidden " />'+
                                  '<label for="checkbox-'+k+'">' +
                                  '<div class="catImg">'+ "</div>" +
                                  '<span class="catName">' +catName.charAt(0).toUpperCase() + catName.substr(1)+ '</span>';
                                  
                                  if(resource[13]!=null){
                                    res = res + '<img id="clothingImg" class="" src="img/' + closestResource[13] + '.svg" />' ;
                                  }
                                  if(resource[14]!=null){
                                    res = res + '<img id="clothingImg" class="" src="img/' + closestResource[14] + '.svg" />' ;
                                  }
                                  if(resource[15]!=null){
                                    res = res + '<img id="clothingImg" class="" src="img/' + closestResource[15] + '.svg" />' ;
                                  }
                                  if(resource[16]!=null){
                                    res = res + '<img id="clothingImg" class="" src="img/' + closestResource[16] + '.svg" />' ;
                                  }
                                  if(resource[17]!=null){
                                    res = res + '<img id="clothingImg" class="" src="img/' + closestResource[17] + '.svg" />' ;
                                  }
                                  if(resource[18]!=null){
                                    res = res + '<img id="clothingImg" class="" src="img/' + closestResource[18] + '.svg" />' ;
                                  }
                                  if(resource[19]!=null){
                                    res = res + '<img id="clothingImg" class="" src="img/' + closestResource[19] + '.svg" />' ;
                                  }
                                  

                                  if(closestResource[11] != null && closestResource[11].toUpperCase().indexOf('FREE')>-1)  {
                                    res = res + '<img class="freeImg"  class="" src="img/free-icon.svg" />' ;
                                  }
                                  else{
                                    //res = res + '<img id="clothingImg" class="" src="img/' + catName + '.svg" />' 
                                  }    
                                  res = res + '<h2>' + closestResource[1] + '</h2>' +
                                  '<p>' + closestResource[2] + ', ' + closestResource[3] + ',<br/> <a href="tel:'+closestResource[6]+ '">Ph: ' + closestResource[6] + '</a></p>'+
                                  '<p>Timings: ' + closestResource[10] + '</p>' +
                                  '</label>'+
                                  '</li>' +
                                  '</ul></div><hr/>';
              return $(res);
                                }).trigger("create");
    
    //update the counter to track what category it is on
    k = k + 1;
  }
}
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
        maximumAge: 0,
        enableHighAccuracy: true,
        timeout: 10000
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
        alert("Unable to get current location");
        /*alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');*/
        return;
        for(var i=0; i<categories.length; i++){
            var currentCategory = categories[i];
            
            $.ajax({
                   type:"POST",
                   data: {category:currentCategory},
                   url: 'http://salauno.engr.scu.edu/categories.php',
                   dataType: 'json',
                   async: false,
                   success: function(data)
                   {
                        console.log("onerror: "+data);
                        rigResources(data, currentCategory);
                   },
                   error: function(data, status)
                   {
                        alert("Connection Failed");
                   
                   }
        });
    }
}


/* displays selected resources if the database fetch fails*/
function rigResources(dataPassed2, category) {

    $('#busy').hide();
    var closestResourceLength = 10.00;
    var resourcesToDisplay = ["Bill Wilson Drop-In Center", "Bill Wilson Center Peacock Commons", "CityTeam Ministries", "Bill Wilson Center", "West Valley Community Services"];
    

    for(var j=0; j< dataPassed2.length; j++){
        var resource = JSON.parse(dataPassed2[j]);
        resourceLat = resource[7];
        resourceLong = resource[8];
        distance = parseFloat(calculateDistance(resourceLat, resourceLong));
        var catName = category.substring(0, 1).toUpperCase() + category.substring(1);
        //console.log(resource);
        //if(resource[1] == resourcesToDisplay[counter]){
          if(distance < closestResourceLength){
            $('#homeList').append(function () {
              var res = '<div>' +
                                  '<ul data-role="listview" data-inset="true">' +
                                  '<li >' + 
                                  
                                  '<input class="resCheckBox" type="checkbox" name="resCheck" id="checkbox-'+counter+'" value="'+catName+':'+resource[1]+":"+resource[2]+":"+resource[3]+':'+resource[6]+'" style="visibility:hidden " />'+
                                  '<label for="checkbox-'+counter+'">' +
                                  '<div class="catImg">'+ "</div>" +
                                  '<span class="catName">' +catName.charAt(0).toUpperCase() + catName.substr(1)+ '</span>';
                                  
                                  if(resource[13]!=null){
                                    res = res + '<img id="clothingImg" class="" src="img/' + resource[13] + '.svg" />' ;
                                  }
                                  if(resource[14]!=null){
                                    res = res + '<img id="clothingImg" class="" src="img/' + resource[14] + '.svg" />' ;
                                  }
                                  if(resource[15]!=null){
                                    res = res + '<img id="clothingImg" class="" src="img/' + resource[15] + '.svg" />' ;
                                  }
                                  if(resource[16]!=null){
                                    res = res + '<img id="clothingImg" class="" src="img/' + resource[16] + '.svg" />' ;
                                  }
                                  if(resource[17]!=null){
                                    res = res + '<img id="clothingImg" class="" src="img/' + resource[17] + '.svg" />' ;
                                  }
                                  if(resource[18]!=null){
                                    res = res + '<img id="clothingImg" class="" src="img/' + resource[18] + '.svg" />' ;
                                  }
                                  if(resource[19]!=null){
                                    res = res + '<img id="clothingImg" class="" src="img/' + resource[19] + '.svg" />' ;
                                  }
                                   

                                  if(resource[11]!=null && resource[11].toUpperCase().indexOf('FREE')>-1)  {
                                    res = res + '<img class="freeImg"  class="" src="img/free-icon.svg" />' ;
                                  }
                                  else{
                                    //res = res + '<img id="clothingImg" class="" src="img/' + catName + '.svg" />' 
                                  }    
                                  res = res + '<h2>' + resource[1] + '</h2>' +
                                  '<p>' + resource[2] + ', ' + resource[3] + ',<br/> <a href="tel:'+resource[6]+ '">Ph: ' + resource[6] + '</a></p>'+
                                  '<p>Timings: ' + resource[10] + '</p>' +
                                  '</label>'+
                                  '</li>' +
                                  '</ul></div><hr/>';
              return $(res);
                                }).trigger("create");
        
        //}
       
    
    counter = counter + 1;
  }
  }
}


