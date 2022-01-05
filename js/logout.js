const logout = document.querySelector('.logout');
logout.addEventListener('click', () => {


    $.fn.logout();


    // })
});

$.fn.logout = function() {
    //sessionStorage.removeItem("users");
    fetch('../validation/logout.php', {
            method: "POST"
        })
        .then(res => res.text())
        .then(data => {
            // alert(data)
            location.href = "../index.html"
        })
}