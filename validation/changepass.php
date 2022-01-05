<?php

//headers
header("Access-Control-Allow-Origin: localhost/unibenMain/");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
//header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
//header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require __DIR__.'/validation.php';

require_once('classes/session.php');
login();
$username = $_SESSION['userlogin'];
require __DIR__.'/classes/configdb.php';




// GET DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
$returnData = [];






$user_id =  $_SESSION["id"];

// Uploads files
//if (isset($_POST['update'])) 
if($_SERVER['REQUEST_METHOD'] == "POST" && $_POST['crud_req'] == "changepass"){ // if save button on the form is clicked
    
    //Clean form.
   
    

   
    
    $username = trim($_POST["username"]);

   
    
    $username = mysqli_real_escape_string($link, $username);

    //hecking if username is empty.
    if(empty(trim($_POST["username"]))){
        $username_err = "Please enter your username.";
        $returnData = msg(0, 402 ,$username_err);
    }else{
        $username = trim($_POST["username"]);
        $username = mysqli_real_escape_string($link, $username);
    
    }

//checking if password is empty
if(empty(trim($_POST["oldpassword"]))){
    $old_password_err = "Please enter your old password.";
    $returnData = msg(0, 402 ,$old_password_err);
}else{
    $old_password = trim($_POST["oldpassword"]);
    $old_password = mysqli_real_escape_string($link, $old_password);

}

//Validating inputs
if(empty($username_err) && empty($old_password_err)){
    
    //Select statement
    $sql = "SELECT id, pass FROM userlogin WHERE id =?";
    if($stmt = mysqli_prepare($link, $sql)){
        //bind the variables to the prepared statement as parameters
        mysqli_stmt_bind_param($stmt, "s", $user_id);
        
       //set parameters
       $param_user_id = $user_id;
       
       
        //executing the statement
        if (mysqli_stmt_execute($stmt)) {
            //store result
            mysqli_stmt_store_result($stmt);

            //checking if user id exits, if yes verified password
            if (mysqli_stmt_num_rows($stmt) > 0) {
                
                //Bind result variables
                mysqli_stmt_bind_result($stmt, $user_id, $hashed_old_password);
               
                
                if (mysqli_stmt_fetch($stmt)) {
                    if (!password_verify($old_password, $hashed_old_password)) {
                        //if password is correct, start new session
                        $old_password_err = "The old password you entered is not valid.";
                        $returnData = msg(0, 402, $old_password_err);
                    } else {
                        
                        if (empty(trim($_POST["newpassword"]))) {
                            $new_password_err = "Please enter your password.";
                        } else {
                            if (strlen(trim($_POST["newpassword"])) < 6) {
                                $new_password_err = "Password must be atleast 6 characters.";
                                $returnData = msg(0, 402, $new_password_err);
                            } else {
                                $new_password = trim($_POST["newpassword"]);
                                $new_password = mysqli_real_escape_string($link, $new_password);
                            }
                            //validate confirm_password.
                            if (empty(trim($_POST["confirm_password"]))) {
                                $confirm_password_err = "Please confirm your password.";
                                $returnData = msg(0, 402, $confirm_password_err);
                            } else {
                                $confirm_password = trim($_POST["confirm_password"]);
                                if (empty($password_err) && ($new_password != $confirm_password)) {
                                    $confirm_password_err = "Password did not match.";
                                    $returnData = msg(0, 402, $confirm_password_err);
                                }
                            }
                        }
                        if (empty($password_err) && empty($confirm_password_err)) {
            
             //Select statement
                            $sql = "SELECT id, pass FROM userlogin WHERE id =?";
                            if ($stmt = mysqli_prepare($link, $sql)) {
                                //bind the variables to the prepared statement as parameters
                                mysqli_stmt_bind_param($stmt, "s", $user_id);
        
                                //set parameters
                                $param_user_id = $user_id;
   
       
                                //executing the statement
                                if (mysqli_stmt_execute($stmt)) {
                                    //store result
                                    mysqli_stmt_store_result($stmt);

                                    //checking if username exits, if yes verified password
                                    if (mysqli_stmt_num_rows($stmt) > 0) {
                
                //Bind result variables
                                        mysqli_stmt_bind_result($stmt, $id, $hashed_new_password);
               
                
                                        if (mysqli_stmt_fetch($stmt)) {
                                            if (password_verify($new_password, $hashed_new_password)) {
                                                //if password is correct, start new session
                                                //if password is the old password.

                                                $new_password_err = "You cannot use the old password.";
                                                $returnData = msg(0, 402, $new_password_err);
                                            } else {
                                                //update password in database
                                                $date1 = date("F j, Y");
                                                $tim = date("g:i a");
                                                $last_update = $date1. " at ".$tim;
                     
                                                //$sql = "SELECT id FROM userlogin WHERE username = $username";
                                                $new_password = password_hash($new_password, PASSWORD_DEFAULT);
                                                $sql= "UPDATE userlogin SET pass=?, username=?, last_update=? WHERE id='$user_id'";
                                                if ($stmt = mysqli_prepare($link, $sql)) {
                                                    mysqli_stmt_bind_param($stmt, "sss", $param_new_password, $param_username, $param_last_update);
                          
                                                    //$param_username = $username;
                                                    $param_new_password = $new_password;
                                                    $param_username     = $username;
                                                    $param_last_update  = $last_update;
                                                    
                                                    //bind variables to the prepared statement as parameters.
                                                    

                          
                                                    if (mysqli_stmt_execute($stmt)) {

                                                        $reset_succ = "Reset successful.";
                                                        $returnData = msg(1, 201, $reset_succ);
                                                
                                            
                                                    }
                                                }
                                            }
                                        } else {
                                            $username_err = "Such accound does not exist.";
                                            $returnData = msg(0, 402, $username_err);
                                        }
                                    }
                                }
                            }
                        } else {
                            $error1 = "Error! Please try again later.";
                            $returnData = msg(0, 402, $error1);
                        }
                    }
                }
            }
        }
        //close statement
   
    mysqli_stmt_close($stmt);
    }
}
//close connection
    
    
    
   

}
       

echo json_encode($returnData);

?>