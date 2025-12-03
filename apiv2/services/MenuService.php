<?php
namespace Services;

use PDO;
use PDOStatement;

class MenuService{
    private PDO $db;

    public function __construct(PDO $db){
        $this->db = $db;
    }

    public function getAll(){
        $stmt = $this->db->query("SELECT * FROM menuitems");
        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $items;
    }

    public function getFoodTypes(): array{
        $stmt = $this->db->query("SELECT * FROM menutypes ORDER BY type_order");
        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $items;
    }

    public function getById($id){
        $stmt = $this->db->prepare("SELECT * FROM menuitems WHERE id = ?");
        $stmt->execute([$id]);
        $items = $stmt->fetch(PDO::FETCH_ASSOC);
        return $items;
    }

    public function create($typeid, $name, $description, $price){
        $stmt = $this->db->prepare("INSERT INTO menuitems (typeid, name, description, price) VALUES (?,?,?,?)");
        $stmt->execute([$typeid, $name, $description, $price]);
        $item = $stmt->fetch(PDO::FETCH_ASSOC);
        return $item;
    }

    public function getFoodsByTypeId($id){
        $stmt = $this->db->prepare("SELECT * FROM menuitems WHERE typeid = ?");
        $stmt->execute([$id]);
        $item = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $item;
    }

    public function updateFood($id, array $body): bool{
        $stmt = $this->db->prepare("UPDATE menuitems SET name = ?, description = ?, price = ? WHERE id = ?");
        return $stmt->execute([
            $body['name'],
            $body['description'],
            $body['price'],
            $id
        ]);
    }

    public function deleteFood($id): bool{
        $stmt = $this->db->prepare("DELETE FROM menuitems WHERE id = ?");
        $response = $stmt->execute([$id]);
        return $response;
    }

    public function addNewType($name, $order): bool | PDOStatement{
        $stmt = $this->db->prepare("INSERT INTO menutypes (name, type_order) VALUES (?,?)");
        $stmt->execute([$name, $order]);
        return $stmt;
    }

    public function deleteType($id){
        $stmt = $this->db->prepare("DELETE FROM menutypes WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt;
    }

    public function updateTypes($body){
        $stmt = $this->db->prepare("UPDATE menutypes SET type_order = :ord WHERE id = :id");
        foreach($body as $row){
            $stmt->execute([
                ":ord" => $row['type_order'],
                ":id" => $row['id']
            ]);
        }
        return $stmt;
    }
}