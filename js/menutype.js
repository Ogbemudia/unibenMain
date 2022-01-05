$(document).ready(function() {
    /*************************************************** Read menu ****************************************************************************** */

    $.fn.menutype = function() {

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




            menuTypeTable = `<div class="container-fluid col-12 containertable">
            <div class="table-responsive" style="box-shadow: 10px 10px 20px #2a2e33; padding: 2%;">
                <div class="" style="text-align: center;">
                </div>
                        
                <table class="tablemanager">
                    <thead>
                        <tr>
                            <th>Id</th>
                            
                            <th>Menu Type</th>
                            
                            <th class="disableFilterBy disableSort">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="body">
                    </tbody>
                </table>

                <footer>
                    <button type="button" class="btn btn-danger btn-sm" id="close" title="Close Menu Type"><i class="fa fa-times" aria-hidden="true"></i></button>  
                    <button type="button" class="btn btn-success btn-sm" id="addmenu" style="float:right" title="Add New Menu Type"><i class="fa fa-plus" aria-hidden="true"></i></button>       
                                <i class="userid"></i>
                </footer>
              </div>
            </div>`;





            $('#allItems').html(menuTypeTable);
            $('#nameId').html('Menu Type');
            $('#titleItem').html('Menu Type');



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
                url: "../api/read_menutype.php",
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
                                                    
                                                    <td style="color: #0492C2;">` + messages.menutype + `</td>
                                                                                             
                                                    <td style="color: #FF0000;" class="mine">
                                                
                                                    
                                                    <button type="button" class=" btn-primary btn-sm che btntb1" id="che" data-value='` + messages.menutype + `' value='` + Id + `' title="Update Menu Type"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                                    <button type="button" class=" btn-danger btn-sm delete1 btntb1" data-value='` + messages.menutype + `' value='` + Id + `' title="Delete Menu Type"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                    </td>
                                </tr>`;
                    $('#body').append(menuinfo)

                    $('.che').click(function() {
                        ID = $(this).val();
                        $.fn.updateMenuType(ID);
                    });

                    $('.delete1').click(function() {
                        ID = $(this).val();
                        title1 = $(this).data('value');
                        $.fn.deleteMenuType(ID, title1);
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
                $.fn.addMenuType();
            })

        }
        /***************************************************End of Read menu ****************************************************************************** */




    $("#menutype").click(function() {
        $.fn.menutype();
        var w = window.innerWidth;
        if (w < 1200) {
            $('#sidebar').removeClass('active')
        }
    })





    /************************** ***********************Create Menu Type ****************************** ********************************** */
    $.fn.addMenuType = function() {
        //$("#menutype").click(function() {

        var form1 = `<div class="wrapper">
                            
                
                <h5 style="text-align:center;">The fields marked with <span style="color: red;">*</span> are required.</h5>
                
                <form onsubmit="return false;">
                        
                    <div class="form-group">
                        <label>Menu Type </label>
                        <input type="text" name="title" class="form-control" placeholder="Menu Type " id="tittle">
                        <span class="help-block" id="h_tittle"></span>
                    </div>
                                  
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Submit" id="submit">
                        <button type="button" class="btn btn-danger cancel1">Cancel</button>                           
                    </div>
    
                </form>
                          
            </div>`;




        $('#allItems').html(form1);
        $('#nameId').html('Add New Menu Type');


        //$(".pagination").html('');

        //close update
        $(".cancel1").click(function() {
            $.fn.menutype();
        })

        //validating form
        $("form").submit(function(e) {


            /* validate inputs */
            if ($("#tittle").val() == '') {
                $("#tittle").css('border', '1px solid red');
                $("#h_tittle").html('Enter menu type');
                return false;
            } else {
                $("#tittle").css('border', '2px solid green');
                $("#h_tittle").html('');
                var postMenuType = $("#tittle").val();
                //return true;
            };




            var formData = {
                menutype: postMenuType


            };

            e.preventDefault();
            $.ajax({
                    type: "POST",
                    url: "../api/create_menutype.php",
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
                        $.fn.menutype();
                    if (status == 403)
                        $.fn.logout();
                    console.log(returnData)
                });



        });

    }


    /************************** ***********************update menu ****************************** ********************************** */
    $.fn.updateMenuType = function() {
            //$('#allItems').html('form1');
            //$("#menutype").click(function() {

            var id;
            var title1;



            var sid = ID; //$(this).data();
            $.get("../api/read_singlemenutype.php?id=" + sid, function(messages) {
                id = messages.id;
                title1 = messages.menutype;

                var form1 = `<div class="wrapper">
                                    
                        
                        <h5 style="text-align:center;">The fields marked with <span style="color: red;">*</span> are required.</h5>
    
                    <form onsubmit="return false;">
                            <div class="form-group">
                                <label>Tittle </label>
                                <input type="text" name="title" class="form-control" title placeholder="menu Title " id="tittle" value="` + title1 + `">
                                <span class="help-block" id="h_tittle"></span>
                            </div>
            
                                    
                            
                            
                            <div class="form-group">
    
                            <input type="hidden" name="id" class="form-control" id="mtid" value="` + id + `">
    
                            </div>
                                            
                            <div class="form-group">
                                <input type="submit" class="btn btn-primary" value="Submit" id="submit">
                                <button type="button" class="btn btn-danger cancel1">Cancel</button>                           
                            </div>
            
                        </form>
                                  
                    </div>`;




                $('#allItems').html(form1);
                $('#nameId').html('Update menu type');


                //$(".pagination").html('');

                //close update
                $(".cancel1").click(function() {
                    $.fn.menutype();
                })


                //validating form
                $("form").submit(function(e) {

                    var postId = $("#mtid").val();
                    /* validate inputs */
                    if ($("#tittle").val() == '') {
                        $("#tittle").css('border', '1px solid red');
                        $("#h_tittle").html('Enter menu type');
                        return false;
                    } else {
                        $("#tittle").css('border', '2px solid green');
                        $("#h_tittle").html('');
                        var postMenuType = $("#tittle").val();
                        //return true;
                    };


                    var formData = {
                        id: postId,
                        menutype: postMenuType


                    };

                    e.preventDefault();
                    $.ajax({
                            type: "POST",
                            url: "../api/update_menutype.php",
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
                                $.fn.menutype();
                            if (status == 403)
                                $.fn.logout();
                            console.log(returnData)
                        });



                });


            })



        }
        /*************************************** End Of Update *******************************************/

    /* ************popup delete************* */
    $.fn.deleteMenuType = function() {

            var menuId = ID;
            var title2 = title1;
            var modalPop = `<div class="popup-overlay active" id="delete21" style="height:15%; width:45%; border:red solid 1px;">
                    <div class="popup-link active" style="height:70%;">
                        <p style="height:60%;padding:2%;">Are you sure you want to delete <b><span class="del_acc">` + title2 + `</span></b> Menu Type?</p>
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
                        url: "../api/delete_menutype.php",
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

                            $.fn.menutype();
                        $('#proS').html('');
                        if (status == 403)
                            $.fn.logout();
                        console.log(returnData)
                    });

            });

        }
        /* ************end of popup delete************* */




});