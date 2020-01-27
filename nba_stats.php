<?php

declare(strict_types=1);

$db = new PDO('mysql: host=localhost;dbname=NBA','admin','admin');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $db->query('select * from Jugador where equipo = 1');
$stmt->setFetchMode(PDO::FETCH_OBJ);

if ($_SERVER['REQUEST_METHOD']==='GET' && array_key_exists('select_team',$_GET) && count($_GET)==1){
    $equipo_query = strtolower(filter_input(INPUT_GET,'select_team',FILTER_SANITIZE_STRING));
    switch ($equipo_query){
        case 'lakers':
            $equipo = 1; break;
        case 'rockets':
            $equipo = 2; break;
        case 'blazers':
            $equipo = 3; break;
        default:
            $equipo = 1;
    }
    try {

        $stmt = $db->prepare('SELECT dorsal,nombre,pts,reb,ast,min  FROM Jugador WHERE equipo = :equipo');
        $stmt->bindParam(':equipo',$equipo,PDO::PARAM_INT);
        $stmt->setFetchMode(PDO::FETCH_OBJ);
        $stmt->execute();
        echo json_encode($stmt->fetchAll());

    }catch (PDOException $e){
        echo $e->getMessage();
    }
}elseif ($_SERVER['REQUEST_METHOD']==='GET' && array_key_exists('select_team',$_GET) && array_key_exists('dorsal',$_GET)){
    var_dump($_GET);
    $equipo_query = strtolower(filter_input(INPUT_GET,'select_team',FILTER_SANITIZE_STRING));
    $dorsal = filter_input(INPUT_GET,'dorsal',FILTER_SANITIZE_NUMBER_INT);
    switch ($equipo_query){
        case 'lakers':
            $equipo = 1; break;
        case 'rockets':
            $equipo = 2; break;
        case 'blazers':
            $equipo = 3; break;
        default:
            $equipo = 1;
    }
    try {

        $stmt = $db->prepare('DELETE FROM Jugador WHERE dorsal=:dorsal and equipo=:equipo');
        $stmt->bindParam(':equipo',$equipo,PDO::PARAM_INT);
        $stmt->bindParam(':dorsal',$dorsal,PDO::PARAM_INT);
        $stmt->setFetchMode(PDO::FETCH_OBJ);
        $stmt->execute();
        echo json_encode($stmt->fetchAll());

    }catch (PDOException $e){
        echo $e->getMessage();
    }
}