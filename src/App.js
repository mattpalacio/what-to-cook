import { useContext } from 'react';
import { MealsListContext } from './providers/mealsListProvider';

import Meals from './components/Meals';
import Favorites from './components/Favorites';
import Header from './components/Header';
import styles from './styles/App.module.css';
import RecipeInfo from './components/RecipeInfo';

function App() {
  const { favorites, recipe } = useContext(MealsListContext);

  return (
    <div className={styles.container} styles={{ overflow: 'hidden' }}>
      <Header />
      <main>
        <section className={styles.favoritesContainer}>
          <h2 style={{ width: '100%' }}>Favorite Recipes</h2>
          <div style={{ width: '100%', overflow: 'auto' }}>
            <div className={styles.favorites}>
              {favorites.length !== 0 ? (
                <Favorites />
              ) : (
                <p>Your liked recipes will go here.</p>
              )}
            </div>
          </div>
        </section>
        <section className={styles.mealsContainer}>
          <h2 style={{ width: '100%' }}>Recipe List</h2>
          <Meals />
        </section>
        {recipe && <RecipeInfo {...recipe} />}
      </main>
    </div>
  );
}

export default App;
