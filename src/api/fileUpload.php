<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST');
header('Content-type: application/json; charset=utf-8');

$response = array();

if($_FILES) {


    foreach($_FILES as $entry => $file) {

        $file_name = $file['name'];
        $file_tmp_name = $file["tmp_name"];
        $error = $file["error"];


        if($error > 0){

            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
            );

        } else {

            // $upload_dir = 'D:/Lora/Pictures/222/';
            $upload_dir = dirname(__DIR__, 1) . '/uploads/';
            $location = $upload_dir . $file_name;

            if(move_uploaded_file($file_tmp_name , $location)) {

                $response = array(
                    "status" => "success",
                    "error" => false,
                    "message" => "File uploaded successfully",
                    "dir" => $upload_dir
                );

            } else {

                $response = array(
                    "status" => "error",
                    "error" => true,
                    "message" => "Error uploading the file!"
                );

            }
        }
    }

} else {

    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "No file was sent!"
    );
}


echo json_encode($response);
?>