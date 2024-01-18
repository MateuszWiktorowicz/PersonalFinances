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


function showBalanceCurrentYear() {
   
    var beginOfCurrentYear = "01/01/" + new Date().getFullYear();
    var endOfCurrentYear = "31/12/" + new Date().getFullYear();
 
    countBalanceFromPeriod(beginOfCurrentYear, endOfCurrentYear);
    displayAccountOperationsFromPeriod(beginOfCurrentYear, endOfCurrentYear);
 
 }
 
 function countBalanceFromPeriod(startDate, endDate) {
     var incomesTotal = 0;
     var expensesTotal = 0;
 
     for (var i = 0; i < operations.length; i++) {
         if((operations[i] instanceof Income) && (operations[i].date >= startDate && operations[i].date <= endDate) && operations[i].userId === JSON.parse(localStorage.getItem("idLoggedInUser"))) {
             incomesTotal += parseFloat(operations[i].amount);
         } else if ((operations[i] instanceof Expense) && (operations[i].date >= startDate && operations[i].date <= endDate) && operations[i].userId === JSON.parse(localStorage.getItem("idLoggedInUser"))) {
             expensesTotal += parseFloat(operations[i].amount);
         }
     }
 
     $("#expensesTotal").after("<div>" + expensesTotal + " PLN</div>");
     $("#incomesTotal").after("<div>" + incomesTotal + " PLN</div>");
     $("#balanceQuote").after("<div>" + (incomesTotal - expensesTotal) + " PLN</div>");
 }
 
 function displayAccountOperationsFromPeriod(startDate, endDate) {
     var incomesCounter = 1;
     var expensesCounter = 1;
     
     for (var i = 0; i < operations.length; i++) {
         if((operations[i] instanceof Income) && (operations[i].date >= startDate && operations[i].date <= endDate) && operations[i].userId === JSON.parse(localStorage.getItem("idLoggedInUser"))) {
             $("#incomesList").after("<div class='d-flex gap-3 border-bottom'><div>" + incomesCounter + "</div><div>" + operations[i].amount + " PLN</div><div>" + operations[i].category + "</div><div>" + operations[i].date + "</div><div>" + operations[i].comment + "</div></div>");
 
             incomesCounter++;
         } else if ((operations[i] instanceof Expense) && (operations[i].date >= startDate && operations[i].date <= endDate) && operations[i].userId === JSON.parse(localStorage.getItem("idLoggedInUser"))) {
             $("#expensesList").after("<div class='d-flex gap-3 border-bottom'><div>" + incomesCounter + "</div><div>" + operations[i].amount + " PLN</div><div>" + operations[i].category + "</div><div>" + operations[i].date + "</div><div>" + operations[i].comment + "</div></div>");
 
             expensesCounter++;
         }
     }
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