<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

require __DIR__.'/validation.php';

require_once('../validation/classes/session.php');
login();
//initializing api
include_once('../core/initialize.php');

//instantiate post
$post = new Post($db);

//get the raw posted data
$data = json_decode(file_get_contents("php://input"));

//$post->id           = $data->id;
$post->id=$_POST['id'];

//create post
if($post->delete_page()){
    $returnData = msg(1, 201, "Page Deleted.");
} else {
    $returnData = msg(1, 422, "Page not Deleted.");
}

echo json_encode($returnData);

