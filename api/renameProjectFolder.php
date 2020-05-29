<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST');
header('Content-type: application/json; charset=utf-8');

$response = array();
$oldName = $_POST["oldName"];
$newName = $_POST["newName"];

if($oldName && $newName)  {

    $oldPath = $_SERVER['DOCUMENT_ROOT'] . '/projectsData/' . $oldName;

    $newPath = $_SERVER['DOCUMENT_ROOT'] . '/projectsData/' . $newName;

    if(rename($oldPath, $newPath)) {

        $response = array(
            "status" => "success",
            "error" => false,
            "message" => "Folder renamed."
        );

    } else {

        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error renaming directory"
        );
    }

} else  {

    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "No directory specified"
    );
}


echo json_encode($response);

