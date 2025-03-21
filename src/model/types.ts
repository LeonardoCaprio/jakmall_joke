export interface CategoryAliases {
  alias: string;
  resolved: string;
}

export interface CategoryResponse {
  error: boolean;
  categories: string[];
  categoryAliases: CategoryAliases[];
  timestamp: number;
}

export interface JokesDetailRequest {
  category: string;
  amount: number;
}

export interface JokesDetailByCategoriesResponse {
  error: boolean;
  amount: number;
  jokes: Array<{
    category: string;
    type: string;
    joke: string;
    flags: Record<string, boolean>;
    id: number;
    safe: boolean;
    lang: string;
  }>;
}

export interface Joke {
  id: number;
  joke: string;
  category: string;
}

export interface Category {
  id: number;
  categoryName: string;
  jokes: Joke[];
  addedJokesCount: number;
}

export interface JokesDetail {
  category: string;
  jokes: string[];
}
