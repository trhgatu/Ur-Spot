import { useState } from "react"
import { SearchAndFilters } from "@/components/home/SearchAndFilters"
import { PlacesGrid } from "@/components/home/PlacesGrid"
import { Sidebar } from "@/components/home/Sidebar"

interface HomePageProps {
  onViewPlace?: (id: string) => void
}

const categories = [
  "Tất cả",
  "Quán cà phê",
  "Quán ăn",
  "Cửa hàng",
]

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

// Mock data - sau này sẽ được thay thế bằng API call
const places = [
  {
    id: "1",
    name: "Cộng Cà Phê",
    description: "Quán cà phê với phong cách retro độc đáo, phục vụ cà phê và đồ uống đặc trưng.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    category: "Quán cà phê",
    rating: 4.5,
    address: "19 Nguyễn Huệ, Quận 1, TP.HCM",
  },
  {
    id: "2",
    name: "Phở 24",
    description: "Chuỗi nhà hàng phở nổi tiếng với hương vị đặc trưng và không gian hiện đại.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    category: "Quán ăn",
    rating: 4.2,
    address: "123 Lê Lợi, Quận 1, TP.HCM",
  },
  {
    id: "3",
    name: "Vincom Center",
    description: "Trung tâm thương mại hiện đại với nhiều cửa hàng thời trang và nhà hàng.",
    image: "https://images.unsplash.com/photo-1567958451986-7b5f1a0f8b0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    category: "Cửa hàng",
    rating: 4.7,
    address: "72 Lê Thánh Tôn, Quận 1, TP.HCM",
  },
  {
    id: "4",
    name: "Highland Coffee",
    description: "Thương hiệu cà phê Việt Nam với không gian hiện đại, phù hợp làm việc và gặp gỡ.",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    category: "Quán cà phê",
    rating: 4.3,
    address: "141 Nguyễn Du, Quận 1, TP.HCM",
  },
  {
    id: "5",
    name: "Nhà hàng Đông Phương",
    description: "Nhà hàng với các món ăn Á Đông đa dạng và không gian sang trọng.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    category: "Quán ăn",
    rating: 4.8,
    address: "30 Lê Thánh Tôn, Quận 1, TP.HCM",
  },
  {
    id: "6",
    name: "Diamond Plaza",
    description: "Trung tâm mua sắm cao cấp với nhiều thương hiệu quốc tế nổi tiếng.",
    image: "https://images.unsplash.com/photo-1565361837331-f470b1adca2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    category: "Cửa hàng",
    rating: 4.5,
    address: "34 Lê Duẩn, Quận 1, TP.HCM",
  },
]

export function HomePage({ onViewPlace }: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState("Tất cả thành phố")
  const [selectedDistrict, setSelectedDistrict] = useState("Tất cả quận")

  const filteredPlaces = places.filter((place) => {
    const matchesCategory = selectedCategory === "Tất cả" || place.category === selectedCategory
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handlePlaceClick = (id: string) => {
    if (onViewPlace) {
      onViewPlace(id)
    }
  }

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
        categories={categories}
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
            categories={categories}
            cities={cities}
            districts={districts}
          />

          <PlacesGrid
            places={filteredPlaces}
            onViewPlace={handlePlaceClick}
            onResetFilters={handleResetFilters}
          />
        </div>
      </div>
    </div>
  )
}
