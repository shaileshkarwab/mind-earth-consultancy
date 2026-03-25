// ========================
// Category types matching the /Category/v2 API response shape
// ========================
export interface NavSubCategory {
  subCategoryName: string;
  subCategoryLink: string | null;
}

export interface NavCategory {
  categoryName: string;
  subCategories: NavSubCategory[];
}
