import { useContext } from 'react';
import { MealsListContext } from '../providers/mealsListProvider';
import Favorite from './Favorite';

export default function Favorites() {
  const { favorites } = useContext(MealsListContext);

  return (
    <>
      {favorites &&
        favorites.map((favorite) => (
          <Favorite key={favorite.idMeal} favorite={favorite} />
        ))}
    </>
  );
}
