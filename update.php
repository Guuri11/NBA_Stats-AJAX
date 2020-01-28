<?php

declare(strict_types=1);

$db = new PDO('mysql: host=localhost;dbname=NBA','admin','admin');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if ($_SERVER['REQUEST_METHOD']==='GET' && array_key_exists('select_team',$_GET)){
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

        $stmt = $db->prepare('SELECT *  FROM Jugador WHERE equipo = :equipo and dorsal = :dorsal');
        $stmt->bindParam(':equipo',$equipo,PDO::PARAM_INT);
        $stmt->bindParam(':dorsal',$dorsal,PDO::PARAM_INT);
        $stmt->setFetchMode(PDO::FETCH_OBJ);
        $stmt->execute();
        echo json_encode($stmt->fetch());

    }catch (PDOException $e){
        echo $e->getMessage();
    }
}

if ($_SERVER['REQUEST_METHOD']==='POST'){
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
        $id = intval($_POST['id_jugador']);
        $dorsal = intval($_POST['dorsal']);
        $nombre = $_POST['nombre'];
        $pts = floatval($_POST['pts']);
        $reb = floatval($_POST['reb']);
        $ast = floatval($_POST['ast']);
        $min = floatval($_POST['min']);

        $stmt = $db->prepare('UPDATE Jugador SET dorsal=:dorsal,nombre=:nombre,pts=:pts,reb=:reb,ast=:ast,min=:min 
                                        WHERE id_jugador=:id');
        $stmt->bindParam(':id',$id,PDO::PARAM_INT);
        $stmt->bindParam(':dorsal',$dorsal,PDO::PARAM_INT);
        $stmt->bindParam(':nombre',$nombre,PDO::PARAM_STR);
        $stmt->bindParam(':pts',$pts);
        $stmt->bindParam(':reb',$reb);
        $stmt->bindParam(':ast',$ast);
        $stmt->bindParam(':min',$min);
        $stmt->setFetchMode(PDO::FETCH_OBJ);
        $stmt->execute();
        if ($stmt->rowCount()>0)
            echo "Jugador editado";

    }catch (PDOException $e){
        echo 'Error en la bbdd: '.$e->getMessage();
    }
}