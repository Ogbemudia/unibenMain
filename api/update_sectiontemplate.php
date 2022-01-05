<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
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
$post->id              =$_POST['id'];
$post->sectiontemplate =$_POST['sectiontemplate'];
$post->description     =$_POST['description'];

/* $post->id              = $data->id;
$post->sectiontemplate = $data->sectiontemplate;
$post->description     = $data->description;
 */
//create post
if($post->update_sectiontemplate()){
    $returnData = msg(1, 201, "Section Template updated.");
} else {
    $returnData = msg(1, 422, "Section Template not updated.");
}

echo json_encode($returnData);

