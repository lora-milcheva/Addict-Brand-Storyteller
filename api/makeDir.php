<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST');
header('Content-type: application/json; charset=utf-8');

$response = array();
$dirName = $_POST["projectFolder"];

if($dirName)  {

    $path = $_SERVER['DOCUMENT_ROOT'] . '/projects/' . $dirName;

    if(mkdir($path, 0700)) {

        $response = array(
            "status" => "success",
            "error" => false,
            "message" => "Directory created"
            );

    } else {

        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error creating directory"
        );
    }

} else  {

    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "No dir specified"
      );
}


echo json_encode($response);

?>