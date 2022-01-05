$.ajaxSetup({
    cache: false
});
$('#search').keyup(function() {
    $('#result').html('');
    $('#state').val('');
    var searchField = $('#search').val();
    var expression = new RegExp(searchField, "i");
    $.getJSON('api/read.php', function(data) {
        var message1 = `<div  class="row">`;
        $.each(data, function(key, value) {
            if (value.name.search(expression) != -1 || value.village_or_town_of_origin.search(expression) != -1 || value.bchc_status.search(expression) != -1 || value.username.search(expression) != -1) {
                //$('#proS').append('<li class="list-group-item link-class"><img src="upload/' + value.image + '" height="40" width="40" class="img-thumbnail" /> ' + value.name + ' | <span class="text-muted">' + value.village_or_town_of_origin + '</span></li>');
                var username = value.username;
                message1 += `<div class="col-12 col-xl-5" style="margin-bottom: 3%; margin-right: 6%;">
            <div class="card">
            
                <img src="upload/` + value.image + `"alt="profile pic" class="img-responsive" style="height:310px; border-radius: 17px;">
               
               
                <div class="card-header">
                    <h4 class="margin-bottom-15">` + value.name + `</h4>
                    
                    <p>` + value.bchc_status + `</p>
                    <hr>
                      </div>
                      
                <a href="profile.html?` + username + `" class="tm-tours-box-2-link pro" style="background-color: #CF3E0F; padding: auto; height:50px; margin-top:1%; border-radius: 17px;"><h5 style="color: #ffff; text-align: center;">View profile</h5></a>
               
            </div>
        </div>`;
            }
        });
        message1 += `</div>`;
        $('#proAll').html(message1);

        $(".pagination").html('');

        if (searchField == '') {
            $.fn.members();
            // $('#proAll').html(message);
        }
    });
})