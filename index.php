<?php
    session_start();
    require_once 'classes/autoload.php';
    Manager::authenticate();
?>
<html>
    <head>
        <meta charset="UTF-8">
        <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
        <title>Walking Warrior</title>
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Raleway:300,400,700">
        <link href="https://fonts.googleapis.com/css?family=Acme" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="public/css/main.css">
        <style>
            body { font-family: 'Raleway', sans-serif; }
        </style>
    </head>
    <body>

        <!-- script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/2.6.2/phaser.min.js"></script -->
        <script src="./phaser.min.js"></script>
        <?php Manager::includeScripts(); ?>
    </body>
</html>