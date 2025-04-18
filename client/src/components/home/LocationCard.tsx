import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Heart, MapPin, Star } from "lucide-react"
import { Category } from "@/types/category"
import { Link } from "react-router-dom"
import { useState } from "react"

interface LocationCardProps {
  _id: string
  name: string
  description: string
  images: string[]
  averageRating: number
  address: string
  openingHours?: string
  wifi?: boolean
  airConditioning?: boolean
  noSmoking?: boolean
  category: Category
}

export function LocationCard({
  _id,
  name,
  description,
  images,
  category,
  averageRating,
  address,
  openingHours,
}: LocationCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const imageUrl = images && images.length > 0
    ? images[0]
    : "https://placehold.co/600x400/gray/white?text=No+Image";

  return (
    <Card className="w-full h-full flex flex-col py-0 gap-0 max-w-sm overflow-hidden group hover:shadow-lg transition-all duration-300 border-muted/60 rounded-xl">
      <div className="relative">
        <CardHeader className="p-0">
          <div className="relative overflow-hidden rounded-t-xl">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </CardHeader>
        <Badge
          variant="secondary"
          className="absolute top-3 left-3 backdrop-blur-sm shadow-sm text-xs font-medium px-2.5 py-1"
        >
          {category.name}
        </Badge>
        <button
          className="absolute top-3 right-3 p-2 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors duration-200"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-gray-500'} transition-colors duration-200`} />
        </button>
      </div>

      <CardContent className="p-4 pt-5 flex-grow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors duration-200">{name}</h3>
          <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-0.5 rounded-md">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">{averageRating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <MapPin size={16} className="flex-shrink-0 text-primary/70" />
          <span className="line-clamp-1">{address}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Clock size={16} className="flex-shrink-0 text-primary/70" />
          <span>Mở cửa: {openingHours}</span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{description}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto">
        <Link to={`/location/${_id}`} className="w-full">
          <Button className="w-full font-medium rounded-lg group-hover:bg-primary/90 transition-all duration-200 shadow-sm" variant="default">
            Xem chi tiết
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}