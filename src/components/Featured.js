import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import mealAPI from '../api/meal-api';
import Meals from './Meals';

export default function Featured() {
  const [meals, setMeals] = useState([]);
  const { apiData } = useFetch(mealAPI.RANDOM_API);

  useEffect(() => {
    if (apiData) setMeals(apiData.meals);
  }, [apiData]);

  return (
    <>
      <Meals meals={meals} />
    </>
  );
}
