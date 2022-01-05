$(document).ready(function() {
    /*************************************************** Read Slider Template ****************************************************************************** */

    $.fn.slidertemplates = function() {

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




            sliderTemplateTable = `<div class="container-fluid col-12 containertable">
            <div class="table-responsive" style="box-shadow: 10px 10px 20px #2a2e33; padding: 2%;">
                <div class="" style="text-align: center;">
                </div>
                        
                <table class="tablemanager">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Slider Template</th>
                            <th>Description</th>
                            <th class="disableFilterBy disableSort">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="body">
                    </tbody>
                </table>

                <footer>
                    <button type="button" class="btn btn-danger btn-sm" id="close" title="Close Slider Template"><i class="fa fa-times" aria-hidden="true"></i></button>  
                    <button type="button" class="btn btn-success btn-sm" id="addslidertemplate" style="float:right" title="Add New Slider Template"><i class="fa fa-plus" aria-hidden="true"></i></button>       
                                <i class="userid"></i>
                </footer>
              </div>
            </div>`;





            $('#allItems').html(sliderTemplateTable);
            $('#nameId').html('Slider Template');
            $('#titleItem').html('Slider Template');



            //close update
            $("#close").click(function() {
                $.fn.read_users();
                /* $('#allItems').html('');
                $('#nameId').html('');
                $('#titleItem').html(''); */
            });

            var sliderTemplateInfo;
            var Id;




            $.ajax({

                type: "GET",
                url: "../api/read_slidertemplate.php",
                //data: formData,
                dataType: "json",
                encode: true,
                Cache: false,
                // setTimeout();

            })

            .done(function(messages) {

                $.each(messages, function(i, messages) {

                    Id = messages.id;


                    sliderTemplateInfo = ` <tr>
                                    <td style="color: #0492C2;" class = "uid1">` + Id + `</td>
                                                    <td>` + messages.slidertemplate + `</td>
                                                    <td style="color: #0492C2;">` + messages.description + `</td>
                                                                                  
                                                    <td style="color: #FF0000;" class="mine">
                                                
                                                    
                                                    <button type="button" class=" btn-primary btn-sm che btntb1" id="che" data-value='` + messages.slidertemplate + `' value='` + Id + `' title="Update Slider Template"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                                    <button type="button" class=" btn-danger btn-sm delete1 btntb1" data-value='` + messages.slidertemplate + `' value='` + Id + `' title="Delete Slider Template"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                    </td>
                                </tr>`;
                    $('#body').append(sliderTemplateInfo)

                    $('.che').click(function() {
                        ID = $(this).val();
                        $.fn.updateSliderTemplate(ID);
                    });

                    $('.delete1').click(function() {
                        ID = $(this).val();
                        title1 = $(this).data('value');
                        $.fn.delete_slidertemplate(ID, title1);
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




            $("#addslidertemplate").click(function() {
                $.fn.addSliderTemplate();
            })

        }
        /***************************************************End of Read Page Template ****************************************************************************** */




    $("#slidertemplate").click(function() {
        $.fn.slidertemplates();
        var w = window.innerWidth;
        if (w < 1200) {
            $('#sidebar').removeClass('active')
        }
    })





    /************************** ***********************Create slider Template ****************************** ********************************** */
    $.fn.addSliderTemplate = function() {
        //$("#menutype").click(function() {


        var form1 = `<div class="wrapper">
                            
                
                <h5 style="text-align:center;">The fields marked with <span style="color: red;">*</span> are required.</h5>
                
                <form onsubmit="return false;">
                        
                    <div class="form-group">
                        <label>Slider Template </label>
                        <input type="text" name="slidertemp" class="form-control" placeholder="Enter Template Name " id="slidertemp">
                        <span class="help-block" id="h_slidertemp"></span>
                    </div>
                    <div class="form-group">
                        <label>Description <span style="color: red;">*</span></label>
                        <textarea class="form-control" id="description" rows="3" name="description"></textarea>    
                        <span class="help-block" id="h_description"></span>
                    </div>
                    
                 
                    
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Submit" id="submit">
                        <button type="button" class="btn btn-danger cancel1">Cancel</button>                           
                    </div>
    
                </form>
                          
            </div>`;




        $('#allItems').html(form1);
        $('#nameId').html('Add New Slider Template');


        //$(".pagination").html('');

        //close update
        $(".cancel1").click(function() {
            $.fn.slidertemplates();
        })

        //validating form
        $("form").submit(function(e) {


            /* validate inputs */
            if ($("#slidertemp").val() == '') {
                $("#slidertemp").css('border', '1px solid red');
                $("#h_slidertemp").html('Enter slider Template Name');
                return false;
            } else {
                $("#slidertemp").css('border', '2px solid green');
                $("#h_slidertempp").html('');
                var postSliderTemplate = $("#slidertemp").val();
                //return true;
            };

            if ($("#description").val() == '') {
                $("#description").css('border', '1px solid red');
                $("#h_description").html('Enter Template Description');
                return false;
            } else {
                $("#description").css('border', '2px solid green');
                $("#h_description").html('');
                var postDescription = $("#description").val();
                //return true;
            };


            var formData = {
                slidertemplate: postSliderTemplate,
                description: postDescription
            };

            e.preventDefault();
            $.ajax({
                    type: "POST",
                    url: "../api/create_slidertemplate.php",
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
                        $.fn.slidertemplates();
                    if (status == 403)
                        $.fn.logout();
                    console.log(returnData)
                });



        });

    }


    /************************** ***********************update slider Template ****************************** ********************************** */
    $.fn.updateSliderTemplate = function() {


            var stid;
            var sliderTemplate1;
            var description1

            var sid = ID; //$(this).data();
            $.get("../api/read_singleslidertemplate.php?id=" + sid, function(messages) {
                stid = messages.id;
                sliderTemplate1 = messages.slidertemplate;
                description1 = messages.description;

                var form1 = `<div class="wrapper">
                            
                
                <h5 style="text-align:center;">The fields marked with <span style="color: red;">*</span> are required.</h5>
                
                <form onsubmit="return false;">
                        
                    <div class="form-group">
                        <label>Page Template Name </label>
                        <input type="text" name="slidertemp" class="form-control" value="` + sliderTemplate1 + `" id="slidertemp">
                        <span class="help-block" id="h_slidertemp"></span>
                    </div>
                    <div class="form-group">
                        <label>Description <span style="color: red;">*</span></label>
                        <textarea class="form-control" id="description" rows="3" name="description">` + description1 + `</textarea>    
                        <span class="help-block" id="h_description"></span>
                    </div>
                    
                 
                    <div class="form-group">
                        <input type="hidden" name="id" class="form-control" id="pid" value="` + stid + `">
                    </div>
                                    
                                    
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Submit" id="submit">
                        <button type="button" class="btn btn-danger cancel1">Cancel</button>                           
                    </div>
    
                </form>
                          
            </div>`;




                $('#allItems').html(form1);
                $('#nameId').html('Update Slider Template');




                //close update
                $(".cancel1").click(function() {
                    $.fn.slidertemplates();
                })

                //validating form
                $("form").submit(function(e) {

                    var postId = $("#pid").val();
                    /* validate inputs */

                    if ($("#slidertemp").val() == '') {
                        $("#slidertemp").css('border', '1px solid red');
                        $("#h_slidertemp").html('Enter slider Template Name');
                        return false;
                    } else {
                        $("#slidertemp").css('border', '2px solid green');
                        $("#h_slidertemp").html('');
                        var postSliderTemplate = $("#slidertemp").val();
                        //return true;
                    };

                    if ($("#description").val() == '') {
                        $("#description").css('border', '1px solid red');
                        $("#h_description").html('Enter Template Description');
                        return false;
                    } else {
                        $("#description").css('border', '2px solid green');
                        $("#h_description").html('');
                        var postDescription = $("#description").val();
                        //return true;
                    };


                    var formData = {
                        id: postId,
                        slidertemplate: postSliderTemplate,
                        description: postDescription

                    };

                    e.preventDefault();
                    $.ajax({
                            type: "POST",
                            url: "../api/update_slidertemplate.php",
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
                                $.fn.slidertemplates();
                            if (status == 403)
                                $.fn.logout();
                            console.log(returnData)
                        });



                });


            })



        }
        /*************************************** End Of Update *******************************************/

    /* ************popup delete************* */
    $.fn.delete_slidertemplate = function() {

            var slidertempId = ID;
            var sliderTemplate1 = title1;
            var modalPop = `<div class="popup-overlay active" id="delete21" style="height:15%; width:45%; border:red solid 1px;">
                    <div class="popup-link active" style="height:70%;">
                        <p style="height:60%;padding:2%;">Are you sure you want to delete <b><span class="del_acc">` + sliderTemplate1 + `</span></b> slider Template?</p>
                        <div style="text-align:center; margin=10%;">
                        <form onsubmit="return false;">
                        
                        <div class="form-group">
                                    <input type="submit" class="btn btn-primary btn-sm" value="Delete" id="submit">
                                    <button type="button" class="btn btn-danger btn-sm cancel1">Cancel</button>                           
                        </div>
                        <div class="form-group">
        
                                <input type="hidden" name="id" class="form-control" id="pid" value="` + slidertempId + `">
        
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
                        url: "../api/delete_slidertemplate.php",
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

                            $.fn.slidertemplates();
                        $('#proS').html('');
                        if (status == 403)
                            $.fn.logout();
                        console.log(returnData)
                    });

            });

        }
        /* ************end of popup delete************* */




});