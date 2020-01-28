<?php

declare(strict_types=1);

$db = new PDO('mysql: host=localhost;dbname=NBA','admin','admin');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if ($_SERVER['REQUEST_METHOD']==='GET' && array_key_exists('select_team',$_GET) && array_key_exists('dorsal',$_GET)){
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

        $stmt = $db->prepare('DELETE FROM Jugador WHERE equipo = :equipo and dorsal= :dorsal');
        $stmt->bindParam(':equipo',$equipo,PDO::PARAM_INT);
        $stmt->bindParam(':dorsal',$dorsal,PDO::PARAM_INT);
        $stmt->execute();
        if ($stmt->rowCount())
            echo 'Jugador borrado';

    }catch (PDOException $e){
        echo $e->getMessage();
    }
}