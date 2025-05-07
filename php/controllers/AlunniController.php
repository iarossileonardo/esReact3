<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AlunniController
{
  public function index(Request $request, Response $response, $args)
  {
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $query = "SELECT * FROM alunni";
    $queryParams = $request->getQueryParams();
    if (isset($queryParams['search'])) {
      $query .= " WHERE nome LIKE '%" . $queryParams['search'] . "%' OR cognome LIKE '%" . $queryParams['search'] . "%' OR cf LIKE '%" . $queryParams['search'] . "%'";
    }

    if (isset($queryParams['sortCol']) && isset($queryParams['sort'])) {
      $query .= " ORDER BY " . $queryParams['sortCol'] . " " . $queryParams['sort'];
    }

    $result = $mysqli_connection->query($query);
    $results = $result->fetch_all(MYSQLI_ASSOC);

    $response->getBody()->write(json_encode($results));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function alunniWithId(Request $request, Response $response, $args)
  {
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result = $mysqli_connection->query("SELECT * FROM alunni WHERE id=$args[id]");
    $results = $result->fetch_all(MYSQLI_ASSOC);

    $response->getBody()->write(json_encode($results));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function create(Request $request, Response $response, $args)
  {
    $data = json_decode($request->getBody()->getContents(), true);
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $raw_query = "INSERT INTO alunni (nome, cognome, cf) VALUES ('$data[nome]', '$data[cognome]', '$data[cf]');";
    $result = $mysqli_connection->query($raw_query);
    if ($result && $mysqli_connection->affected_rows > 0) {
      $response->getBody()->write(json_encode(array("message" => "success")));
    } else {
      $response->getBody()->write(json_encode(array("message" => $mysqli_connection->error)));
    }
    return $response->withHeader("Content-Type", "application/json")->withStatus(200);
  }

  public function update(Request $request, Response $response, $args)
  {
    $data = json_decode($request->getBody()->getContents(), true);
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $raw_query = "UPDATE alunni SET";
    $prima_aggiunta = true;
    if (isset($data["nome"])) {
      if (!$prima_aggiunta) {
        $raw_query .= ",";
      }
      $raw_query .= " nome='$data[nome]'";
      $prima_aggiunta = false;
    }
    if (isset($data["cognome"])) {
      if (!$prima_aggiunta) {
        $raw_query .= ",";
      }
      $raw_query .= " cognome='$data[cognome]'";
      $prima_aggiunta = false;
    }
    if ((isset($data["cf"]))) {
      if (!$prima_aggiunta) {
        $raw_query .= ",";
      }
      $raw_query .= " cf='$data[cf]'";
      $prima_aggiunta = true;
    }
    $raw_query .= " WHERE id=$args[id]";
    $result = $mysqli_connection->query($raw_query);
    if ($result && $mysqli_connection->affected_rows > 0) {
      $response->getBody()->write(json_encode(array("message" => "success")));
    } else {
      $response->getBody()->write(json_encode(array("message" => $mysqli_connection->error)));
    }
    return $response->withHeader("Content-Type", "application/json")->withStatus(200);
  }

  public function destroy(Request $request, Response $response, $args)
  {
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $raw_query = "DELETE FROM alunni WHERE id=$args[id]";
    $result = $mysqli_connection->query($raw_query);
    if ($result && $mysqli_connection->affected_rows > 0) {
      $response->getBody()->write(json_encode(array("message" => "success")));
    } else {
      $response->getBody()->write(json_encode(array("message" => $mysqli_connection->error)));
    }
    return $response->withHeader("Content-Type", "application/json")->withStatus(200);
  }
}