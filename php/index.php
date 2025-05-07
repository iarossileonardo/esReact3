<?php
use Slim\Factory\AppFactory;


require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/controllers/HelloController.php';
require __DIR__ . '/controllers/AlunniController.php';

$app = AppFactory::create();

$app->get('/hello', "HelloController:hello"); //chiama la funzione del controller

$app->get('/hello/{name}', 'HelloController:hello_with_name');

$app->get('/json/{name}', 'HelloController:json_name');

$app->get('/alunni', 'AlunniController:index');

$app->get('/alunni/{id}', 'AlunniController:alunniWithId');


//curl -X POST localhost:8080/alunni -H "Content-Type: application/json" -d "{ \"nome\":\"leo\", \"cognome\":\"jarro\", \"cf\":\"26ia\" }"
$app->post('/alunni', 'AlunniController:create');

//curl -X PUT localhost:8080/alunni/6 -H "Content-Type: application/json" -d "{ \"nome\":\"leolino\" }"
$app->put('/alunni/{id}', 'AlunniController:update');

//curl -X DELETE localhost:8080/alunni/2
$app->delete('/alunni/{id}', 'AlunniController:destroy');

$app->run();

?>