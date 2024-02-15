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

$(document).ready(function() {
    $("#addIncomeForm").submit(function(event) {
        event.preventDefault();

         
        var amount = $("#incomeAmountInput").val();
        var date = $("#incomeDate").val();
        var categoryName = $("#incomeCategory").val();
        var comment = $("#incomeTextArea").val();

    $.ajax({
        type: 'POST',
        url: 'income.php',
        data: {amount: amount, date: date, categoryName: categoryName, comment: comment},
        dataType: 'json',
        success: function (response) {
            if (response.status === 'success') {
                $("#addIncomeForm")[0].reset();
                $("#addIncomeForm .formButtons").after('<div class="d-flex flex-row-reverse success" style="color: green;">Income added!</div>');
                    setTimeout(function() {
                        $(".success").remove();
                    }, 3000);
            } else {
                $("#addIncomeForm .formButtons").after('<div class="d-flex flex-row-reverse fail" style="color: red;">Something gone wrong. Try again later...</div>');
                    setTimeout(function() {
                        $(".fail").remove();;
                    }, 3000);
            }
        },  
        error: function (xhr, status, error) {
            console.error('Error in AJAX request:', status, error);
            console.log(xhr.responseText);
            alert('An error occurred. Please try again.');
        }     
        
    });

    })

})

$(document).ready(function() {
    $("#addExpenseForm").submit(function(event) {
        event.preventDefault();

        var amount = $("#expenseAmountInput").val();
        var date = $("#expenseDate").val();
        var categoryName = $("#expenseCategory").val();
        var paymentMethod = $("input[name='paymentMethod']:checked").val();
        var comment = $("#expenseTextArea").val();

    $.ajax({
        type: 'POST',
        url: 'expense.php',
        data: {amount: amount, date: date, categoryName: categoryName, paymentMethod: paymentMethod, comment: comment},
        dataType: 'json',
        success: function (response) {
            if (response.status === 'success') {
                $("#addExpenseForm")[0].reset();
                $("#addExpenseForm .formButtons").after('<div class="d-flex flex-row-reverse success" style="color: green;">Expense added!</div>');
                    setTimeout(function() {
                        $(".success").remove();
                    }, 3000);
            } else {
                $("#addExpenseForm .formButtons").after('<div class="d-flex flex-row-reverse fail" style="color: red;">Something gone wrong. Try again later...</div>');
                    setTimeout(function() {
                        $(".fail").remove();;
                    }, 3000);
            }
        },  
        error: function (xhr, status, error) {
            console.error('Error in AJAX request:', status, error);
            console.log(xhr.responseText);
            alert('An error occurred. Please try again.');
        }     
        
    });

    })

})

$(document).ready(function() {
    $("#balancePeriod").change(function() {

        var selectedOption = $(this).val();
        var dataRange = [];

        switch (selectedOption) {
            case "current month":
                dataRange = getStartAndEndDateCurrentMonthInArray();
                break;     
            case "last month":
                dataRange = getStartAndEndDateLastMonthInArray();
                break;         
            case "current year":
                dataRange = getStartAndEndDateCurrentYearInArray();
                break;
            case "Custom":
                //showCustomPeriodBalance();
                break;
        }

        var startDate = dataRange[0];
        var endDate = dataRange[1];

        $.ajax({
            type: 'POST',
            url: 'balanceFunctions.php',
            data: {startDate: startDate, endDate: endDate},
            dataType: 'json',
            success: function (response) {
                if (response.status === 'success') {
                    sessionStorage.setItem('incomes', JSON.stringify(response.balanceByCategoriesFromPeriod));
                    var balanceByCategoriesFromPeriod = response.balanceByCategoriesFromPeriod;
                    showBalance(startDate, endDate, balanceByCategoriesFromPeriod);
                } else {
                   
                }
            },  
            error: function (xhr, status, error) {
                console.error('Error in AJAX request:', status, error);
                //console.log(xhr.responseText);
                alert('An error occurred. Please try again.');
            }     
            
        });
    
        })
    
    })

function getStartAndEndDateCurrentYearInArray() {
    var beginOfCurrentYear =  new Date().getFullYear() + "-01-01";
    var endOfCurrentYear = new Date().getFullYear() + "-12-31";

    return [beginOfCurrentYear, endOfCurrentYear];
}

function getStartAndEndDateCurrentMonthInArray() {
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth();
    var lastDayOfMonth = getLastDayOfMonth(currentYear, currentMonth);

    var currentMonthStr = currentMonth + 1 < 10 ? "0" + (currentMonth + 1) : (currentMonth + 1);

    var beginOfMonth = currentYear + "-" + currentMonthStr + "-01";
    var endOfMonth =   currentYear + "-" + currentMonthStr + "-" + lastDayOfMonth;

    return [beginOfMonth, endOfMonth];
}

function getStartAndEndDateLastMonthInArray() {
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

    return [beginOfMonth, endOfMonth];
}

function showBalance(startDate, endDate, accountOperationsArrayFromPeriod) {
    lastSearchDataRemove();
    $("#choosenBalancePeriod").text(startDate + " - " + endDate);
   
    countBalanceFromPeriod(accountOperationsArrayFromPeriod);
    displayAmountsGroupedByCategoriesNames(accountOperationsArrayFromPeriod);

    drawCharts(startDate, endDate, Income);
    drawCharts(startDate, endDate, Expense);
}


 function showCustomPeriodBalance() {
    displayDataPickersInCustomPeriodBalance();

    $("#customPeriodButton").click(function() {
        $(".balanceScreen").remove();

        if (isDateEarlierOrTheSame($("#startDate").val(), $("#endDate").val())) {
            countBalanceFromPeriod($("#startDate").val(), $("#endDate").val());
        displayAccountOperationsFromPeriod($("#startDate").val(), $("#endDate").val());

        $("#choosenBalancePeriod").text($("#startDate").val() + " - " + $("#endDate").val());

        drawCharts($("#startDate").val(), $("#endDate").val(), Income);
        drawCharts($("#startDate").val(), $("#endDate").val(), Expense);
        
        } else {
            $("#periodContainer").append("<div class='dateWrongComunicate text-danger'>Starting date is later than ending date. Type dates again...</div>");
            setTimeout(function() {
                $(".dateWrongComunicate").remove();
            }, 3000);
            
        }  
    }) 
}

function countBalanceFromPeriod(accountOperationsArrayFromPeriod) {
    var incomesTotal = 0;
    var expensesTotal = 0;

    var incomeOperations = accountOperationsArrayFromPeriod[0];
    var expenseOperations = accountOperationsArrayFromPeriod[1];

    for (var i = 0; i < incomeOperations.length; i++) {
        incomesTotal += parseFloat(incomeOperations[i].Value);
    }
    for (var i = 0; i < expenseOperations.length; i++) {
        expensesTotal += parseFloat(expenseOperations[i].Value);
    }

    $("#expensesTotal").after("<div class='balanceScreen'>" + expensesTotal + " PLN</div>");
    $("#incomesTotal").after("<div class='balanceScreen'>" + incomesTotal + " PLN</div>");
    $("#balanceQuote").after("<div class='balanceScreen'>" + (incomesTotal - expensesTotal) + " PLN</div>");
}

function displayDataPickersInCustomPeriodBalance() {
    $("#periodContainer").append("<div class='mb-3 customPeriod'><label for='endDate' class='form-label'>End date:</label><input type='text' class='datepicker form-control' id='endDate' required></div>")

    $("#periodContainer").append("<div class='mb-3 customPeriod'><label for='startDate' class='form-label'>Start date:</label><input type='text' class='datepicker form-control' id='startDate' required></div>")

    $("#periodContainer").append("<div class='pt-4 customPeriod'><button class='mt-1 btn btn-success' id='customPeriodButton'>Confirm</button></div>")

    $(".datepicker").datepicker({  
        format: 'yyyy-mm-dd',
        autoclose: true,
    });
    $(".datepicker").datepicker('setDate', new Date());
}

function lastSearchDataRemove() {
    $(".balanceScreen").remove();
    $("#choosenBalancePeriod").text("");
    $(".customPeriod").remove();
}

function displayAmountsGroupedByCategoriesNames(accountOperationsArrayFromPeriod) {
    var incomeOperations = accountOperationsArrayFromPeriod[0];
    var expenseOperations = accountOperationsArrayFromPeriod[1];
    
    for (var i = incomeOperations.length - 1; i >= 0; i--) {
         
        $("#incomesList").after("<div class='d-flex gap-1 border-bottom balanceScreen'><div>" + incomeOperations[i].name + "</div><div>" + incomeOperations[i].Value + "</div></div>");
    } 
    for (var i = expenseOperations.length - 1; i >= 0; i--) { 
        $("#expensesList").after("<div class='d-flex gap-1 border-bottom balanceScreen'><div>"  + expenseOperations[i].name + "</div><div>" + expenseOperations[i].Value + "</div></div>");


    }
}



function sumOperationByCategory(startDate, endDate, type) {
    const categorySums = {};

    for (const operation of operations) {
        const { category, amount } = operation;
        if  (checkIsDateInPeriod(startDate, endDate, operation.date) && operation instanceof type && operation.userId === JSON.parse(localStorage.getItem("idLoggedInUser"))) {
            if (!categorySums[category]) {
                categorySums[category] = amount;
            } else {
                categorySums[category] += amount;
            }
        }
            
    }
    return categorySums;
}

function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateArrayOfColors(lengthOfArray) {
    const colors = [];
    for (let i = 0; i < lengthOfArray; i++) {
        colors.push(generateRandomColor());
    }
    return colors;
}

function getObjectName(type) {
    if (type === Income) {
        return "incomes"
    } else {
        return "expenses"
    }
}
function drawCharts(startDate, endDate, type) {
    const categories = Object.keys(sumOperationByCategory(startDate, endDate, type))
    const amounts = Object.values(sumOperationByCategory(startDate, endDate, type))

    const colors = generateArrayOfColors(categories.length);
    
    var chartName = getObjectName(type) + "Chart";
    
    
    new Chart(chartName, {
        type: "pie",
        data: {
          labels: categories,
          datasets: [{
            backgroundColor: colors,
            data: amounts
          }]
        },
        options: {
            title: {
                display: true,
                text: getObjectName(type) + " from period: " + startDate + " - " + endDate
            }
        }
      });
}

/*
$("#balancePeriod").change(function () {
    lastSearchDataRemove();

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
            showCustomPeriodBalance();
            break;
    }
})


$(document).ready(function() {
    $("#balancePeriod").trigger('change');
});

*/











