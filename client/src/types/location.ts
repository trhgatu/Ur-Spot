export interface Location {
    _id: string;
    name: string;
    description: string;
    address: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    images: string[];
    rating: number;
    createdAt: string;
    updatedAt: string;
}

export interface LocationFormData {
    name: string;
    description: string;
    address: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    images: string[];
}