<?php 
    session_start();

    if (isset($_POST['registerInputEmail'])) {
    $name = $_POST['registerInputName'];
    $email = $_POST['registerInputEmail'];
    $password = $_POST['registerInputPassword'];

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    require_once 'database.php';
    require_once 'functions.php';


    try {   
        if (findUserByEmail($db, $email)) {
            echo json_encode(['status' => 'fail']);
        } else {
            $query = $db->prepare("INSERT INTO users (username, email, password) VALUES(:username, :email, :password)");
            $query->bindParam(':username', $name, PDO::PARAM_STR);
            $query->bindParam(':email', $email, PDO::PARAM_STR);
            $query->bindParam(':password', $passwordHash, PDO::PARAM_STR);
    
            if ($query->execute()) {
                $addedUser = findUserByEmail($db, $email);
                assignDefaultSettingsToNewUser($db, $addedUser['id']);

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