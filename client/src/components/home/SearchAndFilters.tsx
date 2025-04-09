import { motion } from "framer-motion"
import { Search, MapPin, ChevronDown, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"

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
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  // Close the sheet after making a selection
  const handleCategorySelection = (category: string) => {
    onCategoryChange(category)
    setIsSheetOpen(false)
  }

  return (
    <motion.div
      className="mb-8 md:mb-12"
      id="all-places"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Tất cả địa điểm</h2>

        {/* Mobile filter button */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="lg:hidden flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Lọc</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[90%] sm:w-[400px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Lọc Địa Điểm</SheetTitle>
            </SheetHeader>
            <div className="py-6">
              <h3 className="text-lg font-medium mb-3">Danh mục</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => handleCategorySelection(category)}
                    className={selectedCategory === category ? "bg-primary hover:bg-primary/90" : ""}
                    size="sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <h3 className="text-lg font-medium mb-3">Địa điểm</h3>
              <div className="space-y-4">
                <div className="w-full">
                  <h4 className="text-sm font-medium mb-2">Thành phố</h4>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between group transition-all duration-200 border-zinc-600 hover:border-primary"
                      >
                        <span>{selectedCity}</span>
                        <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[280px] overflow-y-auto border-zinc-600">
                      <DropdownMenuRadioGroup value={selectedCity} onValueChange={(value) => {
                        onCityChange(value);
                        onDistrictChange("Tất cả quận");
                      }}>
                        {cities.map((city) => (
                          <DropdownMenuRadioItem key={city} value={city} className="cursor-pointer transition-colors">
                            {city}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="w-full">
                  <h4 className="text-sm font-medium mb-2">Quận/Huyện</h4>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between group transition-all duration-200 border-zinc-600 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={selectedCity === "Tất cả thành phố"}
                      >
                        <span>{selectedDistrict}</span>
                        <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[280px] overflow-y-auto border-zinc-600">
                      <DropdownMenuRadioGroup value={selectedDistrict} onValueChange={onDistrictChange}>
                        {selectedCity !== "Tất cả thành phố" && districts[selectedCity]?.map((district) => (
                          <DropdownMenuRadioItem key={district} value={district} className="cursor-pointer transition-colors">
                            {district}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 md:mb-8">
        <Input
          type="text"
          placeholder="Tìm kiếm địa điểm..."
          className="w-full p-3 md:p-4 pl-10 md:pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
      </div>

      {/* Desktop Location Filters */}
      <div className="hidden lg:block mb-8">
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
                  className="w-full justify-between group transition-all duration-200 border-zinc-600 hover:border-primary"
                >
                  <span>{selectedCity}</span>
                  <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[300px] overflow-y-auto border-zinc-600">
                <DropdownMenuRadioGroup value={selectedCity} onValueChange={(value) => {
                  onCityChange(value);
                  onDistrictChange("Tất cả quận");
                }}>
                  {cities.map((city) => (
                    <DropdownMenuRadioItem
                      key={city}
                      value={city}
                      className="cursor-pointer transition-colors hover:bg-primary/10"
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
                  className="w-full justify-between group transition-all duration-200 border-zinc-600 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={selectedCity === "Tất cả thành phố"}
                >
                  <span>{selectedDistrict}</span>
                  <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[300px] overflow-y-auto border-zinc-600">
                <DropdownMenuRadioGroup value={selectedDistrict} onValueChange={onDistrictChange}>
                  {selectedCity !== "Tất cả thành phố" && districts[selectedCity]?.map((district) => (
                    <DropdownMenuRadioItem
                      key={district}
                      value={district}
                      className="cursor-pointer transition-colors hover:bg-primary/10"
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

      {/* Desktop Category Filters */}
      <div className="hidden lg:flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <motion.div
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => onCategoryChange(category)}
              className={selectedCategory === category ? "bg-primary hover:bg-primary/90" : "border-zinc-600 hover:bg-zinc-800 hover:border-primary transition-colors duration-200"}
            >
              {category}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}