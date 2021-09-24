import { useContext, useEffect } from 'react';
import { MealsListContext } from '../providers/mealsListProvider';
import Portal from './Portal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/RecipeInfo.module.css';

export default function RecipeInfo({
  strMeal,
  strMealThumb,
  strInstructions,
  ingredients,
}) {
  const { closeRecipeInfo } = useContext(MealsListContext);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'unset');
  }, []);

  return (
    <Portal>
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          <button onClick={closeRecipeInfo} className={styles.closeButton}>
            <FontAwesomeIcon icon={faTimes} size="2x" />
          </button>
          <div className={styles.modalImage}>
            <img src={strMealThumb} alt={strMeal} />
          </div>
          <h2>{strMeal}</h2>
          <div className={styles.ingredients}>
            <h3>Ingredients</h3>
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className={styles.instructions}>
            <h3>Instructions</h3>
            <p>{strInstructions}</p>
          </div>
        </div>
      </div>
    </Portal>
  );
}
