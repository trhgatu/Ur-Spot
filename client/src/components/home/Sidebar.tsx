import { motion } from "framer-motion"
import { Coffee, Utensils, ShoppingBag, MapPin, Star, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  categories: string[]
  isOpen?: boolean
}

export function Sidebar({ selectedCategory, onCategoryChange, categories, isOpen = false }: SidebarProps) {
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
      className={cn(
        "w-64 backdrop-blur-sm border-r h-full fixed left-0 top-0 pt-20 pb-6 overflow-y-auto z-50 transition-transform duration-300 bg-background",
        // Mobile: show/hide based on isOpen state
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Close button - only on mobile */}
      <div className="absolute top-4 right-4 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onCategoryChange(selectedCategory)} // Close sidebar
          className="h-8 w-8 rounded-full"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

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