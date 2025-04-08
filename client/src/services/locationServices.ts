import api from "./api";

export const getAllLocations = async () => {
    const response = await api.get("/locations");
    return response.data;
}

export const searchLocationByName = async (query: string) => {
    const response = await api.get(`/locations/search?name=${query}`);
    return response.data;
}


