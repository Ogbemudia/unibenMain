$(document).ready(function() {
    /*************************************************** Read Users ****************************************************************************** */

    $.fn.read_users = function() {

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



        usersTable = `<div class="container-fluid col-12 containertable">
            <div class="table-responsive" style="box-shadow: 10px 10px 20px #2a2e33; padding: 2%;">
                <div class="" style="text-align: center;">
                </div>
                                
                    <table class="tablemanager">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Date Created</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Category</th>
                                <th>Login History</th>
                                <th class="disableFilterBy disableSort">Actions</th>
                            </tr>
                        </thead>
                            <tbody id="body">
                            </tbody>
                   </table>

                    <footer>
                        
                        <button type="button" class="btn btn-success btn-sm" id="adduser" style="float:right" title="Add New User"><i class="fa fa-user-plus" aria-hidden="true"></i></button>       
                        <i class="userid"></i>
                    </footer>
                    </div>
                </div>`;





        $('#allItems').html(usersTable);
        $('#nameId').html('Administrators');
        $('#titleItem').html('Administrators');

        $("#adduser").click(function() {
            $.fn.adduser();
        })

        //close update
        /* $("#close").click(function() {
            $('#allItems').html('');
            $('#nameId').html('');
            $('#titleItem').html('');
        }); */

        var usersinfo;
        var Id;




        $.ajax({

            type: "GET",
            url: "../validation/read_users.php",
            //data: formData,
            dataType: "json",
            encode: true,
            Cache: false,
            // setTimeout();

        })

        .done(function(messages) {

            $.each(messages, function(i, messages) {

                Id = messages.id;


                usersinfo = ` <tr>
                                        <td style="color: #0492C2;" class = "uid1">` + Id + `</td>
                                                    <td> ` + messages.created + `</td>
                                                    <td>` + messages.first_name + `</td>
                                                    <td style="color: #FF8C00;">` + messages.last_name + `</td>
                                                    <td style="color: #0492C2;">` + messages.username + `</td>
                                                    
                                                    <td style="color: #FF8C00;">` + messages.email + `</td>
                                                    <td style="color: #0492C2;">` + messages.category + `</td>
                                                    <td>` + messages.history + `</td>
                                                    <td style="color: #FF0000;" class="mine">
                                                
                                                    
                                                    <button type="button" class=" btn-primary btn-sm che btntb1" id="che" data-value='` + messages.username + `' value='` + Id + `' title="Reset User"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                                    <button type="button" class=" btn-danger btn-sm delete1 btntb1" data-value='` + messages.username + `' value='` + Id + `' title="Delete User"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                        </td>
                                    </tr>`;
                $('#body').append(usersinfo)

                $('.delete1').click(function() {
                    ID = $(this).val();
                    user1 = $(this).data('value');
                    $.fn.delete_user(ID, user1);
                });

                $('.che').click(function() {
                    ID = $(this).val();

                    $.fn.reset_user(ID);
                });


            });


            //table manager.
            $(".tablemanager").tablemanager({
                /* firstSort: [
                    [3, 0],
                    [2, 0],
                    [1, "asc"],
                ],*/
                disable: ["last"],
                appendFilterby: true,
                dateFormat: [
                    [4, "dd-mm-yyyy"]
                ],
                debug: true,
                vocabulary: {
                    voc_filter_by: 'Search by',
                    voc_type_here_filter: 'Filter...',
                    voc_show_rows: 'Rows per page'
                },
                pagination: true,
                showrows: [10, 15, 20, 37],
                //disableFilterBy: [1]

            })


        }, "json")
    }


    $('.viewusers').click(function() {
        $.fn.read_users();
        var w = window.innerWidth;
        if (w < 1200) {
            $('#sidebar').removeClass('active')
        }
    });

    /*************************************************** Create Users ****************************************************************************** */


    $.fn.adduser = function() {

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


        // update_form.addEventListener('click', () => {
        //$(".adduser").click(function() {
        var form1 = `<div class="wrapper" style="width:50%;">
            
        
            <form onsubmit="return false;">
                                    
                <div class="form-group">
                    <label>First Name<span style="color: red;">*</span></label>
                    <input type="text" name="first_name" class="form-control" value="" placeholder="First Name" id="first_name">
                    <span class="help-block" id="h_first_name"></span>
                </div>
                <div class="form-group">
                    <label>Last Name<span style="color: red;">*</span></label>
                    <input type="text" name="name" class="form-control" value="" placeholder="Last Name" id="last_name">
                    <span class="help-block" id="h_last_name"></span>
                </div>
                <div class="form-group">
                    <label>Username<span style="color: red;">*</span></label>
                    <input type="text" name="username" class="form-control" value="" placeholder="Username" id="username">
                    <span class="help-block" id="h_username"></span>
                </div>

                <div class="form-group">
                    <label>Email<span style="color: red;">*</span></label>
                    <input type="text" name="email" class="form-control" value="" placeholder="example@uniben.edu" id="email1">
                    <span class="help-block" id="h_email"></span>
                </div>

                <div class="form-group">
                    <label for="category">Cetegory <span style="color: red;">*</span></label>
                    <select name="category" id="category" class="form-select">
                        <option value="">Please select category</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <span class="help-block" id="h_category"></span>
                </div>

                <div class="form-group">
                    <label>Password<span style="color: red;">*</span></label>
                    <input type="password" name="password" class="form-control" value="" placeholder="Password" id="password">
                    <span class="help-block" id="h_password"></span>
                </div>
                
                 <div class="form-group">
                    <label>Confirm Password<span style="color: red;">*</span></label>
                    <input type="password" name="confirm_password" class="form-control" value="" placeholder="Confirm Password" id="confirm_password">
                    <span class="help-block" id="h_confirm_password"></span>
                </div>

                                             
                <div class="form-group">

                    <input type="hidden" name="crud_req" class="form-control" id="crud_req" value="signup">

                </div>



                <div class="form-group">
                <input type="submit" class="btn btn-primary" value="Submit" id="submit">
                <button type="button" class="btn btn-danger cancel1">Cancel</button>

                    

                </div>

            </form>
            
        
            </div>`;

        //  var upPic = `<button type="button" class="btn btn-success save">Save image</button>`;


        $('#allItems').html(form1);
        $('#nameId').html('User Registration');
        //$('#titleItem').html('User Registration')



        //close update
        $(".cancel1").click(function() {
            $.fn.read_users();
        });

        //validating form
        //email validation

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }



        $("form").submit(function(event) {
            var postReq = $("#crud_req").val();


            if ($("#first_name").val() == '') {
                $("#first_name").css('border', '1px solid red');
                $("#h_first_name").html('Enter your first name');
                alert('All fields marked with * are required.');
                return false;
            } else {
                $("#first_name").css('border', '2px solid green');
                $("#h_first_name").html('');
                var postFirstName = $("#first_name").val();
                //return true;
            }

            if ($("#last_name").val() == '') {
                $("#last_name").css('border', '1px solid red');
                $("#h_last_name").html('Enter your last name');
                alert('All fields marked with * are required.');
                return false;
            } else {
                $("#last_name").css('border', '2px solid green');
                $("#h_last_name").html('');
                var postLastName = $("#last_name").val();
                //return true;
            }

            if ($("#username").val() == '') {
                $("#username").css('border', '1px solid red');
                $("#h_username").html('Enter your username');
                alert('All fields marked with * are required.');
                return false;
            } else {
                $("#username").css('border', '2px solid green');
                $("#h_username").html('');
                var postUsername = $("#username").val();
                //return true;
            }

            if ($("#email1").val() == '') {
                $("#email1").css('border', '1px solid red');
                $("#h_email").html('Enter your email');
                return false;
            }

            if ($("#email1").val() != '') {
                var email2 = $("#email1").val();
                if (!validateEmail(email2)) {
                    $("#email1").css('border', '1px solid red');
                    $("#h_email").html('Enter a valid email');
                    return false;
                } else {
                    $("#email1").css('border', '2px solid green');
                    $("#h_email").html('');
                    var postEmail = email2;
                    //return true;
                }
            }

            if ($('#category').val() == '') {
                $("#category").css('border', '2px solid red');
                $("#h_category").html('Select category');
                alert('All fields marked with * are required.');
                return false;
            } else {
                $("#category").css('border', '2px solid green');
                $("#h_category").html('');
                var postCategory = $('#category').val();
            }


            if ($("#password").val() == '') {
                $("#password").css('border', '1px solid red');
                $("#h_password").html('Enter your password');
                return false;
            }

            if ($("#password").val() != '') {
                var password1 = $("#password").val();
                if (password1.length < 6) {
                    $("#password").css('border', '1px solid red');
                    $("#h_password").html('Your password must be at least 6 character');
                    return false;
                } else {
                    $("#password").css('border', '2px solid green');
                    $("#h_password").html('');
                    var postPassword = password1;
                    //return true;
                }
            }

            if ($("#confirm_password").val() == '') {
                $("#confirm_password").css('border', '1px solid red');
                $("#h_confirm_password").html('Confirm your password');
                return false;
            }

            if ($("#confirm_password").val() != '') {
                var confirm_password1 = $("#confirm_password").val();
                if (confirm_password1 != password1) {
                    $("#confirm_password").css('border', '1px solid red');
                    $("#h_confirm_password").html('Password does not match');
                    return false;
                } else {
                    $("#confirm_password").css('border', '2px solid green');
                    $("#h_confirm_password").html('');
                    var postConfirm_password = confirm_password1;
                    //return true;
                }
            }

            var formData = {
                crud_req: postReq,

                first_name: postFirstName,
                last_name: postLastName,
                username: postUsername,
                email: postEmail,
                category: postCategory,
                password: postPassword,
                confirm_password: postConfirm_password


            };
            //alert('ok');
            // formData.append('file', formData);
            $.ajax({
                type: "POST",
                url: "../validation/model2.php",
                data: formData,
                dataType: "json",
                encode: true,
                Cache: false,

            })

            .done(function(returnData) {

                var success, status, message;

                success = returnData.success;
                status = returnData.status;
                message = returnData.message;


                alert(message)
                if (status == 201)
                    $.fn.read_users();
                if (status == 403)
                    $.fn.logout();
                //console.log(returnData)
            });
            event.preventDefault();


        });


    }
    $('.adduser').click(function() {
        $.fn.adduser();
        var w = window.innerWidth;
        if (w < 1200) {
            $('#sidebar').removeClass('active')
        }
    });

    /***************************************************** End Of Add Users *********************************************************** */


    /* ************reset user************* */
    $.fn.reset_user = function() {
        var uid = ID;
        //var username2 = $(this).data("custome-value");
        $.get("validation/read.singleuser.php?id=" + uid, function(messages) {

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
                            <input type="text" name="email" class="form-control" value="` + messages.email + `" placeholder="email number with contry code" id="email1">
                            <span class="help-block" id="h_email"></span>
                        </div>

                        <div class="form-group">
                            <label for="category">Cetegory <span style="color: red;">*</span></label>
                            <select name="category" id="category" class="form-select">
                                <option value="` + messages.category + `">` + messages.category + `</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                            <span class="help-block" id="h_category"></span>
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
                    
                            <input type="hidden" name="crud_req" class="form-control" id="crud_req" value="resetuser">
                    
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

            //validate email
            function validateEmail(email) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }

            //email validation

            $("form").submit(function(event) {


                var postResetuser = $("#crud_req").val();


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

                if ($("#email1").val() == '') {
                    $("#email1").css('border', '1px solid red');
                    $("#h_email").html('Enter your email');
                    return false;
                }

                if ($("#email1").val() != '') {
                    var email2 = $("#email1").val();
                    if (!validateEmail(email2)) {
                        $("#email1").css('border', '1px solid red');
                        $("#h_email").html('Enter a valid email');
                        return false;
                    } else {
                        $("#email1").css('border', '2px solid green');
                        $("#h_email").html('');
                        var postEmail = email2;
                        //return true;
                    }
                }

                if ($('#category').val() == '') {
                    $("#category").css('border', '2px solid red');
                    $("#h_category").html('Select category');
                    alert('All fields marked with * are required.');
                    return false;
                } else {
                    $("#category").css('border', '2px solid green');
                    $("#h_category").html('');
                    var postCategory = $('#category').val();
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
                    user_id: uid,
                    crud_req: postResetuser,
                    username: postUsername,
                    email: postEmail,
                    category: postCategory,
                    newpassword: postNewPassword,
                    confirm_password: postConfirm_New_password,
                };
                //alert("ok");

                $.ajax({
                    type: "POST",
                    url: "../validation/resetusers.php",
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
                    $.fn.read_users();
                    if (status == 403)
                        $.fn.logout();
                    console.log(returnData)

                });
                event.preventDefault();

            })
        });
        //   }



    };
    /* ************End Of Reset************* */

    /* ************popup delete************* */
    $.fn.delete_user = function() {

            var userId = ID;
            var username = user1;
            var modalPop = `<div class="popup-overlay active" id="delete21" style="height:15%; width:45%; border:red solid 1px;">
        <div class="popup-link active" style="height:70%;">
            <p style="height:60%;padding:2%;">Are you sure you want to delete <b><span class="del_acc">` + username + `</span></b> Account?</p>
            <div style="text-align:center; margin=10%;">
            <form onsubmit="return false;">
            
            <div class="form-group">
                        <input type="submit" class="btn btn-primary btn-sm" value="Delete" id="submit">
                        <button type="button" class="btn btn-danger btn-sm cancel1">Cancel</button>                           
            </div>
            <div class="form-group">

                    <input type="hidden" name="id" class="form-control" id="userid" value="` + userId + `">

            </div>
        
            </form>
            </div>
        </div>
        <button class="btn btn-dark btn-sm closePop button1">Close</button>
        </div>`;

            $('#proS').html(modalPop);

            // $('.del_acc').html(title1);

            // });
            $(document).on('click', '.closePop', function() {
                $('#proS').html('');
            });
            $(".cancel1").click(function() {
                $('#proS').html('');
            })


            //validating form
            $("form").submit(function(e) {

                //var dis = $(this).val();
                var postId = $("#userid").val();
                var postDelete = 'delete';
                var formData = {
                    crud_req: postDelete,
                    id: postId
                }
                e.preventDefault();
                $.ajax({
                        type: "POST",
                        url: "../validation/deleteacc.php",
                        data: formData,
                        dataType: "json",
                        encode: true,
                        Cache: false,

                    })
                    .done(function(returnData) {

                        var success, status, message;

                        success = returnData.success;
                        status = returnData.status;
                        message = returnData.message;


                        alert(message)
                        if (status == 201)

                            $.fn.read_users();
                        $('#proS').html('');
                        if (status == 403)
                            $.fn.logout();
                        console.log(returnData)
                    });

            });

        }
        /* ************end of popup delete************* */
})