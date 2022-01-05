$.ajaxSetup({
    cache: false
});
$('#search').keyup(function() {
        $('#result').html('');
        $('#state').val('');
        var searchField = $('#search').val();
        var expression = new RegExp(searchField, "i");
        $.getJSON('api/read.php', function(data) {
            var message1 = `<div class="bchcall1">`;
            $.each(data, function(key, value) {
                if (value.name.search(expression) != -1 || value.village_or_town_of_origin.search(expression) != -1 || value.bchc_status.search(expression) != -1 || value.username.search(expression) != -1) {
                    //$('#proS').append('<li class="list-group-item link-class"><img src="upload/' + value.image + '" height="40" width="40" class="img-thumbnail" /> ' + value.name + ' | <span class="text-muted">' + value.village_or_town_of_origin + '</span></li>');
                    var username = value.username;
                    message1 += `<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 col-xxs-12 profile_item1" style="margin-bottom: 3%;">
    <div class="tm-tours-box-2">
        <img src="upload/` + value.image + `"alt="profile pic" class="img-responsive" style="height:310px">
        <div class="tm-tours-box-2-info">
            <h3 class="margin-bottom-15">` + value.name + `</h3>
            
            <p>` + value.bchc_status + `</p>
        </div>
        <a href="profile.html?` + username + `" class="tm-tours-box-2-link" style="background-color: #CF3E0F;">View profile</a>
    </div>
</div>`;
                }
            });
            message1 += `</div>`;
            $('#proAll').html(message1);
            $(".pagination").html('');

            if (searchField == '') {
                $.fn.profiles();
                // $('#proAll').html(message);
            }

        });


    })
    //})