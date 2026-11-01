export type StoreCategory = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  sortOrder: number;
  parentId: string | null;
  children: StoreCategory[];
};

export type CategoriesResponse = {
  success: boolean;
  message?: string;
  data?: StoreCategory[];
};
