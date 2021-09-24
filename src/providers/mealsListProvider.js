import { createContext, useState, useEffect } from 'react';
import mealAPI from '../api/meal-api';

export const MealsListContext = createContext();

export default function MealsListProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const lsFavorites = localStorage.getItem('favorites');

    return lsFavorites !== null ? JSON.parse(lsFavorites) : [];
  });

  function showRecipeInfo(id) {
    fetch(mealAPI.DETAILS_API + id)
      .then((response) => response.json())
      .then((data) => {
        const mealData = { ...data.meals[0] };
        const ingredients = [];

        for (let i = 1; i <= 20; i++) {
          if (mealData['strIngredient' + i]) {
            ingredients.push(
              `${mealData['strIngredient' + i]} - ${mealData['strMeasure' + i]}`
            );
          } else {
            break;
          }
        }
        setRecipe({ ...mealData, ingredients });
      })
      .catch((error) => console.error(error));
  }

  function closeRecipeInfo() {
    setRecipe(null);
  }

  function addToFavorites(id) {
    setMeals(
      meals.map((meal) => {
        return meal.idMeal === id ? { ...meal, isLiked: true } : meal;
      })
    );

    const exists =
      favorites.length !== 0 &&
      favorites.findIndex((favorite) => favorite.idMeal === id) >= 0;

    if (!exists) {
      fetch(mealAPI.DETAILS_API + id)
        .then((response) => response.json())
        .then((data) => setFavorites([...data.meals, ...favorites]))
        .catch((error) => console.error(error));
    }
  }

  function removeFromFavorites(id) {
    setMeals(
      meals.map((meal) => {
        return meal.idMeal === id ? { ...meal, isLiked: false } : meal;
      })
    );

    setFavorites(favorites.filter((favorite) => favorite.idMeal !== id));
  }

  function searchMeals(term) {
    const faveListIds =
      favorites.length !== 0
        ? favorites.map((favorite) => favorite.idMeal)
        : [];

    fetch(mealAPI.SEARCH_API + term)
      .then((response) => response.json())
      .then((data) => {
        setMeals(
          data.meals.map((meal) => ({
            ...meal,
            isSpecial: false,
            isLiked:
              faveListIds.length === 0
                ? false
                : faveListIds.findIndex((faveKey) => faveKey === meal.idMeal) >=
                  0
                ? true
                : false,
          }))
        );
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (meals.length !== 0) return;

    const faveListIds =
      favorites.length !== 0
        ? favorites.map((favorite) => favorite.idMeal)
        : [];

    fetch(mealAPI.RANDOM_API)
      .then((response) => response.json())
      .then((data) => {
        setMeals(
          data.meals.map((meal) => ({
            ...meal,
            isSpecial: true,
            isLiked:
              faveListIds.length === 0
                ? false
                : faveListIds.findIndex((faveKey) => faveKey === meal.idMeal) >=
                  0
                ? true
                : false,
          }))
        );
      })
      .catch((error) => console.error(error));
  }, [meals, favorites]);

  return (
    <MealsListContext.Provider
      value={{
        meals,
        favorites,
        recipe,
        searchMeals,
        addToFavorites,
        removeFromFavorites,
        showRecipeInfo,
        closeRecipeInfo,
      }}>
      {children}
    </MealsListContext.Provider>
  );
}
