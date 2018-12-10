<?php 
	
	define('DB_USER', 'AppRadar');
	define('DB_PASSWORD', 'appradar');
	define('DB_HOST', 'localhost');
	define('DB_NAME', 'radar app');

	
	$dbc = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die('could not connect'. mysqli_connect_error());
	mysqli_set_charset($dbc,"utf8");
	

?>