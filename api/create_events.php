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

//if (isset($_POST['title']) || isset($_POST['menutype']) || isset($_POST['link']) || isset($_POST['status'])) {

    $post->title        =$_POST['title'];
    $post->eventdate    =$_POST['eventdate'];
    $post->description  =$_POST['description'];
    $post->link         =$_POST['link'];
    $post->status       =$_POST['status'];
 
    

   /*  $post->eventdate    = $data->eventdate;
$post->title        = $data->title;
$post->description  = $data->description;
$post->link         = $data->link;
$post->status       = $data->status;  */

    //create post
    if ($post->events()) {
        $returnData = msg(1, 201, "Event created.");
    } else {
        $returnData = msg(0, 422, "Event not created.");
    }
//}
echo json_encode($returnData);
    


