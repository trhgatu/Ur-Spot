import { motion } from "framer-motion";
import { Search, MapPin, ChevronDown, Filter, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface AdministrativeUnit {
  code: string;
  name: string;
}

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  selectedDistrict: string;
  onDistrictChange: (district: string) => void;
  selectedWard: string;
  onWardChange: (ward: string) => void;
  categories: string[];
  cities: AdministrativeUnit[];
  districts: AdministrativeUnit[];
  wards: AdministrativeUnit[];
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
  selectedWard,
  onWardChange,
  categories,
  cities,
  districts,
  wards,
}: SearchAndFiltersProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  useEffect(() => {
    let count = 0;
    if (selectedCategory !== "Tất cả") count++;
    if (selectedCity !== "all") count++;
    if (selectedDistrict !== "all") count++;
    if (selectedWard !== "all") count++;
    setActiveFilters(count);
  }, [selectedCategory, selectedCity, selectedDistrict, selectedWard]);

  const handleCategorySelection = (category: string) => {
    onCategoryChange(category);
    setIsSheetOpen(false);
  };

  const handleResetFilters = () => {
    onCategoryChange("Tất cả");
    onCityChange("all");
    onDistrictChange("all");
    onWardChange("all");
  };

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
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary hidden md:inline-block" />
          Khám phá địa điểm
        </h2>

        {/* Mobile filter button */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden flex items-center gap-2 relative"
            >
              <Filter className="h-4 w-4" />
              <span>Bộ lọc</span>
              {activeFilters > 0 && (
                <Badge
                  variant="secondary"
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-primary text-white text-xs rounded-full"
                >
                  {activeFilters}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[90%] sm:w-[400px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-xl flex items-center justify-between">
                <span>Lọc Địa Điểm</span>
                {activeFilters > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResetFilters}
                    className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
                  >
                    <X className="h-3 w-3" />
                    Xóa bộ lọc
                  </Button>
                )}
              </SheetTitle>
            </SheetHeader>
            <div className="py-6">
              <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Danh mục
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => handleCategorySelection(category)}
                    className={`${selectedCategory === category ? "bg-primary hover:bg-primary/90" : ""} text-sm h-auto py-2 justify-start`}
                    size="sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <h3 className="text-lg font-medium mb-3 flex items-center gap-2 mt-6">
                <MapPin className="h-4 w-4 text-primary" />
                Địa điểm
              </h3>
              <div className="space-y-4">
                <div className="w-full">
                  <h4 className="text-sm font-medium mb-2">Thành phố</h4>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between group transition-all duration-200 border-zinc-300 dark:border-zinc-700 hover:border-primary"
                      >
                        <span>{cities.find((c) => c.code === selectedCity)?.name || "Chọn tỉnh"}</span>
                        <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[280px] overflow-y-auto border-zinc-300 dark:border-zinc-700">
                      <DropdownMenuRadioGroup value={selectedCity} onValueChange={onCityChange}>
                        {cities.map((city) => (
                          <DropdownMenuRadioItem key={city.code} value={city.code} className="cursor-pointer transition-colors">
                            {city.name}
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
                        className="w-full justify-between group transition-all duration-200 border-zinc-300 dark:border-zinc-700 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!selectedCity || selectedCity === "all"}
                      >
                        <span>{districts.find((d) => d.code === selectedDistrict)?.name || "Chọn quận"}</span>
                        <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[280px] overflow-y-auto border-zinc-300 dark:border-zinc-700">
                      <DropdownMenuRadioGroup value={selectedDistrict} onValueChange={onDistrictChange}>
                        {districts.map((district) => (
                          <DropdownMenuRadioItem key={district.code} value={district.code} className="cursor-pointer transition-colors">
                            {district.name}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="w-full">
                  <h4 className="text-sm font-medium mb-2">Phường/Xã</h4>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between group transition-all duration-200 border-zinc-300 dark:border-zinc-700 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!selectedDistrict || selectedDistrict === "all"}
                      >
                        <span>{wards.find((w) => w.code === selectedWard)?.name || "Chọn phường"}</span>
                        <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[280px] overflow-y-auto border-zinc-300 dark:border-zinc-700">
                      <DropdownMenuRadioGroup value={selectedWard} onValueChange={onWardChange}>
                        {wards.map((ward) => (
                          <DropdownMenuRadioItem key={ward.code} value={ward.code} className="cursor-pointer transition-colors">
                            {ward.name}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button className="w-full">Áp dụng bộ lọc</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 md:mb-8">
        <div className="relative">
          <Input
            type="text"
            placeholder="Tìm kiếm địa điểm..."
            className="w-full p-3 md:p-4 pl-10 md:pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-full"
              onClick={() => onSearchChange("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Active filters display */}
        {activeFilters > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedCategory !== "Tất cả" && (
              <Badge variant="secondary" className="px-3 py-1 bg-primary/10 text-primary flex items-center gap-1">
                {selectedCategory}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onCategoryChange("Tất cả")}
                  className="h-4 w-4 p-0 ml-1 rounded-full hover:bg-primary/20"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {selectedCity !== "all" && (
              <Badge variant="secondary" className="px-3 py-1 bg-primary/10 text-primary flex items-center gap-1">
                {cities.find((c) => c.code === selectedCity)?.name || selectedCity}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onCityChange("all");
                    onDistrictChange("all");
                    onWardChange("all");
                  }}
                  className="h-4 w-4 p-0 ml-1 rounded-full hover:bg-primary/20"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {selectedDistrict !== "all" && (
              <Badge variant="secondary" className="px-3 py-1 bg-primary/10 text-primary flex items-center gap-1">
                {districts.find((d) => d.code === selectedDistrict)?.name || selectedDistrict}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onDistrictChange("all");
                    onWardChange("all");
                  }}
                  className="h-4 w-4 p-0 ml-1 rounded-full hover:bg-primary/20"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {selectedWard !== "all" && (
              <Badge variant="secondary" className="px-3 py-1 bg-primary/10 text-primary flex items-center gap-1">
                {wards.find((w) => w.code === selectedWard)?.name || selectedWard}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onWardChange("all")}
                  className="h-4 w-4 p-0 ml-1 rounded-full hover:bg-primary/20"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {activeFilters > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary h-6"
              >
                <X className="h-3 w-3" />
                Xóa tất cả
              </Button>
            )}
          </div>
        )}
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
                  className="w-full justify-between group transition-all duration-200 border-zinc-300 dark:border-zinc-700 hover:border-primary"
                >
                  <span>{cities.find((c) => c.code === selectedCity)?.name || "Chọn tỉnh"}</span>
                  <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[300px] overflow-y-auto border-zinc-300 dark:border-zinc-700">
                <DropdownMenuRadioGroup value={selectedCity} onValueChange={onCityChange}>
                  {cities.map((city) => (
                    <DropdownMenuRadioItem
                      key={city.code}
                      value={city.code}
                      className="cursor-pointer transition-colors hover:bg-primary/10"
                    >
                      {city.name}
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
                  className="w-full justify-between group transition-all duration-200 border-zinc-300 dark:border-zinc-700 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedCity || selectedCity === "all"}
                >
                  <span>{districts.find((d) => d.code === selectedDistrict)?.name || "Chọn quận"}</span>
                  <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[300px] overflow-y-auto border-zinc-300 dark:border-zinc-700">
                <DropdownMenuRadioGroup value={selectedDistrict} onValueChange={onDistrictChange}>
                  {districts.map((district) => (
                    <DropdownMenuRadioItem
                      key={district.code}
                      value={district.code}
                      className="cursor-pointer transition-colors hover:bg-primary/10"
                    >
                      {district.name}
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
                  className="w-full justify-between group transition-all duration-200 border-zinc-300 dark:border-zinc-700 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedDistrict || selectedDistrict === "all"}
                >
                  <span>{wards.find((w) => w.code === selectedWard)?.name || "Chọn phường"}</span>
                  <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[300px] overflow-y-auto border-zinc-300 dark:border-zinc-700">
                <DropdownMenuRadioGroup value={selectedWard} onValueChange={onWardChange}>
                  {wards.map((ward) => (
                    <DropdownMenuRadioItem
                      key={ward.code}
                      value={ward.code}
                      className="cursor-pointer transition-colors hover:bg-primary/10"
                    >
                      {ward.name}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Desktop Category Pills */}
      <div className="hidden lg:flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => onCategoryChange(category)}
            className={`${
              selectedCategory === category
                ? "bg-primary hover:bg-primary/90"
                : "hover:bg-primary/10 hover:text-primary hover:border-primary/30"
            } rounded-full px-4 transition-all duration-200`}
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>
    </motion.div>
  );
}