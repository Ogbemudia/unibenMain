$(document).ready(function() {

    //var homeT

    $(function() {

        $.get("../validation/read_singlelogin.php", function(messages) {




            var myName = messages.username;

            $('.myName').html(myName);


        }, "json");
    });


})