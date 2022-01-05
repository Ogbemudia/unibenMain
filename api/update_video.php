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
$post->id    =$_POST['id'];
$post->video =$_POST['video'];
$post->title =$_POST['title'];

/* $post->id = $data->id;
$post->video = $data->video;
$post->title = $data->title;
 */
//create post
if($post->update_video()){
    $returnData = msg(1, 201, "Slider Template updated.");
} else {
    $returnData = msg(1, 422, "Slider Template not updated.");
}

echo json_encode($returnData);

