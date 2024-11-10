export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  edition_count?: number;
  language?: string[];
  subject?: string[];
  ratings_average?: number;
}

export interface SearchResponse {
  numFound: number;
  docs: Book[];
}