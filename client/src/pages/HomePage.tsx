import { useState, useEffect } from "react";
import { SearchAndFilters } from "@/components/home/SearchAndFilters";
import { LocationsGrid } from "@/components/home/LocationsGrid";
import { Sidebar } from "@/components/home/Sidebar";
import { useLocationStore } from "@/store/locationStore";
import { useCategoryStore } from "@/store/categoryStore";
import { useAdministrativeUnitStore } from "@/store/administrativeUnitStore";
import { useSidebar } from "@/contexts/SidebarContext";
import { Button } from "@/components/ui/button";

export function HomePage() {
  const { locationList, isLoading, error, fetchAllLocations } = useLocationStore();
  const { categoryList, isLoading: categoriesLoading, fetchAllCategories } = useCategoryStore();
  const { provinces, districts, wards, isLoading: adminLoading, error: adminError, fetchProvinces, fetchDistricts, fetchWards } = useAdministrativeUnitStore();
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [selectedWard, setSelectedWard] = useState("all");
  const { sidebarOpen, toggleSidebar } = useSidebar();

  // Lấy danh sách tỉnh
  useEffect(() => {
    fetchProvinces();
  }, [fetchProvinces]);

  // Lấy danh sách quận/huyện khi chọn tỉnh
  useEffect(() => {
    setSelectedDistrict("all");
    setSelectedWard("all");
    useAdministrativeUnitStore.setState({ districts: [], wards: [] });
    if (selectedCity && selectedCity !== "all") {
      fetchDistricts(selectedCity);
    }
  }, [selectedCity, fetchDistricts]);

  // Lấy danh sách phường/xã khi chọn quận
  useEffect(() => {
    setSelectedWard("all");
    useAdministrativeUnitStore.setState({ wards: [] });
    if (selectedDistrict && selectedDistrict !== "all") {
      fetchWards(selectedDistrict);
    }
  }, [selectedDistrict, fetchWards]);

  // Lấy danh sách địa điểm và danh mục
  useEffect(() => {
    fetchAllLocations();
    fetchAllCategories();
  }, [fetchAllLocations, fetchAllCategories]);

  // Lọc địa điểm
  const categoryNames = ["Tất cả", ...(categoryList?.allCategory?.map((category) => category.name) ?? [])];
  const filteredLocations = locationList?.allLocation?.filter((location) => {
    const matchesCategory =
      selectedCategory === "Tất cả" ||
      categoryList?.data?.find((category) => category._id === location.categoryId)?.name === selectedCategory;
    const matchesSearch =
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (location.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity =
      selectedCity === "all" || location.administrativeUnit?.provinceId === String(selectedCity);
    const matchesDistrict =
      selectedDistrict === "all" || location.administrativeUnit?.districtId === String(selectedDistrict);
    const matchesWard =
      selectedWard === "all" || location.administrativeUnit?.wardId === String(selectedWard);

    console.log({
      location: location.name,
      selectedCity,
      provinceId: location.administrativeUnit?.provinceId,
      matchesCity,
      selectedCategory,
      categoryId: location.categoryId,
      matchesCategory,
      matchesSearch,
      matchesDistrict,
      matchesWard,
    });

    return matchesCategory && matchesSearch && matchesCity && matchesDistrict && matchesWard;
  }) || [];

  const handleResetFilters = () => {
    setSelectedCategory("Tất cả");
    setSearchQuery("");
    setSelectedCity("all");
    setSelectedDistrict("all");
    setSelectedWard("all");
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (window.innerWidth < 1024 && sidebarOpen) {
      toggleSidebar();
    }
  };

  return (
    <div className="w-full min-h-screen relative">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <Sidebar
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        categories={categoryNames}
        isOpen={sidebarOpen}
      />

      <div className="lg:pl-64 pt-4">
        <div className="container mx-auto px-4 py-6">
          {adminLoading ? (
            <div className="text-center py-4">
              <p className="text-lg text-zinc-400">Đang tải danh sách tỉnh...</p>
            </div>
          ) : adminError ? (
            <div className="text-center py-4">
              <p className="text-lg text-red-400">{adminError}</p>
              <Button onClick={() => fetchProvinces()} className="mt-2">
                Thử lại
              </Button>
            </div>
          ) : (
            <SearchAndFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedCity={selectedCity}
              onCityChange={setSelectedCity}
              selectedDistrict={selectedDistrict}
              onDistrictChange={setSelectedDistrict}
              selectedWard={selectedWard}
              onWardChange={setSelectedWard}
              categories={categoryNames}
              cities={provinces}
              districts={districts}
              wards={wards}
            />
          )}

          {isLoading || categoriesLoading ? (
            <div className="text-center py-16">
              <p className="text-lg text-zinc-400">Đang tải...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-lg text-red-400">{error}</p>
              <Button onClick={() => fetchAllLocations()} className="mt-2">
                Thử lại
              </Button>
            </div>
          ) : filteredLocations.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-zinc-400">Không tìm thấy địa điểm nào</p>
              <Button onClick={handleResetFilters} className="mt-2">
                Xóa bộ lọc
              </Button>
            </div>
          ) : (
            <LocationsGrid
              locations={filteredLocations}
              onResetFilters={handleResetFilters}
            />
          )}
        </div>
      </div>
    </div>
  );
}