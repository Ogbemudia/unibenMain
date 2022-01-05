$(document).ready(function() {
    /*************************************************** Read pages ****************************************************************************** */

    $.fn.pages = function() {

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




            pagesTable = `<div class="container-fluid col-12 containertable">
            <div class="table-responsive" style="box-shadow: 10px 10px 20px #2a2e33; padding: 2%;">
                <div class="" style="text-align: center;">
                </div>
                        
                <table class="tablemanager">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Date Created</th>
                            <th>Created By</th>
                            <th>Title</th>
                            <th>Page Template</th>
                            <th class="disableFilterBy disableSort">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="body">
                    </tbody>
                </table>

                <footer>
                    <button type="button" class="btn btn-danger btn-sm" id="close" title="Close Pages"><i class="fa fa-times" aria-hidden="true"></i></button>  
                    <button type="button" class="btn btn-success btn-sm" id="addpage" style="float:right" title="Add New Page"><i class="fa fa-plus" aria-hidden="true"></i></button>       
                                <i class="userid"></i>
                </footer>
              </div>
            </div>`;





            $('#allItems').html(pagesTable);
            $('#nameId').html('Pages');
            $('#titleItem').html('Pages');



            //close update
            $("#close").click(function() {
                $.fn.read_users();
                /* $('#allItems').html('');
                $('#nameId').html('');
                $('#titleItem').html(''); */
            });

            var pageinfo;
            var Id;




            $.ajax({

                type: "GET",
                url: "../api/read_page.php",
                //data: formData,
                dataType: "json",
                encode: true,
                Cache: false,
                // setTimeout();

            })

            .done(function(messages) {

                $.each(messages, function(i, messages) {

                    Id = messages.id;


                    pageinfo = ` <tr>
                                    <td style="color: #0492C2;" class = "uid1">` + Id + `</td>
                                                    <td>` + messages.created + `</td>
                                                    <td>` + messages.user + `</td>
                                                    <td style="color: #FF8C00;">` + messages.title + `</td>
                                                    <td style="color: #0492C2;">` + messages.pagetemplate + `</td>
                                                    <td style="color: #FF0000;" class="mine">
                                                
                                                    <button type="button" class=" btn-primary btn-sm che btntb1" id="che" data-value='` + messages.title + `' value='` + Id + `' title="Update Page"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                                    <button type="button" class=" btn-danger btn-sm delete1 btntb1" data-value='` + messages.title + `' value='` + Id + `' title="Delete Page"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                    </td>
                                </tr>`;
                    $('#body').append(pageinfo)

                    $('.che').click(function() {
                        ID = $(this).val();
                        $.fn.updatePage(ID);
                    });

                    $('.delete1').click(function() {
                        ID = $(this).val();
                        title1 = $(this).data('value');
                        $.fn.delete_page(ID, title1);
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




            $("#addpage").click(function() {
                $.fn.addPage();
            })

        }
        /***************************************************End of Read menu ****************************************************************************** */




    $("#pages").click(function() {
        $.fn.pages();
        var w = window.innerWidth;
        if (w < 1200) {
            $('#sidebar').removeClass('active')
        }
    })





    /************************** ***********************Create Pages ****************************** ********************************** */
    $.fn.addPage = function() {
        //$("#menutype").click(function() {



        $.get("../api/read_pagetemplate.php", function(messages) {

            var message = `<label for="pagetemp">Page Template <span style="color: red;">*</span></label><select name="pagetemp" id="pagetemp" class="form-select" class="pagetemp"><option value="">Page Template</option>`;
            $.each(messages, function(i, messages) {
                var pageTemplate1 = messages.pagetemplate;
                var id = messages.id;
                message += `<option value="` + pageTemplate1 + `">` + pageTemplate1 + `</option>`;

            });

            message += `<span class="help-block" id="h_pagetemp"></span></select>`;


            $('.pagetemp1').html(message);
        });

        $.get("../validation/read_singlelogin.php", function(messages) {

            var firstName = messages.first_name;
            var lasttName = messages.last_name;

            var user1 = `<label for="user">New Page Created By:</label><input type="text" name="user" class="form-control" value="` + firstName + " " + lasttName + `"  id="user" disabled>`;
            $('.createdby').html(user1);

        }, "json");


        var form1 = `<div class="wrapper">
                            
                
                <h5 style="text-align:center;">The fields marked with <span style="color: red;">*</span> are required.</h5>
                
                <form onsubmit="return false;">
                        
                    <div class="form-group">
                        <label>Tittle </label>
                        <input type="text" name="title" class="form-control" placeholder="Page Title " id="tittle">
                        <span class="help-block" id="h_tittle"></span>
                    </div>
    
                    <div class="form-group pagetemp1">
                        
                    </div>

                    <div class="form-group createdby">
                        
                    </div>
                 
                                    
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Submit" id="submit">
                        <button type="button" class="btn btn-danger cancel1">Cancel</button>                           
                    </div>
    
                </form>
                          
            </div>`;




        $('#allItems').html(form1);
        $('#nameId').html('Add New Page');


        //$(".pagination").html('');

        //close update
        $(".cancel1").click(function() {
            $.fn.pages();
        })

        //validating form
        $("form").submit(function(e) {


            /* validate inputs */
            if ($("#tittle").val() == '') {
                $("#tittle").css('border', '1px solid red');
                $("#h_tittle").html('Enter menu title');
                return false;
            } else {
                $("#tittle").css('border', '2px solid green');
                $("#h_tittle").html('');
                var postTitle = $("#tittle").val();
                //return true;
            };

            if ($('#pagetemp').val() == '') {
                $("#pagetemp").css('border', '2px solid red');
                $("#h_pagetemp").html('Select The Page Template');
                return false;
            } else {
                $("#pagetemp").css('border', '2px solid green');
                $("#h_pagetemp").html('');
                var postPageTemp = $('#pagetemp').val();
            };



            var postUser = $('#user').val();

            var formData = {
                title: postTitle,
                pagetemplate: postPageTemp,
                user: postUser

            };

            e.preventDefault();
            $.ajax({
                    type: "POST",
                    url: "../api/create_page.php",
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
                        $.fn.pages();
                    if (status == 403)
                        $.fn.logout();
                    console.log(returnData)
                });



        });

    }


    /************************** ***********************update Page ****************************** ********************************** */
    $.fn.updatePage = function() {
            //$('#allItems').html('form1');
            //$("#menutype").click(function() {

            var id;
            var title1;
            var pageTemplate1;
            var createdBy;

            var sid = ID; //$(this).data();
            $.get("../api/read_singlepage.php?id=" + sid, function(messages) {
                id = messages.id;
                title1 = messages.title;
                pageTemplate1 = messages.pagetemplate;
                createdBy = messages.user;

                $.get("../api/read_pagetemplate.php", function(messages) {

                    var message = `<label for="pagetemp">Page Template <span style="color: red;">*</span></label><select name="pagetemp" id="pagetemp" class="form-select pagetemp" ><option value="` + pageTemplate1 + `">` + pageTemplate1 + `</option>`;
                    $.each(messages, function(i, messages) {
                        var pageTemplate2 = messages.pagetemplate;
                        // var id = messages.id;
                        message += `<option value="` + pageTemplate2 + `">` + pageTemplate2 + `</option>`;

                    });

                    message += `<span class="help-block" id="h_pagetemp"></span></select>`;


                    $('.pagetemp2').html(message);
                });




                var form1 = `<div class="wrapper">
                                    
                        
                        <h5 style="text-align:center;">The fields marked with <span style="color: red;">*</span> are required.</h5>
    
                    <form onsubmit="return false;">
                            <div class="form-group">
                                <label>Tittle </label>
                                <input type="text" name="title" class="form-control" title placeholder="menu Title " id="tittle" value="` + title1 + `">
                                <span class="help-block" id="h_tittle"></span>
                            </div>
            
                                    
                            <div class="form-group pagetemp2">
                                
                            </div>

                            <div class="form-group user">
                            <label for="user">New Page Created By:</label>
                            <input type="text" name="user" class="form-control" value="` + createdBy + `"  id="user" disabled>
                            </div>
            
                            
                            
                            <div class="form-group">
    
                            <input type="hidden" name="id" class="form-control" id="pgid" value="` + sid + `">
    
                            </div>
                                            
                            <div class="form-group">
                                <input type="submit" class="btn btn-primary" value="Submit" id="submit">
                                <button type="button" class="btn btn-danger cancel1">Cancel</button>                           
                            </div>
            
                        </form>
                                  
                    </div>`;




                $('#allItems').html(form1);
                $('#nameId').html('Update Page');


                //$(".pagination").html('');

                //close update
                $(".cancel1").click(function() {
                    $.fn.pages();
                })


                //validating form
                $("form").submit(function(e) {

                    var postId = $("#pgid").val();
                    /* validate inputs */
                    if ($("#tittle").val() == '') {
                        $("#tittle").css('border', '1px solid red');
                        $("#h_tittle").html('Enter page title');
                        return false;
                    } else {
                        $("#tittle").css('border', '2px solid green');
                        $("#h_tittle").html('');
                        var postTitle = $("#tittle").val();
                        //return true;
                    };

                    if ($('#pagetemp').val() == '') {
                        $("#pagetemp").css('border', '2px solid red');
                        $("#h_pagetemp").html('Select Select Page Template');
                        return false;
                    } else {
                        $("#pagetemp").css('border', '2px solid green');
                        $("#h_pagetemp").html('');
                        var postPageTemp = $('#pagetemp').val();
                    };
                    var postUser = $("#user").val();
                    //return true;


                    var formData = {
                        id: postId,
                        title: postTitle,
                        pagetemplate: postPageTemp,
                        user: postUser,

                    };

                    e.preventDefault();
                    $.ajax({
                            type: "POST",
                            url: "../api/update_page.php",
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
                                $.fn.pages();
                            if (status == 403)
                                $.fn.logout();
                            console.log(returnData)
                        });



                });


            })



        }
        /*************************************** End Of Update *******************************************/

    /* ************popup delete************* */
    $.fn.delete_page = function() {

            var pageId = ID;
            var title2 = title1;
            var modalPop = `<div class="popup-overlay active" id="delete21" style="height:15%; width:45%; border:red solid 1px;">
                    <div class="popup-link active" style="height:70%;">
                        <p style="height:60%;padding:2%;">Are you sure you want to delete <b><span class="del_acc">` + title2 + `</span></b> Menu?</p>
                        <div style="text-align:center; margin=10%;">
                        <form onsubmit="return false;">
                        
                        <div class="form-group">
                                    <input type="submit" class="btn btn-primary btn-sm" value="Delete" id="submit">
                                    <button type="button" class="btn btn-danger btn-sm cancel1">Cancel</button>                           
                        </div>
                        <div class="form-group">
        
                                <input type="hidden" name="id" class="form-control" id="pid" value="` + pageId + `">
        
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
                        url: "../api/delete_page.php",
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
                            $.fn.pages();
                        $('#proS').html('');
                        if (status == 403)
                            $.fn.logout();
                        console.log(returnData)
                    });

            });

        }
        /* ************end of popup delete************* */




});