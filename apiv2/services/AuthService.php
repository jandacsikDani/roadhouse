<?php
namespace Services;

use PDO;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthService{
    private PDO $db;
    private string $secret;

    public function __construct(PDO $db, string $secret){
        $this->secret = $secret;
        $this->db = $db;
    }

    public function login(string $username, string $password): ?string {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !password_verify($password, $user['password'])) {
            return null;
        }

        $payload = [
            'userId' => $user['id'],
            'exp' => time() + (60 * 60 * 12) // 12 óra
        ];

        return JWT::encode($payload, $this->secret, 'HS256');
    }

    public function register(string $username, string $password): bool {
        $stmt = $this->db->prepare("SELECT id FROM users WHERE username = ?");
        $stmt->execute([$username]);
        if ($stmt->fetch()) {
            return false; // már létezik
        }

        $hashed = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $this->db->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        return $stmt->execute([$username, $hashed]);
    }

    public function verifyToken(string $token): ?int {
        try {
            $decoded = JWT::decode($token, new Key($this->secret, 'HS256'));
            return $decoded->user_id ?? null;
        } catch (\Exception $e) {
            return null;
        }
    }
}