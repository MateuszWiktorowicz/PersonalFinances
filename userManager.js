function isAlphanumeric(input) {
    var alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(input);
}

function passwordCharactersValidation(input) {
    var passwordRegex = /^[a-zA-Z0-9!-$-%]+$/;
    return passwordRegex.test(input);
}

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

$(document).ready(function () { 
    $("#registerForm").submit(function(event) {
        event.preventDefault();
        $(".failRegister").remove();
        
        var name = $("#registerInputName").val();
        var email = $("#registerInputEmail").val();
        var password1 = $("#registerInputPassword").val();
        var password2 = $("#confirmRegisterInputPassword").val();

        if (!isAlphanumeric(name)) {
            $("#registerLabel .modal-footer").append('<div class="failRegister">Name can contains letters and numbers only!</div>');
            return;
        }
        
        if (!passwordCharactersValidation(password1)) {
            $("#registerLabel .modal-footer").append('<div class="failRegister">Passwords can contains just letters, numbers and special characters: [!, $, %]</div>');
            return;
        }
        
        if (password1 !== password2) {
            $("#registerLabel .modal-footer").append('<div class="failRegister">Passwords are not the same!!</div>');
            return;
        }

        if (password1.length < 8 || password1.length > 20) {
            $("#registerLabel .modal-footer").append('<div class="failRegister">Passwords have to contains 8-20 characters!</div>');
            return;
        }


        $.ajax({
            type: "post",
            url: "register.php",
            data: {registerInputName: name, registerInputEmail: email, registerInputPassword: password1},
            dataType: 'json',
            success: function (response) {
                if (response.status === 'success') {
                    $("#registerLabel .modal-footer").append('<div class="successRegister" style="color: green;">Register successfuly! You can login now.</div>');
                    setTimeout(function() {
                        $(".successRegister").remove();;
                    }, 4000);
                    $("#registerForm")[0].reset();

                } else {

                    $("#registerLabel .modal-footer").append('<div class="failRegister" style="color: red;">Register failed. Email is in use by another account alredy..</div>');
                    setTimeout(function() {
                        $(".failRegister").remove();;
                    }, 2000);
                }
            },
            error: function (xhr, status, error) {
                console.error('Error in AJAX request:', status, error);
                alert('An error occurred. Please try again.');
            } 
        })
    
    })
})






