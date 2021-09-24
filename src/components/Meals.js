import { useContext } from 'react';
import { MealsListContext } from '../providers/mealsListProvider';
import Meal from './Meal';

export default function Meals() {
  const { meals } = useContext(MealsListContext);

  return (
    <>{meals && meals.map((meal) => <Meal key={meal.idMeal} meal={meal} />)}</>
  );
}
