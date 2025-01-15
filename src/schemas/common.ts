export type UserJwtPayload = {
  id: number;
  email: string;
  role: number;
};

export type ResponseItems<TypeItem = Record<string, any>> = {
  items: TypeItem[];
  pagination: Pagination;
};

export type Pagination = {
  page: number;
  per_page: number;
  total_pages: number;
  total_items: number;
};
