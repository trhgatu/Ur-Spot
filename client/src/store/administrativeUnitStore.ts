import { create } from "zustand";
import { Province, District, Ward } from "@/types/administrativeUnit";
import { getAllProvinces, getDistrictsByProvince, getWardsByDistrict } from "@/services/administrativeUnitServices";

interface AdministrativeUnitState {
  provinces: Province[];
  districts: District[];
  wards: Ward[];
  isLoading: boolean;
  error: string | null;
  fetchProvinces: () => Promise<void>;
  fetchDistricts: (provinceCode: string) => Promise<void>;
  fetchWards: (districtCode: string) => Promise<void>;
}

export const useAdministrativeUnitStore = create<AdministrativeUnitState>((set) => ({
  provinces: [],
  districts: [],
  wards: [],
  isLoading: false,
  error: null,

  fetchProvinces: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getAllProvinces();
      const provinces = data.map((p) => ({ ...p, code: String(p.code) }));
      set({ provinces, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch provinces", isLoading: false });
      console.error("Error fetching provinces:", error);
    }
  },

  fetchDistricts: async (provinceCode: string) => {
    set({ isLoading: true, error: null, districts: [], wards: [] });
    try {
      const data = await getDistrictsByProvince(provinceCode);
      const districts = data.map((d) => ({ ...d, code: String(d.code) }));
      set({ districts, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch districts", isLoading: false });
      console.error("Error fetching districts:", error);
    }
  },

  fetchWards: async (districtCode: string) => {
    set({ isLoading: true, error: null, wards: [] });
    try {
      const data = await getWardsByDistrict(districtCode);
      const wards = data.map((w) => ({ ...w, code: String(w.code) }));
      set({ wards, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch wards", isLoading: false });
      console.error("Error fetching wards:", error);
    }
  },
}));