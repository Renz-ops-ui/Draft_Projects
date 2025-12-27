let savedDATA = localStorage.getItem("myRecipes");
let recipes = savedDATA ? JSON.parse(savedDATA) : [
    {
        name: "Spaghetti",
        ingredients: ["Spaghetti Noodles", "Spaghetti Sauce", "Hotdogs", "Garlic & Onions", "Salt & Pepper", "Ground Beef", "Cheese"]
    },
    {
        name: "Fruit Salad",
        ingredients: ["Fruit Cocktail", "Condensed Milk", "All Purpose Cream", "Kaong", "Nata de Coco", "Coconut Strips"]
    }
];

function saveToBrowser() {
    localStorage.getItem("myRecipes", JSON.stringify(recipes));
}

function showRecipes() {
    document.getElementById('menu-screen').style.display = 'none';
    document.getElementById('view-screen').style.display = 'block';
    renderRecipes();
}

function showMenu() {
    document.getElementById('menu-screen').style.display = 'block';
    document.getElementById('view-screen').style.display = 'none';
}

function renderRecipes() {
    const pane = document.getElementById('display-pane');
    if (recipes.length == 0){
        pane.innerHTML = "<p>No Available Recipes.</p>";
        return;        
    }
    
    let html = "<h2 style='text-align: center; color: #5DADE2'>>>>AVAILABLE RECIPES<<<</h2>";
    
    recipes.forEach((recipe, index) => {
        html += `<div class="recipe-entry">
                    <div class="recipe-title">[${index + 1}] ${recipe.name.toUpperCase()}</div>
                    <div style="margin-left: 20px;">Ingredients:</div>
                    <ul class="ingredient-list">
                        ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                 </div>`;
    });
    
    pane.innerHTML = html;
}

function addRecipe() {
    let name = prompt("Enter Recipe Name:");
    if (!name) return;
    
    let ingredients = [];
    while (true) {
        let ing = prompt("Enter Ingredient (or type 'DONE'):");
        if (!ing || ing.toUpperCase() === "DONE") break;
        ingredients.push(ing);
    }
    
    if (ingredients.length > 0) {
        recipes.push({ name, ingredients });
        saveToBrowser();
        alert("Added: " + name + " recipe.");
    }
}

function removeRecipe() {
    if (recipes.length === 0) {
        alert("No recipes available.")
        return;
    }
    
    let recipeListString = "Enter Recipe Number to Remove:\n";
    recipes.forEach((recipe, index) => {
        recipeListString += `[${index + 1}] ${recipe.name}\n`;
    });
    
    let input = prompt(recipeListString);
    let index = parseInt(input) - 1;
    
    if (!isNaN(index) && index >= 0 && index < recipes.length) {
        let removed = recipes.splice(index, 1);
        saveToBrowser();
        alert("Removed: " + removed[0].name + " recipe.");
  
        if (document.getElementById('view-screen').style.display === 'block') {
            renderRecipes();
        }
    } else if (input !== null) {
        alert("Invalid selection. Please enter a number from the list.")
    }    
}