<?php
    require_once 'classes/autoload.php';
    if (isset($_POST['login'])) {
        session_start();
        Manager::login($_POST);
    }
?>
<html>
    <head>
        <meta charset="UTF-8">
        <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
        <title>Walking Warrior</title>
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Raleway:300,400,700">
        <link rel="stylesheet" type="text/css" href="public/css/main.css">
        <style>
            body { font-family: 'Raleway', sans-serif; }
        </style>
    </head>
    <body>
        <div id="page">
            <div id="form-container">
                <h1>Walking Warrior login</h1>
                <form action="" method="POST">
                    <div>
                        <?php Manager::showLoginError("<span class=\"error\">%s</span>"); ?>
                    </div>
                    <div class="input-row">
                        <label for="username">Username</label>
                        <input type="text" id="username" name="username">
                    </div>
                    <div class="input-row">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password">
                    </div>
                    <!-- <input type="checkbox" name="remember-me"> -->
                    
                    <div class="links">
                        <a href="registration.php">Don't have an account? Sign up! &raquo;</a>
                        <a href="password_recovery.php">Wanna change password? Do it! &raquo;</a>
                    </div>
                    <div class="input-row">
                        <input type="submit" name="login" value="Login">
                    </div>
                </form>
            </div>
        </div>
        
    </body>
</html>