<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

$to = "l.milcheva@addict-bg.com";
$cc = "l.milcheva@addict-bg.com, p.kostadinova@addict-bg.com";

$firstName = $_GET['firstName'];
$lastName = $_GET['lastName'];

$email = $_GET['email'];
$phone = $_GET['phone'];

$subject = $_GET['subject'];
$messageText = $_GET['message'];

$message = "
<html>

<head>
    <title>Mail</title>
</head>

<body STYLE=\"font-family: Calibri, sans-serif;\">
    <p STYLE='border-bottom: 1px solid red; padding: 15px; background-color: #f1f1f1'>$messageText</p>

    <p><b>$firstName $lastName</b><br/>
    $phone<br/>
     $email</p>
</body>
</html>
";



// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: ' . $email . "\r\n";
// $headers .= 'Cc: ' . $cc . "\r\n";


mail($to,$subject,$message,$headers);
?>