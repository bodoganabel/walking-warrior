<?php

class Ajax {
    
    public static function beforeLevel() {
        $db = Database::connect();
        $user_id = $_SESSION['user_id'];
        
        $stmt = $db->prepare("SELECT tester, tokens, gamelevel, last_saved_state  FROM users WHERE id = ?");
        $stmt->execute([$user_id]);

        return $stmt->fetch();
    }

    public static function updateLevel() {
        $db = Database::connect();
        $level = $_POST['level'];
        $user_id = $_SESSION['user_id'];

        $stmt = $db->prepare("UPDATE users SET gamelevel = ? WHERE id = ? AND gamelevel < ?");
        $stmt->execute([$level, $user_id, $level]);

        return true;
    }

    public static function removeTokens() {
        $db = Database::connect();
        $user_id = $_SESSION['user_id'];

        $stmt = $db->prepare("UPDATE users SET tokens = ? WHERE id = ?");
        $stmt->execute([0, $user_id]);
    }

    public static function saveGameState() {
        $db = Database::connect();
        $user_id = $_SESSION['user_id'];
        $data = $_POST['data'];

        $stmt = $db->prepare("UPDATE users SET last_saved_state = ? WHERE id = ?");
        $stmt->execute([$data, $user_id]);
    }

    public static function getSavedGameState() {
        $db = Database::connect();
        $user_id = $_SESSION['user_id'];

        $stmt = $db->prepare("SELECT last_saved_state FROM users WHERE id = ?");
        $stmt->execute([$user_id]);

        return $stmt->fetch()[0];
    }

    public static function getAllUsers() {
        $db = Database::connect();

        return $db->query("SELECT id, username, tokens, steps, score, created_at, tm, gamelevel FROM users ORDER BY id");
    }

    public static function getToken() {
        $db = Database::connect();
        $user_id = $_SESSION['user_id'];

        $stmt = $db->prepare("SELECT tokens FROM users WHERE id = ?");
        $stmt->execute([$user_id]);

        return $stmt->fetch()[0];
    }
}