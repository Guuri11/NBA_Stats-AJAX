<?php

declare(strict_types=1);

$db = new PDO('mysql: host=localhost;dbname=NBA','admin','admin');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $db->query('select * from Jugador where equipo = 1');
$stmt->setFetchMode(PDO::FETCH_OBJ);

if ($_SERVER['REQUEST_METHOD']==='GET' && array_key_exists('select_team',$_GET)){
    echo "solicitud recibida";
}