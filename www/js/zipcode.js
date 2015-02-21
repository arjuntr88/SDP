$(function  (){

  var zipcode = [];
  $("#locationSC").click(function() {
	    zipcode[0] = "No zipcode";
	    sessionStorage["zipcode"] = JSON.stringify(zipcode);
		window.location.href = "./toolsResources.html";
	   });
  $("#zipcodeSC").click(function() {
	zipcode[0] = prompt("Enter 5 digit zipcode");
	if(zipcode[0]===null){
		return;
	}
	sessionStorage["zipcode"] = JSON.stringify(zipcode);
	window.location.href = "./toolsResources.html";
  });
  
});