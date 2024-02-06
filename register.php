<?php 
    session_start();

    $name = $_POST['registerInputName'];
    $email = $_POST['registerInputEmail'];
    $password1 = $_POST['registerInputPassword'];

    require_once "connect.php";

    mysqli_report(MYSQLI_REPORT_STRICT);

    try {
        $connection = new mysqli($host, $db_user, $db_password, $db_name);

        if ($connection -> errno != 0) {
            throw new Exception(mysqli_connect_errno());
        } else {
            $result = $connection -> query("SELECT * FROM users WHERE email = '$email'");

            if (!$result) throw new Exception ($connection -> error);

            $theSameEmailInDataBase = $result -> num_rows;

            if ($theSameEmailInDataBase > 0) {
                echo "juz jest ten amil";
            } else {
                if ($connection -> query("INSERT INTO users VALUES(NULL, '$name', '$email', '$password1')")) {
                    header('Location: index.php');
                } else {
                    throw new Exception ($connection -> error);
                }
            }
        }
        $connection -> close();

    } catch (Exception $e) {
        echo "Temporary database fail. Please try register after few minutes. Thank You!".$e;
    }



?>
    