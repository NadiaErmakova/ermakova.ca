<?php

      $to = 'test@test.com';  // please change this email id
      
      $errors = array();
      // print_r($_POST);

      // Check if first name has been entered
      if (!isset($_POST['first_name'])) {
            $errors['first_name'] = 'Please enter your first name';
      }

      // Check if state has been entered
      if (!isset($_POST['state'])) {
            $errors['state'] = 'Please enter your state';
      }

      // Check if date has been entered
      if (!isset($_POST['datepicker'])) {
            $errors['datepicker'] = 'Please enter a date';
      }

      // Check if phone number has been entered
      if (!isset($_POST['phone'])) {
            $errors['phone'] = 'Please enter your phone number';
      }

      // Check if guest phone number has been entered
      if (!isset($_POST['guest'])) {
            $errors['guest'] = 'Please enter your guest phone number';
      }
      
      // Check if email has been entered and is valid
      if (!isset($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Please enter a valid email address';
      }
      
      //Check if subject has been entered
      if (!isset($_POST['subject'])) {
            $errors['subject'] = 'Please enter your subject';
      }

      $errorOutput = '';

      if(!empty($errors)){

            $errorOutput .= '<div class="alert alert-danger alert-dismissible" role="alert">';
            $errorOutput .= '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';

            $errorOutput  .= '<ul>';

            foreach ($errors as $key => $value) {
                  $errorOutput .= '<li>'.$value.'</li>';
            }

            $errorOutput .= '</ul>';
            $errorOutput .= '</div>';

            echo $errorOutput;
            die();
      }



      $name = $_POST['first_name'];
      $email = $_POST['email'];
      $message = $_POST['subject'];
      $from = $email;
      $subject = 'Contact Form : Restaurant Pro Responsive HTML5 Template';
      
      $body = "From: $name\n E-Mail: $email\n Message:\n $message";


      //send the email
      $result = '';
      if (mail ($to, $subject, $body)) {
            $result .= '<div class="alert alert-success alert-dismissible" role="alert">';
            $result .= '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
            $result .= 'Your Reservation is successfull!!!';
            $result .= '</div>';

            echo $result;
            die();
      }

      $result = '';
      $result .= '<div class="alert alert-danger alert-dismissible" role="alert">';
      $result .= '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
      $result .= 'Something bad happend during sending this message. Please try again later';
      $result .= '</div>';

      echo $result;
      die();


?>