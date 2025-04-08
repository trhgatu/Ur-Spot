import { create } from "zustand"
import { getAllCategories } from "@/services/categoryServices"
import { Category } from "@/types/category"

interface CategoryListResponse {
    data: Category[]
    total: number
    page: number
    limit: number
}
interface ExtendedCategoryListResponse extends CategoryListResponse {
    allCategory?: Category[]
}
interface CategoryState {
    categoryList: ExtendedCategoryListResponse | null;
    isLoading: boolean
    error: string | null
    fetchAllCategories: () => Promise<void>
}

export const useCategoryStore = create<CategoryState>((set) => ({
    categoryList: null,
    isLoading: false,
    error: null,

    fetchAllCategories: async () => {
        set({ isLoading: true, error: null })
        try {
            const data = await getAllCategories()
            set({
                categoryList: {
                    ...data,
                    allCategory: data.data
                },
                isLoading: false
            })
        } catch (error) {
            set({ error: "Failed to fetch categories", isLoading: false })
            console.error("Error fetching categories", error)
        }
    }
}))
