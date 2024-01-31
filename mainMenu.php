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
        <div class="d-flex flex-column mt-5">
            <div class="text-center fs-5 bg-white opacity-75">
               <h1> Welcome to Your Financial Management App, <span class="text-success" id="welcomeNameBox"></span></h1>
            <p>
                We're here to help you take control of your finances. Below are some key options to get you started:
            </p>
            <p>
                <h2>Add Income:</h2>
                Record your sources of income to keep track of your earnings.
            </p>
            <p>
                <h2>Add Expense:</h2>
                Log your expenses to maintain a detailed record of your spending habits.
            </p>
            <p>
                <h3>View Balance:</h3>
                Check your overall financial balance to stay informed about your financial health.
            </p>
            <p>
                <h2>Change Settings:</h2>
                Adjust your account settings according to your preferences.
            </p>
            <p>
                <h2>Logout:</h2>
                Logout of your account to ensure the security of your information.
            </p>
            </div>
                   
        </div>
    </main>
    <footer class="text-center bg-white">
        <div class="container">github.com/MateuszWiktorowicz</div>
    </footer>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="./userManager.js"></script>
    <script src="./accountManager.js"></script>
</body>

</html>