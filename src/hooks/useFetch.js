import { useState, useEffect } from 'react';

export default function useFetch(url) {
  const [apiData, setApiData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(url);
        const data = await response.json();

        setApiData(data);
      } catch (error) {
        setServerError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (url) fetchData();
  }, [url]);

  return { apiData, isLoading, serverError };
}
