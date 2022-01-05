$(document).ready(function() {
    /*************************************************** Read Events ****************************************************************************** */

    $.fn.events = function() {

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




            eventTable = `<div class="container-fluid col-12 containertable">
            <div class="table-responsive" style="box-shadow: 10px 10px 20px #2a2e33; padding: 2%;">
                <div class="" style="text-align: center;">
                </div>
                        
                <table class="tablemanager">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Date Created</th>
                            <th>Event Date</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th class="disableFilterBy disableSort">Link</th>
                            <th>Status</th>
                            <th class="disableFilterBy disableSort">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="body">
                    </tbody>
                </table>

                <footer>
                    <button type="button" class="btn btn-danger btn-sm" id="close" title="Close Event"><i class="fa fa-times" aria-hidden="true"></i></button>  
                    <button type="button" class="btn btn-success btn-sm" id="addevent" style="float:right" title="Add New Event"><i class="fa fa-plus" aria-hidden="true"></i></button>       
                                <i class="userid"></i>
                </footer>
              </div>
            </div>`;





            $('#allItems').html(eventTable);
            $('#nameId').html('Events');
            $('#titleItem').html('Events');



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
                url: "../api/read_events.php",
                //data: formData,
                dataType: "json",
                encode: true,
                Cache: false,
                // setTimeout();

            })

            .done(function(messages) {

                $.each(messages, function(i, messages) {

                    Id = messages.id;


                    eventInfo = ` <tr>
                                    <td style="color: #0492C2;" class = "uid1">` + Id + `</td>
                                                    <td>` + messages.created + `</td>
                                                    <td>` + messages.eventdate + `</td>
                                                    <td style="color: #FF8C00;">` + messages.title + `</td>
                                                    <td style="color: #0492C2;">` + messages.description + `</td>
                                                    <td><a href="` + messages.link + `" target="blank">` + messages.link + `</a></td>
                                                    <td> ` + messages.status + `</td>                                                
                                                    <td style="color: #FF0000;" class="mine">
                                                
                                                    
                                                    <button type="button" class=" btn-primary btn-sm che btntb1" id="che" data-value='` + messages.title + `' value='` + Id + `' title="Update Event"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                                    <button type="button" class=" btn-danger btn-sm delete1 btntb1" data-value='` + messages.title + `' value='` + Id + `' title="Delete Event"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                    </td>
                                </tr>`;
                    $('#body').append(eventInfo)

                    $('.che').click(function() {
                        ID = $(this).val();
                        $.fn.updateEvent(ID);
                    });

                    $('.delete1').click(function() {
                        ID = $(this).val();
                        title1 = $(this).data('value');
                        $.fn.delete_event(ID, title1);
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




            $("#addevent").click(function() {
                $.fn.addevent();
            })

        }
        /***************************************************End of Read Events ****************************************************************************** */




    $("#events").click(function() {
        $.fn.events();
        var w = window.innerWidth;
        if (w < 1200) {
            $('#sidebar').removeClass('active')
        }
    })





    /************************** ***********************Create Menu ****************************** ********************************** */
    $.fn.addevent = function() {
        //$("#menutype").click(function() {


        var form1 = `<div class="wrapper">
                            
                
                <h5 style="text-align:center;">The fields marked with <span style="color: red;">*</span> are required.</h5>
                
                <form onsubmit="return false;">
                        
                    <div class="form-group">
                        <label>Tittle </label>
                        <input type="text" name="title" class="form-control" placeholder="Event Title " id="tittle">
                        <span class="help-block" id="h_tittle"></span>
                    </div>
                    <div class="form-group">
                        <label>Description <span style="color: red;">*</span></label>
                        <textarea class="form-control" id="description" rows="3" name="description"></textarea>    
                        <span class="help-block" id="h_description"></span>
                    </div>
                    <div class="form-group">
                        <label>Event Date </label>
                        <input type="date" name="eventdate" class="form-control" placeholder="Event Date " id="eventdate">
                        <span class="help-block" id="h_eventdate"></span>
                    </div>
                 
                    <div class="form-group">
                        <label>Link <span style="color: red;">*</span></label>
                        <input type="text" class="form-control" placeholder="Event Link" id="link" name="link">    
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
        $('#nameId').html('Add New Event');


        //$(".pagination").html('');

        //close update
        $(".cancel1").click(function() {
            $.fn.events();
        })

        //validating form
        $("form").submit(function(e) {


            /* validate inputs */
            if ($("#tittle").val() == '') {
                $("#tittle").css('border', '1px solid red');
                $("#h_tittle").html('Enter event title');
                return false;
            } else {
                $("#tittle").css('border', '2px solid green');
                $("#h_tittle").html('');
                var postTitle = $("#tittle").val();
                //return true;
            };

            if ($('#description').val() == '') {
                $("#description").css('border', '2px solid red');
                $("#h_description").html('Enter Description');
                return false;
            } else {
                $("#description").css('border', '2px solid green');
                $("#h_description").html('');
                var postDescriptione = $('#description').val();
            };

            if ($("#eventdate").val() == '') {
                $("#eventdate").css('border', '1px solid red');
                $("#h_eventdate").html('Enter Event Date');
                return false;
            } else {
                $("#eventdate").css('border', '2px solid green');
                $("#h_eventdate").html('');
                var postEventDate = $("#eventdate").val();
                //return true;
            };

            if ($("#link").val() == '') {
                $("#link").css('border', '1px solid red');
                $("#h_link").html('Enter Event Link');
                return false;
            } else {
                $("#link").css('border', '2px solid green');
                $("#h_link").html('');
                var postLink = $("#link").val();
                //return true;
            };


            if ($('#status').val() == '') {
                $("#status").css('border', '2px solid red');
                $("#h_status").html('Enter Event Status');
                return false;
            } else {
                $("#status").css('border', '2px solid green');
                $("#h_status").html('');
                var postStatus = $('#status').val();
            };





            var formData = {
                title: postTitle,
                description: postDescriptione,
                eventdate: postEventDate,
                status: postStatus,
                link: postLink

            };

            e.preventDefault();
            $.ajax({
                    type: "POST",
                    url: "../api/create_events.php",
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
                        $.fn.events();
                    if (status == 403)
                        $.fn.logout();
                    console.log(returnData)
                });



        });

    }


    /************************** ***********************update menu ****************************** ********************************** */
    $.fn.updateEvent = function() {
            //$('#allItems').html('form1');
            //$("#menutype").click(function() {

            var eid;
            var title1;
            var description1;
            var eventdate1
            var link1;
            var status1;


            var sid = ID; //$(this).data();
            $.get("../api/read_singleevents.php?id=" + sid, function(messages) {
                eid = messages.id;
                title1 = messages.title;
                description1 = messages.description;
                eventdate1 = messages.eventdate;
                link1 = messages.link;
                status1 = messages.status;




                var form1 = `<div class="wrapper">
                            
                
                <h5 style="text-align:center;">The fields marked with <span style="color: red;">*</span> are required.</h5>
                
                <form onsubmit="return false;">
                        
                    <div class="form-group">
                        <label>Tittle </label>
                        <input type="text" name="title" class="form-control" value="` + title1 + `" id="tittle">
                        <span class="help-block" id="h_tittle"></span>
                    </div>
                    <div class="form-group">
                        <label>Description <span style="color: red;">*</span></label>
                        <textarea class="form-control" id="description" rows="3" name="description">` + description1 + `</textarea>    
                        <span class="help-block" id="h_description"></span>
                    </div>
                    <div class="form-group">
                        <label>Event Date </label>
                        <input type="date" name="eventdate" class="form-control" value="` + eventdate1 + `" id="eventdate">
                        <span class="help-block" id="h_eventdate"></span>
                    </div>
                 
                    <div class="form-group">
                        <label>Link <span style="color: red;">*</span></label>
                        <input type="text" class="form-control" value="` + link1 + `" id="link" name="link">    
                        <span class="help-block" id="h_link"></span>
                    </div>

                    <div class="form-group">
                        <label>Status </label>
                        <input type="text" name="status" class="form-control" value="` + status1 + `" id="status">
                        <span class="help-block" id="h_status"></span>
                    </div>

                    <div class="form-group">
                        <input type="hidden" name="id" class="form-control" id="evid" value="` + eid + `">
                    </div>
                                    
                                    
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Submit" id="submit">
                        <button type="button" class="btn btn-danger cancel1">Cancel</button>                           
                    </div>
    
                </form>
                          
            </div>`;




                $('#allItems').html(form1);
                $('#nameId').html('Add Update Event');




                //close update
                $(".cancel1").click(function() {
                    $.fn.events();
                })

                //validating form
                $("form").submit(function(e) {

                    var postId = $("#evid").val();
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

                    if ($('#description').val() == '') {
                        $("#description").css('border', '2px solid red');
                        $("#h_description").html('Enter Description');
                        return false;
                    } else {
                        $("#description").css('border', '2px solid green');
                        $("#h_description").html('');
                        var postDescriptione = $('#description').val();
                    };

                    if ($("#eventdate").val() == '') {
                        $("#eventdate").css('border', '1px solid red');
                        $("#h_eventdate").html('Enter Event Date');
                        return false;
                    } else {
                        $("#eventdate").css('border', '2px solid green');
                        $("#h_eventdate").html('');
                        var postEventDate = $("#eventdate").val();
                        //return true;
                    };

                    if ($("#link").val() == '') {
                        $("#link").css('border', '1px solid red');
                        $("#h_link").html('Enter Event Link');
                        return false;
                    } else {
                        $("#link").css('border', '2px solid green');
                        $("#h_link").html('');
                        var postLink = $("#link").val();
                        //return true;
                    };


                    if ($('#status').val() == '') {
                        $("#status").css('border', '2px solid red');
                        $("#h_status").html('Enter Event Status');
                        return false;
                    } else {
                        $("#status").css('border', '2px solid green');
                        $("#h_status").html('');
                        var postStatus = $('#status').val();
                    };





                    var formData = {
                        id: postId,
                        title: postTitle,
                        description: postDescriptione,
                        eventdate: postEventDate,
                        status: postStatus,
                        link: postLink

                    };

                    e.preventDefault();
                    $.ajax({
                            type: "POST",
                            url: "../api/update_events.php",
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
                                $.fn.events();
                            if (status == 403)
                                $.fn.logout();
                            console.log(returnData)
                        });



                });


            })



        }
        /*************************************** End Of Update *******************************************/

    /* ************popup delete************* */
    $.fn.delete_event = function() {

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
        
                                <input type="hidden" name="id" class="form-control" id="evid" value="` + calendarId + `">
        
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
                var postId = $("#evid").val();
                var formData = {

                    id: postId
                }
                e.preventDefault();
                $.ajax({
                        type: "POST",
                        url: "../api/delete_events.php",
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

                            $.fn.events();
                        $('#proS').html('');
                        if (status == 403)
                            $.fn.logout();
                        console.log(returnData)
                    });

            });

        }
        /* ************end of popup delete************* */




});