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
   
    var beginOfCurrentYear =  new Date().getFullYear() + "-01-01";
    var endOfCurrentYear = new Date().getFullYear() + "-12-31";

    $("#choosenBalancePeriod").text(beginOfCurrentYear + " - " + endOfCurrentYear);
 
    countBalanceFromPeriod(beginOfCurrentYear, endOfCurrentYear);
    displayAccountOperationsFromPeriod(beginOfCurrentYear, endOfCurrentYear);
 
 }

 function showBalanceCurrentMonth() {
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth();
    var lastDayOfMonth = getLastDayOfMonth(currentYear, currentMonth);

    var currentMonthStr = currentMonth + 1 < 10 ? "0" + (currentMonth + 1) : (currentMonth + 1);

    
    var beginOfMonth = currentYear + "-" + currentMonthStr + "-01";
    var endOfMonth =   currentYear + "-" + currentMonthStr + "-" + lastDayOfMonth;

    $("#choosenBalancePeriod").text(beginOfMonth + " - " + endOfMonth);
   
    countBalanceFromPeriod(beginOfMonth, endOfMonth);
    displayAccountOperationsFromPeriod(beginOfMonth, endOfMonth);
   

 }

 function showBalanceLastMonth() {
    var year = new Date().getFullYear();
    var currentMonth = new Date().getMonth();
    var lastMonth;

    if (currentMonth === 0) {
        lastMonth = 11;
        year--;
    } else {
        lastMonth = currentMonth - 1;
    }

    var lastDayOfMonth = getLastDayOfMonth(year, lastMonth);
    var lastMonthStr = lastMonth + 1 < 10 ? "0" + (lastMonth + 1).toString() : (lastMonth + 1).toString();

    var beginOfMonth = year +  "-" + lastMonthStr + "-01";
    var endOfMonth = year + "-" + lastMonthStr + "-" + lastDayOfMonth;

    $("#choosenBalancePeriod").text(beginOfMonth + " - " + endOfMonth);
    
    
    countBalanceFromPeriod(beginOfMonth, endOfMonth);
    displayAccountOperationsFromPeriod(beginOfMonth, endOfMonth);
 }

 function checkIsDateInPeriod(startDate, endDate, operationDate) {
    var operationDate = new Date(operationDate).getTime();
    var startDate = new Date(startDate).getTime();
    var endDate = new Date(endDate).getTime();

    if (operationDate >= startDate && operationDate <= endDate) {
        return true;
    } else {
        return false;
    }
}

function countBalanceFromPeriod(startDate, endDate) {
    var incomesTotal = 0;
    var expensesTotal = 0;

    for (var i = 0; i < operations.length; i++) {
        if  (checkIsDateInPeriod(startDate, endDate, operations[i].date) && operations[i] instanceof Income && operations[i].userId === JSON.parse(localStorage.getItem("idLoggedInUser"))) {
            incomesTotal += parseFloat(operations[i].amount);
        } else if (checkIsDateInPeriod(startDate, endDate, operations[i].date) && operations[i] instanceof Expense && operations[i].userId === JSON.parse(localStorage.getItem("idLoggedInUser"))) {
            expensesTotal += parseFloat(operations[i].amount);
        }
    }

    $("#expensesTotal").after("<div class='balanceScreen'>" + expensesTotal + " PLN</div>");
    $("#incomesTotal").after("<div class='balanceScreen'>" + incomesTotal + " PLN</div>");
    $("#balanceQuote").after("<div class='balanceScreen'>" + (incomesTotal - expensesTotal) + " PLN</div>");
}

function displayAccountOperationsFromPeriod(startDate, endDate) {
    var incomesCounter = 1;
    var expensesCounter = 1;
    
    for (var i = 0; i < operations.length; i++) {
        if (checkIsDateInPeriod(startDate, endDate, operations[i].date) && operations[i] instanceof Income && operations[i].userId === JSON.parse(localStorage.getItem("idLoggedInUser"))) {
            $("#incomesList").after("<div class='d-flex gap-3 border-bottom balanceScreen'><div>" + incomesCounter + "</div><div>" + operations[i].amount + " PLN</div><div>" + operations[i].category + "</div><div>" + operations[i].date + "</div><div>" + operations[i].comment + "</div></div>");

            incomesCounter++;
        } else if (checkIsDateInPeriod(startDate, endDate, operations[i].date) && operations[i] instanceof Expense && operations[i].userId === JSON.parse(localStorage.getItem("idLoggedInUser"))) {
            $("#expensesList").after("<div class='d-flex gap-3 border-bottom balanceScreen'><div>" + incomesCounter + "</div><div>" + operations[i].amount + " PLN</div><div>" + operations[i].category + "</div><div>" + operations[i].date + "</div><div>" + operations[i].comment + "</div></div>");

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

$("#balancePeriod").change(function () {
    $(".balanceScreen").remove();
    $("#choosenBalancePeriod").text("");
    var selectedOption = $(this).val();

    switch (selectedOption) {
        case "current month":
            showBalanceCurrentMonth();
            break;     
        case "last month":
            showBalanceLastMonth();
            break;         
        case "current year":
            showBalanceCurrentYear();
            break;
        case "Custom":
            break;
    }
})

