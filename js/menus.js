$(document).ready(function() {
    /*************************************************** Read menu ****************************************************************************** */

    $.fn.menu = function() {

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




            menuTable = `<div class="container-fluid col-12 containertable">
            <div class="table-responsive" style="box-shadow: 10px 10px 20px #2a2e33; padding: 2%;">
                <div class="" style="text-align: center;">
                </div>
                        
                <table class="tablemanager">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Date Created</th>
                            <th>Title</th>
                            <th>Menu Type</th>
                            <th class="disableFilterBy disableSort">Link</th>
                            <th>Status</th>
                            <th class="disableFilterBy disableSort">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="body">
                    </tbody>
                </table>

                <footer>
                    <button type="button" class="btn btn-danger btn-sm" id="close" title="Close Menu"><i class="fa fa-times" aria-hidden="true"></i></button>  
                    <button type="button" class="btn btn-success btn-sm" id="addmenu" style="float:right" title="Add New Menu"><i class="fa fa-plus" aria-hidden="true"></i></button>       
                                <i class="userid"></i>
                </footer>
              </div>
            </div>`;





            $('#allItems').html(menuTable);
            $('#nameId').html('Menu');
            $('#titleItem').html('Menu');



            //close update
            $("#close").click(function() {
                $.fn.read_users();
                /* $('#allItems').html('');
                $('#nameId').html('');
                $('#titleItem').html(''); */
            });

            var menuinfo;
            var Id;




            $.ajax({

                type: "GET",
                url: "../api/read_menu.php",
                //data: formData,
                dataType: "json",
                encode: true,
                Cache: false,
                // setTimeout();

            })

            .done(function(messages) {

                $.each(messages, function(i, messages) {

                    Id = messages.id;


                    menuinfo = ` <tr>
                                    <td style="color: #0492C2;" class = "uid1">` + Id + `</td>
                                                    <td>` + messages.created + `</td>
                                                    <td style="color: #FF8C00;">` + messages.title + `</td>
                                                    <td style="color: #0492C2;">` + messages.menutype + `</td>
                                                    <td><a href="` + messages.link + `" target="blank">` + messages.link + `</a></td>
                                                    <td> ` + messages.status + `</td>                                                
                                                    <td style="color: #FF0000;" class="mine">
                                                
                                                    
                                                    <button type="button" class=" btn-primary btn-sm che btntb1" id="che" data-value='` + messages.title + `' value='` + Id + `' title="Update Menu"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                                    <button type="button" class=" btn-danger btn-sm delete1 btntb1" data-value='` + messages.title + `' value='` + Id + `' title="Delete Menu"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                    </td>
                                </tr>`;
                    $('#body').append(menuinfo)

                    $('.che').click(function() {
                        ID = $(this).val();
                        $.fn.updateMenu(ID);
                    });

                    $('.delete1').click(function() {
                        ID = $(this).val();
                        title1 = $(this).data('value');
                        $.fn.deleted(ID, title1);
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




            $("#addmenu").click(function() {
                $.fn.addmenu();
            })

        }
        /***************************************************End of Read menu ****************************************************************************** */




    $("#menu1").click(function() {
        $.fn.menu();
        var w = window.innerWidth;
        if (w < 1200) {
            $('#sidebar').removeClass('active')
        }
    })





    /************************** ***********************Create Menu ****************************** ********************************** */
    $.fn.addmenu = function() {
        //$("#menutype").click(function() {



        $.get("../api/read_menutype.php", function(messages) {

            var message = `<label for="memutype">Page Id <span style="color: red;">*</span></label><select name="memutype" id="memutype" class="form-select" class="memutype"><option value="">Menu Type</option>`;
            $.each(messages, function(i, messages) {
                var menutype1 = messages.menutype;
                var id = messages.id;
                message += `<option value="` + menutype1 + `">` + menutype1 + `</option>`;

            });

            message += `<span class="help-block" id="h_memutype"></span></select>`;


            $('.memutype').html(message);
        });


        var form1 = `<div class="wrapper">
                            
                
                <h5 style="text-align:center;">The fields marked with <span style="color: red;">*</span> are required.</h5>
                
                <form onsubmit="return false;">
                        
                    <div class="form-group">
                        <label>Tittle </label>
                        <input type="text" name="title" class="form-control" placeholder="Menu Title " id="tittle">
                        <span class="help-block" id="h_tittle"></span>
                    </div>
    
                    <div class="form-group memutype">
                        
                    </div>
    
                        
                                    
                    <div class="form-group">
                        <label>Link <span style="color: red;">*</span></label>
                        <input type="text" class="form-control" placeholder="Menu Link" id="link" name="link">    
                        <span class="help-block" id="h_link"></span>
                    </div>

                    <div class="form-group">
                        <label>Status </label>
                        <input type="text" name="status" class="form-control" placeholder="Enter Status " id="status">
                        <span class="help-block" id="h_status"></span>
                    </div>
                                    
                                    
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Submit" id="submit">
                        <button type="button" class="btn btn-danger cancel1">Cancel</button>                           
                    </div>
    
                </form>
                          
            </div>`;




        $('#allItems').html(form1);
        $('#nameId').html('Add New Menu');


        //$(".pagination").html('');

        //close update
        $(".cancel1").click(function() {
            $.fn.menu();
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

            if ($('#memutype').val() == '') {
                $("#memutype").css('border', '2px solid red');
                $("#h_memutype").html('Select The menu Template');
                return false;
            } else {
                $("#memutype").css('border', '2px solid green');
                $("#h_memutype").html('');
                var postMenutype = $('#memutype').val();
            };


            if ($('#status').val() == '') {
                $("#status").css('border', '2px solid red');
                $("#h_status").html('Enter Menu Status');
                return false;
            } else {
                $("#status").css('border', '2px solid green');
                $("#h_status").html('');
                var postStatus = $('#status').val();
            };


            if ($("#link").val() == '') {
                $("#link").css('border', '1px solid red');
                $("#h_link").html('Enter Menu Link');
                return false;
            } else {
                $("#link").css('border', '2px solid green');
                $("#h_link").html('');
                var postLink = $("#link").val();
                //return true;
            };


            var formData = {
                title: postTitle,
                menutype: postMenutype,
                status: postStatus,
                link: postLink

            };

            e.preventDefault();
            $.ajax({
                    type: "POST",
                    url: "../api/create_menu.php",
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
                        $.fn.menu();
                    if (status == 403)
                        $.fn.logout();
                    console.log(returnData)
                });



        });

    }


    /************************** ***********************update menu ****************************** ********************************** */
    $.fn.updateMenu = function() {
            //$('#allItems').html('form1');
            //$("#menutype").click(function() {

            var id;
            var title1;
            var menut;
            var link;
            var status;


            var sid = ID; //$(this).data();
            $.get("../api/read_singlemenu.php?id=" + sid, function(messages) {
                id = messages.id;
                title1 = messages.title;
                menut = messages.menutype;
                link = messages.link;
                status = messages.status;

                $.get("../api/read_menutype.php", function(messages) {

                    var message = `<label for="menutype2">Menu Type <span style="color: red;">*</span></label><select name="menutype2" id="menutype2" class="form-select menutype2" ><option value="` + menut + `">` + menut + `</option>`;
                    $.each(messages, function(i, messages) {
                        var menutype = messages.menutype;
                        // var id = messages.id;
                        message += `<option value="` + menutype + `">` + menutype + `</option>`;

                    });

                    message += `<span class="help-block" id="h_menutype"></span></select>`;


                    $('.menutype2').html(message);
                });




                var form1 = `<div class="wrapper">
                                    
                        
                        <h5 style="text-align:center;">The fields marked with <span style="color: red;">*</span> are required.</h5>
    
                    <form onsubmit="return false;">
                            <div class="form-group">
                                <label>Tittle </label>
                                <input type="text" name="title" class="form-control" title placeholder="menu Title " id="tittle" value="` + title1 + `">
                                <span class="help-block" id="h_tittle"></span>
                            </div>
            
                                    
                            <div class="form-group menutype2">
                                
                            </div>
            
                            <div class="form-group">
                                <label>Link </label>
                                <input type="text" name="link" class="form-control" placeholder="Link" id="link" value="` + link + `">
                                <span class="help-block" id="h_link"></span>
                            </div>
                            <div class="form-group">
                                <label>Status </label>
                                <input type="text" name="status" class="form-control" placeholder="Status" id="status" value="` + status + `">
                                <span class="help-block" id="h_status"></span>
                            </div>                
                           
                            
                            <div class="form-group">
    
                            <input type="hidden" name="id" class="form-control" id="mtid" value="` + sid + `">
    
                            </div>
                                            
                            <div class="form-group">
                                <input type="submit" class="btn btn-primary" value="Submit" id="submit">
                                <button type="button" class="btn btn-danger cancel1">Cancel</button>                           
                            </div>
            
                        </form>
                                  
                    </div>`;




                $('#allItems').html(form1);
                $('#nameId').html('Update menu');


                //$(".pagination").html('');

                //close update
                $(".cancel1").click(function() {
                    $.fn.menu();
                })


                //validating form
                $("form").submit(function(e) {

                    var postId = $("#mtid").val();
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

                    if ($('#menutype2').val() == '') {
                        $("#menutype2").css('border', '2px solid red');
                        $("#h_menutype").html('Select Select Menu Type');
                        return false;
                    } else {
                        $("#menutype2").css('border', '2px solid green');
                        $("#h_menutype").html('');
                        var postMenutype = $('#menutype2').val();
                    };


                    if ($('#link').val() == '') {
                        $("#link").css('border', '2px solid red');
                        $("#h_link").html('Enter Menu Link');
                        return false;
                    } else {
                        $("#link").css('border', '2px solid green');
                        $("#h_link").html('');
                        var postLink = $('#link').val();
                    };


                    if ($("#status").val() == '') {
                        $("#status").css('border', '1px solid red');
                        $("#h_status").html('Enter menu status');
                        return false;
                    } else {
                        $("#status").css('border', '2px solid green');
                        $("#h_status").html('');
                        var postStatus = $("#status").val();
                        //return true;
                    };

                    var formData = {
                        id: postId,
                        title: postTitle,
                        menutype: postMenutype,
                        status: postStatus,
                        link: postLink

                    };

                    e.preventDefault();
                    $.ajax({
                            type: "POST",
                            url: "../api/update_menu.php",
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
                                $.fn.menu();
                            if (status == 403)
                                $.fn.logout();
                            console.log(returnData)
                        });



                });


            })



        }
        /*************************************** End Of Update *******************************************/

    /* ************popup delete************* */
    $.fn.deleted = function() {

            var menuId = ID;
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
        
                                <input type="hidden" name="id" class="form-control" id="mid" value="` + menuId + `">
        
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
                var postId = $("#mid").val();
                var formData = {

                    id: postId
                }
                e.preventDefault();
                $.ajax({
                        type: "POST",
                        url: "../api/delete_menu.php",
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

                            $.fn.menu();
                        $('#proS').html('');
                        if (status == 403)
                            $.fn.logout();
                        console.log(returnData)
                    });

            });

        }
        /* ************end of popup delete************* */




});