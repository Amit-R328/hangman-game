export interface CategoryState {
    categories: { [key: string]: { name: string; selected: boolean }[] };
    selectedCategory: string | null;
}  