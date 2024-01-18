$(function () { 
    $(".datepicker").datepicker({  
        format: 'dd/mm/yyyy',
        autoclose: true,
    });
    $(".datepicker").datepicker('setDate', new Date());
});

function getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();

    
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