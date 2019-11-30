<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST');
header('Content-type: application/json; charset=utf-8');

$response = array();
$filesAdded = array();
$errorFiles = array();

echo json_encode($_FILES);

if($_FILES) {


    foreach($_FILES as $entry => $file) {

        $file_name = $file['name'];
        $folder_name = explode("/", $entry)[0];
        $file_tmp_name = $file["tmp_name"];
        $error = $file["error"];

        if($error > 0){

            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
            );

        } else {

            // $upload_dir = 'D:/Lora/Pictures';
            $upload_dir = dirname(__DIR__, 1);
            $location = $upload_dir . "/projects/" . $folder_name . "/" . $file_name;

            if(move_uploaded_file($file_tmp_name , $location)) {

                array_push($filesAdded, $file_name);

                $response = array(
                    "status" => "success",
                    "error" => false,
                    "message" => "File(s) uploaded successfully",
                    "addedFiles" => json_encode($filesAdded)
                );


            } else {

                array_push($errorFiles, $file_name);

                $response = array(
                    "status" => "error",
                    "error" => true,
                    "message" => "Error uploading the file!",
                    "errorFiles" => json_encode($errorFiles)
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