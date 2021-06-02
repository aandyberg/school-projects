
<?php
 header("Access-Control-Allow-Origin: *");
 
define('DB_USER','4003497_ka62418' );
define('DB_PASSWORD','Grupp13lgd' );
define('DB_HOST', 'my06s.sqlserver.se' );
define('DB_NAME','4003497-db13');
$db_conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

if (!$db_conn) {
	die ('No DB-connection!' . mysqli_connect_error());
}
//echo "Connected sucessfully<br>";
