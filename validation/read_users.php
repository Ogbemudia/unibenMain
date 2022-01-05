<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

//initializing api
include_once('../core/initialize.php');

require __DIR__.'/validation.php';

require_once('classes/session.php');
login();
//$username = $_SESSION['userlogin']; 

//instantiate post
$post = new Post($db);


$result = $post->read_login();
//get the row count
$num = $result->rowCount();

if($num> 0){
    $post_arr = array();
    $post_arr['data'] = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $post_item = array(
             

            'id'            => $id,
            'created'       => $created,
            'first_name'    => $first_name,
            'last_name'     => $last_name,
            'email'         => $email,
            'username'      => $username,
            'category'      => $category,
            'history'       => $history
        );
        array_push($post_arr['data'], $post_item);

    }
    //convert to JSON and output
    echo json_encode($post_arr['data']);
}else{
    echo json_encode(array('message' => ' No post found.'));
}