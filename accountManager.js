function welcomeLoggedInUser() {

    var id = localStorage.getItem("idLoggedInUser")

    if (id) {
        userId = JSON.parse(id);
        $("#welcomeNameBox").text(users[(userId - 1)].name + "!");
    } else {
        $("#welcomeNameBox").text("Friend!");
    }
} 

$(function () { 
    $(".datepicker").datepicker({  
        format: 'mm/dd/yyyy',
        startDate: '-3d',
        autoclose: true,
    });
    $(".datepicker").datepicker('setDate', new Date());
});

welcomeLoggedInUser();