export interface Location {
    _id: string;
    name: string;
    description: string;
    categoryId: string;
    address: string;
    type: string;
    images: string[];
    ratings: number;
    averageRating: number;
    createdAt: string;
    updatedAt: string;
}