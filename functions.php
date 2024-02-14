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

        return [$userAssignedIncomesName, $userAssignedExpensesName, $userAssignedPaymentMethods];
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