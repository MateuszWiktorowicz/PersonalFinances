<?php 
    session_start();

    if ((!isset($_POST['login'])) || (!isset($_POST['password'])))
	{
		header('Location: index.php');
		exit();
	}

    require_once "database.php";
    require_once "functions.php";

    $login = $_POST['login'];
    $password = $_POST['password'];
    
    $login = htmlentities($login, ENT_QUOTES, "UTF-8");
    $password = htmlentities($password, ENT_QUOTES, "UTF-8");
    
    try {
        
    
        $row = findUserByEmail($db, $login);
    
        if ($row) {
            if (isset($password) && password_verify($password, $row['password'])) {
                $_SESSION['loggedIn'] = true;
                $_SESSION['idLoggedInUser'] = $row['id'];
                $_SESSION['name'] = $row['username'];

                //$_SESSION['userSettings'] = loadUserSettings($db, $_SESSION['idLoggedInUser']);
    
                echo json_encode(['status' => 'success', 'redirect' => 'mainMenu.php', 'idLoggedInUser' => $_SESSION['idLoggedInUser']]);
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