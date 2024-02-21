<?php 
   require_once 'database.php';
   require_once 'functions.php';

    if (!isset($_SESSION['idLoggedInUser'])) {
        header('Location: index.php');
        exit();
    }

 

    $startDate = $_POST['startDate'];
    $endDate = $_POST['endDate'];

    
    try {
        $incomesBalance = getIncomesBalanceGroupedByCategoriesNameFromPeriod($startDate, $endDate, $db);
        $expensesBalance = getExpensesBalanceGroupedByCategoriesNameFromPeriod($startDate, $endDate, $db);
        $incomesOperations = getIncomesOperationsFromPeriod($startDate, $endDate, $db);
        $expensesOperations = getExpensesOperationsFromPeriod($startDate, $endDate, $db);

        echo json_encode(['status' => 'success', 'balanceByCategoriesFromPeriod' => [$incomesBalance, $expensesBalance], 'accountOperationsFromPeriod' => [$incomesOperations, $expensesOperations]]);
    } catch (PDOException $error) {
        echo json_encode(['status' => 'error', 'message' => $error->getMessage()]);
    }


?>