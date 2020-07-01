<?php
class Manager {
    private static $version = '2.0';
    private static $scripts = [
        'libs/score-counter.js?v=%s',
        'libs/line-builder.js?v=%s',
        'libs/text-builder.js?v=%s',
        'libs/button-builder.js?v=%s',
        'libs/shape-matcher.js?v=%s',
        'libs/music-player.js?v=%s',
        'globals.js?v=%s',
        'states/base-state.js?v=%s',
        'states/boot.js?v=%s',
        'states/preload.js?v=%s',
        'states/error.js?v=%s',
        'states/menu.js?v=%s',
        'states/levels.js?v=%s',
        'states/counter.js?v=%s',
        'states/install.js?v=%s',
        'states/next-level.js?v=%s',
        'levels/base-level.js?v=%s',
        'levels/token-level.js?v=%s',
        'levels/level1.js?v=%s',
        'levels/level2.js?v=%s',
        'levels/level3.js?v=%s',
        'levels/level4.js?v=%s',
        'levels/level5.js?v=%s',
        'levels/level6.js?v=%s',
        'levels/level7.js?v=%s',
        'levels/level8.js?v=%s',
        'levels/level9.js?v=%s',
        'levels/level10.js?v=%s',
        'levels/level11.js?v=%s',
        'levels/level12.js?v=%s',
        'levels/level13.js?v=%s',
        'levels/level14.js?v=%s',
        'levels/level15.js?v=%s',
        'levels/level16.js?v=%s',
        'levels/level17.js?v=%s',
        'levels/level18.js?v=%s',
        'levels/level19.js?v=%s',
        'levels/level20.js?v=%s',
        'levels/level21.js?v=%s',
        'levels/level22.js?v=%s',
        'levels/level23.js?v=%s',
        'levels/sandbox.js?v=%s',
        'instructions/instruction.js?v=%s',
        'instructions/instruction1.js?v=%s',
        'instructions/instruction2.js?v=%s',
        'instructions/instruction3.js?v=%s',
        'instructions/instruction4.js?v=%s',
        'instructions/instruction5.js?v=%s',
        'instructions/instruction6.js?v=%s',
        'instructions/instruction7.js?v=%s',
        'instructions/instruction8.js?v=%s',
        'game.js?v=%s'
    ];

    private static $login_error = null;

    public static function includeScripts() {
        foreach (self::$scripts as $script) {
            $src = sprintf("public/js/" . $script, self::$version);
            echo "<script src=\"". $src ."\"></script>";
        }
    }


    public static function authenticate() {
        if (empty($_SESSION['logged_in'])) {
            header('Location: login.php');
            return;
        }
    }

    public static function addLoginError($msg) {
        self::$login_error = $msg;
    }

    public static function showLoginError($html) {
        if (self::$login_error) {
            echo sprintf($html, self::$login_error);
            self::$login_error = null;
        }
    }

    public static function login($params) {
        $username = isset($params['username']) ? $params['username'] : null;
        $password = isset($params['password']) ? $params['password'] : null;

        if (empty($username) || empty($password)) {
            Manager::addLoginError('Password and username must be entered.');
            return;
        }

        $db = Database::connect();
        $stmt = $db->prepare("SELECT id, username, password FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if (!$user) {
            self::addLoginError('Invalid username or password.');
            return;
        }

        if (password_verify($password, $user['password'])) {
            $_SESSION['logged_in'] = true;
            $_SESSION['user_id'] = $user['id'];
            header('Location: index.php');
            return;
        } else {
            self::addLoginError('Invalid username or password.');
            return;
        }
    }

    public static function passwordRecover($params) {
        $username = isset($params['username']) ? $params['username'] : null;
        $old_password = isset($params['old-password']) ? $params['old-password'] : null;
        $new_password1 = isset($params['new-password-1']) ? $params['new-password-1'] : null;
        $new_password2 = isset($params['new-password-2']) ? $params['new-password-2'] : null;

        if (empty($username) || empty($old_password) || empty($new_password1) || empty($new_password2)) {
            self::addLoginError('All fields must be entered.');
            return;
        }

        $db = Database::connect();
        $stmt = $db->prepare("SELECT username, password, id FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if (!$user) {
            self::addLoginError('No user found with the given credentials.');
            return;
        }

        if (!password_verify($old_password, $user['password'])) {
            self::addLoginError('No user found with the given credentials.');
            return;
        }

        if ($new_password1 !== $new_password2) {
            self::addLoginError('New passwords need to match.');
            return;
        }

        if (strlen($new_password1) < 8) {
            self::addLoginError('New password needs to be 8 characters at least.');
            return;
        }

        $new_password = password_hash($new_password1, PASSWORD_DEFAULT);
        $stmt = $db->prepare("UPDATE users SET password = ? WHERE id = ?");
        $stmt->execute([$new_password, $user['id']]);

        header('Location: login.php');
    }

    public static function registration($params) {
        $username = isset($params['username']) ? $params['username'] : null;
        $password1 = isset($params['password-1']) ? $params['password-1'] : null;
        $password2 = isset($params['password-2']) ? $params['password-2'] : null;

        if (empty($username) || empty($password1) || empty($password2)) {
            self::addLoginError('All fields must be entered.');
            return;
        }

        if ($password1 !== $password2) {
            self::addLoginError('Passwords need to match.');
            return;
        }

        if (strlen($username) < 3 && strlen($username) > 50) {
            self::addLoginError('Username must be between 3 and 50 characters');
            return;
        }

        if (strlen($password1) < 8) {
            self::addLoginError('Password must be 8 characters at least');
            return;
        }

        $db = Database::connect();
        $stmt = $db->prepare("SELECT username, password, id FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if (!empty($user)) {
            self::addLoginError('This username is already taken.');
            return;
        }

        $password_hash = password_hash($password1, PASSWORD_DEFAULT);
        $stmt = $db->prepare("INSERT INTO users(username, password, tokens, steps, gamelevel) VALUES(?, ?, 0, 0, 1)");
        $stmt->execute([$username, $password_hash]);

        header('Location: login.php');
    }
    
    public static function checkUser($username, $password) {
        $db = Database::connect();
        $stmt = $db->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if (!$user) {
            return null;
        }

        if (password_verify($password, $user['password'])) {
            return $user;
        }

        return null;
    }
}
