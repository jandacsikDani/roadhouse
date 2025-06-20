<?php
namespace Controller;

use Core\Response;
use Core\Database;
use Services\MenuService;

class MenuController{
    private MenuService $menuService;

    public function __construct(){
        $db = Database::connect();
        $this->menuService = new MenuService($db);
    }

    public function getAll(){
        try{
            $response = $this->menuService->getAll();
            Response::json($response);
        }
        catch(\Exception $e){
            Response::json(["message"=>"Error when fetching the requested items", "error"=>$e->getMessage(), 'code'=>$e->getCode()],500);
        }
    }

    public function getFoodTypes(){
        try{
            $response = $this->menuService->getFoodTypes();
            Response::json($response);
        }
        catch(\Exception $e){
            Response::json(["message"=>"Error when fetching the requested items", "error"=>$e->getMessage(), 'code'=>$e->getCode()],500);
        }
    }

    public function getById($id){
        try{
            $response = $this->menuService->getById($id);
            if($response == false){
                Response::json(['message'=>'Item not found'], 404);
            }else{
                Response::json($response);
            }
        }
        catch(\Exception $e){
            Response::json(["message"=>"Error when fetching the requested item", "error"=>$e->getMessage(), 'code'=>$e->getCode()],500);
        }
    }

    public function create(){
        $body = json_decode(file_get_contents("php://input"), true);
        $typeid = $body['typeid'];
        $name = $body['name'];
        $description = $body['description'];
        $price = $body['price'];
        try{
            $this->menuService->create($typeid, $name, $description, $price);
            Response::json(['meaasge'=>'Item added succesfully'], 201);
        }
        catch(\Exception $e){
            Response::json([
                'message'=>'Error when addig new item',
                'error'=>$e->getMessage(),
                'code'=>$e->getCode()
            ],500);
        }
    }

    public function getFoodsByTypeId($id){
        try{
            $response = $this->menuService->getFoodsByTypeId($id);
            if($response == false){
                Response::json(['message'=>'Items not found'], 404);
            }else{
                Response::json($response);
            }
        }
        catch(\Exception $e){
            Response::json([
                "message"=>"Error when fetching the requested items",
                "error"=>$e->getMessage(),
                'code'=>$e->getCode()
            ],500);
        }
    }

    public function updateFood($id){
        try{
            $body = json_decode(file_get_contents('php://input'), true);
            $response = $this->menuService->updateFood($id, $body);
            if(!$response){
                Response::json(['message'=>'Update failed'], 500);
                return;
            }
            Response::json(['message'=>'Update succesfull']);
        }
        catch(\Exception $e){
            Response::json([
                'message'=>'Error when updating the requested item',
                'error'=>$e->getMessage(),
                'code'=>$e->getCode()
            ],500);
        }
    }

    public function deleteFood($id){
        try{
            $response = $this->menuService->deleteFood($id);
            if(!$response){
                Response::json(['message'=>'Item not found'], 404);
                return;
            }
            Response::json(['message'=>'Item deleted succesfully']);
        }
        catch(\Exception $e){
            Response::json([
                'message'=>'Error when deleting the requested item',
                'error'=>$e->getMessage(),
                'code'=>$e->getCode()
            ],500);
        }
    }
}