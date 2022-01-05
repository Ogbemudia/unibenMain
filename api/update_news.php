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

$post->id =$_POST['id'];
$post->title=$_POST['title'];
$post->content=$_POST['content'];
$post->link=$_POST['link'];
$post->status=$_POST['status'];

/* $post->id       = $data->id;
$post->image    = $data->image;
$post->title    = $data->title;
$post->content  = $data->content;
$post->link     = $data->link;
$post->status   = $data->status;
 */

//create post
if($post->update_news()){
    $returnData = msg(1, 201, "News updated.");
} else {
    $returnData = msg(1, 201, "News not updated.");
}

echo json_encode($returnData);