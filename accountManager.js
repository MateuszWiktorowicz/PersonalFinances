function welcomeLoggedInUser() {

    var id = localStorage.getItem("idLoggedInUser")

    if (id) {
        userId = JSON.parse(id);
        $("#welcomeNameBox").text(users[(userId - 1)].name + "!");
    } else {
        $("#welcomeNameBox").text("Friend!");
    }
} 

welcomeLoggedInUser();