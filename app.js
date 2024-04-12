// Charger les données JSON des recettes
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Traiter les données et afficher les recettes aléatoires
        displayRandomRecipes(data.recettes);

        // Implémenter la fonction de recherche
        document.getElementById('searchInput').addEventListener('input', function() {
            searchRecipes(data.recettes, this.value);
        });
    })
    .catch(error => console.error('Erreur de chargement des données :', error));

// Fonction pour afficher des recettes aléatoires
function displayRandomRecipes(recipes) {
    // Sélectionner quelques recettes aléatoires
    let randomRecipes = getRandomItems(recipes, 5);

    // Afficher les recettes aléatoires dans la page
    let randomRecipesContainer = document.getElementById('randomRecipes');
    randomRecipes.forEach(recipe => {
        let recipeElement = document.createElement('div');
        recipeElement.textContent = recipe.nom;

        // Ajouter un bouton à côté de chaque recette
        let button = document.createElement('button');
        button.textContent = 'Voir détails';
        button.addEventListener('click', function() {
            displayRecipeDetails(recipe);
        });

        // Ajouter le bouton à l'élément de recette
        recipeElement.appendChild(button);

        // Ajouter l'élément de recette à la liste des recettes aléatoires
        randomRecipesContainer.appendChild(recipeElement);
    });
}

// Fonction pour afficher les détails d'une recette
function displayRecipeDetails(recipe) {
    // Construire une chaîne de texte pour les détails de la recette
    let details = `<h3>Recette: ${recipe.nom}</h3>`;
    details += `<p>Catégorie: ${recipe.categorie}</p>`;
    details += `<p>Temps de préparation: ${recipe.temps_preparation}</p>`;
    details += `<h4>Ingrédients:</h4>`;
    details += `<ul id="ingredientList">`;
    recipe.ingredients.forEach(ingredient => {
        details += `<li>${ingredient.nom}: ${ingredient.quantite}`;
        details += `<button onclick="addToShoppingList('${ingredient.nom}')">Ajouter à la liste de courses</button></li>`;
    });
    details += `</ul>`;
    details += `<h4>Étapes de préparation:</h4>`;
    details += `<ol>`;
    recipe.etapes.forEach((etape, index) => {
        details += `<li>${index + 1}. ${etape}</li>`;
    });
    details += `</ol>`;

    // Ajouter un bouton pour ajouter la recette aux favoris
    details += `<button onclick="addToFavorites('${recipe.nom}')">Ajouter aux favoris</button>`;

    // Afficher les détails dans le div recipeDetails
    let recipeDetailsContainer = document.getElementById('recipeDetails');
    recipeDetailsContainer.innerHTML = details;
}

// Fonction pour ajouter une recette aux favoris
function addToFavorites(recipeName) {
    let favoritesList = document.getElementById('favorites');
    let favoriteRecipe = document.createElement('div');
    favoriteRecipe.textContent = recipeName;
    favoritesList.appendChild(favoriteRecipe);
}

// Fonction pour ajouter un ingrédient à la liste de courses
function addToShoppingList(ingredientName) {
    let shoppingList = document.getElementById('shoppingList');
    let existingItem = shoppingList.querySelector(`li[data-ingredient="${ingredientName}"]`);
    if (existingItem) {
        // L'ingrédient est déjà dans la liste, augmenter la quantité
        let quantityElement = existingItem.querySelector('.quantity');
        quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
    } else {
        // Ajouter l'ingrédient à la liste
        let newItem = document.createElement('li');
        newItem.dataset.ingredient = ingredientName;
        newItem.innerHTML = `${ingredientName}: <span class="quantity">1</span>`;
        let removeButton = document.createElement('button');
        removeButton.textContent = 'Supprimer';
        removeButton.addEventListener('click', function() {
            newItem.remove();
        });
        newItem.appendChild(removeButton);
        shoppingList.appendChild(newItem);
    }
}

// Fonction pour rechercher des recettes
function searchRecipes(recipes, query) {
    let searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = '';

    let results = recipes.filter(recipe => recipe.nom.toLowerCase().includes(query.toLowerCase()));

    results.forEach(recipe => {
        let resultElement = document.createElement('div');
        resultElement.textContent = recipe.nom;

        let button = document.createElement('button');
        button.textContent = 'Voir détails';
        button.addEventListener('click', function() {
            displayRecipeDetails(recipe);
        });

        resultElement.appendChild(button);
        searchResultsContainer.appendChild(resultElement);
    });
}

// Fonction pour sélectionner des éléments aléatoires dans un tableau
function getRandomItems(array, numItems) {
    let shuffled = array.slice(0);
    let i = array.length;
    let min = i - numItems;
    let temp;
    let index;

    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }

    return shuffled.slice(min);
}
