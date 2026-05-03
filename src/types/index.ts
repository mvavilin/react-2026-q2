export interface Item {
  name: string;
  description: string;
}

export interface ApiItem {
  name: string;
  url: string;
}

export interface ApiResponse {
  results: ApiItem[];
}
