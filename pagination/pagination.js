document.addEventListener("DOMContentLoaded", function() {
    const recettesContainer = document.getElementById("recettes");
    const paginationContainer = document.getElementById("pagination");

    const recettesPerPage = 9;
    let currentPage = 1;
    let recettesData = [];

    function applyStyles(element, styles) {
        Object.assign(element.style, styles);
    }

    function displayRecettes(pageNumber, recettes) {
        recettesContainer.innerHTML = "";
        const startIndex = (pageNumber - 1) * recettesPerPage;
        const endIndex = startIndex + recettesPerPage;
        const displayedRecettes = recettes.slice(startIndex, endIndex);

        displayedRecettes.forEach(recette => {
            const recetteElement = document.createElement("div");
            recetteElement.classList.add("recette");
            applyStyles(recetteElement, {
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "20px",
                marginBottom: "20px"
            });
            recetteElement.innerHTML = `
                <h2>${recette.nom}</h2>
                <p><strong>Catégorie:</strong> ${recette.categorie}</p>
                <p><strong>Temps de préparation:</strong> ${recette.temps_preparation}</p>
                <h3>Ingrédients:</h3>
                <ul>
                    ${recette.ingredients.map(ingredient => formatIngredient(ingredient)).join('')}
                </ul>
                <h3>Étapes:</h3>
                <ol>
                    ${recette.etapes.map(etape => `<li>${etape}</li>`).join('')}
                </ol>
            `;
            recettesContainer.appendChild(recetteElement);
        });
    }

    function formatIngredient(ingredient) {
        if (typeof ingredient === 'string') {
            return `<li>${ingredient}</li>`;
        } else {
            return `<li>${ingredient.nom}: ${ingredient.quantite}</li>`;
        }
    }

    function setupPagination(totalRecettes) {
        paginationContainer.innerHTML = "";

        const totalPages = Math.ceil(totalRecettes / recettesPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.textContent = i;
            applyStyles(button, {
                margin: "0 5px",
                padding: "10px 20px",
                cursor: "pointer",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
                fontWeight: "bold"
            });
            button.addEventListener("click", function() {
                currentPage = i;
                displayRecettes(currentPage, recettesData);
            });
            paginationContainer.appendChild(button);
        }
    }

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            recettesData = data.recettes;
            displayRecettes(currentPage, recettesData);
            setupPagination(recettesData.length);
        })
        .catch(error => console.error("Erreur lors du chargement des données JSON:", error));
});