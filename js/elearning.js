//validate phone number
function validatePhone(inputtxt) {

    //+XX-XXXX-XXXX
    //+XX.XXXX.XXXX
    //+XX XXXX XXXX

    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (inputtxt.match(phoneno)) {
        return true;
    } else {
        return false;
    }
}

//email validation

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}



//form validation
$(document).ready(function() {
    $("form").submit(function(event) {


        var postReq = $("#crud_req").val();

        if ($("#name").val() == '') {
            $("#name").css('border', '1px solid red');
            $("#h_name").html('Enter your name');
            return false;
        } else {
            $("#name").css('border', '2px solid green');
            $("#h_name").html('');
            var postName = $("#name").val();
            //return true;
        }

        if ($("#country").val() == '') {
            $("#country").css('border', '1px solid red');
            $("#h_country").html('Enter your country of residence');
            return false;
        } else {
            $("#country").css('border', '2px solid green');
            $("#h_country").html('');
            var postCountry = $("#country").val();
            //return true;
        }


        if ($("#phone").val() == '') {
            $("#phone").css('border', '1px solid red');
            $("#h_phone").html('Enter your phone number');
            return false;
        }


        if ($("#phone").val() != '') {
            var phone2 = $("#phone").val();

            if (!validatePhone(phone2)) {
                $("#phone").css('border', '1px solid red');
                $("#h_phone").html('Enter a valid phone number');
                return false;
            } else {
                $("#phone").css('border', '2px solid green');
                $("#h_phone").html('');
                var postPhone = phone2;
                //return true;
            }
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



        if ($('#sex').val() == 'default') {
            $("#h_sex").html('Select your sex');
            return false;
        } else {
            var postGender = $('#sex').val();
            $("#h_sex").html('');
        }


        var formData = {
            crud_req: postReq,
            country: postCountry,
            name: postName,
            phone: postPhone,
            email: postEmail,
            password: postPassword,
            confirm_password: postConfirm_password,
            gender: postGender,


        };

        $.ajax({
            type: "POST",
            url: "../backend/elearning1.php",
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
            // location.href = "../login.html"
                console.log(returnData)
        });
        event.preventDefault();



    });



})