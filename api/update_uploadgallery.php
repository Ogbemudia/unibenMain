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

if (isset($_POST['file']) || isset($_POST['id'])) {

   
    
    
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
}

    
    $post->id=$_POST['id'];
    $post->image = $_FILES['file']['name'];




//create post
if($post->update_galleryimage()){
    $returnData = msg(1, 201, "Image saved.");
} else {
    $returnData = msg(1, 201, "Image not saved.");
}

echo json_encode($returnData);