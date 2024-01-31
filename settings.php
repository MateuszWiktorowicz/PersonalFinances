<?php 
    session_start();

    if (!isset($_SESSION['loggedIn']))
	{
		header('Location: index.php');
		exit();
	}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PersonalFinances</title>

    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link href="./styles.css" rel="stylesheet" />
    <link href="./dataPicker/css/bootstrap-datepicker.min.css" rel="stylesheet" />

</head>


<body class="d-flex flex-column">
    <nav class="navbar bg-body-tertiary">
        <div class="container-sm d-flex justify-content-between align-items-center">
            <a class="navbar-brand" href="./mainMenu.html">
                <img src="./images/piggyBank.png" alt="piggy-bank-image" width="50" height="50">
                PersonalFinances
            </a>
            
            <div class="d-flex gap-3 p-3" id="navMainMenu">
                <div><a class="text-reset text-decoration-none" href="./addIncome.php">Add Income</a></div>
                <div><a class="text-reset text-decoration-none" href="./addExpense.php">Add Expense</a></div>
                <div><a class="text-reset text-decoration-none" href="./balance.php">Balance</a></div>
                <div><a class="text-reset text-decoration-none" href="./settings.php">Settings</a></div>
                <div><a class="text-reset text-decoration-none" href="./logout.php">Logout</a></div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
            </div>
            <div class="collapse navbar-collapse" id="navbarToggleExternalContent">
                <div class="navbar-nav">
                    <div><a class="text-reset text-decoration-none" href="./addIncome.php">Add Income</a></div>
                    <div><a class="text-reset text-decoration-none" href="./addExpense.php">Add Expense</a></div>
                    <div><a class="text-reset text-decoration-none" href="./balance.php">Balance</a></div>
                    <div><a class="text-reset text-decoration-none" href="./settings.php">Settings</a></div>
                    <div><a class="text-reset text-decoration-none" href="./logout.php">Logout</a></div>
                </div>
            </div>
        </div>
    </nav>
    <main>
      <div class="d-flex flex-column m-5 p-5 bg-white opacity-100 rounded">

      
        <div class="d-flex flex-column m-5 p-3 align-items-center">
            <div class="mb-5">
                <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#newUserDataForm">Change users account data.</button>
            </div>
            <div>
                <div class="btn-group mb-5" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-info" data-bs-toggle="modal" id="incomeCategoryBtn" data-bs-target="#incomesCategories">Incomes Categories</button>
                    <button type="button" class="btn btn-info" data-bs-toggle="modal" id="expenseCategoryBtn" data-bs-target="#expensesCategories">Expeneses Categories</button>
                    <button type="button" class="btn btn-info" data-bs-toggle="modal" id="paymentCategoryBtn" data-bs-target="#paymentCategories">Payment Methods</button>
                  </div>
            </div>
            <div class="container mb-5 d-flex flex-column align-items-center">
              <div>
                <button class="btn btn-info" id="operationsHistoryBtn">Account operations history</button>
              </div>
          </div>
          <div class="container operationsHistory d-flex flex-column align-items-start">

          </div>
        </div>

        <div class="modal fade" id="newUserDataForm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="newUserData" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="newUserData">Type new user data:</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="newDataForm">
                        <div class="mb-3">
                            <label for="newName" class="form-label">Name</label>
                            <input type="text" class="form-control" id="newName" required>
                          </div>
                        <div class="mb-3">
                          <label for="newEmail" class="form-label">Email address</label>
                          <input type="email" class="form-control registerEmail" id="newEmail" required>
                        </div>
                        <div class="mb-3">
                          <label for="newPassword" class="form-label">Password</label>
                          <input type="password" class="form-control" id="newPassword" required>
                        </div>
                        <div class="mb-3">
                            <label for="confirmNewPassword" class="form-label">Confirm Password</label>
                            <input type="password" class="form-control confirmPassword" id="confirmNewPassword" required>
                        </div>
                        <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" id="newDataSubmit">Submit</button>
                      </form>
                </div>
                <div class="modal-footer">
                  
                </div>
              </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" id="expensesCategories">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Expense Categories</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <button type="button" class="btn btn-success">Add New</button>
                </div>
                <div class="modal-footer">
                  
                </div>
              </div>
            </div>
          </div>

          <div class="modal" tabindex="-1" id="incomesCategories">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Income Categories</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <button type="button" class="btn btn-success">Add New</button>
                </div>
                <div class="modal-footer">
                  
                </div>
              </div>
            </div>
          </div>

          <div class="modal" tabindex="-1" id="paymentCategories">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Payment Methods</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <button type="button" class="btn btn-success">Add New</button>
                </div>
                <div class="modal-footer">
                  
                </div>
              </div>
            </div>
          </div>

          <div class="modal" tabindex="-1" id="editIncome">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Payment Methods</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="">
                    <form class="m-5" id="editIncome">
                        <div class="mb-3">
                          <label for="editIncomeAmount" class="form-label">Income amount:</label>
                          <input type="number" step="0.01" min="0" class="form-control" id="editIncomeAmount" aria-describedby="editIncomeAmountContainer" required>
                          <div id="editIncomeAmountContainer" class="form-text">Enter the number to two decimal places.</div>
                        </div>
                        <div class="mb-3">
                            <label for="editIncomeDate" class="form-label">Income date:</label>
                            <input type="text" class="datepicker form-control" id="editIncomeDate" required>
                        </div>
                        <div class="mb-3">
                            <label for="editIncomeCategory" class="form-label">Income category:</label>
                            <select class="form-select incomeCategories" aria-label="Income Category:" id="editIncomeCategory" required>
                                <option value="" disabled selected hidden>Select an income category</option>
                            </select>
                        </div>
                        <div class="mb-3">
                          <label for="editIncomeTextArea" class="form-label">Comment:</label>
                          <textarea class="form-control" id="editIncomeTextArea" rows="3"></textarea>
                        </div>
                        <div class="mb-3 d-flex gap-2 formButtons">
                            <button type="submit" class="btn btn-success" id="editIncomeSubmit">Edit Income</button>
                            <button type="reset" class="btn btn-danger">Cancel</button>
                        </div>
                        
                    </form>
                           
                </div>
                </div>
                <div class="modal-footer">
                  
                </div>
              </div>
            </div>
          </div>

          <div class="modal" tabindex="-1" id="editExpense">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Edit Expense</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div>
                    <form class="m-5" id="editExpenseForm">
                        <div class="mb-3">
                          <label for="editExpenseAmount" class="form-label">Expense amount:</label>
                          <input type="number" step="0.01" min="0" class="form-control" id="editExpenseAmount" aria-describedby="editExpenseAmountContainer" required>
                          <div id="editExpenseAmountContainer" class="form-text">Enter the number to two decimal places.</div>
                        </div>
                        <div class="mb-3">
                            <label for="editExpensePaymentMethod" class="form-label">Payment method</label>
                            <div class="expensePaymentMethods" id="editExpensePaymentMethod">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="editExpenseDate" class="form-label">Expense date:</label>
                            <input type="text" class="datepicker form-control" id="editExpenseDate" required>
                        </div>
                        <div class="mb-3">
                            <label for="editExpenseCategory" class="form-label">Expense category:</label>
                            <select class="form-select expenseCategories" aria-label="Expense Category:" id="editExpenseCategory" required>
                                <option value="" disabled selected hidden>Select an expense category</option>
                             
                            </select>
                        </div>
                        <div class="mb-3">
                          <label for="editExpenseTextArea" class="form-label">Comment:</label>
                          <textarea class="form-control" id="editExpenseTextArea" rows="3"></textarea>
                        </div>
                        <div class="mb-3 d-flex gap-2 formButtons">
                            <button type="submit" class="btn btn-success" id="editExpenseSubmit">Edit Expense</button>
                            <button type="reset" class="btn btn-danger">Cancel</button>
                        </div>
                        
                    </form>
                           
                </div>
                </div>
                <div class="modal-footer">
                  
                </div>
              </div>
            </div>
          </div>
        </div>


        
    </main>
    <footer class="text-center bg-white">
        <div class="container">github.com/MateuszWiktorowicz</div>
    </footer>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="./userManager.js"></script>
    <script src="./accountManager.js"></script>
    <script src="./dataPicker/js/bootstrap-datepicker.min.js"></script>
    <script src="./dateManager.js"></script>
    <script src="./settings.js"></script>

</body>

</html>