import { create } from "zustand";
import { Location } from "@/types/location";
import { getAllLocations, searchLocationByName } from "@/services/locationServices";

interface LocationListResponse {
    data: Location[]
    total: number
    page: number
    limit: number
}

interface ExtendedLocationListResponse extends LocationListResponse {
    allLocation?: Location[]
}

interface LocationState {
    locationList: ExtendedLocationListResponse | null;
    selectedLocation: Location | null;
    isLoading: boolean,
    error: string | null,
    fetchAllLocations: () => Promise<void>
    searchResults: Location[]
    searchLocation: (query: string) => void
}

export const useLocationStore = create<LocationState>((set) => ({
    locationList: null,
    selectedLocation: null,
    isLoading: false,
    error: null,
    searchResults: [],
    searchLocation: async (query: string) => {
        if (!query.trim()) {
            set({ searchResults: [] });
            return;
        }

        set({ isLoading: true, error: null });
        try {
            const results = await searchLocationByName(query);
            set({
                searchResults: results,
                isLoading: false
            });

            if (results.length > 0) {
                set((state) => ({
                    locationList: {
                        ...state.locationList as ExtendedLocationListResponse,
                        allLocation: results
                    }
                }));
            }
        } catch (error) {
            set({ error: 'Failed to search Pokemon', isLoading: false });
            console.error('Error searching Pokemon:', error);
        }
    },

    fetchAllLocations: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await getAllLocations();
            set({
                locationList: {
                    ...data,
                    allLocation: data.data
                },
                isLoading: false
            });
        } catch (error) {
            set({ error: "Failed to fetch locations", isLoading: false });
            console.error("Error fetching locations:", error);
        }
    }
}));
