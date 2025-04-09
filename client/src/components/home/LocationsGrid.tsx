import { motion } from "framer-motion"
import { LocationCard } from "@/components/home/LocationCard"
import { Button } from "@/components/ui/button"
import { Location } from "@/types/location"
import { useCategoryStore } from "@/store/categoryStore"
import { RefreshCw } from "lucide-react"

interface LocationsGridProps {
  locations: Location[]
  onResetFilters: () => void
}

export function LocationsGrid({ locations, onResetFilters }: LocationsGridProps) {
  const { categoryList } = useCategoryStore()

  if (locations.length === 0) {
    return (
      <motion.div
        className="text-center py-10 md:py-16 px-4 md:px-8 bg-muted/40 rounded-xl border border-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-muted rounded-full flex items-center justify-center mb-3 md:mb-4">
            <RefreshCw className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-2">Không tìm thấy địa điểm</h3>
          <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 max-w-md">Không có địa điểm nào phù hợp với bộ lọc hiện tại của bạn.</p>
          <Button
            variant="outline"
            onClick={onResetFilters}
            size="sm"
            className="md:text-base md:px-4 md:py-2"
          >
            Xóa bộ lọc
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {locations.map((location, index) => {
        // Find the category object by ID
        const category = categoryList?.data?.find(cat => cat._id === location.categoryId) ||
                         categoryList?.allCategory?.find(cat => cat._id === location.categoryId)

        return (
          <motion.div
            key={location._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
            viewport={{ once: true, margin: "-30px" }}
            className="h-full"
          >
            <LocationCard
              {...location}
              category={category || { _id: location.categoryId, name: "Unknown", description: "", slug: "", icon: "" }}
            />
          </motion.div>
        )
      })}
    </motion.div>
  )
}