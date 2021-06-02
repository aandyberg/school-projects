<?php
require "db_connection.php";

/*$sql = "DROP TABLE LikedRecipe, Foody_user, Recipe;";
if (mysqli_query($db_conn, $sql)) {
    echo "Foody_user created";
}
else {
    echo "Error" . mysqli_error($db_conn);
}*/
//$exists = "SELECT 1 from foody_user";
/*
$insertUser = "INSERT INTO Recipe (recipeName, instruction, uploader) VALUES ('Meatballs', 'cook in frying pan', 'Admin')";
$insertRec = "INSERT INTO Recipe (recipeName, instruction, uploader) VALUES ('Pasta', 'Boil 7 min', 'Admin')";
if (mysqli_query($db_conn, $insertUser)) {
    echo "recipe created <br>";
}
else {
    echo "Error" . mysqli_error($db_conn);
}
if (mysqli_query($db_conn, $insertRec)) {
    echo "recipe created <br>";
}
else {
    echo "Error" . mysqli_error($db_conn);
}*/
$createUserTable = "CREATE TABLE Foody_user (
    username VARCHAR(255), 
    userPassword VARCHAR(255), 
    email VARCHAR(255), 
    PRIMARY KEY (username)
    )";
    if (mysqli_query($db_conn, $createUserTable)) {
        echo "Foody_user created";
    }
    else {
        echo "Error" . mysqli_error($createUserTable);
    }
$createRecipeTable = "CREATE TABLE Recipe (
    recipeId INT NOT NULL AUTO_INCREMENT, 
    recipeName VARCHAR(255), 
    instruction VARCHAR(5000), 
    uploader VARCHAR(255), 
    PRIMARY KEY (recipeId)
    )";
    if (mysqli_query($db_conn, $createRecipeTable)) {
        echo "RecipeTable created";
    }
    else {
        echo "Error" . mysqli_error($createRecipeTable);
    }
$createIngridientTable = "CREATE TABLE Ingridient (
    ingridientId INT NOT NULL AUTO_INCREMENT, 
    ingridientName VARCHAR(255), 
    amount INT, 
    unit VARCHAR(255),
    recipeId INT,
    PRIMARY KEY (ingridientId),
    FOREIGN KEY (recipeId) REFERENCES Recipe(recipeId) ON DELETE CASCADE
    )";
    if (mysqli_query($db_conn, $createIngridientTable)) {
        echo "IngridientTable created";
    }
    else {
        echo "Error" . mysqli_error($db_conn);
    }
$createLikedRecipe = "CREATE TABLE LikedRecipe (
    username VARCHAR(255) NOT NULL,
    recipeId INT NOT NULL,
    FOREIGN KEY (username) REFERENCES Foody_user (username) ON DELETE CASCADE,
    FOREIGN KEY (recipeId) REFERENCES Recipe (recipeId) ON DELETE CASCADE
    )";
    if (mysqli_query($db_conn, $createLikedRecipe)) {
        echo "LikedRecipe created";
    }
    else {
        echo "Error" . mysqli_error($createLikedRecipe);
    }
/*if (mysqli_query($db_conn, $insertUser)) {
    echo "inserted user";
}
else {
    echo "insert failed<br>". mysqli_error($insertUser);
}*/
//check commit

/*if(mysqli_query($db_conn, $createRecipeTable)) {
    echo "recipe table created";
}

if (mysqli_query($db_conn, $insertRec)) {
    echo "inserted recipe";
}
else {
    echo "insert rec failed<br>". mysqli_error($insertRec);
}*/

 ?>
