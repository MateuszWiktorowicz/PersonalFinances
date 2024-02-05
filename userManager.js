$(document).ready(function () {
    $('#loginForm').submit(function (event) {
        event.preventDefault();

        var login = $("#loginInputEmail").val();
        var password = $("#loginInputPassword").val();

        $.ajax({
            type: 'POST',
            url: 'login.php',
            data: {login: login, password: password},
            dataType: 'json',
            success: function (response) {
                if (response.status === 'success') {
                    window.location.href = response.redirect;
                } else {
                    $("#loginLabel .modal-footer").append('<div class="failLogin" style="color: red;">Login failed. Please check your credentials.</div>');
                    setTimeout(function() {
                        $(".failLogin").remove();;
                    }, 2000);
                }
            },
            error: function (xhr, status, error) {
                console.error('Error in AJAX request:', status, error);
                alert('An error occurred. Please try again.');
            }
        });
    });
});


