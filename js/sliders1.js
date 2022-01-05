$(document).ready(function() {
    /*************************************************** Read Sliders ****************************************************************************** */

    $.fn.sliders = function() {

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




            sliderTable = `<div class="container-fluid col-12 containertable">
            <div class="table-responsive" style="box-shadow: 10px 10px 20px #2a2e33; padding: 2%;">
                <div class="" style="text-align: center;">
                </div>
                        
                <table class="tablemanager">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Date Created</th>
                            <th>Title</th>
                            <th>Position</th>
                            <th>Slider Template</th>
                            <th class="disableFilterBy disableSort">Link</th>
                            <th class="disableFilterBy disableSort">Content</th>
                            <th class="disableFilterBy disableSort">Image</th>
                            <th>Status</th>
                            <th class="disableFilterBy disableSort">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="body">
                    </tbody>
                </table>

                <footer>
                    <button type="button" class="btn btn-danger btn-sm" id="close" title="Close Slider"><i class="fa fa-times" aria-hidden="true"></i></button>  
                    <button type="button" class="btn btn-success btn-sm" id="addslider" style="float:right" title="Add New Slider"><i class="fa fa-plus" aria-hidden="true"></i></button>       
                                <i class="userid"></i>
                </footer>
              </div>
            </div>`;





            $('#allItems').html(sliderTable);
            $('#nameId').html('Slider');
            $('#titleItem').html('Slider');



            //close update
            $("#close").click(function() {
                $.fn.read_users();
                /* $('#allItems').html('');
                $('#nameId').html('');
                $('#titleItem').html(''); */
            });

            var sliderinfo;
            var Id;




            $.ajax({

                type: "GET",
                url: "../api/read_slider.php",
                //data: formData,
                dataType: "json",
                encode: true,
                Cache: false,
                // setTimeout();

            })

            .done(function(messages) {

                $.each(messages, function(i, messages) {

                    Id = messages.id;


                    sliderinfo = ` <tr>
                                    <td style="color: #0492C2;" class = "uid1">` + Id + `</td>
                                                    <td> ` + messages.created + `</td>
                                                    <td style="color: #FF8C00;">` + messages.title + `</td>
                                                    <td style="color: #0492C2;">` + messages.position + `</td>
                                                    <td style="color: #0492C2;">` + messages.template + `</td>
                                                    <td style="color: #0492C2;">` + messages.link + `</td>
                                                    <td>` + messages.content + `</td>
                                                    <td> <img src="upload/` + messages.image + `"alt="Slider image" class="img-responsive" style="height:50px; width:50px"></td>
                                                    <td>` + messages.status + `</td>
                                                    <td style="color: #FF0000;" class="mine">
                                                
                                                    
                                                    <button type="button" class=" btn-primary btn-sm che btntb1" id="che" data-value='` + messages.title + `' value='` + Id + `' title="Update Slider"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                                    <button type="button" class=" btn-danger btn-sm delete1 btntb1" data-value='` + messages.title + `' value='` + Id + `' title="Delete Slider"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                    </td>
                                </tr>`;
                    $('#body').append(sliderinfo)

                    $('.che').click(function() {
                        ID = $(this).val();
                        $.fn.updateslider(ID);
                    });

                    $('.delete1').click(function() {
                        ID = $(this).val();
                        title1 = $(this).data('value');
                        $.fn.delete_slider(ID, title1);
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

            $("#addslider").click(function() {
                $.fn.addslider();
            })

        }
        /*************************************************** End Of Read Slider ****************************************************************************** */




    $("#sliders").click(function() {
        $.fn.sliders();
        var w = window.innerWidth;
        if (w < 1200) {
            $('#sidebar').removeClass('active')
        }
    })





    /************************** ***********************Create Slider ****************************** ********************************** */
    $.fn.addslider = function() {


        $.get("../api/read_slidertemplate.php", function(messages) {

            var message = `<label for="slidertemplate3">Slider Template <span style="color: red;">*</span></label><select name="slidertemplate3" id="slidertemplate3" class="form-select" class="slidertemplate"><option value="">Select Slider Template</option>`;
            $.each(messages, function(i, messages) {
                var slidertemplate1 = messages.slidertemplate;
                var id = messages.id;
                message += `<option value="` + slidertemplate1 + `">` + slidertemplate1 + `</option>`;

            });

            message += `<span class="help-block" id="h_slidertemplate3"></span></select>`;


            $('.sltemplate').html(message);
        });


        var form1 = `<div class="wrapper">
                            
                <div style="text-align:left; margin-bottom:30px">
                    <image id="preview" style="height: 250px; width: 400px; border-radius: 8px;"/>
                </div>
                <h5 style="text-align:center;">The fields marked with <span style="color: red;">*</span> are required.</h5>
                
                <form onsubmit="return false;">
                    <div class="form-group">
                        <label>Slider Image </label>
                        <input  class="form-control" id="file" type="file" name="file" placeholder="Photo" accept="image/*">                        
                        <span class="help-block" id="h_file"></span>
                    </div>
    
                    <div class="form-group">
                    <label>Tittle </label>
                        <input type="text" name="title" class="form-control"  placeholder="Slider Title " id="tittle">
                        <span class="help-block" id="h_tittle"></span>
                    </div>
    
                    <div class="form-group">
                    <label>Slider Position </label>
                        <input type="text" name="position" class="form-control"  placeholder="Slider Position " id="position">
                        <span class="help-block" id="h_position"></span>                        
                    </div>
    
                    <div class="form-group sltemplate">
                            
                    </div>

                    <div class="form-group">
                    <label>Slider Link </label>
                        <input type="text" name="link" class="form-control"  placeholder="Slider Link " id="link">
                        <span class="help-block" id="h_link"></span>                        
                    </div>

                    <div class="form-group">
                    <label>Slider Status </label>
                        <input type="text" name="status" class="form-control"  placeholder="Slider Status " id="status">
                        <span class="help-block" id="h_status"></span>                        
                    </div>
                                    
                    <div class="form-group">
                        <label>Content <span style="color: red;">*</span></label>
                        <textarea class="form-control" id="content" rows="3" name="content"></textarea>    
                        <span class="help-block" id="h_content"></span>
                    </div>
                                    
                                    
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Submit" id="submit">
                        <button type="button" class="btn btn-danger cancel1">Cancel</button>                           
                    </div>
    
                </form>
                          
            </div>`;




        $('#allItems').html(form1);
        $('#nameId').html('Add New Slider');


        //$(".pagination").html('');

        //close update
        $(".cancel1").click(function() {
                $.fn.sliders();
            })
            //preview image
        function readImg(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    $('#preview').attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
        $("#file").change(function() {
            readImg(this);
        });
        //validating form
        $("form").submit(function(e) {

            /* validate image */
            var file = $("#file").val();
            if (file != '') {
                //Determine the file size.
                var file_size = $("#file")[0].files[0].size; //in MB
                // $("#h_file").html("");

                if (file_size > 10000000) {
                    $("#file").css('border', '1px solid red');
                    $("#h_file").html("Selected image is larger than 10MB");
                    $("#file").focus();
                    return false;

                } else {
                    $("#file").css('border', '2px solid green');
                    $("#h_file").html("");

                }
            }
            /* else {
                           $("#file").css('border', '1px solid red');
                           $("#h_file").html("Please upload an image");
                           $("#file").focus();
                           return false;
                       } */

            /* validate inputs */
            if ($("#tittle").val() == '') {
                $("#tittle").css('border', '1px solid red');
                $("#h_tittle").html('Enter slider title');
                return false;
            } else {
                $("#tittle").css('border', '2px solid green');
                $("#h_tittle").html('');
                //var postName = $("#tittle").val();
                //return true;
            };

            if ($('#position').val() == '') {
                $("#position").css('border', '2px solid red');
                $("#h_position").html('Enter Slider Position');
                return false;
            } else {
                $("#position").css('border', '2px solid green');
                $("#h_position").html('');
                //var postMarital = $('#pageid').val();
            };


            if ($('#slidertemplate3').val() == '') {
                $("#slidertemplate3").css('border', '2px solid red');
                $("#h_slidertemplate3").html('Select The Slider Template');
                return false;
            } else {
                $("#slidertemplate3").css('border', '2px solid green');
                $("#h_slidertemplate3").html('');
                //var postMarital = $('#pageid').val();
            };

            if ($('#link').val() == '') {
                $("#link").css('border', '2px solid red');
                $("#h_link").html('Enter Slider Link');
                return false;
            } else {
                $("#link").css('border', '2px solid green');
                $("#h_link").html('');
                //var postMarital = $('#pageid').val();
            };

            if ($("#status").val() == '') {
                $("#status").css('border', '1px solid red');
                $("#h_status").html('Please enter status');
                return false;
            } else {
                $("#status").css('border', '2px solid green');
                $("#h_status").html('');
                //var postAbout = $("#content").val();
                //return true;
            };


            if ($("#content").val() == '') {
                $("#content").css('border', '1px solid red');
                $("#h_content").html('Please enter content');
                return false;
            } else {
                $("#content").css('border', '2px solid green');
                $("#h_content").html('');
                //var postAbout = $("#content").val();
                //return true;
            };




            e.preventDefault();
            $.ajax({
                    type: 'POST',
                    url: '../api/create_slider.php',
                    data: new FormData(this),
                    dataType: 'json',
                    contentType: false,
                    cache: false,
                    processData: false,
                })
                .done(function(returnData) {

                    var success, status, message;

                    success = returnData.success;
                    status = returnData.status;
                    message = returnData.message;


                    alert(message)
                    if (status == 201)
                        $.fn.sliders();
                    if (status == 403)
                        $.fn.logout();
                    console.log(returnData)
                });



        });

    }


    /************************** ***********************update Slider ****************************** ********************************** */
    $.fn.updateslider = function() {



        var image1;
        var title1;
        var position1;
        var template1;
        var link1;
        var status1;
        var content1;


        var sid = ID; //$(this).data();
        $.get("../api/read_singleslider.php?id=" + sid, function(messages) {
            title1 = messages.title;
            position1 = messages.position;
            image1 = messages.image;
            template1 = messages.template;
            link1 = messages.link;
            status1 = messages.status;
            content1 = messages.content;

            $.get("../api/read_slidertemplate.php", function(messages) {

                var message = `<label for="templates">Slider Template <span style="color: red;">*</span></label><select name="templates" id="templates" class="form-select templates" ><option value="` + template1 + `">` + template1 + `</option>`;
                $.each(messages, function(i, messages) {
                    var slidertemplate = messages.slidertemplate;
                    var id = messages.id;
                    message += `<option value="` + slidertemplate + `">` + slidertemplate + `</option>`;

                });

                message += `<span class="help-block" id="h_templates"></span></select>`;


                $('.sltemplate1').html(message);
            });




            var form1 = `<div class="wrapper">
                                
                    <div style="text-align:left; margin-bottom:30px">
                        <image src="../upload/` + image1 + `" id="preview" style="height: 250px; width: 400px; border-radius: 8px;"/>
                    </div>
                    <h5 style="text-align:center;">The fields marked with <span style="color: red;">*</span> are required.</h5>
                <form onsubmit="return false" enctype="multipart/form-data">
                        <div class="form-group">

                        <button type="button" class="btn btn-success save" id="save" style="display: none;">Save image</button>

                        </div>
                        <div class="form-group">
                        <label>Upload slider image </label>
                        <input  class="form-control" id="file" type="file" name="profile_photo" placeholder="Image" accept="image/*">
                        <span class="help-block" id="h_file"></span>
                            </div>

                            <div class="form-group">

                        <input type="hidden" name="id" class="form-control" id="mgid" value="` + sid + `">

                        </div>
                            
                </form>

                   
                <form onsubmit="return false;">
                        <div class="form-group">
                            <label>Slider Tittle </label>
                            <input type="text" name="title" class="form-control" title placeholder="Slider Title " id="tittle" value="` + title1 + `">
                            <span class="help-block" id="h_tittle"></span>
                        </div>
        
                        <div class="form-group">
                        <label>Slider Position </label>
                            <input type="text" name="position" class="form-control"  placeholder="Slider Position " id="position" value="` + position1 + `">
                            <span class="help-block" id="h_position"></span>                        
                        </div>
        
                        <div class="form-group sltemplate1">
                                   
                        </div>

                        <div class="form-group">
                        <label>Slider Link </label>
                            <input type="text" name="link" class="form-control"  placeholder="Slider Link " id="link" value="` + link1 + `">
                            <span class="help-block" id="h_link"></span>                        
                        </div>

                        <div class="form-group">
                        <label>Slider Status </label>
                            <input type="text" name="status" class="form-control"  placeholder="Slider Status " id="status" value="` + status1 + `">
                            <span class="help-block" id="h_status"></span>                        
                        </div>
                                        
                        <div class="form-group">
                            <label>Content <span style="color: red;">*</span></label>
                            <textarea class="form-control" id="content" rows="3" name="content">` + content1 + `</textarea>    
                            <span class="help-block" id="h_content"></span>
                        </div>
                        
                        <div class="form-group">

                        <input type="hidden" name="id" class="form-control" id="mgid" value="` + sid + `">

                        </div>
                                        
                        <div class="form-group">
                            <input type="submit" class="btn btn-primary" value="Submit" id="submit">
                            <button type="button" class="btn btn-danger cancel1">Cancel</button>                           
                        </div>
        
                    </form>
                              
                </div>`;




            $('#allItems').html(form1);
            $('#nameId').html('Update Slider');


            //$(".pagination").html('');

            //close update
            $(".cancel1").click(function() {
                    $.fn.sliders();
                })
                //preview image
            function readImg(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        $('#preview').attr('src', e.target.result);
                    }
                    reader.readAsDataURL(input.files[0]);
                }
            }
            $("#file").change(function() {
                readImg(this);
                $(".save").css('display', 'block');
            });

            //pic upload.
            $("#save").click(function() {

                    var file = $("#file").val();

                    //Determine the file size.
                    var file_size = $("#file")[0].files[0].size; //in MB
                    // $("#h_file").html("");

                    if (file_size > 10000000) {
                        $("#file").css('border', '1px solid red');
                        $("#h_file").html("Selected image is larger than 10MB");
                        $("#file").focus();
                        return false;

                    } else {
                        $("#file").css('border', '2px solid green');
                        $("#h_file").html("");
                        var fd = new FormData();
                        var files = $('#file')[0].files;
                    }


                    fd.append('file', files[0]);
                    fd.append('id', sid);
                    $.ajax({
                            url: '../api/update_uploadslider.php',
                            type: 'post',
                            data: fd,
                            dataType: 'json',
                            contentType: false,
                            cache: false,
                            processData: false,
                        })
                        .done(function(returnData) {

                            var success, status, message;

                            success = returnData.success;
                            status = returnData.status;
                            message = returnData.message;


                            alert(message)
                            if (status == 201)
                                $(".save").css('display', 'none');
                            console.log(returnData)
                        });


                })
                //validating form
            $("form").submit(function(e) {


                /* validate inputs */
                if ($("#tittle").val() == '') {
                    $("#tittle").css('border', '1px solid red');
                    $("#h_tittle").html('Enter slider title');
                    return false;
                } else {
                    $("#tittle").css('border', '2px solid green');
                    $("#h_tittle").html('');
                    //var postName = $("#tittle").val();
                    //return true;
                };

                if ($('#position').val() == '') {
                    $("#position").css('border', '2px solid red');
                    $("#h_position").html('Enter Slider Position');
                    return false;
                } else {
                    $("#position").css('border', '2px solid green');
                    $("#h_position").html('');
                    //var postMarital = $('#pageid').val();
                };


                if ($('#templates').val() == '') {
                    $("#templates").css('border', '2px solid red');
                    $("#h_templates").html('Select The Slider Template');
                    return false;
                } else {
                    $("#templates").css('border', '2px solid green');
                    $("#h_templates").html('');
                    //var postMarital = $('#pageid').val();
                };

                if ($('#link').val() == '') {
                    $("#link").css('border', '2px solid red');
                    $("#h_link").html('Enter Slider Link');
                    return false;
                } else {
                    $("#link").css('border', '2px solid green');
                    $("#h_link").html('');
                    //var postMarital = $('#pageid').val();
                };

                if ($("#status").val() == '') {
                    $("#status").css('border', '1px solid red');
                    $("#h_status").html('Please enter status');
                    return false;
                } else {
                    $("#status").css('border', '2px solid green');
                    $("#h_status").html('');
                    //var postAbout = $("#content").val();
                    //return true;
                };


                if ($("#content").val() == '') {
                    $("#content").css('border', '1px solid red');
                    $("#h_content").html('Please enter content');
                    return false;
                } else {
                    $("#content").css('border', '2px solid green');
                    $("#h_content").html('');
                    //var postAbout = $("#content").val();
                    //return true;
                };



                e.preventDefault();
                $.ajax({
                        type: 'POST',
                        url: '../api/update_slider.php',
                        data: new FormData(this),
                        dataType: 'json',
                        contentType: false,
                        cache: false,
                        processData: false,
                    })
                    .done(function(returnData) {

                        var success, status, message;

                        success = returnData.success;
                        status = returnData.status;
                        message = returnData.message;


                        alert(message)
                        if (status == 201)
                            $.fn.sliders();
                        if (status == 403)
                            $.fn.logout();
                        console.log(returnData)
                    });



            });


        })



    }

    /* ************popup delete************* */
    $.fn.delete_slider = function() {
        var slId = ID;
        var title2 = title1;
        var modalPop = `<div class="popup-overlay active" id="delete21" style="height:15%; width:45%; border:red solid 1px;">
                    <div class="popup-link active" style="height:70%;">
                        <p style="height:60%;padding:2%;">Are you sure you want to delete <b><span class="del_acc">` + title2 + `</span></b> Section?</p>
                        <div style="text-align:center; margin=10%;">
                        <form onsubmit="return false;">
                        
                        <div class="form-group">
                                    <input type="submit" class="btn btn-primary btn-sm" value="Delete" id="submit">
                                    <button type="button" class="btn btn-danger btn-sm cancel1">Cancel</button>                           
                        </div>
                        <div class="form-group">
        
                                <input type="hidden" name="id" class="form-control" id="sid" value="` + slId + `">
        
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
            var postId = $("#sid").val();
            var formData = {

                id: postId
            }
            e.preventDefault();
            $.ajax({
                    type: "POST",
                    url: "../api/delete_slider.php",
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

                        $.fn.sliders();
                    $('#proS').html('');
                    if (status == 403)
                        $.fn.logout();
                    console.log(returnData)
                });

        });


    };
    /* ************end of popup delete************* */




});