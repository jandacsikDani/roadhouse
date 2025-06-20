<?php
namespace Core;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthMiddleware{
    public static function handle(){
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
        if(!str_starts_with($authHeader, 'Bearer ')){
            Response::json(['error' => 'Missing token'], 401);
            return;
        }
        $token = substr($authHeader, 7);
        try{
            $secret = $_ENV['JWT_SECRET'];
            $decoded = JWT::decode($token, new Key($secret, 'HS256'));
            $_REQUEST['userId'] = $decoded->userId;
        }catch(\Exception $e){
            Response::json(['error' => 'Invalid token'], 401);
        }
    }
}