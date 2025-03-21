import {
  Category,
  CategoryResponse,
  Joke,
  JokesDetailByCategoriesResponse,
} from '@model/types';
import apiClient from '@service/api';
import {AxiosError} from 'axios';
import {useCallback, useEffect, useState} from 'react';

const useJokes = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingInitialData, setIsLodingInitialData] = useState<boolean>(true);
  const [errorInitialData, setErrorInitialData] = useState<string | null>(null);
  const [isLoadingGetMoreData, setIsLoadingGetMoreData] = useState<boolean>(false);

  const fetchCategories = async (): Promise<string[]> => {
    try {
      const response = await apiClient.get<CategoryResponse>('/categories');
      const category = response.data?.categories;
      return category;
    } catch (err) {
      console.error('Error fetching categories:', err);
      return [];
    }
  };

  const fetchJokesForCategory = async (
    category: string,
    amount: number = 2,
  ): Promise<JokesDetailByCategoriesResponse> => {
    try {
      const response = await apiClient.get<JokesDetailByCategoriesResponse>(
        `/joke/${category}`,
        {
          params: {
            type: 'single',
            amount,
          },
        },
      );
      return response.data;
    } catch (err) {
      const errorGet = err as AxiosError;
      if (
        errorGet.status &&
        (category === 'Christmas' || category === 'Spooky')
      ) {
        return {jokes: [], amount: 0, error: false};
      }
      console.error(`Error fetching jokes for ${category}:`, err);
      return {jokes: [], amount: 0, error: true};
    }
  };

  const getInitialData = useCallback(async () => {
    try {
      setIsLodingInitialData(true);
      setErrorInitialData(null);

      // Fetch categories
      const categoryNames = await fetchCategories();

      // Fetch initial jokes for each category
      const categoriesWithJokes: Category[] = await Promise.all(
        categoryNames.map(async (name, index) => {
          const jokesResponse = await fetchJokesForCategory(name);

          // Convert to our Joke model
          const jokes: Joke[] = jokesResponse.jokes
            ? jokesResponse.jokes.map(joke => ({
                id: joke.id,
                joke: joke.joke,
                category: name,
              }))
            : [];

          return {
            id: index,
            categoryName: name,
            jokes,
            addedJokesCount: 0,
          };
        }),
      );

      setCategories(categoriesWithJokes);
    } catch (err) {
      setErrorInitialData('Failed to load jokes. Please try again.');
      console.error('Error in useFetchJokes:', err);
    } finally {
      setIsLodingInitialData(false);
    }
  }, []);

  const addMoreJokes = async (category: Category, categoryIndex: number) => {
    try {
      setIsLoadingGetMoreData(true);
      const jokesResponse = await fetchJokesForCategory(category.categoryName);
      console.log(jokesResponse);

      // Convert to our Joke model
      const newJokes: Joke[] = jokesResponse.jokes
        ? jokesResponse.jokes.map(joke => ({
            id: joke.id,
            joke: joke.joke,
            category: category.categoryName,
          }))
        : [];

      // Update the category with new jokes
      const updatedCategories = [...categories];
      updatedCategories[categoryIndex] = {
        ...category,
        jokes: [...category.jokes, ...newJokes],
        addedJokesCount: category.addedJokesCount + 1,
      };
      setCategories(updatedCategories);
    } catch (err) {
      setErrorInitialData('Failed to load more jokes. Please try again.');
      console.error('Error adding more jokes:', err);
    } finally {
      setIsLoadingGetMoreData(false);
    }
  };

  const moveCategoryToTop = (categoryIndex: number) => {
    const newCategories = [...categories];
    const categoryToMove = newCategories[categoryIndex];
    newCategories.splice(categoryIndex, 1);
    newCategories.unshift(categoryToMove);
    setCategories(newCategories);
  };

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  const onRefreshData = () => {
    getInitialData();
  };

  return {
    categories,
    isLoadingInitialData,
    errorInitialData,
    isLoadingGetMoreData,
    moveCategoryToTop,
    addMoreJokes,
    onRefreshData,
  };
};

export default useJokes;
