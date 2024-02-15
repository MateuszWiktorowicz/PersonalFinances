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
        <div class="d-flex flex-column m-5 p-5">
            <div class="d-flex flex-column align-items-center mb-2 bg-white opacity-100 rounded">
                <div>Period</div>
                <div class="mb-5" id="choosenBalancePeriod"></div>
            </div>
            <form id="balancePeriodForm"  action="balanceFunctions.php" method="post">
                <div class="d-flex flex-row-reverse justify-content-between mb-3 p-3 bg-white opacity-100 rounded" id="periodContainer">
                    <div>
                        <label for="balancePeriod" class="form-label">Choose balance period:</label>
                        <select class="form-select" aria-label="Default select example" id="balancePeriod">
                            <option value="current month"selected>Current month</option>
                            <option value="last month">Last month</option>
                            <option value="current year">Current Year</option>
                            <option value="Custom">Custom</option>
                        </select>
                    </div>
                </div>
            </form>
            <div class="d-flex justify-content-between">
                <div class="d-flex flex-column mb-5 p-3 bg-white opacity-100 rounded">
                    <div id="expensesTotal">Expenses:</div>
                    <div class="text-center mb-2" id="expensesList"></div>
                </div>
                <div class="d-flex flex-column mb-5 p-3 bg-white opacity-100 rounded">
                    <div id="balanceQuote">Balance</div>
                </div>
                <div class="d-flex flex-column mb-5 p-3 bg-white opacity-100 rounded">
                    <div id="incomesTotal">Incomes:</div>
                    <div class="text-center" id="incomesList"></div>       
                </div>
            </div>
            <div class="d-flex flex-column gap-3 align-items-center flex-md-row justify-content-between mb-3 p-3 bg-white opacity-100 rounded">
                <div class="col-4 d-flex flex-column">
                    
                </div>
                <div class="col-4 d-flex flex-column">
                    <div class="text-center">
                        <canvas id="incomesChart" style="width:100%;max-width:700px"></canvas>
                    </div>
                    <div class="text-center">
                        <canvas id="expensesChart" style="width:100%;max-width:700px"></canvas>
                    </div>
                </div>
                <div class="col-4 d-flex flex-column mb-2">
                    
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
</body>

</html>