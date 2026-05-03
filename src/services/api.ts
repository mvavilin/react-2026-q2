import type { ApiItem, ApiResponse } from '@types';
import { BASE_URL } from '@constants';

export const fetchItems = async (search: string): Promise<ApiItem[]> => {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error(`Server error (${response.status})`);
    }

    const data: ApiResponse = await response.json();

    if (!search) return data.results;

    return data.results.filter(
      (item) => item.name.toLowerCase() === search.toLowerCase()
    );
  } catch {
    throw new Error('Unable to load data. Please try again later.');
  }
};
