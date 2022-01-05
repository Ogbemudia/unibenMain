<?php
//connect to our database.
$host = "localhost:3306";
$db_user     = 'root';
$db_password = '';
$db_name     = 'uniben';

$link = new mysqli($host, $db_user, $db_password, $db_name);

if($link-> connect_errno){
    http_response_code(400);
    header('Content_type: text/plain');
    echo $link->connect_error;
    exit();
    

}

