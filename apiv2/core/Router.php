<?php
namespace Core;

use BadFunctionCallException;
class Router{
    private $routes = [];

    private function addRoute($method, $path, $handler, $middleware){
        $this->routes[] = compact('method', 'path', 'handler', 'middleware');
    }

    public function get(string $path, callable|array $handler, array $middleware = []){
        $this->addRoute('GET', $path, $handler, $middleware);
    }

    public function post(string $path, callable|array $handler, array $middleware = []){
        $this->addRoute('POST', $path, $handler, $middleware);
    }

    public function delete(string $path, callable|array $handler, array $middleware = []){
        $this->addRoute('DELETE', $path, $handler, $middleware);
    }

    public function put(string $path, callable|array $handler, array $middleware = []){
        $this->addRoute('PUT', $path, $handler, $middleware);
    }

    public function dispatch(){
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        foreach($this->routes as $route){
            if ($route['method'] === $method) {
                $pattern = preg_replace('#\{[a-zA-Z_][a-zA-Z0-9_]*\}#', '([^/]+)', $route['path']);
                $pattern = "#^" . $pattern . "$#";
                if (preg_match($pattern, $uri, $matches)) {
                    array_shift($matches); // első elem a teljes match
                    $_GET['params'] = $matches;

                    foreach ($route['middleware'] as $mw) {
                        call_user_func([$mw, 'handle']);
                    }

                    if (is_array($route['handler'])) {
                        $controller = new $route['handler'][0];
                        $methodName = $route['handler'][1];
                        $controller->$methodName(...$matches);
                    } else {
                        $result = $route['handler'](...$matches);
                        Response::json($result);
                    }
                    return;
                }
            }
        }
        Response::json(['error' => 'No route found'], 404);
    }
}