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
        className="text-center py-16 px-8 bg-muted/40 rounded-xl border border-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <RefreshCw className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Không tìm thấy địa điểm</h3>
          <p className="text-muted-foreground mb-6 max-w-md">Không có địa điểm nào phù hợp với bộ lọc hiện tại của bạn.</p>
          <Button
            variant="outline"
            onClick={onResetFilters}
          >
            Xóa bộ lọc
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {locations.map((location, index) => {
        // Find the category object by ID
        const category = categoryList?.data?.find(cat => cat._id === location.categoryId)

        return (
          <motion.div
            key={location._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
            viewport={{ once: true, margin: "-50px" }}
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