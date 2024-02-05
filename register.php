<?php 
    session_start();

    if(isset($_POST['registerInputEmail'])) {
        
        $registerValidationCorrect = true;

        $nick = $_POST['registerInputName'];
        $email = $_POST['registerInputEmail'];
        $password = $_POST['registerInputPassword']
        $password1 = $_POST['registerInputPassword']

        if (((strlen($nick) < 3) || (strlen($nick) > 20))) {
            $registerValidationCorrect = false;
            $_SESSION['errorNick'] = "Nick have to contain from 3 to 20 characters!";
        }

        if (!ctype_alnum($nick)) {
            $registerValidationCorrect = false;
            $_SESSION['errorNick'] = "Nick have to contain letters and numbers only!";
        }

        $emailSafety = filter_var($email, FILTER_SANITIZE_EMAIL);

        if (!filter_var($emailSafety, FILTER_VALIDATE_EMAIL) || ($emailSafety !== $email)) {
            $registerValidationCorrect = false;
            $_SESSION['errorEmail'] = "Invalid email";
        }

        if (strlen($password) < 3 || strlen($password > 20)) {
            $registerValidationCorrect = false;
            $_SESSION(['errorPassword']) = "Password have to contain from 8 to 20 characters!"
        }

        if ($password != $password1) {
            $registerValidationCorrect = false;
            $_SESSION(['errorPassword']) = "Passwords are not the same!"
        }




    }


?>