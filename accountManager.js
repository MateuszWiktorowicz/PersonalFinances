function Income(operationId, userId, amount, date, category, comment) {
    this.operationId = operationId;
    this.userId = userId;
    this.amount = amount;
    this.date = date;
    this.category = category;
    this.comment = comment;
}

var operations = [];

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

function addIncome() {
    var operationId = operations.length === 0 ? 1 : operations.length + 1;
    var userId = JSON.parse(localStorage.getItem("idLoggedInUser"));
    var amount = $("#incomeAmountInput").val();
    var date = $("#incomeDate").val();
    var category = $("#incomeCategory").val();
    var comment = $("#incomeTextArea").val();

    var income = new Income(operationId, userId, amount, date, category, comment);
    operations.push(income);
    localStorage.setItem("operations", JSON.stringify(operations));
}

function confirmIncomeAdded() {
    $("#addIncomeForm").after("<div class='text-center text-success incomeAddInfo'>Income added!</div>");

    setTimeout(function() {
        $(".incomeAddInfo").fadeOut('slow', function() {
            $(this).remove();
        });
    }, 1500);
}

welcomeLoggedInUser();

$("#addIncomeForm").submit(function(event) {
    event.preventDefault();

    addIncome();
    $(this)[0].reset();
    confirmIncomeAdded();
});