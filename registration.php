<?php
    require_once 'classes/autoload.php';
    if (isset($_POST['login'])) {
        session_start();
        Manager::registration($_POST);
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
                <h1>Walking Warrior registration</h1>
                <form action="" method="POST">
                    <div>
                        <?php Manager::showLoginError("<span class=\"error\">%s</span>"); ?>
                    </div>
                    <div class="input-row">
                        <label for="username">Username</label>
                        <input type="text" id="username" name="username">
                    </div>
                    <div class="input-row">
                        <label for="password-1">Password</label>
                        <input type="password" id="password" name="password-1">
                    </div>
                    <div class="input-row">
                        <label for="password-2">Password again</label>
                        <input type="password" id="password-2" name="password-2">
                    </div>
                    
                    <div class="links">
                        <a href="login.php">Have an account? Sign in! &raquo;</a>
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