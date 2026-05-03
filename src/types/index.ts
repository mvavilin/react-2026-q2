export interface Item {
  id: string | number;
  name: string;
  description: string;
}

export interface ApiResponse {
  items: Item[];
  total: number;
  page: number;
  limit: number;
}
