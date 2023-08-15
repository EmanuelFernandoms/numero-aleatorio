<?php
// Configuração de headers para permitir CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  // Resposta de sucesso para a requisição OPTIONS
  http_response_code(200);
  exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);
  $numero = $data['numero'];
  
  // Salvar o número em um arquivo
  $file = fopen('numeros_salvos.txt', 'a'); // Usamos 'a' para adicionar ao arquivo existente
  fwrite($file, $numero . "\n");
  fclose($file);
  
  echo json_encode(array('message' => 'Número salvo com sucesso.'));
} else {
  http_response_code(405); // Método não permitido
  echo json_encode(array('message' => 'Método não permitido.'));
}
?>
