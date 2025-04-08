import { motion } from "framer-motion"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchAndFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  selectedCity: string
  onCityChange: (city: string) => void
  selectedDistrict: string
  onDistrictChange: (district: string) => void
  categories: string[]
  cities: string[]
  districts: Record<string, string[]>
}

export function SearchAndFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedCity,
  onCityChange,
  selectedDistrict,
  onDistrictChange,
  categories,
  cities,
  districts,
}: SearchAndFiltersProps) {
  return (
    <motion.div
      className="mb-12"
      id="all-places"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-8">Tất cả địa điểm</h2>

      {/* Search Bar */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Tìm kiếm địa điểm..."
          className="w-full p-4 pl-12 rounded-lg border border-zinc-700 bg-zinc-800/50 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
      </div>

      {/* Location Filters */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-medium">Lọc theo địa điểm</h3>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <select
              className="w-full p-3 rounded-lg border border-zinc-700 bg-zinc-800/50 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              value={selectedCity}
              onChange={(e) => {
                onCityChange(e.target.value)
                onDistrictChange("Tất cả quận")
              }}
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <select
              className="w-full p-3 rounded-lg border border-zinc-700 bg-zinc-800/50 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              value={selectedDistrict}
              onChange={(e) => onDistrictChange(e.target.value)}
              disabled={selectedCity === "Tất cả thành phố"}
            >
              {selectedCity !== "Tất cả thành phố" && districts[selectedCity].map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <motion.div
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => onCategoryChange(category)}
              className={selectedCategory === category ? "bg-primary hover:bg-primary/90" : "border-zinc-700 hover:bg-zinc-800"}
            >
              {category}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}