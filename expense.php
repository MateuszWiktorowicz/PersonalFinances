<?php 
    
    require_once "database.php";
    require_once "functions.php";

    if (!isset($_SESSION['idLoggedInUser'])) {
        header('Location: index.php');
        exit();
    }

    $amount = $_POST['amount'];
    $date = $_POST['date'];
    $paymentMethod = $_POST['paymentMethod'];
    $categoryName = $_POST['categoryName'];
    $comment = $_POST['comment'];
    $comment = htmlentities($comment, ENT_QUOTES, "UTF-8");
                                                                   
    $categoryId = findIdCategoryByName($db, $categoryName, 'expenses_category_assigned_to_users');
    $paymentMethodId = findIdCategoryByName($db, $paymentMethod, 'payment_methods_assigned_to_users');  

    try {
        $query = $db->prepare("
        INSERT INTO expenses VALUES(NULL, :idUser, :categoryId, :paymentMethod, :amount, :date, :comment)
        ");
        $query->bindParam(':idUser', $_SESSION['idLoggedInUser'], PDO::PARAM_INT);
        $query->bindParam(':categoryId', $categoryId, PDO::PARAM_INT);
        $query->bindParam(':paymentMethod', $paymentMethodId, PDO::PARAM_INT);
        $query->bindParam(':amount', $amount, PDO::PARAM_INT);
        $query->bindParam(':date', $date, PDO::PARAM_STR);
        $query->bindParam(':comment', $comment, PDO::PARAM_STR);

        if ($query->execute()) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'fail']);
        }

    } catch (PDOException $error) {
        echo $error->getMessage();
    }

