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
$returnData = [];

$post->title =$_POST['title'];
$post->link=$_POST['link'];
$post->content=$_POST['content'];
$post->position=$_POST['position'];
$post->status=$_POST['status'];
$post->template=$_POST['templates'];
$post->id=$_POST['id'];

/* $post->image    = $data->image;
$post->title    = $data->title;
$post->content  = $data->content;
$post->link     = $data->link;
$post->position = $data->position;
$post->status   = $data->status;
$post->template = $data->templates;
$post->id       = $data->id;
 */

//create post
if($post->update_slider()){
    $returnData = msg(1, 201, "Slider updated.");
} else {
    $returnData = msg(1, 422, "Slider not updated.");
}

echo json_encode($returnData);