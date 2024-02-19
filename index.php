<?php 
  session_start();

  if ((isset($_SESSION['loggedIn'])) && ($_SESSION['loggedIn'] == true)) {
    header('Location: mainMenu.php');
		exit();
  }

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PersonalFinances</title>
   
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link href="./styles.css" rel="stylesheet" />

</head>


<body class="d-flex flex-column">
    <nav class="navbar bg-body-tertiary">
        <div class="container-sm d-flex justify-content-between align-items-center">
          <div class="col-3">
            <a class="navbar-brand" href="./index.html">
                <img src="./images/piggyBank.png" alt="piggy-bank-image" width="50" height="50">
                PersonalFinances
            </a>
</div>
            <div class="d-flex justify-content-between align-items-center text-center gap-2 p-3 col-3">
                <div class="menuOptions col-6" data-bs-toggle="modal" data-bs-target="#loginLabel">Sign In</div>
                <div class="menuOptions col-6"  data-bs-toggle="modal" data-bs-target="#registerLabel">Sign Up</div>
            </div>
        </div>
    </nav>
    <main>
      <div class="d-flex flex-column align-items-center mt-5 mx-2"> 
       <div class="d-flex text-center col-12 col-md-6 flex-column gap-3 fw-bold bg-white rounded p-3 mx-2">
            <div class="fs-4 bg-white">Why you should start using our app?</div>
            <div class="bg-white">1. Increased Financial Awareness</div>
            <div class="bg-white">2. Real-Time Monitoring and Visibility</div>
            <div class="bg-white">3. Goal Setting and Planning</div>
        </div>

        <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mt-5 gap-2">
            <div class="d-flex col-12 col-md-6 flex-column align-items-center justify-content-between gap-3 bg-white rounded p-3 buttonContainer">
                <div class="bg-white">Have You account already?</div>
                <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#loginLabel">Sign In</button>
            </div>
            <div class="d-flex col-12 col-md-6 flex-column align-items-center justify-content-between gap-3 bg-white rounded p-3 buttonContainer">
                <div class="bg-white">Don't you have account yet? Don't worry!</div>
                <button class="btn btn-info text-light" data-bs-toggle="modal" data-bs-target="#registerLabel">Sign Up</button>
            </div>
        </div>

      </div>

          <div class="modal fade" id="registerLabel" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">Sign Up Form</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="registerForm" action="register.php" method="post">
                        <div class="mb-3">
                            <label for="registerInputName" class="form-label">Name</label>
                            <input type="text" class="form-control" name="registerInputName" id="registerInputName" required>
                          </div>
                        <div class="mb-3">
                          <label for="registerInputEmail" class="form-label">Email address</label>
                          <input type="email" class="form-control registerEmail" name="registerInputEmail" id="registerInputEmail" required>
                        </div>
                        <div class="mb-3">
                          <label for="registerInputPassword" class="form-label">Password</label>
                          <input type="password" class="form-control" name="registerInputPassword"  id="registerInputPassword" required>
                        </div>
                        <div class="mb-3">
                            <label for="confirmRegisterInputPassword" class="form-label">Confirm Password</label>
                            <input type="password" class="form-control confirmPassword" name="confirmRegisterInputPassword" id="confirmRegisterInputPassword" required>
                        </div>
                        <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" id="registerSubmit">Submit</button>
                      </form>
                </div>
                <div class="modal-footer"></div>
                </div>
            </div>
          </div>
                  

                <div class="modal fade" id="loginLabel" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">Sign In Form</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="loginForm">
                        <div class="mb-3">
                          <label for="loginInputEmail" class="form-label">Email address</label>
                          <input type="email" class="form-control" id="loginInputEmail" required>
                        </div>
                        <div class="mb-3">
                          <label for="loginInputPassword" class="form-label">Password</label>
                          <input type="password" class="form-control" id="loginInputPassword" required>
                        </div>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" id="loginSubmit">Submit</button>
                      </form>
                </div>
                <div class="modal-footer">
                </div>
              </div>
            </div>
          </div>

    </main>
    <footer class="text-center bg-white">
        <div class="container">github.com/MateuszWiktorowicz</div>
    </footer>    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="./userManager.js"></script>
</body>

</html>