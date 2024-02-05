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
            <a class="navbar-brand" href="./index.html">
                <img src="./images/piggyBank.png" alt="piggy-bank-image" width="50" height="50">
                PersonalFinances
            </a>
            
            <div class="d-flex gap-5 p-3">
                <div><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#loginLabel">Sign In</button></div>
                <div><button class="btn btn-info text-light" data-bs-toggle="modal" data-bs-target="#registerLabel">Sign Up</button></div>
            </div>
        </div>
    </nav>
    <main>
        <div class="d-flex flex-column m-1">
            <div class="bg-white rounded opacity-75 m-5 p-5">
                <div class="d-flex flex-column gap-3 fw-bold">
                    <div class="fs-4">Why you should start using our app?</div>
                    <div>1. Increased Financial Awareness</div>
                    <div>2. Real-Time Monitoring and Visibility</div>
                    <div>3. Goal Setting and Planning</div>
                </div>
                
            </div>
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
                <div class="d-flex flex-column align-items-center gap-3 bg-white opacity-75 rounded m-5 p-5">
                    <div>Have You account already?</div>
                    <div><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#loginLabel">Sign In</button></div>
                </div>
                <div class="d-flex flex-column align-items-center gap-3 bg-white opacity-75 rounded m-5 p-5">
                    <div>Don't you have account yet? Don't worry!</div>
                    <div><button class="btn btn-info text-light" data-bs-toggle="modal" data-bs-target="#registerLabel">Sign Up</button></div>
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
                    <form id="loginForm" action="login.php" method="post">
                        <div class="mb-3">
                          <label for="loginInputEmail" class="form-label">Email address</label>
                          <input type="email" name="loginInputEmail" class="form-control" id="loginInputEmail" required>
                        </div>
                        <div class="mb-3">
                          <label for="loginInputPassword" class="form-label">Password</label>
                          <input type="password" name="loginInputPassword" class="form-control" id="loginInputPassword" required>
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

          <div class="modal fade" id="registerLabel" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">Sign Up Form</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="registerForm">
                        <div class="mb-3">
                            <label for="registerInputName" class="form-label">Name</label>
                            <input type="text" class="form-control" id="registerInputName" required>
                          </div>
                        <div class="mb-3">
                          <label for="registerInputEmail" class="form-label">Email address</label>
                          <input type="email" class="form-control registerEmail" id="registerInputEmail" required>
                        </div>
                        <div class="mb-3">
                          <label for="registerInputPassword" class="form-label">Password</label>
                          <input type="password" class="form-control" id="registerInputPassword" required>
                        </div>
                        <div class="mb-3">
                            <label for="confirmRegisterInputPassword" class="form-label">Confirm Password</label>
                            <input type="password" class="form-control confirmPassword" id="confirmRegisterInputPassword" required>
                        </div>
                        <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" id="registerSubmit">Submit</button>
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