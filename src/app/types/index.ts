export type QueryOptions = {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: string;
};

export type TPasswords = {
  oldPassword: string;
  newPassword: string;
};

export type IAuthorFilters = {
  id?: number;
  name?: string;
  page?: number;
  limit?: number;
};

export interface IBookFilters {
  title?: string;
  author?: number;
  publishedDate?: string;
  page?: number;
  limit?: number;
}

export interface Book {
  title: string;
  description?: string | null;
  publishedDate: Date;
  author_id: number;
}

export interface Author {
  name: string;
  bio?: string | null;
  birthdate: Date;
}
