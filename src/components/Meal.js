import { useContext } from 'react';
import { MealsListContext } from '../providers/mealsListProvider';

import styles from '../styles/Meal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';

export default function Meal({ meal }) {
  const { idMeal, strMeal, strMealThumb, isSpecial, isLiked } = meal;
  const { addToFavorites, removeFromFavorites, showRecipeInfo } =
    useContext(MealsListContext);

  return (
    <div onClick={() => showRecipeInfo(idMeal)} className={styles.card}>
      {isSpecial && <div className={styles.special}>Today's Special</div>}
      <button
        onClick={(e) => {
          e.stopPropagation();
          isLiked ? removeFromFavorites(idMeal) : addToFavorites(idMeal);
        }}
        className={styles.likeButton}>
        <FontAwesomeIcon
          icon={isLiked ? faHeart : faHeartOutline}
          inverse={!isLiked && true}
          size="2x"
        />
      </button>
      <div className={styles.cardImage}>
        <img src={strMealThumb} alt={strMeal} />
      </div>
      <div className={styles.cardFooter}>
        <h3>{strMeal}</h3>
      </div>
    </div>
  );
}
