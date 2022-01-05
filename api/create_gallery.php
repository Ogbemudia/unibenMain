<?php
header('Access-Control-Allow-Origin: localhost/unibenMain/');
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

/* function msg($success,$status,$message,$extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ],$extra);
} */
//get the raw posted data
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

if (isset($_POST['title']) || isset($_POST['file'])) {

   
    
    
     /* Getting file name */
    $post->filename = $_FILES['file']['name'];
    $post->file = $_FILES['file']['tmp_name'];
    $size = $_FILES['file']['size'];
 
     if ($size > 10000000) { // file shouldn't be larger than 10Megabyte
        $size_err= "Image larger than 10MB.";
        $returnData = msg(0, 422, $size_err);
    } elseif ($post->upload()) {
        $upsucc= "Image uploaded.";
        $returnData = msg(0, 422, $upsucc);
    }

       
        $post->title=$_POST['title'];
        
        $post->image = $_FILES['file']['name'];
   

        //create post
        if ($post->gallery()) {
            $returnData = msg(1, 201, "Gallery created.");
        } else {
            $returnData = msg(1, 422, "Gallery not created.");
        }
    
    }
echo json_encode($returnData);


    

