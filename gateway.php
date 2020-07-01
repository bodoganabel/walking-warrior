<?php
require_once 'classes/autoload.php';

//androidos bejelentkezés true vagy false-t küld vissza
if (!empty($_REQUEST['android-login'])) {
    $username = empty($_REQUEST['username']) ? '' : $_REQUEST['username'];
    $password = empty($_REQUEST['password']) ? '' : $_REQUEST['password'];

    echo Manager::checkUser($username, $password) != null ? 'true' : 'false';
}

//lépések mentése, token adása
if (!empty($_REQUEST['update-steps'])) {
    
    $username = empty($_REQUEST['username']) ? '' : $_REQUEST['username'];
    $password = empty($_REQUEST['password']) ? '' : $_REQUEST['password'];
    $steps = empty($_REQUEST['steps']) ? 0 : $_REQUEST['steps'];
    $steps = intval($steps);
    $steps_for_one_token = 20;
    $db = Database::connect();
    $user = Manager::checkUser($username, $password);

    if ($user != null) {
        $steps_left_to_token = $user['steps'] - $user['checkpoint_steps'];


        //ha van tokenje, akkor nem adunk neki ujat a lépésekért, de a lépései eltároljuk
        if ($user['tokens'] > 0) {
            $stmt = $db->prepare("UPDATE users SET steps = steps + ? WHERE username = ?");
            $stmt->execute([$steps, $username]);
            echo "Your steps are saved. You didn't receive a token because you already have one.";
            exit();
        }

        //ha nincs tokenje, de a lépései elegek egy tokenhez, akkor megadjuk neki
        if ($user['tokens'] == 0 && $steps_left_to_token + $steps >= $steps_for_one_token) {
            $stmt = $db->prepare("UPDATE users SET tokens = 1,  checkpoint_steps = steps + ?, steps = steps + ? WHERE username = ?");
            $stmt->execute([$steps, $steps, $username]);
            echo "You have received a token.";
            exit();
        }

        //ha nincs tokenje, de a lépései még nem elegek az új tokenhez, akkor csak mentjük a lépéseket
        if ($user['tokens'] == 0 && $steps_left_to_token + $steps < $steps_for_one_token) {
            $stmt = $db->prepare("UPDATE users SET steps = steps + ? WHERE username = ?");
            $stmt->execute([$steps, $username]);
            echo "Your steps are saved but you need to walk another " . ($steps_for_one_token - ($steps + $steps_left_to_token) . " steps to receive a token.");
            exit();
        }
    } else {
        echo 'Authentication error.';
    }
}