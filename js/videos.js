$(document).ready(function() {
    /*************************************************** Read Videos ****************************************************************************** */

    $.fn.videos = function() {

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




            videoTable = `<div class="container-fluid col-12 containertable">
            <div class="table-responsive" style="box-shadow: 10px 10px 20px #2a2e33; padding: 2%;">
                <div class="" style="text-align: center;">
                </div>
                        
                <table class="tablemanager">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Date Created</th>
                            <th>Title</th>
                            <th>Videos</th>
                            <th class="disableFilterBy disableSort">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="body">
                    </tbody>
                </table>

                <footer>
                    <button type="button" class="btn btn-danger btn-sm" id="close" title="Close Video"><i class="fa fa-times" aria-hidden="true"></i></button>  
                    <button type="button" class="btn btn-success btn-sm" id="addvideo" style="float:right" title="Add New Video"><i class="fa fa-plus" aria-hidden="true"></i></button>       
                                <i class="userid"></i>
                </footer>
              </div>
            </div>`;





            $('#allItems').html(videoTable);
            $('#nameId').html('Videos');
            $('#titleItem').html('Videos');



            //close update
            $("#close").click(function() {
                $.fn.read_users();
                /* $('#allItems').html('');
                $('#nameId').html('');
                $('#titleItem').html(''); */
            });

            var titlelateInfo;
            var Id;




            $.ajax({

                type: "GET",
                url: "../api/read_video.php",
                //data: formData,
                dataType: "json",
                encode: true,
                Cache: false,
                // setTimeout();

            })

            .done(function(messages) {

                $.each(messages, function(i, messages) {

                    Id = messages.id;

                    //var video1 = `<iframe width="20%" height="52" src="` + messages.video + `" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

                    videoInfo = ` <tr>
                                    <td style="color: #0492C2;" class = "uid1">` + Id + `</td>
                                                    <td>` + messages.created + `</td>
                                                    <td style="color: #0492C2;">` + messages.title + `</td>
                                                    <td class="videoss"><iframe width="100%" height="200" src="` + messages.video + `" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                    </td>
                                                                                  
                                                    <td style="color: #FF0000;" class="mine">
                                                
                                                    
                                                    <button type="button" class=" btn-primary btn-sm che btntb1" id="che" data-value='` + messages.title + `' value='` + Id + `' title="Update Video"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                                    <button type="button" class=" btn-danger btn-sm delete1 btntb1" data-value='` + messages.title + `' value='` + Id + `' title="Delete Video"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                    </td>
                                </tr>`;
                    //$('.videoss').html('video1')

                    $('#body').append(videoInfo)

                    $('.che').click(function() {
                        ID = $(this).val();
                        $.fn.updateVideo(ID);
                    });

                    $('.delete1').click(function() {
                        ID = $(this).val();
                        title1 = $(this).data('value');
                        $.fn.delete_video(ID, title1);
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


            }, "json");




            $("#addvideo").click(function() {
                $.fn.addVideo();
            })

        }
        /***************************************************End of Read Video ****************************************************************************** */




    $("#videos").click(function() {
        $.fn.videos();
        var w = window.innerWidth;
        if (w < 1200) {
            $('#sidebar').removeClass('active')
        }
    })





    /************************** ***********************Create Video ****************************** ********************************** */
    $.fn.addVideo = function() {


        var form1 = `<div class="wrapper">
                            
               
                <h5 style="text-align:center;">The fields marked with <span style="color: red;">*</span> are required.</h5>
                
                <form onsubmit="return false;">
                   
                    <div class="form-group">
                        <label>Video Link <span style="color: red;">*</span></label>
                        <input type="text" name="link" class="form-control" placeholder="Enter Video Link " id="link">
                        <span class="help-block" id="h_link"></span>
                    </div>
                    <div class="form-group">
                        <label>Video Title </label>
                        <input type="text" name="title" class="form-control" placeholder="Enter Video Title " id="title">
                        <span class="help-block" id="h_title"></span>
                    </div>
                    
                 
                    
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Submit" id="submit">
                        <button type="button" class="btn btn-danger cancel1">Cancel</button>                           
                    </div>
    
                </form>
                          
            </div>`;




        $('#allItems').html(form1);
        $('#nameId').html('Add New Video');


        //$(".pagination").html('');

        //close update
        $(".cancel1").click(function() {
            $.fn.videos();
        })



        //validating form
        $("form").submit(function(e) {


            /* validate inputs */
            if ($("#title").val() == '') {
                $("#title").css('border', '1px solid red');
                $("#h_title").html('Enter Section Template Name');
                return false;
            } else {
                $("#title").css('border', '2px solid green');
                $("#h_titlep").html('');
                var postTitle = $("#title").val();
                //return true;
            };

            if ($("#link").val() == '') {
                $("#link").css('border', '1px solid red');
                $("#h_link").html('Enter Template link');
                return false;
            } else {
                $("#link").css('border', '2px solid green');
                $("#h_link").html('');
                var postLink = $("#link").val();
                //return true;
            };


            var formData = {
                title: postTitle,
                video: postLink
            };

            e.preventDefault();
            $.ajax({
                    type: "POST",
                    url: "../api/create_video.php",
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
                        $.fn.videos();
                    if (status == 403)
                        $.fn.logout();
                    console.log(returnData)
                });



        });

    }


    /************************** ***********************update Video ****************************** ********************************** */
    $.fn.updateVideo = function() {


            var vid;
            var title1;
            var link1

            var sid = ID; //$(this).data();
            $.get("../api/read_singlevideo.php?id=" + sid, function(messages) {
                vid = messages.id;
                title1 = messages.title;
                link1 = messages.video;

                var form1 = `<div class="wrapper">
                            
                
                <h5 style="text-align:center;">The fields marked with <span style="color: red;">*</span> are required.</h5>
                
                <form onsubmit="return false;">
                        
                <div class="form-group">
                    <label>Video Title </label>
                    <input type="text" name="title" class="form-control" placeholder="Enter Video Title " id="title" value="` + title1 + `">
                    <span class="help-block" id="h_title"></span>
                </div>
                <div class="form-group">
                    <label>Video Link <span style="color: red;">*</span></label>
                    <input type="text" name="link" class="form-control" placeholder="Enter Video Link " id="link"  value="` + link1 + `">
                    <span class="help-block" id="h_link"></span>
                </div>
                    
                 
                    <div class="form-group">
                        <input type="hidden" name="id" class="form-control" id="pid" value="` + vid + `">
                    </div>
                                    
                                    
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Submit" id="submit">
                        <button type="button" class="btn btn-danger cancel1">Cancel</button>                           
                    </div>
    
                </form>
                          
            </div>`;




                $('#allItems').html(form1);
                $('#nameId').html('Update Video');




                //close update
                $(".cancel1").click(function() {
                    $.fn.videos();
                })

                //validating form
                $("form").submit(function(e) {

                    var postId = $("#pid").val();
                    /* validate inputs */

                    if ($("#title").val() == '') {
                        $("#title").css('border', '1px solid red');
                        $("#h_title").html('Enter Section Template Name');
                        return false;
                    } else {
                        $("#title").css('border', '2px solid green');
                        $("#h_titlep").html('');
                        var postTitle = $("#title").val();
                        //return true;
                    };

                    if ($("#link").val() == '') {
                        $("#link").css('border', '1px solid red');
                        $("#h_link").html('Enter Template link');
                        return false;
                    } else {
                        $("#link").css('border', '2px solid green');
                        $("#h_link").html('');
                        var postLink = $("#link").val();
                        //return true;
                    };



                    var formData = {
                        id: postId,
                        title: postTitle,
                        video: postLink

                    };

                    e.preventDefault();
                    $.ajax({
                            type: "POST",
                            url: "../api/update_video.php",
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
                                $.fn.videos();
                            if (status == 403)
                                $.fn.logout();
                            console.log(returnData)
                        });



                });


            })



        }
        /*************************************** End Of Update *******************************************/

    /* ************popup delete************* */
    $.fn.delete_video = function() {

            var titleId = ID;
            var title2 = title1;
            var modalPop = `<div class="popup-overlay active" id="delete21" style="height:15%; width:45%; border:red solid 1px;">
                    <div class="popup-link active" style="height:70%;">
                        <p style="height:60%;padding:2%;">Are you sure you want to delete <b><span class="del_acc">` + title2 + `</span></b> Video?</p>
                        <div style="text-align:center; margin=10%;">
                        <form onsubmit="return false;">
                        
                        <div class="form-group">
                                    <input type="submit" class="btn btn-primary btn-sm" value="Delete" id="submit">
                                    <button type="button" class="btn btn-danger btn-sm cancel1">Cancel</button>                           
                        </div>
                        <div class="form-group">
        
                                <input type="hidden" name="id" class="form-control" id="pid" value="` + titleId + `">
        
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
                var postId = $("#pid").val();
                var formData = {

                    id: postId
                }
                e.preventDefault();
                $.ajax({
                        type: "POST",
                        url: "../api/delete_video.php",
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

                            $.fn.videos();
                        $('#proS').html('');
                        if (status == 403)
                            $.fn.logout();
                        console.log(returnData)
                    });

            });

        }
        /* ************end of popup delete************* */




});