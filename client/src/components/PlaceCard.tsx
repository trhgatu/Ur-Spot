import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Star } from "lucide-react"

interface PlaceCardProps {
  id: string
  name: string
  description: string
  image: string
  category: string
  rating: number
  address: string
  onClick?: () => void
}

export function PlaceCard({
  name,
  description,
  image,
  category,
  rating,
  address,
  onClick
}: PlaceCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader className="p-0">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">{name}</h3>
          <Badge variant="secondary">{category}</Badge>
        </div>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin size={16} />
          <span className="line-clamp-1">{address}</span>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" variant="default" onClick={(e) => {
          e.stopPropagation();
          if (onClick) onClick();
        }}>
          Xem chi tiết
        </Button>
      </CardFooter>
    </Card>
  )
}