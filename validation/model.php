<?php
header("Access-Control-Allow-Origin: localhost/unibenMain/");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Content-Type: application/json; charset=UTF-8");
//header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require __DIR__.'/classes/configdb.php';
require_once('vendor/autoload.php');
use \Firebase\JWT\JWT; 


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

//include_once("../includes/config.php");

//include_once("./classes/configdb.php");

if($_SERVER['REQUEST_METHOD'] == "POST" && $_POST['crud_req'] == "signup")
signup($link);



if($_SERVER['REQUEST_METHOD'] == "GET")
logout($link);

if($_SERVER['REQUEST_METHOD'] == "PUT")
update_login($link);

if($_SERVER['REQUEST_METHOD'] == "DELETE")
delete_user($link);

if($_SERVER['REQUEST_METHOD'] == "POST" && $_POST['crud_req'] == "login")
login($link);


                            //signup function
/* function signup($link){
  

    //defining and initializing variables
    $username = "";
    $first_name = "";
    $last_name = "";
    $email = "";
    $password = "";
    $created = "";
    $category = "";
    $confirm_password = "";
    $username_err = "";
    $last_name_err = "";
    $first_name_err = "";
    $email_err = "";
    $password_err = "";
    $confirm_password_err = "";
    $registration_succ = "";
    $category_err = "";

//processing data when form is submited


    $date1 = date("F j, Y"); 
    $tim = date("g:i a");
    $created = $date1. " at ".$tim;
    
 


    //Validate username
    if(empty(trim($_POST["username"]))){
        $username_err = "Please enter your username.";
        $returnData = msg(0,422,$username_err);
    }else{
        //prepare a select statement
        $sql = "SELECT id FROM userlogin WHERE username = ?";
        if($stmt = mysqli_prepare($link, $sql)){
            //bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);

            //Set parameters
            $param_username = trim($_POST["username"]);

            //executing the prepared statement
            if(mysqli_stmt_execute($stmt)){
                //store the result                
                mysqli_stmt_store_result($stmt);
                if(mysqli_stmt_num_rows($stmt) == 1){
                    $username_err = "This username is already taken.";
                    $returnData = msg(0,422,$username_err);
                }else{
                    $username = trim($_POST["username"]);
                   
                }
            }else{
               // echo "Error! Please try agin later. ";
               $returnData = msg(0,422,'Error! Please try agin later.');
            }
                //close statement
                mysqli_stmt_close($stmt);
            
        
        }

        //Validate password
        if(empty(trim($_POST["password"]))){
            $password_err = "Please enter your password";
            $returnData = msg(0,422,$password_err);
            }elseif(strlen(trim($_POST["password"])) < 6){
                $password_err = "Password must be atleast 6 characters.";
                $returnData = msg(0,422,$password_err);

            }else{
                $password = trim($_POST["password"]);
            }
            //validate confirm_password.
            if(empty(trim($_POST["confirm_password"]))){
            $confirm_password_err = "Please confirm your password.";
            $returnData = msg(0,422,$confirm_password_err);
            }else{
                $confirm_password = trim($_POST["confirm_password"]);
                if(empty($password_err) && ($password != $confirm_password)){
                    $confirm_password_err = "Password did not match.";
                    $returnData = msg(0,422,$confirm_password_err);
                }
            }

            
                //validate name.
           if(empty(trim($_POST["first_name"]))){
                $first_name_err = "Please enter your first name.";
                $returnData = msg(0,422,$first_name_err);
                }else{
                    $first_name = trim($_POST["first_name"]);
                }

                //validate phone number.
           if(empty(trim($_POST["last_name"]))){
            $last_name_err = "Please enter your last name.";
            $returnData = msg(0,422,$last_name_err);
            }else{
                $last_name = trim($_POST["last_name"]);
            }

                 //validate gender.
           if(empty(trim($_POST["category"]))){
            $category_err = "Please select category.";
            $returnData = msg(0,422,$category_err);
            }else{
                $category = trim($_POST["category"]);
            }
            //validate email
            $email = $_POST["email"];
                if(!$email){
                    $email_err = "Please enter your email.";
                    $returnData = msg(0,422,$email_err);
                }else{
                  $email = filter_var($email, FILTER_SANITIZE_EMAIL);
                    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
                        $email_err= "Please enter a valid email.";
                        $returnData = msg(0,422,$email_err);
                    }
                }
            // checking input errors before inserting in database
            if(empty($username_err) && empty($password_err) && empty($confirm_password_err) && empty($first_name_err) && empty($last_name_err) && empty($category_err) && empty($email_err)){

                //insert in database
                $sql = "INSERT INTO userlogin (username, first_name, last_name, created, pass, category, email) VALUES (?, ?, ?, ?, ?, ?, ?)";
                if($stmt = mysqli_prepare($link, $sql)){
                    //bind variables to the prepared statement as parameters.
                    mysqli_stmt_bind_param($stmt, "sssssss", $param_username, $param_first_name, $param_last_name, $param_created, $param_password, $param_category, $param_email);

                    //set parameters
                    $param_username     = $username;
                    $param_first_name   = $first_name;
                    $param_last_name    = $last_name;
                    $param_created      = $created;
                    $param_password     = password_hash($password, PASSWORD_DEFAULT); //this creates a hash password.
                    $param_category     = $category;
                    $param_email        = $email;
                    
                    
                    //executing the above statements.

        //Add record to database
      
           

                
                if(mysqli_stmt_execute($stmt)){
                    $registration_succ = "Registration successful.";                    
                    $returnData = msg(1, 201, $registration_succ);
                
                }else{
                    //$resultMessages = "<p>Unable to create profile</p>";
                    $returnData = msg(0,422,'Unable to add user');
                }

                //$registration_succ = "Registration successful.";
                
               
                        //redirecting to login page
                       // header("location: admin.php");
                    }else{
                        //echo "Something went wrong. Please try agian later.";
                        $returnData = msg(0,422,'Something went wrong. Please try agian later.');
                    }
                    //close statement
                    mysqli_stmt_close($stmt);

                   
                    }

                    
                    //close connection
                    mysqli_close($link);
            }

    //$returnData = msg(1,201,'You have successfully registered.');

    //echo "thanks ok!";
    //$returnData = msg(0,422,'Please Fill in all Required Fields!');
    //$returnData = msg(0,422,'Your password must be at least 8 characters long!');

    echo json_encode($returnData);
}; */



function logout($link){};

function update_login($link){};

function delete_user($link){};


                    //login function.
function login($link)
{

   // $returnData = msg(1,201,'Login successful.');

   
    $username = "";
    $password = "";
    $username_err = "";
    $password_err = "";
 

    //$returnData = msg(1,201,'You have successfully loggedin.');

    if (empty(trim($_POST["username"]))) {
        $username_err = "Please enter your username.";
        $returnData = msg(0, 422, $username_err);
    } else {
        $username = trim($_POST["username"]);
    }

    //validate phone number.
    if (empty(trim($_POST["password"]))) {
        $password_err = "Please enter your password.";
        $returnData = msg(0, 422, $password_err);
    } else {
        $password = trim($_POST["password"]);
    }
   // $returnData = msg(0, 422, $username);
 

    //Validating inputs
    if (empty($username_err) && empty($password_err)) {

 //Select statement
        $sql = "SELECT id, username, pass, category FROM userlogin WHERE username = ? ";
        if ($stmt = mysqli_prepare($link, $sql)) {
            //bind the variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);
     
            //set parameters
            $param_username = $username;
    
            //executing the statement
            if (mysqli_stmt_execute($stmt)) {
                //store result
                mysqli_stmt_store_result($stmt);

                //checking if username exits, if yes verified password
                if (mysqli_stmt_num_rows($stmt) > 0) {
             
             //Bind result variables
                    mysqli_stmt_bind_result($stmt, $id, $username, $hashed_password, $category);
            
             
                    if (mysqli_stmt_fetch($stmt)) {
                        if (password_verify($password, $hashed_password)) {
                            //if password is correct, start new session
                            // echo $category;
                            $date1 = date("F j, Y"); 
                            $tim = date("g:i a");
                            $login_date = $date1. " at ".$tim;
                            //$login_date=date('y/m/d h:i:s');
                            $sql4= "UPDATE userlogin SET history= 'Last seen on: $login_date' WHERE username='$username' AND category='$category'";
                            // $sql4 = "UPDATE login SET history = 'Last seen on: $login_date' WHERE username=$username";
                            if (mysqli_query($link, $sql4)) {
                                                              
                                $userid = $id;
                                $issuedAt = time();
                                $expirationTime = $issuedAt + 1800;  // jwt valid for 60 seconds from the issued time
                                $payload = array(
                                   // 'userid' => $userid,
                                    'iat' => $issuedAt,
                                    'exp' => $expirationTime,
                                    'iss' => 'localhost/unibenMain/validation',
                                    'aud' => 'localhost/unibenMain/'
                                );
                                $key = 'UNIBENkey%visions6689#king%';
                                $alg = 'HS512';
                                $jwt = JWT::encode($payload, $key, $alg);
                                $token = $jwt;
                                $expire=time()+60*60;
                                $httponly='HttpOnly';
                                $path = 'path=/';

                               
                                header ("Set-Cookie: token=$token; $expire; $path; $httponly");
                                $returnData = [
                                    'success' => 1,
                                    'message' => 'You have successfully logged in.',
                                    //'token' => $token,
                                    'category' => $category
                                ];
                                session_start();
                                $_SESSION['userlogin'] = $username;
                               $_SESSION['category'] = $category;
                               $_SESSION["id"] = $userid;
                               // header("location: read_login.php");
                               
                               
                            //$returnData = msg(100, 201, 'You have successfully logged in22.');
                            } else {
                                $returnData = msg(0, 200, "unable to update history");
                            }
                        } else {
                            $password_err = "Wrong password or wrong username.";
                            $returnData = msg(0, 422, $password_err);
                        }
                    }
                } else {
                    $username_err = "Wrong password or wrong username.";
                    $returnData = msg(0, 422, $username_err);
                }
            } else {
                $returnData = msg(0, 422, "Error! Please try again later.");
            }
            //close statement
            mysqli_stmt_close($stmt);
        }
    }
    //close connection
 mysqli_close($link);

    echo json_encode($returnData);
};