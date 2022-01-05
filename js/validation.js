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
            //sessionStorage.removeItem("users");
            alert('Your session has expired')
            location.href = "../index.html"
        }
    })