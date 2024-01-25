var expenseCategories = [];
var incomeCategories = [];
var paymentMethod = [];

function changeUserData() {
    saveNewUserData();
}

function showRegistrationSuccessComunicate() {
    $("#newUserDataForm .modal-footer").after("<div class='text-center text-success mb-3' id='dataChange'> Data change correct! </div>")
        
    setTimeout(function() {
        $("#dataChange").fadeOut('slow', function() {
            $(this).remove();
        });
    }, 1500);
}

function checkIsUserExist(email) {
    $(".emailExistText").remove();

    for (var i = 0; i < users.length; i++) {
        if (email === users[i].email) {
            $("#newEmail").after("<div class='text-danger emailExistText'>Email is already in use.</div>");
            return true;
        } else {
            return false;
        }
    }
}

function checkArePasswordTheSame(pass1, pass2) {
    $(".passwordConfirmText").remove();

    if (pass1 === pass2) {
        return true
    } else {
        $("#confirmNewPassword").after("<div class='text-danger passwordConfirmText'>Password are not the same.</div>");
        return false;
    }
}

function saveNewUserData() {

    for (var i = 0; i < users.length; i++) {
        if (users[i].userId === JSON.parse(localStorage.getItem("idLoggedInUser"))) {
            var name = $("#newName").val();
            var email = $("#newEmail").val();
            var password = $("#newPassword").val();
            var confirmPassword = $("#confirmNewPassword").val();

            if (!checkIsUserExist(email) && checkArePasswordTheSame(password, confirmPassword)) {
                
                users[i].name = name;
                users[i].email = email;
                users[i].password = password;
        
                localStorage.setItem("users", JSON.stringify(users));
        
                showRegistrationSuccessComunicate();
            }
            break;
        }
    }
}

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
    var expenseCategoriesJson = localStorage.getItem("expenseCategories");

    if (expenseCategoriesJson !== null) {
        try {
   
            expenseCategories = JSON.parse(expenseCategoriesJson);
        } catch (error) {

            console.error("Error parsing expenseCategories JSON:", error);
            expenseCategories = [
                "Food", "Home", "Transport", "Telecommunication", "Healthcare",
                "Clothes", "Hygiene", "Kids", "Entertainment", "Travels",
                "Courses", "Books", "Savings", "Retirement", "Repayment of Debts",
                "Donation", "Others"
            ];
        }
    } else {
        console.log("Expense categories not found in local storage.");
        expenseCategories = [
            "Food", "Home", "Transport", "Telecommunication", "Healthcare",
            "Clothes", "Hygiene", "Kids", "Entertainment", "Travels",
            "Courses", "Books", "Savings", "Retirement", "Repayment of Debts",
            "Donation", "Others"
        ];
    }

    var incomeCategoriesJson = localStorage.getItem("incomeCategories");

    if (incomeCategoriesJson !== null) {
        try {
   
            incomesCategories = JSON.parse(incomeCategoriesJson);
        } catch (error) {

            console.error("Error parsing incomeCategories JSON:", error);
            incomesCategories = ["Salary", "Bank interest", "Allegro sale", "Others"];
        }
    } else {
        console.log("Income categories not found in local storage.");
        incomesCategories = ["Salary", "Bank interest", "Allegro sale", "Others"];
    }

    var paymentCategoriesJson = localStorage.getItem("paymentMethods");

    if (paymentCategoriesJson !== null) {
        try {
   
            paymentMethods = JSON.parse(paymentCategoriesJson);
        } catch (error) {
            paymentMethods = ["Cash", "Debit Card", "Credit Card"];
            console.error("Error parsing paymentMethods JSON:", error);
        }
    } else {
        paymentMethods = ["Cash", "Debit Card", "Credit Card"];
        console.log("Payment methods not found in local storage.");
    }

    populateSelectOptions("expenseCategory", expenseCategories);
    populateSelectOptions("incomeCategory", incomesCategories);
    populateRadioOptions("expensePaymentMethod", paymentMethods);
}

function populateSelectOptions(selectId, optionValues) {
    const $selectElement = $("#" + selectId);

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
    const $container = $("#" + containerId);

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



$("#newDataForm").submit(function(event) {
    event.preventDefault();
    changeUserData();

    $(this)[0].reset();
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