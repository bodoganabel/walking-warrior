<?php

class Database {
    private static $production = true;
    private static $host = 'localhost';
    private static $db_name = 'walkingw';

    private static $db_password = 'tRcQ7T2zjHRpDh';
    private static $db_user = 'walkingw';

    private static $instance = null;

    private function __construct() { }

    public static function connect() {
        if( !self::$instance ){
            self::$instance = new PDO('mysql:host='.self::$host.';dbname='.self::$db_name, self::$db_user, self::$db_password, array(
                PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8 COLLATE utf8_hungarian_ci',
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ));
        }

        return self::$instance;
    }
}