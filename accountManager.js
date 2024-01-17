function Income(operationId, userId, amount, date, category, comment) {
    this.operationId = operationId;
    this.userId = userId;
    this.amount = amount;
    this.date = date;
    this.category = category;
    this.comment = comment;
}

function Expense(operationId, userId, amount, paymentMethod, date, category, comment) {
    this.operationId = operationId;
    this.userId = userId;
    this.amount = amount;
    this.paymentMethod = paymentMethod;
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
    income.type = 'Income';
    operations.push(income);
    localStorage.setItem("operations", JSON.stringify(operations));
}

function addExpense() {
    var operationId = operations.length === 0 ? 1 : operations.length + 1;
    var userId = JSON.parse(localStorage.getItem("idLoggedInUser"));
    var amount = $("#expenseAmountInput").val();
    var paymentMethod = $('input[name="paymentMethod"]:checked').val();
    var date = $("#expenseDate").val();
    var category = $("#expenseCategory").val();
    var comment = $("#expenseTextArea").val();

    var expense = new Expense(operationId, userId, amount, paymentMethod, date, category, comment);
    expense.type = 'Expense';
    operations.push(expense);
    localStorage.setItem("operations", JSON.stringify(operations));
}


function confirmAccountOperationAdded() {
    $(".formButtons").after("<div class='text-center text-success operationAddInfo'>Operation successfully added!</div>");

    setTimeout(function() {
        $(".operationAddInfo").fadeOut('slow', function() {
            $(this).remove();
        });
    }, 1500);
}

function loadOperations() {
    var storedOperations = localStorage.getItem("operations");

    if (storedOperations) {
        operations = JSON.parse(storedOperations);

        operations.forEach(function (operation) {
            if (operation.type === 'Income') {
                Object.setPrototypeOf(operation, Income.prototype);
            } else if (operation.type === 'Expense') {
                Object.setPrototypeOf(operation, Expense.prototype);
            }
        });
    } else {
        console.log("No data found.");
    }
}

function countObj() {
    var inc = 0;
    var exp = 0;
    for (var i = 0; i < operations.length; i++) {
        var operation = operations[i];

        if (operation instanceof Expense) {
            
            exp++;
        } else if (operation instanceof Income) {
            inc++;
        }
    }

    console.log('Total Incomes:', inc);
    console.log('Total Expenses:', exp);
}

welcomeLoggedInUser();
loadOperations();


$("#addIncomeForm").submit(function(event) {
    event.preventDefault();

    addIncome();
    $(this)[0].reset();
    confirmAccountOperationAdded();
});

$("#addExpenseForm").submit(function(event) {
    event.preventDefault();

    addExpense();
    $(this)[0].reset();
    confirmAccountOperationAdded();
});