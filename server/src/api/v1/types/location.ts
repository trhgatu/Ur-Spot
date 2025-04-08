import { Category } from "./category";

export interface Location {
    _id: string;
    name: string;
    description: string;
    category: Category;
    address: string;
    type: string;
    images: string[];
    ratings: number;
    averageRating: number;
    createdAt: string;
    updatedAt: string;
}