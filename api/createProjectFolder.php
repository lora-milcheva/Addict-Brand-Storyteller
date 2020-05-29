<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST');
header('Content-type: application/json; charset=utf-8');

$response = array();
$dirName = $_POST["projectFolder"];

if($dirName)  {

    $path = $_SERVER['DOCUMENT_ROOT'] . '/projectsData/' . $dirName;

    if(mkdir($path, 0755)) {

        $response = array(
            "status" => "success",
            "error" => false,
            "message" => "Directory created."
            );

    } else {

        throw new Exception('Error creating directory.');

        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error creating directory."
        );
    }

} else  {

    throw new Exception('No directory specified.');

    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "No directory specified."
      );
}


echo json_encode($response);

