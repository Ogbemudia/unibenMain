<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
//header('Access-Control-Allow-Methods: GET');
//header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

//initializing api
include_once('../core/initialize.php');

//instantiate post
$post = new Post($db);
//get the raw posted data

$post->id = isset($_GET['id']) ? $_GET['id'] : die();

$result = $post->read_singlemenu();

    $post_arr = array(
       
        'id'         => $post-> id,
        'title'      => $post-> title,
        'menutype'   => $post-> menutype,
        'link'       => $post-> link,
        'status'     => $post-> status
            
        );
        //make a json
print_r(json_encode($post_arr));
