import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Heart, MapPin, Star } from "lucide-react"
import { Category } from "@/types/category"
import { Link } from "react-router-dom"

interface LocationCardProps {
  _id: string
  name: string
  description: string
  images: string[]
  averageRating: number
  address: string
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
}: LocationCardProps) {
  const imageUrl = images && images.length > 0
    ? images[0]
    : "https://placehold.co/600x400/gray/white?text=No+Image";

  return (
    <Card className="w-full py-0 gap-0 max-w-sm overflow-hidden group hover:shadow-md transition-all duration-300 border-muted">
      <div className="relative">
        <CardHeader className="p-0">
          <div className="relative overflow-hidden">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </CardHeader>
        <Badge
          variant="secondary"
          className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm shadow-sm"
        >
          {category.name}
        </Badge>
        <button className="absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
          <Heart className="w-5 h-5 text-gray-500 hover:text-rose-500 transition-colors" />
        </button>
      </div>

      <CardContent className="p-4 pt-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold line-clamp-1">{name}</h3>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-md">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-700">{averageRating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <MapPin size={16} className="flex-shrink-0 text-gray-400" />
          <span className="line-clamp-1">{address}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Clock size={16} className="flex-shrink-0 text-gray-400" />
          <span>Mở cửa: 8:00 - 22:00</span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link to={`/location/${_id}`} className="w-full">
          <Button className="w-full font-medium" variant="default">
            Xem chi tiết
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}