<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Content-type: application/json');


$to = "office@addict-bg.com";
$cc = "l.milcheva@addict-bg.com, p.kostadinova@addict-bg.com";


$firstName = test_input($_GET["firstName"]);
$lastName = test_input($_GET["lastName"]);
$email = test_input($_GET["email"]);
$phone = test_input($_GET["phone"]);
$subject = test_input($_GET["subject"]);
$messageText = test_input($_GET["message"]);


function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

if (empty($firstName) && empty($email)) die();

if ($subject != '') {
    $subject = '=?UTF-8?B?'.base64_encode($subject).'?=';
} else {
    $subject = 'no subject';
}

$message = "
<html>

<head>
    <title>Mail</title>
</head>

<body STYLE=\"font-family: Calibri, sans-serif;\">
    <p STYLE='border-bottom: 1px solid red; padding: 15px; background-color: #f1f1f1'>$messageText</p>
    <p>
        <b>$firstName $lastName</b>
        <br/>$email
        <br/>$phone
    </p>
</body>
</html>
";



// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";


// More headers
$headers .= 'From: ' . $email . "\r\n";
$headers .= 'Cc: ' . $cc . "\r\n";


mail($to, $subject, $message, $headers);

?>