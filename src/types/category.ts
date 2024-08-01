export type Category = {
  _id: string;
  categoryName: string;
  categoryIcon: string;
  categorySlug: string;
  categoryDescription: string;
  parent?: Category;
  categoryThumbnail: string;
  subcategories?: Category[];
};
