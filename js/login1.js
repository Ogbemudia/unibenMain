//form validation
$(document).ready(function() {
    $("form").submit(function(event) {


        var postLogin = $("#crud_req").val();



        if ($("#username").val() == '') {
            //$("#username").css('border', '1px solid red');
            $("#h_username").html('Enter your username');
            return false;
        } else {
            // $("#username").css('border', '2px solid green');
            $("#h_username").html('');
            var postUsername = $("#username").val();
            //return true;
        }




        if ($("#password").val() == '') {
            // $("#password").css('border', '1px solid red');
            $("#h_password").html('Enter your password');
            return false;
        }

        if ($("#password").val() != '') {
            var postPassword = $("#password").val();

            // $("#password").css('border', '2px solid green');
            $("#h_password").html('');

            //return true;
        }









        var formData = {
            crud_req: postLogin,
            username: postUsername,
            password: postPassword,


        };

        $.ajax({
            type: "POST",
            url: "../validation/model.php",
            data: formData,
            dataType: "json",
            encode: true,

        })

        .done(function(returnData) {

            var category, success, status, message, token;

            category = returnData.category;
            success = returnData.success;
            status = returnData.status;
            message = returnData.message;
            //token = returnData.token;


            //alert(message);


            if (success == 1) {


                if (category == 'admin') {
                    //var category1 = category;
                    location.href = "../admin.html";

                } else {
                    if (category == 'user') {
                        location.href = "../users.html";

                    }
                }
            } else {
                //$("#username").css('border', '1px solid red');
                $("#h_username").html('Wrong password or username');
                //$("#password").css('border', '1px solid red');
                $("#h_password").html('Wrong password or username');
            }



            //console.log(returnData)

        });
        event.preventDefault();


    });






})