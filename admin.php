<?php
    require_once 'classes/autoload.php';

    $users = Ajax::getAllUsers();
?>
<html>
    <head>
        <meta charset="UTF-8">
        <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
        <title>Walking Warrior</title>
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Raleway:300,400,700">
        <link rel="stylesheet" type="text/css" href="public/css/main.css?v=1.1">
        <style>
            body { font-family: 'Raleway', sans-serif; }
            table { width: 100%; }
            th { text-align: left; }
        </style>
    </head>
    <body>

        <div id="page" style="display: block; padding: 12px;">
            <table>
                <tr>
                    <th>Username</th>
                    <th>Tokens</th>
                    <th>Steps</th>
                    <th>Score</th>
                    <th>Highest Level</th>
                    <th>Created at</th>
                    <th>Last modified</th>
                </tr>        
            <?php foreach ($users as $user) : ?>
                <tr>
                    <td><?= $user['username'] ?></td>
                    <td><?= $user['tokens'] ?></td>
                    <td><?= $user['steps'] ?></td>
                    <td><?= $user['score'] ?></td>
                    <td><?= $user['gamelevel'] ?></td>
                    <td><?= $user['created_at'] ?></td>
                    <td><?= $user['tm'] ?></td>
                </tr>
            <?php endforeach; ?>
            </table>
        </div>
    </body>
</html>