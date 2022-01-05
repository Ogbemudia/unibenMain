<?php



function msg($success,$status,$message,$extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ],$extra);
}

// GET DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

//if(isset($_POST["logout"])){

session_start();

//$jwt = $_COOKIE['token'];
//header ("Set-Cookie: token=$jwt; time()-1; path=/; HttpOnly");
session_destroy();
    unset($_SESSION['userlogin']);  //Destroy This Session
    unset($_SESSION['id']);

    //$token = $jwt;
   
$tok="";
  header ("Set-Cookie: token=$tok; time()-60*60; path=/; HttpOnly");
  unset($_COOKIE["token"]);
   //setcookie('token', $token, time()-1 );

    $returnData = msg(0, 403, "You have been logged out.");



    
//header("location: login.html");
echo json_encode($returnData);
exit;
//}

?>