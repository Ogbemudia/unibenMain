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


   
    $post->sectiontemplate=$_POST['sectiontemplate'];
    $post->description=$_POST['description'];
    
    

   /*  $post->sectiontemplate  = $data->sectiontemplate;
$post->description      = $data->description;  */

    //create post
    if ($post->sectiontemplate()) {
        $returnData = msg(1, 201, "Section Template created.");
    } else {
        $returnData = msg(0, 422, "Section Template not created.");
    }

echo json_encode($returnData);
    


