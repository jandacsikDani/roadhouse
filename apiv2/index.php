<?php
require_once __DIR__.'/vendor/autoload.php';
use Core\Router;
use Core\AuthMiddleware;
use Core\Cors;
use Dotenv\Dotenv;
use Controller\AuthController;
use Controller\MenuController;

Cors::handle();

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$router = new Router();

//Foodtype routes
$router->get('/apiv2/menu/foodTypes', [MenuController::class, 'getFoodTypes']);
$router->get('/apiv2/menu/foodTypes/{id}', [MenuController::class, 'getFoodsByTypeId']);
$router->post('/apiv2/menu/foodTypes', [MenuController::class, 'addNewType'], [new AuthMiddleware()]);
$router->delete('/apiv2/menu/foodTypes/{id}', [MenuController::class, 'deleteType'], [new AuthMiddleware()]);
$router->put('/apiv2/menu/foodTypes', [MenuController::class, 'updateTypes'], [new AuthMiddleware]);

//Menu routes
$router->get('/apiv2/menu', [MenuController::class, 'getAll']);
$router->get('/apiv2/menu/{id}', [MenuController::class, 'getById']);
$router->post('/apiv2/menu', [MenuController::class, 'create'], [new AuthMiddleware()]);
$router->delete('/apiv2/menu/{id}', [MenuController::class, 'deleteFood'], [new AuthMiddleware()]);
$router->put('/apiv2/menu/{id}', [MenuController::class, 'updateFood'], [new AuthMiddleware()]);


//Auth routes
$router->post('/apiv2/login', [AuthController::class, 'login']);
$router->post('/apiv2/register', [AuthController::class, 'register']);

$router->dispatch();