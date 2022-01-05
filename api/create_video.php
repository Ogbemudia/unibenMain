<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
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

/* $this->video   = $this->conn ->real_escape_string($this->video);
    $this->title   = $this->conn ->real_escape_string($this->title); */
   
    $post->video=$_POST['video'];
    $post->title=$_POST['title'];
    
    
    

   /*  $post->video  = $data->video;
$post->title      = $data->title;  */

    //create post
    if ($post->video()) {
        $returnData = msg(1, 201, "Video created.");
    } else {
        $returnData = msg(0, 422, "Video not created.");
    }

echo json_encode($returnData);
    


