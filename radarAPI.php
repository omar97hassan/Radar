<?php
require_once '../mysqli_connectradar.php';

header('Access-Control-Allow-Origin: *');
//Uzimanje radara
if ($_REQUEST['task'] == "getRadars") {

	$query = 'SELECT tip.Ime, tip.ikona, radar.lat, radar.lng, radar.Potvrdjeno, radar.Stalni, radar.Napomena, radar.MjestoIme as Mjesto FROM radar, tip WHERE radar.tipID = tip.ID ORDER BY radar.stalni DESC;';       
    $response = @mysqli_query($dbc, $query);
    if ($response) {
        $i = 0;
        while ($row = mysqli_fetch_array($response)) {
            $data[$i]['Ime'] = $row['Ime'];
            $data[$i]['Mjesto'] = $row['Mjesto'];
            $data[$i]['lat'] = $row['lat'];
            $data[$i]['lng'] = $row['lng'];
            $data[$i]['Napomena'] = $row['Napomena'];
            $data[$i]['Ikona'] = $row['ikona'];
            $data[$i]['Potvrdjeno'] = $row['Potvrdjeno'];
            $data[$i]['Stalni'] = $row['Stalni'];
            $i++;
        }
    	$radari['radari']=$data;
    	$radari = json_encode($radari);
		echo($radari);
	}
	else {
    	echo mysqli_error($dbc);
	}
}
//prijavljivanje
/*
if ($_REQUEST['task'] == "getRadars") {

    $response = @mysqli_query($dbc, $query);
		echo("done");
	}
	else {
    	echo mysqli_error($dbc);
	}
}
*/
?>