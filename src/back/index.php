<?php

header('Access-Control-Allow-Origin: *');

$numeroAleatorio = rand(0, 100);
$response = array('numero' => $numeroAleatorio);
echo json_encode($response);



?>