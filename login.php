<?php 
    session_start();

    if ((!isset($_POST['login'])) || (!isset($_POST['password'])))
	{
		header('Location: index.php');
		exit();
	}

    require_once "database.php";

    $login = $_POST['login'];
    $password = $_POST['password'];
    
    $login = htmlentities($login, ENT_QUOTES, "UTF-8");
    $password = htmlentities($password, ENT_QUOTES, "UTF-8");
    
    try {
        $query = $db->prepare("SELECT * FROM users WHERE email = :email");
        $query->bindParam(':email', $login, PDO::PARAM_STR);
        $query->execute();
    
        $row = $query->fetch(PDO::FETCH_ASSOC);
    
        if ($row) {
            if (isset($password) && password_verify($password, $row['password'])) {
                $_SESSION['loggedIn'] = true;
                $_SESSION['idLoggedInUser'] = $row['userId'];
                $_SESSION['name'] = $row['name'];
    
                echo json_encode(['status' => 'success', 'redirect' => 'mainMenu.php']);
            } else {
                echo json_encode(['status' => 'failed', 'error' => 'Incorrect email or password']);
            }
        } else {
            echo json_encode(['status' => 'failed', 'error' => 'User not found']);
        }
    } catch (PDOException $error) {
        echo json_encode(['status' => 'failed', 'error' => 'Database error']);
    }
    ?>