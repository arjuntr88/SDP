$("#main_body").removeClass("doc");
if(localStorage.getItem("providerEmail")==null){
	$(".homeClick").bind("click", function(event, ui){
		//event.preventDefault(); 
		
		//navigator.notification.alert("Please login in accounts page to continue", function(){ }, "StreetConnect for Youth", "Ok");
	    
	});
}