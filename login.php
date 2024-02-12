<?php 
    session_start();

    if ((!isset($_POST['login'])) || (!isset($_POST['password'])))
	{
		header('Location: index.php');
		exit();
	}

    require_once "connect.php";


    
    $connection = new mysqli($host, $db_user, $db_password, $db_name);

    if ($connection -> connect_errno != 0) {
        echo "Error: ".$connection -> connect_errno;
    } else {
        $login = $_POST['login'];
        $password = $_POST['password'];

        $login = htmlentities($login, ENT_QUOTES, "UTF-8");
        $password = htmlentities($password, ENT_QUOTES, "UTF-8");

        if ($result = $connection -> query (
            sprintf ("SELECT * FROM users WHERE email = '%s'",
            mysqli_real_escape_string($connection, $login)))) {

                $usersNumber = $result -> num_rows;
                if ($usersNumber > 0) {
                    $row = $result -> fetch_assoc();
                    if(password_verify($password, $row['password'])) {
                    $_SESSION['loggedIn'] = true;

                    
                    $_SESSION['idLoggedInUser'] = $row['userId'];
                    $_SESSION['name'] = $row['name']; 

                    
                    echo json_encode(['status' => 'success', 'redirect' => 'mainMenu.php']);
                } else {
                    $_SESSION['loginError'] = '<div style="color:red">Incorrect email or password!</div>';

                    echo json_encode(['status' => 'failed']);
                }
            }
            $result -> free_result();
            }

            $connection -> close();
    }



?>