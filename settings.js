function changeUserData() {
    saveNewUserData();
}

function showRegistrationSuccessComunicate() {
    $("#newUserDataForm .modal-footer").after("<div class='text-center text-success mb-3' id='dataChange'> Data change correct! </div>")
        
    setTimeout(function() {
        $("#dataChange").fadeOut('slow', function() {
            $(this).remove();
        });
    }, 1500);
}

function checkIsUserExist(email) {
    $(".emailExistText").remove();

    for (var i = 0; i < users.length; i++) {
        if (email === users[i].email) {
            $("#newEmail").after("<div class='text-danger emailExistText'>Email is already in use.</div>");
            return true;
        } else {
            return false;
        }
    }
}

function checkArePasswordTheSame(pass1, pass2) {
    $(".passwordConfirmText").remove();

    if (pass1 === pass2) {
        return true
    } else {
        $("#confirmNewPassword").after("<div class='text-danger passwordConfirmText'>Password are not the same.</div>");
        return false;
    }
}

function saveNewUserData() {

    for (var i = 0; i < users.length; i++) {
        if (users[i].userId === JSON.parse(localStorage.getItem("idLoggedInUser"))) {
            var name = $("#newName").val();
            var email = $("#newEmail").val();
            var password = $("#newPassword").val();
            var confirmPassword = $("#confirmNewPassword").val();

            if (!checkIsUserExist(email) && checkArePasswordTheSame(password, confirmPassword)) {
                
                users[i].name = name;
                users[i].email = email;
                users[i].password = password;
        
                localStorage.setItem("users", JSON.stringify(users));
        
                showRegistrationSuccessComunicate();
            }
            break;
        }
    }
}


$("#newDataForm").submit(function(event) {
    event.preventDefault();
    changeUserData();

    $(this)[0].reset();
});