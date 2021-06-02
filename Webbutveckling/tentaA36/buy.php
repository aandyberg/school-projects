<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" type="text/css" href="css/index.css">
    <link rel="stylesheet" type="text/css" href="css/header.css">
    <script src="js/index.js"></script>
</head>
<div id="container">
    <header>
        <div id="upper-header">
            <h1>Kurslitt Lund</h1>
            <nav>
                <a href="index.php">Säljes</a>
                <a href="buy.php">Köpes</a>
                <a href="advertise.html">Annonsera</a>
                <a href="franchise.html">Franchise</a>
                <a href="applications.php">Ansökningar</a>
                <div id="category-menu"><a href="categoeries.html">Kategori</a>
                    <div id="dropdown-category">
                        <a href="categoeries.html#inner-article-A">A</a>
                        <a href="categoeries.html#inner-article-B">B</a>
                        <a href="categoeries.html#inner-article-C">C</a>
                        <a href="categoeries.html#inner-article-D">D</a>
                        <a href="categoeries.html#inner-article-E">E</a>
                        <a href="categoeries.html#inner-article-F">F</a>
                        <a href="categoeries.html#inner-article-G">G</a>
                        <a href="categoeries.html#inner-article-H">H</a>
                        <a href="categoeries.html#inner-article-I">I</a>
                        <a href="categoeries.html#inner-article-J">J</a>
                    </div>
                </div>
            </nav>
        </div>
        <div id="header-text">
            <h1>
                Kurslitteratur säljes</h1>
        </div>
    </header>

    <main>
        <div class="article-container">
            <?php 
                require "php/db_connection.php";
                $get_books = "SELECT * FROM Books WHERE buyOrSell = 'buy'";
                $result = mysqli_query($db_conn, $get_books);
                if($result) {
                    while($row = mysqli_fetch_assoc($result)) {
                        echo '<div class="article"><div class="inner-article"><img id="article-image" src="uploads/'.$row["bookImage"].'"></img>';
                        echo '<p id="'.$row["bookImage"].'">Title: '.$row["title"].'</p>';
                        echo '<p>Pris: '.$row["price"].'</p>';
                        echo '<p>ISBN: '.$row["isbn"].'</p>';
                        echo '<p>Säljare: '.$row["sellerName"].'</p>';
                        echo '</div></div>';
                    }
                }
            ?>

        </div>
        <aside id="aside">
            <h2>Välkommen till Kurslitt i Lund</h2>
            <p id="aside-text">Kurslitt är en ideell studentförening i Lund som verkar för lorem ipsum dolor sit
                amet,
                consectetur
                adipiscing elit. Aenean vel sem id augue elementum finibus aliquet in diam. Vestibulum elementum
                viverra
                mauris nec molestie. Mauris laoreet, odio in aliquet dignissim, lorem nisi tempus augue, eget tempor
                orci leo sit amet est. Maecenas dictum nec nisl vel suscipit. Nullam iaculis ligula non lectus
                viverra,
                eget consequat metus feugiat. Morbi et massa non est volutpat eleifend in id augue. Cras at dolor
                eget
                nibh faucibus sodales. Quisque ultricies id est egestas maximus. Sed vehicula dictum enim, ut
                rhoncus
                lectus egestas quis. Duis lacinia iaculis ullamcorper. Nullam id pellentesque libero. Aenean ex
                nibh,
                posuere eu lacus quis, blandit aliquet nisl. Sed sapien velit, laoreet et pellentesque et,
                vestibulum
                luctus elit. Quisque non fringilla eros.</p>
            <button id="switch-color" onclick="changeColor()">Byt färg</button>
        </aside>
        <footer>
            Kursilitt i Lund<br>
            Email:<a href="mailto:info@kil.se">info@kil.se</a><br>
            Tele: <a href="tel:0709-601413">0709-601413</a>
            <form action="php/report-email.php" method="POST" id="report-email" onsubmit="emailReport()">
                <input type=hidden id="currentSide" name="currentSide" value="">
                <input type="submit" value="Report current side">
            </from>
        </footer>
    </main>
    </container>

</html>