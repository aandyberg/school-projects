<?php
    //escape string, remove whitespace,slashes, prevent sql injections
    function check_query ($db_conn, $field){
        return (htmlentities(trim(mysqli_real_escape_string($db_conn, $field))));
        }
    function message($success, $message = []) {
        return array_merge([
            "success" => $success,
            "message" => $message
        ]);
    }
?>