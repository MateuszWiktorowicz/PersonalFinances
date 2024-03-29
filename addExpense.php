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
    <link href="./styles.css" rel="stylesheet">
    <link href="./dataPicker/css/bootstrap-datepicker.min.css" rel="stylesheet">

</head>


<body class="d-flex flex-column">
    <nav class="navbar bg-body-tertiary">
        <div class="container-sm d-flex justify-content-between align-items-center">
            <a class="navbar-brand" href="./mainMenu.php">
                <img src="./images/piggyBank.png" alt="piggy-bank-image" width="50" height="50">
                PersonalFinances
            </a>
            
            <div class="d-flex gap-3 p-3" id="navMainMenu">
                <div><a class="text-reset text-decoration-none menuOptions" href="./addIncome.php">Add Income</a></div>
                <div><a class="text-reset text-decoration-none menuOptions" href="./addExpense.php">Add Expense</a></div>
                <div><a class="text-reset text-decoration-none menuOptions" href="./balance.php">Balance</a></div>
                <div><a class="text-reset text-decoration-none menuOptions" href="./settings.php">Settings</a></div>
                <div><a class="text-reset text-decoration-none menuOptions" href="./logout.php">Logout</a></div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span></button>
            </div>
            <div class="collapse navbar-collapse" id="navbarToggleExternalContent">
                <div class="navbar-nav">
                    <div><a class="text-reset text-decoration-none menuOptions" href="./addIncome.php">Add Income</a></div>
                    <div><a class="text-reset text-decoration-none menuOptions" href="./addExpense.php">Add Expense</a></div>
                    <div><a class="text-reset text-decoration-none menuOptions" href="./balance.php">Balance</a></div>
                    <div><a class="text-reset text-decoration-none menuOptions" href="./settings.php">Settings</a></div>
                    <div><a class="text-reset text-decoration-none menuOptions" href="./logout.php">Logout</a></div>
                </div>
            </div>
        </div>
    </nav>
    <main>
        <div class="d-flex justify-content-center">
            <div class="d-flex justify-content-center balanceSection rounded mt-5">
            <div class="d-flex flex-column m-5 p-5 formsBackground rounded">
                <form  id="addExpenseForm" action="expense.php" method="post">
                    <div class="mb-3">
                    <label for="expenseAmountInput" class="form-label">Expense amount:</label>
                    <input type="number" step="0.01" min="0" class="form-control" name="expenseAmountInput" id="expenseAmountInput" aria-describedby="expenseAmountInputText" required>
                    <div id="expenseAmountInputText" class="form-text">Enter the number to two decimal places.</div>
                    </div>
                    <div class="mb-3">
                        <label for="expensePaymentMethod" class="form-label">Payment method</label>
                        <div class="expensePaymentMethods" id="expensePaymentMethod">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="expenseDate" class="form-label">Expense date:</label>
                        <input type="text" class="datepicker form-control" name="expenseDate" id="expenseDate" required>
                    </div>
                    <div class="mb-3">
                        <label for="expenseCategory" class="form-label">Expense category:</label>
                        <select class="form-select expenseCategories" aria-label="Expense Category:" name="expenseCategory" id="expenseCategory" required>
                            <option value="" disabled selected hidden>Select an expense category</option>
                        
                        </select>
                    </div>
                    <div class="mb-3">
                    <label for="expenseTextArea" class="form-label">Comment:</label>
                    <textarea class="form-control" name="expenseTextArea" id="expenseTextArea" rows="3"></textarea>
                    </div>
                    <div class="mb-3 d-flex flex-column flex-sm-row gap-2 formButtons">
                        <button type="submit" class="btn btn-success" id="addExpenseSubmit">Add Expense</button>
                        <button type="reset" class="btn btn-danger">Cancel</button>
                    </div>
                    
                </form>      
            </div>  
            </div>
        </div>
    </main>
    <footer class="text-center bg-white">
        <div class="container">github.com/MateuszWiktorowicz</div>
    </footer>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="./userManager.js"></script>
    <script src="./accountManager.js"></script>
    <script src="./dataPicker/js/bootstrap-datepicker.min.js"></script>
    <script src="./dateManager.js"></script>
    <script src="./settings.js"></script>
</body>

</html>