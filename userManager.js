function User(userId, name, email, password) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.password = password;
}

var users = [];

function register() {
    insertNewUser();
}

function insertNewUser() {
    var userId = users.length === 0 ? 1 : users[users.length - 1].userId + 1;
    var name = $("#registerInputName").val();
    var email = $("#registerInputEmail").val();
    var password = $("#registerInputPassword").val();
    var confirmPassword = $("#confirmRegisterInputPassword").val();

    if (!checkIsUserExist(email) && checkArePasswordTheSame(password, confirmPassword)) {
        var user = new User(userId, name, email, password);
        users.push(user);

        localStorage.setItem("users", JSON.stringify(users));

        showRegistrationSuccessComunicate()
    }
}

function checkIsUserExist(email) {
    $(".emailExistText").remove();

    for (var i = 0; i < users.length; i++) {
        if (email === users[i].email) {
            $("#registerInputEmail").after("<div class='text-danger emailExistText'>Email is already in use.</div>");
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
        $("#confirmRegisterInputPassword").after("<div class='text-danger passwordConfirmText'>Password are not the same.</div>");
        return false;
    }
}

function showRegistrationSuccessComunicate() {
    $("#registerLabel .modal-footer").after("<div class='text-center text-success mb-3' id='registrationSuccessInfo'> Registration correct! </div>")
        
    setTimeout(function() {
        $("#registrationSuccessInfo").fadeOut('slow', function() {
            $(this).remove();
        });
    }, 1500);
}

function showLoginFailAttempt() {
    $("#loginLabel .modal-footer").after("<div class='text-center text-danger mb-3' id='loginFailInfo'> Login fail! </div>")
        
    setTimeout(function() {
        $("#loginFailInfo").fadeOut('slow', function() {
            $(this).remove();
        });
    }, 1500);
}

function login() {
    var email = $("#loginInputEmail").val();
    var password = $("#loginInputPassword").val();
    var loggedIn = false;

    for (var i = 0; i < users.length; i++) {
        if (email === users[i].email && password === users[i].password) {
            localStorage.setItem("idLoggedInUser", JSON.stringify(users[i].userId));
            loggedIn = true;
            window.location.href = "./mainMenu.html";
    }}
    
    if (!loggedIn) {showLoginFailAttempt()};
}

function loadUsers() {
    var storedUsers = localStorage.getItem("users");

    if (storedUsers) {
        users = JSON.parse(storedUsers);
    } else {
        console.log("No users data found");
    }
}


loadUsers();

$("#registerForm").submit(function(event) {
    event.preventDefault();
    register();

    $(this)[0].reset();
});

$("#loginForm").submit(function(event) {
    event.preventDefault();
    login();

    $(this)[0].reset();
})