import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

export interface Category {
  description: string;
  id: number;
  name: string;
}

interface CategoryResponse {
  categories: Category[];
}

export const listAll = async (): Promise<CategoryResponse> => {
  const response = await axios.get<CategoryResponse>(`${BASE_URL}/categories`);
  return response.data;
};
