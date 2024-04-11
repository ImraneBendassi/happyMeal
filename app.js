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
// Fonction pour afficher les détails d'une recette
function displayRecipeDetails(recipe) {
    // Construire une chaîne de texte pour les détails de la recette
    let details = `Recette: ${recipe.nom}\n`;
    details += `Catégorie: ${recipe.categorie}\n`;
    details += `Temps de préparation: ${recipe.temps_preparation}\n\n`;
    details += `Ingrédients:\n`;
    recipe.ingredients.forEach(ingredient => {
        details += `- ${ingredient.nom}: ${ingredient.quantite}\n`;
    });
    details += `\nÉtapes de préparation:\n`;
    recipe.etapes.forEach((etape, index) => {
        details += `${index + 1}. ${etape}\n`;
    });

    // Afficher les détails dans le div recipeDetails
    let recipeDetailsContainer = document.getElementById('recipeDetails');
    recipeDetailsContainer.textContent = details;
}


// Fonction pour afficher une fenêtre modale personnalisée avec les détails de la recette
function showModal(content) {
    // Créer les éléments de la fenêtre modale
    let modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');
    let modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    let closeButton = document.createElement('button');
    closeButton.textContent = 'Fermer';
    closeButton.addEventListener('click', function() {
        closeModal(modalOverlay);
    });

    // Remplir le contenu de la fenêtre modale
    modalContent.textContent = content;
    modalContent.appendChild(closeButton);
    modalOverlay.appendChild(modalContent);

    // Ajouter la fenêtre modale à la page
    document.body.appendChild(modalOverlay);
}

// Fonction pour fermer la fenêtre modale
function closeModal(modalOverlay) {
    document.body.removeChild(modalOverlay);
}

// Fonction pour rechercher des recettes par nom ou ingrédient
function searchRecipes(recipes, query) {
    // Filtrer les recettes en fonction de la requête de recherche
    let results = recipes.filter(recipe => recipe.nom.toLowerCase().includes(query.toLowerCase()));

    // Afficher les résultats de recherche dans la page
    let searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = '';
    results.forEach(recipe => {
        let resultElement = document.createElement('div');
        resultElement.textContent = recipe.nom;

        // Ajouter un bouton à côté de chaque résultat de recherche
        let button = document.createElement('button');
        button.textContent = 'Voir détails';
        button.addEventListener('click', function() {
            displayRecipeDetails(recipe);
        });

        // Ajouter le bouton à l'élément de résultat de recherche
        resultElement.appendChild(button);

        // Ajouter l'élément de résultat de recherche à la liste des résultats
        searchResultsContainer.appendChild(resultElement);
    });
}

// Fonction utilitaire pour sélectionner des éléments aléatoires d'un tableau
function getRandomItems(array, count) {
    let shuffled = array.slice(0), i = array.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}
