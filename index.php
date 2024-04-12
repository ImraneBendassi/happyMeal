<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EasyCook - Application de cuisine sans effort</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <div id="recipeDetails"></div>
    <h2>Rechercher une recette :</h2>
    <input type="text" id="searchInput" placeholder="Rechercher une recette...">
    <div id="searchResults"></div>
    <hr>
    <h2>Recettes du jour :</h2>
    <div id="randomRecipes"></div>
    <hr>
    <h2>Liste de favoris :</h2>
    <div id="favorites"></div>
    <hr>
    <h2>Liste de courses :</h2>
    <div id="shoppingList"></div>
</div>

<script src="data.json"></script>
<script src="app.js"></script>
</body>
</html>