import { motion } from "framer-motion"
import { Search, MapPin, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"

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
        <Input
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between border border-zinc-700 bg-zinc-800/50 text-white hover:bg-zinc-700/70 hover:text-white"
                >
                  {selectedCity}
                  <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full min-w-[200px] max-h-[300px] overflow-y-auto bg-zinc-800 border border-zinc-700">
                <DropdownMenuRadioGroup value={selectedCity} onValueChange={(value) => {
                  onCityChange(value);
                  onDistrictChange("Tất cả quận");
                }}>
                  {cities.map((city) => (
                    <DropdownMenuRadioItem
                      key={city}
                      value={city}
                      className="text-white cursor-pointer hover:bg-zinc-700"
                    >
                      {city}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between border border-zinc-700 bg-zinc-800/50 text-white hover:bg-zinc-700/70 hover:text-white"
                  disabled={selectedCity === "Tất cả thành phố"}
                >
                  {selectedDistrict}
                  <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full min-w-[200px] max-h-[300px] overflow-y-auto bg-zinc-800 border border-zinc-700">
                <DropdownMenuRadioGroup value={selectedDistrict} onValueChange={onDistrictChange}>
                  {selectedCity !== "Tất cả thành phố" && districts[selectedCity]?.map((district) => (
                    <DropdownMenuRadioItem
                      key={district}
                      value={district}
                      className="text-white cursor-pointer hover:bg-zinc-700"
                    >
                      {district}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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