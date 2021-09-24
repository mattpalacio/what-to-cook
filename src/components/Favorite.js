import { useContext } from 'react';
import { MealsListContext } from '../providers/mealsListProvider';

import styles from '../styles/Favorite.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default function Favorite({ favorite }) {
  const { idMeal, strMeal, strMealThumb } = favorite;
  const { removeFromFavorites, showRecipeInfo } = useContext(MealsListContext);

  return (
    <div className={styles.card}>
      <div className={styles.removeButton}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeFromFavorites(idMeal);
          }}>
          <FontAwesomeIcon icon={faTimesCircle} size="lg" />
        </button>
      </div>
      <div onClick={() => showRecipeInfo(idMeal)} className={styles.cardImage}>
        <img src={strMealThumb} alt={strMeal} />
      </div>
      <div className={styles.cardFooter}>{strMeal}</div>
    </div>
  );
}
