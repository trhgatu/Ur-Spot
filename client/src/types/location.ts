import { AdministrativeUnit } from "@/types/administrativeUnit";
import { Coordinates } from "@/types/coordinates";

export interface Location {
    _id: string;
    name: string;
    description: string;
    categoryId: string;
    address: string;
    type: string;
    images: string[];
    ratings: number;
    coordinates?: Coordinates
    administrativeUnit: AdministrativeUnit
    averageRating: number;
    createdAt: string;
    updatedAt: string;
    openingHours?: string;
    wifi?: boolean;
    airConditioning?: boolean;
    noSmoking?: boolean;
}