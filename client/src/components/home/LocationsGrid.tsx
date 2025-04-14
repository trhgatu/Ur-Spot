import { motion } from "framer-motion"
import { LocationCard } from "@/components/home/LocationCard"
import { Button } from "@/components/ui/button"
import { Location } from "@/types/location"
import { useCategoryStore } from "@/store/categoryStore"
import { RefreshCw, MapPin, Search } from "lucide-react"

interface LocationsGridProps {
  locations: Location[]
  onResetFilters: () => void
}

export function LocationsGrid({ locations, onResetFilters }: LocationsGridProps) {
  const { categoryList } = useCategoryStore()

  if (locations.length === 0) {
    return (
      <motion.div
        className="text-center py-12 md:py-20 px-6 md:px-10 bg-muted/30 dark:bg-muted/10 rounded-xl border border-muted/60 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center max-w-md mx-auto">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mb-5 md:mb-6">
            <Search className="w-8 h-8 md:w-10 md:h-10 text-primary" />
          </div>
          <h3 className="text-xl md:text-2xl font-semibold mb-3">Không tìm thấy địa điểm</h3>
          <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
            Không có địa điểm nào phù hợp với bộ lọc hiện tại của bạn. Hãy thử điều chỉnh bộ lọc để tìm kiếm lại.
          </p>
          <Button
            variant="default"
            onClick={onResetFilters}
            size="lg"
            className="md:text-base px-6 py-2 rounded-lg group"
          >
            <RefreshCw className="w-4 h-4 mr-2 group-hover:animate-spin" /> Xóa bộ lọc
          </Button>
        </div>
      </motion.div>
    )
  }

  // Staggered animation for grid items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="text-lg md:text-xl font-medium">
            {locations.length} {locations.length === 1 ? 'địa điểm' : 'địa điểm'} được tìm thấy
          </h3>
        </div>
      </div>
      
      <motion.div
        className="grid grid-cols-1 gap-6 xs:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {locations.map((location) => {
          // Find the category object by ID
          const category = categoryList?.data?.find(cat => cat._id === location.categoryId) ||
                          categoryList?.allCategory?.find(cat => cat._id === location.categoryId)

          return (
            <motion.div
              key={location._id}
              variants={item}
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
    </div>
  )
}