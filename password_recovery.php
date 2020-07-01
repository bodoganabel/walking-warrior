<?php
    require_once 'classes/autoload.php';
    if (isset($_POST['password-recover'])) {
        session_start();
        Manager::passwordRecover($_POST);
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
                <h1>Walking Warrior password change</h1>
                <form action="" method="POST">
                    <div>
                        <?php Manager::showLoginError("<span class=\"error\">%s</span>"); ?>
                    </div>
                    <div class="input-row">
                        <label for="username">Username</label>
                        <input type="text" id="username" name="username">
                    </div>
                    <div class="input-row">
                        <label for="old-password">Password</label>
                        <input type="password" id="old-password" name="old-password">
                    </div>
                    <div class="input-row">
                        <label for="new-password-1">New password</label>
                        <input type="password" id="new-password-1" name="new-password-1">
                    </div>
                    <div class="input-row">
                        <label for="new-password-2">New password again</label>
                        <input type="password" id="new-password-2" name="new-password-2">
                    </div>
                    <div class="links">
                        <a href="login.php">Have an account? Sign in! &raquo;</a>
                    </div>
                    <!-- <input type="checkbox" name="remember-me"> -->
                    <div class="input-row">
                        <input type="submit" name="password-recover" value="Change password">
                    </div>
                </form>
            </div>
        </div>
</body>
</html>