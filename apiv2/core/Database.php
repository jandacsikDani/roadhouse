<?php
namespace Core;

use PDO;

class Database{
    public static function connect(): PDO{
        $host = $_ENV['DB_HOST'];
        $name = $_ENV['DB_NAME'];
        $user = $_ENV['DB_USER'];
        $password = $_ENV['DB_PASSWORD'];

        return new PDO("mysql:host=$host;dbname=$name", $user, $password);
    }
}