<?php
namespace Core;
class Response{
    public static function json($data, int $statuscode = 200){
        http_response_code($statuscode);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }
}