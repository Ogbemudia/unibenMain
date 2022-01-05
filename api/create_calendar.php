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

    $post->calendardate     =$_POST['calendardate'];
    $post->details          =$_POST['details'];
    
   /*  
$post->calendardate = $data->calendardate;
$post->details      = $data->details;  */

    //create post
    if ($post->calendar()) {
        $returnData = msg(1, 201, "Calendar created.");
    } else {
        $returnData = msg(0, 422, "Calendar not created.");
    }
//}
echo json_encode($returnData);
    


