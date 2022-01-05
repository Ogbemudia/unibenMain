<?php

//headers
header("Access-Control-Allow-Origin: localhost/unibenMain/");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
//header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


//connect to our database.
$host = "localhost:3306";
$db_user     = 'root';
$db_password = '';
$db_name     = 'uniben';

$link = new mysqli($host, $db_user, $db_password, $db_name);

if($link-> connect_errno){
    http_response_code(400);
    header('Content_type: text/plain');
    echo $link->connect_error;
    exit();
    

}




$conn=$link;

function msg($success,$status,$message,$extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ],$extra);
};

// GET DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
$returnData = [];





//$user_id =  $_SESSION["id"];

// Uploads files
//if (isset($_POST['update'])) 
//if(isset($_POST['pageid']) || isset($_POST['title']) || isset($_POST['content']) || isset($_POST['sectiontemplates']) || isset($_POST['file'])){ 

   
    
    //Clean form.
    
    
    //$returnData = array(1, 201, "you have successfully updated your profile.");

    $pageid=$_POST['pageid'];
    $title=$_POST['title'];
    $content=$_POST['content'];
    $sectiontemplate=$_POST['sectiontemplates'];

    //clean data
    $pageid           = htmlspecialchars(strip_tags($pageid));
    $title            = htmlspecialchars(strip_tags($title));
    $content          = htmlspecialchars(strip_tags($content));
    //$image            = htmlspecialchars(strip_tags($image));
    $sectiontemplate  = htmlspecialchars(strip_tags($sectiontemplate));
   
 
     /* Getting file name */
     $filename = $_FILES['file']['name'];
     $size = $_FILES['file']['size'];
 
     /* Location */
     $location = "../upload/" . $filename;
     $imageFileType = pathinfo($location,PATHINFO_EXTENSION);
     $imageFileType = strtolower($imageFileType);

     $file = $_FILES['file']['tmp_name'];
    
  
     /* Valid extensions */
     //$valid_extensions = array("jpg","jpeg","png");
  
     //$response = 0;
     /* Check file extension */
     //if(in_array(strtolower($imageFileType), $valid_extensions)) {
        if ($_FILES['file']['size'] > 100000000) { // file shouldn't be larger than 10Megabyte
            $size_err= "Image larger than 10MB.";
            $returnData = msg(0, 422, $size_err);
        } elseif
        /* Upload file */
        (move_uploaded_file($file,$location)){
           /*  $query = "INSERT INTO section (
            pageid           = '$pageid',
            title            = '$title',
            content          = '$content',
            image            = '$filename',
            sectiontemplate  = '$sectiontemplate'
            )"; */
            $sql = "INSERT INTO section (pageid, title, content, image, sectiontemplate) VALUES ('$pageid', '$title', '$content', '$filename', '$sectiontemplate')";
            //prepare statement
            if (mysqli_query($conn, $sql)) {
                $update= "Image saved successfully.";
                $returnData = msg(1, 201, $update);
            } else {
                $failed_err= "Failed to update profile.";
                $returnData = msg(0, 422, $failed_err);
            }
        }
//}    
        

echo json_encode($returnData);

?>