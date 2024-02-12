<?php 
    session_start();

    if (isset($_SESSION['idLoggedInUser'])) {

        require_once 'connect.php';


    } else {
        header('Location: index.php');
    }





?>