$(document).ready(function() {
    //  const update_form = document.querySelector('.update_form');



    // update_form.addEventListener('click', () => {
    $(".changepass").click(function() {
        var w = window.innerWidth;
        if (w < 1200) {
            $('#sidebar').removeClass('active')
        }
        fetch('../validation/validation.php', {
                method: "POST"
            })
            .then(res => res.json())
            .then(returnData => {

                var success, status, message;
                success = returnData.success;
                status = returnData.status;
                message = returnData.message;

                if (success == 0) {
                    sessionStorage.removeItem("users");
                    alert('Your session has expired')
                    location.href = "../index.html"
                }
            })


        $.get("../validation/read_singlelogin.php", function(messages) {



            var changepass = `  <div class="popup-overlay1 active"  style="width:55%; border:#CE3D0D solid 1px; padding:2%">
                <h5>Reset password for ` + messages.first_name + " " + messages.last_name + `</h5>
                <div class="popup-content active">
                <div class="wrapper1">
                
                <form onsubmit="return false;">
                    
                    <div class="form-group">
                        <label>Username </label>
                        <input type="text" name="username" class="form-control" value="` + messages.username + `" placeholder="Username" id="username">
                        <span class="help-block" id="h_username"></span>
                    </div>
                
                    <div class="form-group">
                        <label>email </label>
                        <input type="text" name="email" class="form-control" value="` + messages.email + `" placeholder="email number with contry code" id="email1" disabled>
                        <span class="help-block" id="h_email"></span>
                    </div>

                                        
                    <div class="form-group">
                        <label>Old password </label>
                        <input type="password" name="old_password" class="form-control" id="old_password">
                        <span class="help-block" id="h_old_password"></span>
                    </div>
                    <div class="form-group">
                        <label>New password </label>
                        <input type="password" name="new_password" class="form-control" id="new_password">
                        <span class="help-block" id="h_new_password"></span>
                    </div>
                    <div class="form-group">
                        <label>Confirm new password </label>
                        <input type="password" name="confirm_new_password" class="form-control" id="confirm_new_password">
                        <span class="help-block" id="h_confirm_new_password"></span>
                    </div>
                    
                
                    <div class="form-group">
                
                        <input type="hidden" name="crud_req" class="form-control" id="crud_req" value="changepass">
                
                    </div>
                
                
                
                    <div class="form-group">
                
                        <input type="submit" class="btn btn-primary" value="Submit" id="submit">
                        <button type="button" class="btn btn-danger cancel1">Cancel</button>
                
                
                    </div>
                
                </form>
                
                </div>
                </div>
                
        </div>`;


            $('#proS').html(changepass);

            //close change password
            $(".cancel1").click(function() {
                $('#proS').html("");
            });

            // $(".userid").html(uid);


            $("form").submit(function(event) {


                var postChange = $("#crud_req").val();


                if ($("#username").val() == '') {
                    $("#username").css('border', '1px solid red');
                    $("#h_username").html('Enter your username');
                    return false;
                } else {
                    $("#username").css('border', '2px solid green');
                    $("#h_username").html('');
                    var postUsername = $("#username").val();
                    //return true;
                }


                if ($("#old_password").val() == '') {
                    $("#old_password").css('border', '1px solid red');
                    $("#h_old_password").html('Enter your old password');
                    return false;
                }

                if ($("#old_password").val() != '') {
                    var postOldPassword = $("#old_password").val();

                    $("#old_password").css('border', '2px solid green');
                    $("#h_old_password").html('');

                    //return true;
                }


                if ($("#new_password").val() == '') {
                    $("#new_password").css('border', '1px solid red');
                    $("#h_new_password").html('Enter your new password');
                    return false;
                }

                if ($("#new_password").val() != '') {
                    var password1 = $("#new_password").val();
                    if (password1.length < 6) {
                        $("#new_password").css('border', '1px solid red');
                        $("#h_new_password").html('Your password must be at least 6 character');
                        return false;
                    } else {
                        $("#new_password").css('border', '2px solid green');
                        $("#h_new_password").html('');
                        var postNewPassword = password1;
                        //return true;
                    }
                }

                if ($("#confirm_new_password").val() == '') {
                    $("#confirm_new_password").css('border', '1px solid red');
                    $("#h_confirm_new_password").html('Confirm your new password');
                    return false;
                }

                if ($("#confirm_new_password").val() != '') {
                    var confirm_password1 = $("#confirm_new_password").val();
                    if (confirm_password1 != password1) {
                        $("#confirm_new_password").css('border', '1px solid red');
                        $("#h_confirm_new_password").html('Password does not match');
                        return false;
                    } else {
                        $("#confirm_new_password").css('border', '2px solid green');
                        $("#h_confirm_new_password").html('');
                        var postConfirm_New_password = confirm_password1;
                        //return true;
                    }
                }


                var formData = {
                    crud_req: postChange,
                    username: postUsername,
                    oldpassword: postOldPassword,
                    newpassword: postNewPassword,
                    confirm_password: postConfirm_New_password,
                };


                //alert("ok");

                $.ajax({
                    type: "POST",
                    url: "../validation/changepass.php",
                    data: formData,
                    dataType: "json",
                    encode: true,
                    Cache: false,

                })

                .done(function(returnData) {
                    // alert('returnData');
                    var success, status, message;

                    success = returnData.success;
                    status = returnData.status;
                    message = returnData.message;


                    alert(message);
                    if (status == 201)
                    // alert(message)
                        $('#proS').html("");
                    console.log(returnData)

                });
                event.preventDefault();



            });

        }, "json");

    })
})