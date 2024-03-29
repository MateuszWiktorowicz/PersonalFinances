<?php
    session_start();
  

function findUserByEmail($dataBase, $email) {
        try {
            $query = $dataBase->prepare("SELECT * FROM users WHERE email = :email");
            $query->bindValue(':email', $email, PDO::PARAM_STR);
            $query->execute();
    
            return $query->fetch(PDO::FETCH_ASSOC);

        } catch (PDOException) {
            echo $error->getMessage();
            return NULL;
        }
        
    }


    function getDefaultExpensesIncomesPaymentMethodsNames($db) {
        $query = $db->prepare("SELECT name FROM expenses_category_default");
        $query->execute();

        $defaultExpensesNames = $query->fetchAll(PDO::FETCH_COLUMN);
        
        $query = $db->prepare("SELECT name FROM incomes_category_default");
        $query->execute();

        $defaultIncomesNames = $query->fetchAll(PDO::FETCH_COLUMN);
        
        $query = $db->prepare("SELECT name FROM payment_methods_default");
        $query->execute();

        $defaulPaymentMethodsNames = $query->fetchAll(PDO::FETCH_COLUMN);

        return [$defaultExpensesNames, $defaultIncomesNames, $defaulPaymentMethodsNames];
    }

    function assignDefaultCategoiresNames($dataBase, $userId, $tableName, $names) {
        try {
            $query = $dataBase->prepare("INSERT INTO $tableName (user_id, name) VALUES(:user_id, :name)");

            foreach($names as $name) {
                $query->bindParam(':user_id', $userId, PDO::PARAM_INT);
                $query->bindParam(':name', $name, PDO::PARAM_INT);
                $query->execute();
            }
        } catch (PDOException $error) {
            echo $error->getMessage();
        }
    }

    function assignDefaultSettingsToNewUser($dataBase, $userId) {
        $defaultUserSettings = getDefaultExpensesIncomesPaymentMethodsNames($dataBase);
        $expensesNames = $defaultUserSettings[0];
        $incomesNames = $defaultUserSettings[1];
        $paymentMethods = $defaultUserSettings[2];

        assignDefaultCategoiresNames($dataBase, $userId, 'expenses_category_assigned_to_users', $expensesNames);
        assignDefaultCategoiresNames($dataBase, $userId, 'incomes_category_assigned_to_users', $incomesNames);
        assignDefaultCategoiresNames($dataBase, $userId, 'payment_methods_assigned_to_users', $paymentMethods);
    }

    function getUserAssignedCategoriesFromTable($dataBase, $tableName) {

        try {

            $query = $dataBase->prepare("
            SELECT 
                name 
            FROM 
                $tableName
            WHERE 
                user_id = :userId");
            $query->bindParam(':userId', $_SESSION['idLoggedInUser'], PDO::PARAM_INT);
            $query->execute();

            $result = $query->fetchAll(PDO::FETCH_ASSOC);

            return ($result) ? $result : [];
        } catch (PDOException $error) {
            echo $error->getMessage();
        }

    }

    function loadUserSettings($db) {
        $userAssignedIncomesName = getUserAssignedCategoriesFromTable($db, 'incomes_category_assigned_to_users');
        $userAssignedExpensesName = getUserAssignedCategoriesFromTable($db, 'expenses_category_assigned_to_users');
        $userAssignedPaymentMethods = getUserAssignedCategoriesFromTable($db, 'payment_methods_assigned_to_users');

        return [$userAssignedExpensesName, $userAssignedIncomesName, $userAssignedPaymentMethods];
    }

    function getIncomesBalance($startDate, $endDate, $db) {
        try {
            $query = $db->prepare("
            SELECT 
                c.name, 
                SUM(i.amount) AS 'Suma przychodów', 
                i.date_of_income 
            FROM 
                incomes AS i, incomes_category_assigned_to_users AS c 
            WHERE 
                i.user_id = c.user_id 
                AND 
                i.income_category_assigned_to_user_id = c.id
                AND
                i.user_id = :loggedInUserId
            GROUP BY 
                i.income_category_assigned_to_user_id
            ORDER BY 
                SUM(i.amount) DESC
            ");

            $query->bindParam(':loggedInUserId', $_SESSION['idloggedInUser'], PDO::PARAM_INT);
            $query->execute();

            return $query->fetchAll(PDO:FETCH_ASSOC);
        } catch (PDOException $error) {
            echo $error->getMessage();
        }
    }


    function findIdCategoryByName($db, $categoryName, $tableName) {
        try {
            $query = $db->prepare("SELECT id FROM $tableName WHERE name = :categoryName");
            $query->bindParam(':categoryName', $categoryName, PDO::PARAM_STR);
            $query->execute();
            $result = $query->fetch(PDO::FETCH_ASSOC);
            
            return ($result) ? $result['id'] : NULL;
        } catch (PDOException $error) {
            echo $error->getMessage();
        }
    }

    function getIncomesBalanceGroupedByCategoriesNameFromPeriod($startDate, $endDate, $db) {
        try {
            $query = $db->prepare("
            SELECT 
                c.name,
                SUM(i.amount) AS 'Value'
            FROM 
                incomes as i
                INNER JOIN incomes_category_assigned_to_users as c ON c.id = i.income_category_assigned_to_user_id
            WHERE 
                i.user_id = :loggedInUserId
                AND
                date_of_income BETWEEN :startDate AND :endDate
            GROUP BY 
                i.income_category_assigned_to_user_id
            ORDER BY 
                SUM(i.amount) DESC
            ");

            $query->bindParam(':loggedInUserId', $_SESSION['idLoggedInUser'], PDO::PARAM_INT);
            $query->bindParam(':startDate', $startDate, PDO::PARAM_STR);
            $query->bindParam(':endDate', $endDate, PDO::PARAM_STR);
            $query->execute();

            return $query->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $error) {
            echo $error->getMessage();
        }
    }

    function getExpensesBalanceGroupedByCategoriesNameFromPeriod($startDate, $endDate, $db) {
        try {
            $query = $db->prepare("
            SELECT 
                c.name,
                SUM(e.amount) AS 'Value'
            FROM 
                expenses as e
                INNER JOIN expenses_category_assigned_to_users as c ON c.id = e.expense_category_assigned_to_user_id
            WHERE 
                e.user_id = :loggedInUserId
                AND
                date_of_expense BETWEEN :startDate AND :endDate
            GROUP BY 
                e.expense_category_assigned_to_user_id
            ORDER BY 
                SUM(e.amount) DESC
            ");

            $query->bindParam(':loggedInUserId', $_SESSION['idLoggedInUser'], PDO::PARAM_INT);
            $query->bindParam(':startDate', $startDate, PDO::PARAM_STR);
            $query->bindParam(':endDate', $endDate, PDO::PARAM_STR);
            $query->execute();

            return $query->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $error) {
            echo $error->getMessage();
        }
    }

    function getIncomesOperationsFromPeriod($startDate, $endDate, $db,) {
        try {
            $query = $db->prepare("
            SELECT 
                c.name,
                i.date_of_income AS date,
                i.amount,
                i.income_comment AS comment
            FROM
                incomes AS i
                INNER JOIN incomes_category_assigned_to_users AS c ON i.income_category_assigned_to_user_id = c.id
            WHERE
                i.date_of_income BETWEEN :startDate AND :endDate
                AND
                i.user_id = :userId
            ORDER BY i.date_of_income
            ");
            $query->bindParam(':startDate', $startDate, PDO::PARAM_STR);
            $query->bindParam(':endDate', $endDate, PDO::PARAM_STR);
            $query->bindParam(':userId', $_SESSION['idLoggedInUser'], PDO::PARAM_INT);
            $query->execute();

            return $query->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $error) {
            echo $error->getMessage();
        }
    }

    function getExpensesOperationsFromPeriod($startDate, $endDate, $db,) {
        try {
            $query = $db->prepare("
            SELECT 
                c.name,
                e.date_of_expense AS date,
                e.amount,
                e.expense_comment AS comment
            FROM
                expenses AS e
            INNER JOIN expenses_category_assigned_to_users AS c ON e.expense_category_assigned_to_user_id = c.id
            WHERE
            e.date_of_expense BETWEEN :startDate AND :endDate
                AND
                e.user_id = :userId
            ORDER BY e.date_of_expense
            ");
            $query->bindParam(':startDate', $startDate, PDO::PARAM_STR);
            $query->bindParam(':endDate', $endDate, PDO::PARAM_STR);
            $query->bindParam(':userId', $_SESSION['idLoggedInUser'], PDO::PARAM_INT);
            $query->execute();

            return $query->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $error) {
            echo $error->getMessage();
        }
    }