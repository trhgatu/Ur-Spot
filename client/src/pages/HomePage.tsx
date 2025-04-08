import { useState, useEffect } from "react"
import { SearchAndFilters } from "@/components/home/SearchAndFilters"
import { LocationsGrid } from "@/components/home/LocationsGrid"
import { Sidebar } from "@/components/home/Sidebar"
import { useLocationStore } from "@/store/locationStore"
import { useCategoryStore } from "@/store/categoryStore"

const cities = [
  "Tất cả thành phố",
  "TP. Hồ Chí Minh",
  "Hà Nội",
  "Đà Nẵng",
  "Nha Trang",
  "Cần Thơ",
]

const districts = {
  "TP. Hồ Chí Minh": [
    "Tất cả quận",
    "Quận 1",
    "Quận 2",
    "Quận 3",
    "Quận 4",
    "Quận 5",
    "Quận 7",
    "Quận 8",
    "Quận 9",
    "Quận 10",
    "Quận Bình Thạnh",
    "Quận Gò Vấp",
    "Quận Phú Nhuận",
    "Quận Tân Bình",
    "Quận Tân Phú",
  ],
  "Hà Nội": [
    "Tất cả quận",
    "Quận Ba Đình",
    "Quận Cầu Giấy",
    "Quận Đống Đa",
    "Quận Hai Bà Trưng",
    "Quận Hoàn Kiếm",
    "Quận Long Biên",
    "Quận Tây Hồ",
    "Quận Thanh Xuân",
  ],
  "Đà Nẵng": [
    "Tất cả quận",
    "Quận Cẩm Lệ",
    "Quận Hải Châu",
    "Quận Liên Chiểu",
    "Quận Ngũ Hành Sơn",
    "Quận Sơn Trà",
    "Quận Thanh Khê",
  ],
  "Nha Trang": [
    "Tất cả quận",
    "Quận Lộc Vọng",
    "Quận Ngọc Hiệp",
    "Quận Vạn Thạnh",
    "Quận Vĩnh Hải",
    "Quận Vĩnh Phước",
  ],
  "Cần Thơ": [
    "Tất cả quận",
    "Quận Bình Thuỷ",
    "Quận Cái Răng",
    "Quận Ninh Kiều",
    "Quận Ô Môn",
    "Quận Thốt Nốt",
  ],
}


export function HomePage() {
  const { locationList, isLoading, error, fetchAllLocations } = useLocationStore()
  const { categoryList, isLoading: categoriesLoading, fetchAllCategories } = useCategoryStore()
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState("Tất cả thành phố")
  const [selectedDistrict, setSelectedDistrict] = useState("Tất cả quận")

  useEffect(() => {
    fetchAllLocations()
    fetchAllCategories()
  }, [fetchAllLocations, fetchAllCategories])

  const categoryNames = ["Tất cả", ...(categoryList?.allCategory?.map(category => category.name) ?? [])]
  const filteredLocations = locationList?.allLocation?.filter((location) => {
    const matchesCategory = selectedCategory === "Tất cả" ||
      categoryList?.data?.find((category) => category._id === location.categoryId)?.name === selectedCategory
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  }) || []


  const handleResetFilters = () => {
    setSelectedCategory("Tất cả")
    setSearchQuery("")
    setSelectedCity("Tất cả thành phố")
    setSelectedDistrict("Tất cả quận")
  }

  return (
    <div className="w-full min-h-screen">
      <Sidebar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categoryNames}
      />

      <div className="pl-64">
        <div className="container mx-auto px-4">
          <SearchAndFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
            selectedDistrict={selectedDistrict}
            onDistrictChange={setSelectedDistrict}
            categories={categoryNames}
            cities={cities}
            districts={districts}
          />

          {isLoading || categoriesLoading ? (
            <div className="text-center py-16">
              <p className="text-lg text-zinc-400">Đang tải...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-lg text-red-400">{error}</p>
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
  )
}
