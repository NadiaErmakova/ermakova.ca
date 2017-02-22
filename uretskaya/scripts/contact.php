<html>
<body>
<div id="error" style="display:none;">
<?php

$error = "";

if (isset($_REQUEST['email']) && strlen($_REQUEST['email']) > 0)
//if "email" is filled out, send email
{
  //send email
  $to = "alena.uri@gmail.com";
  $subject = "Elena Uretskaya - Contact Form ";
  
  $email = $_REQUEST['email'] ;
  $headers = "From: $email";
  
  $name = $_REQUEST['name'] ;
  $message = $_REQUEST['message'] ;
  
  $message = "\n\n Name: $name\n Email: $email\n Message: $message\n";
  
  $message = str_replace("\n.", "\n..", $message);
  
  try{
	  mail($to,$subject,$message,$headers);
  }catch(Exception $e){
	 $error = "error";
  }
}
else
//if "email" is not filled out, display the form
{
	$error = "email";
  echo "window.history.back()";
}
?>
</div>

<script type="text/javascript">
function form_error(){
	alert('It was unable to send form, please contact website\'s administrator.');
	window.history.back();
}
function form_fill_error(){
	//alert('It was unable to send form, please contact website\'s administrator.');
	window.history.back();
}
function run(){
	var error = document.getElementById("error").innerHTML;
	if(!error || error.length < 20){
		window.location = '../sub_contact.html';
	}else{
		form_error();
	}
}
<?php
	if (strlen($error) > 0){
		if ($error == "email"){
			echo "form_fill_error();";
		}else{
			echo "form_error();";
		}
	}else{
	  echo "run();";
	}
?>
</script>
</body>
</html>