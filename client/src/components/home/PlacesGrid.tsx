import { motion } from "framer-motion"
import { LocationCard } from "@/components/PlaceCard"
import { Button } from "@/components/ui/button"
import { Location } from "@/types/location"

interface LocationsGridProps {
  locations: Location[]
  onViewPlace: (id: string) => void
  onResetFilters: () => void
}

export function LocationsGrid({ locations, onViewPlace, onResetFilters }: LocationsGridProps) {
  if (locations.length === 0) {
    return (
      <motion.div
        className="text-center py-16 bg-zinc-800/30 rounded-xl border border-zinc-700/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-lg text-zinc-400 mb-4">Không tìm thấy địa điểm phù hợp.</p>
        <Button
          variant="outline"
          className="mt-4 border-zinc-700 hover:bg-zinc-800"
          onClick={onResetFilters}
        >
          Xóa bộ lọc
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {locations.map((location, index) => (
        <motion.div
          key={location._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <LocationCard
            {...location}
            onClick={() => onViewPlace(location._id)}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}