<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST');
header('Content-type: application/json; charset=utf-8');

$response = array();
$dirName = $_POST["projectFolder"];

if($dirName)  {

    $path = $_SERVER['DOCUMENT_ROOT'] . '/projectsData/' . $dirName;
    // $path = 'D:/Lora/Pictures/Projects/' . $dirName;

    if(array_map('unlink', glob("$path/*.*"))) {

        rmdir($path);

        $response = array(
            "status" => "success",
            "error" => false,
            "message" => "Project folder removed."
            );

    } else {

        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error deleting directory"
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