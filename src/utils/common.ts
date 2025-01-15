import { v4 as uuidv4 } from "uuid";

import type { Pagination } from "@src/schemas/common";

export const generateUUID = (): string => uuidv4();

export const getPagination = (
  page: number,
  per_page: number,
  total: number
): Pagination => {
  return {
    page,
    per_page,
    total_pages: Math.ceil(total / per_page),
    total_items: total,
  };
};
