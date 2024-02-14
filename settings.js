function populateSelectOptions(selectId, optionValues) {
    const $selectElement = $("." + selectId);

    if ($selectElement.length) {
        $.each(optionValues, function(index, option) {
            $selectElement.append($("<option>", {
                value: option.name,
                text: option.name
            }));
        });
    }
}
function populateRadioOptions(containerId, optionValues) {
    const $container = $("." + containerId);

    if ($container.length) {
        $.each(optionValues, function(index, option) {
            const $radioDiv = $("<div class='form-check form-check-inline'>");
            const $radioInput = $("<input>", {
                class: "form-check-input",
                type: "radio",
                name: "paymentMethod",
                id: option.name,
                value: option.name,
                required: true
            });
            const $radioLabel = $("<label>", {
                class: "form-check-label",
                for: option.name,
                text: option.name
            });

            $container.append($radioDiv.append($radioInput, $radioLabel));
        });
    }
}

function loadUserSettings(settingsArray) {
    var expensesCategories = settingsArray[0];
    var incomesCategories = settingsArray[1];
    var paymentMethods = settingsArray[2];

    populateSelectOptions("expenseCategories", expensesCategories);
    populateSelectOptions("incomeCategories", incomesCategories);
    populateRadioOptions("expensePaymentMethods", paymentMethods);
}


loadUserSettings(JSON.parse(sessionStorage.getItem('userSettings')));







/*

function handleDeleteCategoryButtonClick(event, category) {
    var parentContainer = $(event.target).closest('.categoriesSettings');
    var categoryIndex = parentContainer.index();
    var confirmDelete = confirm("Are you sure you want to delete the category '" + category[categoryIndex] + "'?");

    if (confirmDelete) {
        category.splice(categoryIndex, 1);
        parentContainer.remove();
    }
}

function handleEditCategoryButtonClick(event, category) {
    var parentContainer = $(event.target).closest('.categoriesSettings');
    var categoryIndex = parentContainer.index();

    var newCategory = prompt("Edit category:", category[categoryIndex]);
   
    if (newCategory !== null && newCategory !== "") {
        category[categoryIndex] = newCategory;

        parentContainer.find('div:first-child').text(newCategory);
    }
}

function addNewCategory(event, category) {

    var newCategory = prompt("Enter a new category:");

    if (newCategory !== null && newCategory.trim() !== "") {
        category.push(newCategory);

        $(event.target).before("<div class='categoriesSettings d-flex justify-content-between border-bottom mb-3 gap-2'><div>" + newCategory + "</div><div><button class='btn btn-info'>Edit</button><button class='btn btn-danger'>Delete</button></div></div>");
    }
}

function iterateCategoryElementsAndSettingButtons(category, modalId) {
    $(".categoriesSettings").remove();

    for (var i = 0; i < category.length; i++) {
        $("#" + modalId + " .btn-success").before("<div class='categoriesSettings d-flex justify-content-between border-bottom mb-3 gap-2'><div>" + category[i] + "</div><div><button class='btn btn-info'>Edit</button><button class='btn btn-danger'>Delete</button></div></div>");
    }

}

function loadUserSettings() {
    var defaultExpenseCategories = [
        "Food", "Home", "Transport", "Telecommunication", "Healthcare",
        "Clothes", "Hygiene", "Kids", "Entertainment", "Travels",
        "Courses", "Books", "Savings", "Retirement", "Repayment of Debts",
        "Donation", "Others"
    ];

    var defaultIncomeCategories = ["Salary", "Bank interest", "Allegro sale", "Others"];

    var defaultPaymentMethods = ["Cash", "Debit Card", "Credit Card"];

    var expenseCategoriesJson = localStorage.getItem("expenseCategories");
    expenseCategories = loadCategoryArray(expenseCategoriesJson, defaultExpenseCategories);

    var incomeCategoriesJson = localStorage.getItem("incomeCategories");
    incomesCategories = loadCategoryArray(incomeCategoriesJson, defaultIncomeCategories);

    var paymentCategoriesJson = localStorage.getItem("paymentMethods");
    paymentMethods = loadCategoryArray(paymentCategoriesJson, defaultPaymentMethods);

    populateSelectOptions("expenseCategories", expenseCategories);
    populateSelectOptions("incomeCategories", incomesCategories);
    populateRadioOptions("expensePaymentMethods", paymentMethods);
}

function loadCategoryArray(jsonData, defaultArray) {
    if (jsonData !== null) {
        try {
            return JSON.parse(jsonData);
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return defaultArray;
        }
    } else {
        console.log("Data not found in local storage.");
        return defaultArray;
    }
}


function populateSelectOptions(selectId, optionValues) {
    const $selectElement = $("." + selectId);

    if ($selectElement.length) {
        $.each(optionValues, function(index, value) {
            $selectElement.append($("<option>", {
                value: value,
                text: value
            }));
        });
    }
}
function populateRadioOptions(containerId, optionValues) {
    const $container = $("." + containerId);

    if ($container.length) {
        $.each(optionValues, function(index, value) {
            const $radioDiv = $("<div class='form-check form-check-inline'>");
            const $radioInput = $("<input>", {
                class: "form-check-input",
                type: "radio",
                name: "paymentMethod",
                id: value,
                value: value,
                required: true
            });
            const $radioLabel = $("<label>", {
                class: "form-check-label",
                for: value,
                text: value
            });

            $container.append($radioDiv.append($radioInput, $radioLabel));
        });
    }
}

function iterateAccountHistory(type) {

    for (var i = 0; i < operations.length; i++) {
        var operation = operations[i];
        if (operation.userId === JSON.parse(localStorage.getItem("idLoggedInUser")) && operation instanceof type) {
            $(".operationsHistory").append("<div class='d-flex operationsHistoryElement justify-content-between container'><div class='d-flex gap-3'><div class='operationId'>" + operation.operationId + "</div><div>" + operation.amount + "</div><div>" + operation.date + "</div><div>" + operation.category + "</div><div>" + operation.comment + "</div></div><div><button class='btn btn-info'>Edit</button><button class='btn btn-danger'>Delete</button></div></div>");
        }
        
    }
}

function handleDeleteAccountOperationButtonClick() {
    var parentContainer = $(this).closest('.operationsHistoryElement');
    var operationIdElement = parentContainer.find('.operationId');
    var operationId = operationIdElement.text();
    var confirmDelete = confirm("Are you sure you want to delete the operation with ID '" + operationId + "'?");

    if (confirmDelete) {
        for (var i = 0; i < operations.length; i++) {
            if (operations[i].operationId == operationId) {
                operations.splice(i, 1);
                break;
            }
        }
        parentContainer.remove();
    }
    localStorage.setItem("operations", JSON.stringify(operations));
}

function handleEditAccountOperationButtonClick() {
    var parentContainer = $(this).closest('.operationsHistoryElement');
    var operationIdElement = parentContainer.find('.operationId');
    var operationId = parseInt(operationIdElement.text());

    if (operations[operationId - 1] instanceof Income) {
        $('#editIncome').modal('show');
        $("#editIncomeSubmit").click(function() {
            editIncome(operationId - 1);
        })
    } else {
        $('#editExpense').modal('show');
        $("#editExpenseSubmit").click(function() {
            editExpense(operationId - 1);
        })
    }
}

function editIncome(index) {
    var operation = operations[index]
    operation.amount = $("#editIncomeAmount").val();
    operation.paymentMethod = $("#editExpensePaymentMethod").val();
    operation.date = $("#editIncomeDate").val();
    operation.category = $("#editIncomeCategory").val();
    operation.comment = $("#editIncomeTextArea").val();

    localStorage.setItem("operations", JSON.stringify(operations));
}

function editExpense(index) {
    var operation = operations[index]
    operation.amount = $("#editExpenseAmount").val();
    operation.date = $("#editExpenseDate").val();
    operation.category = $("#editExpenseCategory").val();
    operation.comment = $("#editExpenseTextArea").val();

    localStorage.setItem("operations", JSON.stringify(operations));
}



$("#operationsHistoryBtn").click(function() {
    $(".operationsHistoryElement").remove();
    iterateAccountHistory(Income);
    iterateAccountHistory(Expense);
})

$(".operationsHistory").on("click", ".btn-danger", handleDeleteAccountOperationButtonClick);
$(".operationsHistory").on("click", ".btn-info", handleEditAccountOperationButtonClick);

$("#expensesCategories").on("click", ".btn-info", function(event) {
    handleEditCategoryButtonClick(event, expenseCategories);
    localStorage.setItem("expenseCategories", JSON.stringify(expenseCategories));
    populateSelectOptions("expenseCategory", JSON.parse(localStorage.getItem("expenseCategories")));
});

$("#expensesCategories").on("click", ".btn-danger", function(event) {
    handleDeleteCategoryButtonClick(event, expenseCategories);
    localStorage.setItem("expenseCategories", JSON.stringify(expenseCategories));
});
$("#expensesCategories").on("click", ".btn-success", function(event) {
    addNewCategory(event, expenseCategories);
    localStorage.setItem("expenseCategories", JSON.stringify(expenseCategories));
});

$("#incomesCategories").on("click", ".btn-info", function(event) {
    handleEditCategoryButtonClick(event, incomesCategories);
    localStorage.setItem("incomeCategories", JSON.stringify(incomesCategories));
});
$("#incomesCategories").on("click", ".btn-danger", function(event) {
    handleDeleteCategoryButtonClick(event, incomesCategories);
    localStorage.setItem("incomeCategories", JSON.stringify(incomesCategories));
});
$("#incomesCategories").on("click", ".btn-success", function(event) {
    addNewCategory(event, incomesCategories);
    localStorage.setItem("incomeCategories", JSON.stringify(incomesCategories));
});

$("#paymentCategories").on("click", ".btn-info", function(event) {
    handleEditCategoryButtonClick(event, paymentMethods);
    localStorage.setItem("paymentMethods", JSON.stringify(paymentMethods));
});
$("#paymentCategories").on("click", ".btn-danger", function(event) {
    handleDeleteCategoryButtonClick(event, paymentMethods);
    localStorage.setItem("paymentMethods", JSON.stringify(paymentMethods));
});
$("#paymentCategories").on("click", ".btn-success", function(event) {
    addNewCategory(event, paymentMethods);
    localStorage.setItem("paymentMethods", JSON.stringify(paymentMethods));
});


$("#expenseCategoryBtn").click(function() {
    iterateCategoryElementsAndSettingButtons(expenseCategories, "expensesCategories");    
})

$("#incomeCategoryBtn").click(function() {
    iterateCategoryElementsAndSettingButtons(incomesCategories, "incomesCategories");    
})

$("#paymentCategoryBtn").click(function() {
    iterateCategoryElementsAndSettingButtons(paymentMethods, "paymentCategories");
})

loadUserSettings();

*/