import { motion } from "framer-motion"
import { Coffee, Utensils, ShoppingBag, MapPin, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  categories: string[]
}

export function Sidebar({ selectedCategory, onCategoryChange, categories }: SidebarProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Quán cà phê":
        return <Coffee className="w-5 h-5" />
      case "Quán ăn":
        return <Utensils className="w-5 h-5" />
      case "Cửa hàng":
        return <ShoppingBag className="w-5 h-5" />
      case "Tất cả":
        return <Star className="w-5 h-5" />
      default:
        return <MapPin className="w-5 h-5" />
    }
  }

  return (
    <motion.div
      className="w-64  backdrop-blur-sm border-r h-full fixed left-0 top-0 pt-20 pb-6 overflow-y-auto"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold mb-4">Danh mục</h2>
        <div className="space-y-1">
          {categories.map((category) => (
            <motion.button
              key={category}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                selectedCategory === category
                  ? "bg-primary text-white dark:text-black"
                  : "hover:bg-zinc-800 hover:text-white"
              )}
              onClick={() => onCategoryChange(category)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              {getCategoryIcon(category)}
              <span>{category}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}