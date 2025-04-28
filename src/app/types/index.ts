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
  publishedDate?: string;
  page?: number;
  limit?: number;
}

export interface Book {
  id: number;
  title: string;
  description?: string | null;
  publishedDate: Date;
  author_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Author {
  id: number;
  name: string;
  bio?: string | null;
  birthdate: Date;
  books: Book[];
  createdAt: Date;
  updatedAt: Date;
}
