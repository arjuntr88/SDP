$(function ()
  {
  alert("here");
  $.ajax({
         url: 'students.engr.scu.edu/~kdedoshk/seniorDesign',         //the script to call to get data
         data : "",                        //you can insert url argumnets here to pass to api.php
         //for example "id=5&parent=6"
         dataType: 'json',                //data format
         success: function(data)          //on recieve of reply
         {
         var id = data[0];              //get id
         var vname = data[1];           //get name
         //--------------------------------------------------------------------
         // 3) Update html content
         //--------------------------------------------------------------------
         $('#output').html("<b>id: </b>"+id+"<b> name: </b>"+vname);
            alert(vname);
         }
    });
});