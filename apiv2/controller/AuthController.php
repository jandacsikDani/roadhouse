<?php
namespace Controller;

use Core\Response;
use Core\Database;
use Services\AuthService;


class AuthController{
    private AuthService $authService;

    public function __construct(){
        $db = Database::connect();
        $secret = $_ENV['JWT_SECRET'];
        $this->authService = new AuthService($db, $secret);
    }

    public function login(){
        try{
            $body = json_decode(file_get_contents("php://input"), true);
            $username = $body['username'] ?? null;
            $password = $body['password'] ?? null;
    
            if (!$username || !$password) {
                Response::json(['message' => 'Missing fields'], 400);
                return;
            }
    
            $token = $this->authService->login($username, $password);
            if ($token === null) {
                Response::json(['message' => 'Invalid credentials'], 401);
                return;
            }
    
            Response::json(['token' => $token]);
        }
        catch(\Exception $e){
            Response::json([
                'message'=>'Fail during login',
                'error'=>$e->getMessage(),
                'code'=>$e->getCode()
            ]);
        }
    }

    public function register(){
        $body = json_decode(file_get_contents("php://input"), true);
        $username = $body['username'] ?? null;
        $password = $body['password'] ?? null;

        if (!$username || !$password) {
            Response::json(['message' => 'Hiányzó mezők'], 400);
            return;
        }


        $success = $this->authService->register($username, $password);
        if (!$success) {
            Response::json(['message' => 'Username already taken'], 409);
            return;
        }

        Response::json(['message'=>'Succesfull registration'], 201);
    }
}