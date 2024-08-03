<?php
$username = $_POST["username"]; //username
$fileName = $_FILES["file"]["name"]; // The file name
$fileTmpLoc = $_FILES["file"]["tmp_name"]; // File in the PHP tmp folder
$fileType = $_FILES["file"]["type"]; // The type of file it is
$fileSize = $_FILES["file"]["size"]; // File size in bytes

if ($username === null || $username === '') {
    http_response_code(400);
    echo "ERROR: Please select a username before uploading.";
    exit();
}
if (!$fileTmpLoc) { // if file not chosen
    http_response_code(400);
    echo "ERROR: Please browse for a file before clicking the upload button.";
    exit();
}

if (!is_dir("$username/source")) {
    mkdir("$username/source", 0777, true);
    if (file_exists("$username/$username.kml")) rename("$username/$username.kml", "$username/source/OLD.kml");
}
if (file_exists("$username/source/$fileName")) {
    unlink("$username/source/$fileName");
}

$fileLoc = "$username/source/$fileName";

if (move_uploaded_file($fileTmpLoc, $fileLoc)) {
    chmod($fileLoc, 0777);
    $logFile = file_put_contents('uploads.txt', $fileLoc . PHP_EOL, FILE_APPEND);
    http_response_code(200);
} else {
    http_response_code(500);
}
