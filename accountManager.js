
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
                $(".customPeriod").remove();
                dataRange = getStartAndEndDateCurrentMonthInArray();
                getBalanceAndOperationsFromDataRange(dataRange);
                break;     
            case "last month":
                $(".customPeriod").remove();
                dataRange = getStartAndEndDateLastMonthInArray();
                getBalanceAndOperationsFromDataRange(dataRange);
                break;         
            case "current year":
                $(".customPeriod").remove();
                dataRange = getStartAndEndDateCurrentYearInArray();
                getBalanceAndOperationsFromDataRange(dataRange);
                break;
            case "Custom":
                getStardAndEndDateCustomPeriodInArray(function(customDataRange) {
                    getBalanceAndOperationsFromDataRange(customDataRange);
                });
                break;
        }
        })
    
    })

    function getBalanceAndOperationsFromDataRange(dataRange) {
        var startDate = dataRange[0];
        var endDate = dataRange[1];

        console.log(startDate);
        console.log(endDate);

        $.ajax({
            type: 'POST',
            url: 'balanceFunctions.php',
            data: {startDate: startDate, endDate: endDate},
            dataType: 'json',
            success: function (response) {
                if (response.status === 'success') {
                    var balanceByCategoriesFromPeriod = response.balanceByCategoriesFromPeriod;
                    var accountOperationsFromPeriod = response.accountOperationsFromPeriod;
                    showBalance(startDate, endDate, balanceByCategoriesFromPeriod);
                    displayAccountOperationsFromPeriod(accountOperationsFromPeriod);
                    drawCharts(balanceByCategoriesFromPeriod);
                } else {
                   
                }
            },  
            error: function (xhr, status, error) {
                console.error('Error in AJAX request:', status, error);
                alert('An error occurred. Please try again.');
            }     
            
        });
    }

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

    console.log([beginOfMonth, endOfMonth])
    return [beginOfMonth, endOfMonth];
}

function showBalance(startDate, endDate, balanceByCategoriesFromPeriod) {
    lastSearchDataRemove();
    $("#choosenBalancePeriod").text(startDate + " - " + endDate);
   
    countBalanceFromPeriod(balanceByCategoriesFromPeriod);
    displayAmountsGroupedByCategoriesNames(balanceByCategoriesFromPeriod);
}


 function getStardAndEndDateCustomPeriodInArray(callback) {
    displayDataPickersInCustomPeriodBalance();
    insertNewChartsElements();
    $(".balanceScreen").remove();
    $("#choosenBalancePeriod").text('');
    $("#customPeriodButton").click(function(event) {
        event.preventDefault();
        var startDate = String($("#startDate").val());
        var endDate = String($("#endDate").val());

        if (isDateEarlierOrTheSame(startDate, endDate)) {
            console.log([startDate, endDate]);
            callback([startDate, endDate]);
        
        } else {
            lastSearchDataRemove();
            $("#periodContainer").append("<div class='dateWrongComunicate text-danger'>Starting date is later than ending date. Type dates again...</div>");
            setTimeout(function() {
                $(".dateWrongComunicate").remove();
            }, 3000);
           
        }  
        
    }) 
}

function countBalanceFromPeriod(balanceByCategoriesFromPeriod) {
    var incomesTotal = 0;
    var expensesTotal = 0;

    var incomeOperations = balanceByCategoriesFromPeriod[0];
    var expenseOperations = balanceByCategoriesFromPeriod[1];

    for (var i = 0; i < incomeOperations.length; i++) {
        incomesTotal += parseFloat(incomeOperations[i].Value);
    }
    for (var i = 0; i < expenseOperations.length; i++) {
        expensesTotal += parseFloat(expenseOperations[i].Value);
    }

    $("#expensesTotal").after("<div class='balanceScreen d-flex justify-content-center fs-3'>" + expensesTotal + " PLN</div>");
    $("#incomesTotal").after("<div class='balanceScreen d-flex justify-content-center fs-3'>" + incomesTotal + " PLN</div>");
    $("#balanceQuote").after("<div class='balanceScreen d-flex justify-content-center fs-2'>" + (incomesTotal - expensesTotal) + " PLN</div>");
}

function displayDataPickersInCustomPeriodBalance() {
 

    $("#periodContainer").append("<div class='d-flex flex-column flex-lg-row gap-3'><div class='mb-3 customPeriod'><label for='startDate' class='form-label'>Start date:</label><input type='text' class='datepicker form-control' id='startDate' required></div><div class='mb-3 customPeriod'><label for='endDate' class='form-label'>End date:</label><input type='text' class='datepicker form-control' id='endDate' required></div><div class='pt-4 customPeriod'><button class='mt-1 btn btn-success' id='customPeriodButton'>Confirm</button></div></div>")


    $(".datepicker").datepicker({  
        format: 'yyyy-mm-dd',
        autoclose: true,
    });
    $(".datepicker").datepicker('setDate', new Date());
}

function lastSearchDataRemove() {
    $(".balanceScreen").remove();
    $("#choosenBalancePeriod").text("");
    
}

function displayAmountsGroupedByCategoriesNames(balanceByCategoriesFromPeriod) {
    var incomeOperations = balanceByCategoriesFromPeriod[0];
    var expenseOperations = balanceByCategoriesFromPeriod[1];
    
    for (var i = incomeOperations.length - 1; i >= 0; i--) {
        var categoryClassName = incomeOperations[i].name.replace(/\s+/g, '_');
        $("#incomesList").after("<div class='d-flex flex-column gap-1 border-bottom balanceScreen'><div class='d-flex gap-1 border-bottom mb-2'><div class='fw-bold mx-2 fs-3'>" + incomeOperations[i].name + ": </div><div class='fs-3'>" + incomeOperations[i].Value + " PLN</div></div><div class='" + categoryClassName + "'></div></div>");
    } 
    for (var i = expenseOperations.length - 1; i >= 0; i--) { 
        var categoryClassName = expenseOperations[i].name.replace(/\s+/g, '_');
        $("#expensesList").after("<div class='d-flex flex-column gap-1 border-bottom balanceScreen'><div class='d-flex gap-1 border-bottom mb-2'><div class='fw-bold mx-2 fs-3'>"  + expenseOperations[i].name + ": </div><div class='fs-3'>" + expenseOperations[i].Value + " PLN</div></div><div class='" + categoryClassName + "'></div></div>");
    }
}

function displayAccountOperationsFromPeriod(accountOperationsFromPeriod) {
    var incomeOperations = accountOperationsFromPeriod[0];
    var expenseOperations = accountOperationsFromPeriod[1];

    for (var i = incomeOperations.length - 1; i >= 0; i--) {
        var categoryClassName = incomeOperations[i].name.replace(/\s+/g, '_');
        $("." + categoryClassName).prepend("<div class='d-flex gap-1 border-bottom justify-content-between mx-3 balanceScreen'><div class='col-4'>" + incomeOperations[i].date + "</div><div class='col-3'>" + incomeOperations[i].amount + " PLN</div><div class='col-5'>" + incomeOperations[i].comment + "</div></div>");
    } 
    for (var i = expenseOperations.length - 1; i >= 0; i--) { 
        var categoryClassName = expenseOperations[i].name.replace(/\s+/g, '_');
        $("." + categoryClassName).prepend("<div class='d-flex gap-1 border-bottom justify-content-between mx-3 balanceScreen'><div class='col-4'>"  + expenseOperations[i].date + "</div><div class='col-3'>" + expenseOperations[i].amount + " PLN</div><div class='col-5'>" + expenseOperations[i].comment + "</div></div>");
    }
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

function drawCharts(balanceByCategoriesFromPeriod) {
    
    insertNewChartsElements();
    var incomeOperations = balanceByCategoriesFromPeriod[0];
    var expenseOperations = balanceByCategoriesFromPeriod[1];

        
        new Chart("Incomes", {
            type: "pie",
            data: {
              labels: incomeOperations.map(item => item.name),
              datasets: [{
                backgroundColor: generateArrayOfColors(incomeOperations.length),
                data: incomeOperations.map(item => item.Value)
              }]
            },
            options: {
                title: {
                    display: true,
                    text: "Incomes"
                }
            }
          });

        new Chart("Expenses", {
            type: "pie",
            data: {
            labels: expenseOperations.map(item => item.name),
            datasets: [{
                backgroundColor: generateArrayOfColors(expenseOperations.length),
                data: expenseOperations.map(item => item.Value)
            }]
            },
            options: {
                title: {
                    display: true,
                    text: "Expenses"
                }
            }
        });
}

function insertNewChartsElements() {
    $("#charts").empty();

    $("#charts").append("<div><canvas id='Expenses' style='width:100%;max-width:700px; height: 250px;'></canvas></div><div><canvas id='Incomes' style='width:100%;max-width:700px; height: 250px;'></canvas></div>");
}

$(document).ready(function() {
    $("#balancePeriod").trigger('change');
});













