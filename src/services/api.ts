import type { ApiItem, ApiResponse } from '@types';
import { BASE_URL } from '@constants';

export const fetchItems = async (search: string): Promise<ApiItem[]> => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error('Failed to load data');
  }

  const data: ApiResponse = await response.json();

  if (!search) return data.results;

  return data.results.filter(
    (item) => item.name.toLowerCase() === search.toLowerCase()
  );
};
