import { motion } from "framer-motion"
import { PlaceCard } from "@/components/PlaceCard"
import { Button } from "@/components/ui/button"

interface Place {
  id: string
  name: string
  description: string
  image: string
  category: string
  rating: number
  address: string
}

interface PlacesGridProps {
  places: Place[]
  onViewPlace: (id: string) => void
  onResetFilters: () => void
}

export function PlacesGrid({ places, onViewPlace, onResetFilters }: PlacesGridProps) {
  if (places.length === 0) {
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
      {places.map((place, index) => (
        <motion.div
          key={place.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <PlaceCard
            {...place}
            onClick={() => onViewPlace(place.id)}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}