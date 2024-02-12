<?php 
    session_start();

    if (isset($_POST['registerInputEmail'])) {
    $name = $_POST['registerInputName'];
    $email = $_POST['registerInputEmail'];
    $password = $_POST['registerInputPassword'];

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    require_once 'database.php';

    try {
    
        $query = $db->prepare("SELECT * FROM users WHERE email = :email");
        $query->bindValue(':email', $email, PDO::PARAM_STR);
        $query->execute();
    
        $row = $query->fetch(PDO::FETCH_ASSOC);
    
        if ($row) {
            echo json_encode(['status' => 'fail']);
        } else {
            $query = $db->prepare("INSERT INTO users (name, email, password) VALUES(:name, :email, :password)");
            $query->bindParam(':name', $name, PDO::PARAM_STR);
            $query->bindParam(':email', $email, PDO::PARAM_STR);
            $query->bindParam(':password', $passwordHash, PDO::PARAM_STR);
    
            if ($query->execute()) {
                echo json_encode(['status' => 'success']);
            } else {
                echo json_encode(['status' => 'fail']);
            }
        }
    
    } catch (PDOException $error) {
    
    }

   


    } else {
        header('Location: index.php');
    }

    




?>