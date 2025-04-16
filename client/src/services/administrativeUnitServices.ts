import api from "./api";
import { Province, District, Ward } from "@/types/administrativeUnit";

export const getAllProvinces = async (): Promise<Province[]> => {
  const response = await api.get("/administrative-units/provinces");
  return response.data;
};

export const getDistrictsByProvince = async (provinceCode: string): Promise<District[]> => {
  const response = await api.get(`/administrative-units/districts/${provinceCode}`);
  return response.data;
};

export const getWardsByDistrict = async (districtCode: string): Promise<Ward[]> => {
  const response = await api.get(`/administrative-units/wards/${districtCode}`);
  return response.data;
};