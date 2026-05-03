export interface ApiItem {
  name: string;
  url: string;
}

export interface ApiResponse {
  results: ApiItem[];
}
