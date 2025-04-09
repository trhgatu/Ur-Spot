import { useState, useEffect } from "react"
import { SearchAndFilters } from "@/components/home/SearchAndFilters"
import { LocationsGrid } from "@/components/home/LocationsGrid"
import { Sidebar } from "@/components/home/Sidebar"
import { useLocationStore } from "@/store/locationStore"
import { useCategoryStore } from "@/store/categoryStore"
import { useSidebar } from "@/contexts/SidebarContext"

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
  const { sidebarOpen, toggleSidebar } = useSidebar()

  useEffect(() => {
    fetchAllLocations()
    fetchAllCategories()
  }, [fetchAllLocations, fetchAllCategories])

  // Close sidebar when window resizes to larger screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && sidebarOpen) {
        toggleSidebar()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [sidebarOpen, toggleSidebar])

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

  // Function to handle category change from sidebar and close sidebar on mobile
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    if (window.innerWidth < 1024 && sidebarOpen) {
      toggleSidebar()
    }
  }

  return (
    <div className="w-full min-h-screen relative">
      {/* Overlay for mobile sidebar */}
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
