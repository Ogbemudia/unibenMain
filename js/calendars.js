$(document).ready(function() {
    /*************************************************** Read Calendars ****************************************************************************** */

    $.fn.calendars = function() {

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




            calendarTable = `<div class="container-fluid col-12 containertable">
            <div class="table-responsive" style="box-shadow: 10px 10px 20px #2a2e33; padding: 2%;">
                <div class="" style="text-align: center;">
                </div>
                        
                <table class="tablemanager">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Date Created</th>
                            <th>Calendar Date</th>
                            <th>Details</th>
                            <th class="disableFilterBy disableSort">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="body">
                    </tbody>
                </table>

                <footer>
                    <button type="button" class="btn btn-danger btn-sm" id="close" title="Close Calendar"><i class="fa fa-times" aria-hidden="true"></i></button>  
                    <button type="button" class="btn btn-success btn-sm" id="addcalendar" style="float:right" title="Add New Calendar"><i class="fa fa-plus" aria-hidden="true"></i></button>       
                                <i class="userid"></i>
                </footer>
              </div>
            </div>`;





            $('#allItems').html(calendarTable);
            $('#nameId').html('Calendar');
            $('#titleItem').html('Calendar');



            //close update
            $("#close").click(function() {
                $.fn.read_users();
                /* $('#allItems').html('');
                $('#nameId').html('');
                $('#titleItem').html(''); */
            });

            var calendarInfo;
            var Id;




            $.ajax({

                type: "GET",
                url: "../api/read_calendar.php",
                //data: formData,
                dataType: "json",
                encode: true,
                Cache: false,
                // setTimeout();

            })

            .done(function(messages) {

                $.each(messages, function(i, messages) {

                    Id = messages.id;


                    calendarInfo = ` <tr>
                                    <td style="color: #0492C2;" class = "uid1">` + Id + `</td>
                                                    <td>` + messages.created + `</td>
                                                    <td>` + messages.calendardate + `</td>
                                                    <td style="color: #0492C2;">` + messages.details + `</td>
                                                                                  
                                                    <td style="color: #FF0000;" class="mine">
                                                
                                                    
                                                    <button type="button" class=" btn-primary btn-sm che btntb1" id="che" data-value='` + messages.details + `' value='` + Id + `' title="Update Calendar"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                                    <button type="button" class=" btn-danger btn-sm delete1 btntb1" data-value='` + messages.details + `' value='` + Id + `' title="Delete Calendar"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                    </td>
                                </tr>`;
                    $('#body').append(calendarInfo)

                    $('.che').click(function() {
                        ID = $(this).val();
                        $.fn.updateCalendar(ID);
                    });

                    $('.delete1').click(function() {
                        ID = $(this).val();
                        title1 = $(this).data('value');
                        $.fn.delete_calendar(ID, title1);
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




            $("#addcalendar").click(function() {
                $.fn.addCalendar();
            })

        }
        /***************************************************End of Read Calendars ****************************************************************************** */




    $("#calendars").click(function() {
        $.fn.calendars();
        var w = window.innerWidth;
        if (w < 1200) {
            $('#sidebar').removeClass('active')
        }
    })





    /************************** ***********************Create Menu ****************************** ********************************** */
    $.fn.addCalendar = function() {
        //$("#menutype").click(function() {


        var form1 = `<div class="wrapper">
                            
                
                <h5 style="text-align:center;">The fields marked with <span style="color: red;">*</span> are required.</h5>
                
                <form onsubmit="return false;">
                        
                    
                    <div class="form-group">
                        <label>Calendar Detail <span style="color: red;">*</span></label>
                        <textarea class="form-control" id="detail" rows="3" name="detail"></textarea>    
                        <span class="help-block" id="h_detail"></span>
                    </div>
                    <div class="form-group">
                        <label>Calendar Date </label>
                        <input type="date" name="calendardate" class="form-control" placeholder="Calendar Date " id="calendardate">
                        <span class="help-block" id="h_calendardate"></span>
                    </div>
                 
                    
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Submit" id="submit">
                        <button type="button" class="btn btn-danger cancel1">Cancel</button>                           
                    </div>
    
                </form>
                          
            </div>`;




        $('#allItems').html(form1);
        $('#nameId').html('Add New Calendar');


        //$(".pagination").html('');

        //close update
        $(".cancel1").click(function() {
            $.fn.calendars();
        })

        //validating form
        $("form").submit(function(e) {


            /* validate inputs */
            if ($("#detail").val() == '') {
                $("#detail").css('border', '1px solid red');
                $("#h_detail").html('Enter Calendar Detail');
                return false;
            } else {
                $("#detail").css('border', '2px solid green');
                $("#h_detail").html('');
                var postDetail = $("#detail").val();
                //return true;
            };

            if ($("#calendardate").val() == '') {
                $("#calendardate").css('border', '1px solid red');
                $("#h_calendardate").html('Enter Calendar Date');
                return false;
            } else {
                $("#calendardate").css('border', '2px solid green');
                $("#h_calendardate").html('');
                var postCalendarDate = $("#calendardate").val();
                //return true;
            };


            var formData = {
                details: postDetail,
                calendardate: postCalendarDate
            };

            e.preventDefault();
            $.ajax({
                    type: "POST",
                    url: "../api/create_calendar.php",
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
                        $.fn.calendars();
                    if (status == 403)
                        $.fn.logout();
                    console.log(returnData)
                });



        });

    }


    /************************** ***********************update Calendar ****************************** ********************************** */
    $.fn.updateCalendar = function() {


            var cid;
            var detail1;
            var calendarDate1

            var sid = ID; //$(this).data();
            $.get("../api/read_singlecalendar.php?id=" + sid, function(messages) {
                cid = messages.id;
                detail1 = messages.details;
                calendardate1 = messages.calendardate;

                var form1 = `<div class="wrapper">
                            
                
                <h5 style="text-align:center;">The fields marked with <span style="color: red;">*</span> are required.</h5>
                
                <form onsubmit="return false;">
                        
                   
                    <div class="form-group">
                        <label>Calendar Detail <span style="color: red;">*</span></label>
                        <textarea class="form-control" id="detail" rows="3" name="detail">` + detail1 + `</textarea>    
                        <span class="help-block" id="h_detail"></span>
                    </div>
                    <div class="form-group">
                        <label>Calendar Date </label>
                        <input type="date" name="calendartdate" class="form-control" value="` + calendardate1 + `" id="calendardate">
                        <span class="help-block" id="h_calendartdate"></span>
                    </div>
                 
                    <div class="form-group">
                        <input type="hidden" name="id" class="form-control" id="calid" value="` + cid + `">
                    </div>
                                    
                                    
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Submit" id="submit">
                        <button type="button" class="btn btn-danger cancel1">Cancel</button>                           
                    </div>
    
                </form>
                          
            </div>`;




                $('#allItems').html(form1);
                $('#nameId').html('Update Calendar');




                //close update
                $(".cancel1").click(function() {
                    $.fn.calendars();
                })

                //validating form
                $("form").submit(function(e) {

                    var postId = $("#calid").val();
                    /* validate inputs */

                    if ($('#detail').val() == '') {
                        $("#detail").css('border', '2px solid red');
                        $("#h_detail").html('Enter Detail');
                        return false;
                    } else {
                        $("#detail").css('border', '2px solid green');
                        $("#h_detail").html('');
                        var postDetail = $('#detail').val();
                    };

                    if ($("#calendardate").val() == '') {
                        $("#calendardate").css('border', '1px solid red');
                        $("#h_calendardate").html('Enter Calendar Date');
                        return false;
                    } else {
                        $("#calendardate").css('border', '2px solid green');
                        $("#h_calendardate").html('');
                        var postCalendarDate = $("#calendardate").val();
                        //return true;
                    };


                    var formData = {
                        id: postId,
                        details: postDetail,
                        calendardate: postCalendarDate

                    };

                    e.preventDefault();
                    $.ajax({
                            type: "POST",
                            url: "../api/update_calendar.php",
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
                                $.fn.calendars();
                            if (status == 403)
                                $.fn.logout();
                            console.log(returnData)
                        });



                });


            })



        }
        /*************************************** End Of Update *******************************************/

    /* ************popup delete************* */
    $.fn.delete_calendar = function() {

            var calendarId = ID;
            var title2 = title1;
            var modalPop = `<div class="popup-overlay active" id="delete21" style="height:15%; width:45%; border:red solid 1px;">
                    <div class="popup-link active" style="height:70%;">
                        <p style="height:60%;padding:2%;">Are you sure you want to delete <b><span class="del_acc">` + title2 + `</span></b> Calendar?</p>
                        <div style="text-align:center; margin=10%;">
                        <form onsubmit="return false;">
                        
                        <div class="form-group">
                                    <input type="submit" class="btn btn-primary btn-sm" value="Delete" id="submit">
                                    <button type="button" class="btn btn-danger btn-sm cancel1">Cancel</button>                           
                        </div>
                        <div class="form-group">
        
                                <input type="hidden" name="id" class="form-control" id="calid" value="` + calendarId + `">
        
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
                var postId = $("#calid").val();
                var formData = {

                    id: postId
                }
                e.preventDefault();
                $.ajax({
                        type: "POST",
                        url: "../api/delete_calendar.php",
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

                            $.fn.calendars();
                        $('#proS').html('');
                        if (status == 403)
                            $.fn.logout();
                        console.log(returnData)
                    });

            });

        }
        /* ************end of popup delete************* */




});