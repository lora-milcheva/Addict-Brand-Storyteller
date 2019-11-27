<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST');
header('Content-type: application/json; charset=utf-8');

$response = array();
$file = $_GET["file"];

if($file)  {

    $path = $_SERVER['DOCUMENT_ROOT'] . $file;

    if(unlink($path)) {

        $response = array(
            "status" => "success",
            "error" => false,
            "message" => "Image removed"
            );

    } else {

        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error deleting image"
        );
    }

} else  {

    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "No file specified."
      );
}


echo json_encode($response);

?>