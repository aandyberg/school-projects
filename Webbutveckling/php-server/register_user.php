<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    require "db_connection.php";
    require "request_functions.php";
    /*//escape string, remove whitespace,slashes, prevent sql injections
    function check_query ($db_conn, $field){
        return (htmlentities(trim(mysqli_real_escape_string($db_conn, $field))));
        }
    function message($success, $message = []) {
        return array_merge([
            "success" => $success,
            "message" => $message
        ]);
    }*/
    
    /*$sql = "INSERT INTO foody_user (username, userPassword, email) VALUES('testuser33','testpw33','testemail@33.com')";


    if (mysqli_query($db_conn, $sql)) {
        echo "inserted user";
    }
    else {
        echo "insert failed<br>". mysqli_error($sql);
    }*/
    $returnData = [];

    // Decodes json "php://input" returns the raw data
    $_POST = json_decode(file_get_contents("php://input"),true);

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        //echo "Inside server request";
        //$returnData = msg(0, "Not found");

        $username = check_query($db_conn, $_POST["username"]);
        $password = check_query($db_conn, $_POST["password"]);
        $email = check_query($db_conn, $_POST["email"]);
        $returnData = message(0, "username: $username");
        //$sql = "INSERT INTO foody_user ('username','userPassword','email') VALUES($username,$password,$email)";
        //$tilt = mysqli_query($db_conn, $sql);
        /*if(!isset($username) || empty($username) || !isset($email) || emtpy($email) || !isset($password) || empty($password)) {
            $returnData = message(0,"All fields need to be filled.");
        }*/
        if(!isset($username) || !isset($email) || !isset($password)) {
            $returnData = message(0,"All fields need to be filled.");
        }

        else {
            $sql = "SELECT username from Foody_user where username=?";
            $stmt = mysqli_prepare($db_conn, $sql);
            mysqli_stmt_bind_param($stmt, "s", $username);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            $checkResult = mysqli_stmt_num_rows($stmt);
            if($checkResult > 0) {
                $returnData = message(0,"Username already exists ");
            }
            else {
                $hashedPw = password_hash($password, PASSWORD_DEFAULT);
                $sql = "INSERT INTO Foody_user (username, userpassword, email) VALUES(?,?,?)";
                $stmt = mysqli_prepare($db_conn, $sql);
                mysqli_stmt_bind_param($stmt, "sss",$username, $hashedPw, $email);
                mysqli_stmt_execute($stmt);
                mysqli_stmt_store_result($stmt);
                mysqli_stmt_close($stmt);
                $returnData = message(1, "Inserted pw: $password hashed: $hashedPw username: $username");
            }
        }
    }
            
    echo json_encode($returnData);
?>