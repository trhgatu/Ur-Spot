import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Share2, MapPin, Phone, Clock, Star, Heart, ArrowLeft, BookOpen, CalendarClock, Utensils, Wifi, Globe, Cigarette, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCategoryStore } from "@/store/categoryStore";
import { Location } from "@/types/location";
import { Category } from "@/types/category";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const MOCK_REVIEWS = [
  {
    id: 1,
    userName: "Nguyễn Văn A",
    userAvatar: "https://i.pravatar.cc/150?img=1",
    rating: 4.5,
    date: "10/03/2024",
    comment: "Địa điểm rất đẹp, không gian thoáng mát và món ăn ngon. Nhân viên phục vụ nhiệt tình, sẽ quay lại lần sau.",
  },
  {
    id: 2,
    userName: "Trần Thị B",
    userAvatar: "https://i.pravatar.cc/150?img=2",
    rating: 5,
    date: "05/04/2024",
    comment: "Một trong những quán cafe yêu thích của mình ở khu vực này. Không gian đẹp, đồ uống ngon và nhân viên rất thân thiện.",
  },
  {
    id: 3,
    userName: "Lê Văn C",
    userAvatar: "https://i.pravatar.cc/150?img=3",
    rating: 3.5,
    date: "01/04/2024",
    comment: "Quán khá ổn, nhưng hơi đông vào cuối tuần. Nên đặt bàn trước nếu đi theo nhóm.",
  },
];

const AMENITIES = [
  { id: 1, name: "Wifi miễn phí", icon: <Wifi className="w-5 h-5" /> },
  { id: 2, name: "Chỗ đậu xe", icon: <MapPin className="w-5 h-5" /> },
  { id: 3, name: "Điều hòa", icon: <Wifi className="w-5 h-5" /> },
  { id: 4, name: "Không gian ngoài trời", icon: <Globe className="w-5 h-5" /> },
  { id: 5, name: "Phục vụ ăn uống", icon: <Utensils className="w-5 h-5" /> },
  { id: 6, name: "Không hút thuốc", icon: <Cigarette className="w-5 h-5" /> },
];

const MOCK_LOCATION: Location = {
  _id: "1",
  name: "Highlands Coffee - Nguyễn Huệ",
  description: "Highlands Coffee là một thương hiệu cà phê Việt Nam nổi tiếng với không gian hiện đại, menu đa dạng và chất lượng phục vụ chuyên nghiệp. Quán cung cấp các loại cà phê, trà, nước trái cây, bánh ngọt và món ăn nhẹ. Đây là điểm đến lý tưởng cho các cuộc gặp gỡ, làm việc và thư giãn.",
  categoryId: "1",
  address: "42 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
  type: "cafe",
  images: [
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1378&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1447&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  ratings: 120,
  averageRating: 4.5,
  createdAt: "2023-01-01T00:00:00.000Z",
  updatedAt: "2023-01-01T00:00:00.000Z",
};

const MOCK_CATEGORY: Category = {
  _id: "1",
  name: "Cà phê",
  description: "Quán cà phê với không gian thoải mái để thư giãn và làm việc",
  slug: "ca-phe",
  icon: "coffee",
};

export function LocationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { categoryList } = useCategoryStore();
  const [location, setLocation] = useState<Location | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // In a real app, you'd fetch location data from the API
    // Example: fetchLocationById(id).then(data => setLocation(data));

    // Using mock data for now
    setLocation(MOCK_LOCATION);

    // Find category from category store
    if (categoryList?.data) {
      const foundCategory = categoryList.data.find(
        (cat) => cat._id === MOCK_LOCATION.categoryId
      );
      if (foundCategory) {
        setCategory(foundCategory);
      } else {
        setCategory(MOCK_CATEGORY);
      }
    } else {
      setCategory(MOCK_CATEGORY);
    }
  }, [id, categoryList]);

  if (!location || !category) {
    return (
      <div className="container mx-auto py-20 text-center">
        <div className="animate-pulse">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/">
          <Button variant="ghost" className="flex items-center gap-2 pl-0 hover:bg-transparent hover:text-primary">
            <ArrowLeft size={18} />
            <span>Quay lại</span>
          </Button>
        </Link>
      </div>

      {/* Location Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {category.name}
            </Badge>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{location.averageRating}</span>
              <span className="text-muted-foreground text-sm">({location.ratings} đánh giá)</span>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{location.name}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={16} className="flex-shrink-0" />
            <span className="text-sm">{location.address}</span>
          </div>
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart
              size={18}
              className={isFavorite ? "fill-rose-500 text-rose-500" : ""}
            />
            <span>{isFavorite ? "Đã lưu" : "Lưu"}</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Share2 size={18} />
            <span>Chia sẻ</span>
          </Button>
        </div>
      </div>

      {/* Gallery */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-auto">
          <div className="col-span-1 md:col-span-3 rounded-lg overflow-hidden h-[320px] md:h-[400px]">
            <img
              src={location.images[activeImageIndex]}
              alt={location.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:grid col-span-1 grid-rows-3 gap-3 h-[400px]">
            {location.images.slice(1, 4).map((image, index) => (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden cursor-pointer h-full"
                onClick={() => setActiveImageIndex(index + 1)}
              >
                <img
                  src={image}
                  alt={`${location.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {index === 2 && location.images.length > 4 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      +{location.images.length - 4} ảnh
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Mobile thumbnail row */}
          <div className="md:hidden col-span-1 flex gap-2 overflow-x-auto py-2 mt-2">
            {location.images.map((image, index) => (
              <div
                key={index}
                className={`relative rounded-lg overflow-hidden cursor-pointer flex-shrink-0 w-16 h-16 ${
                  activeImageIndex === index ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`${location.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="mb-8 mt-6 pt-2 border-t">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4 w-full justify-start overflow-x-auto">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
            <TabsTrigger value="photos">Hình ảnh</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Description */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl font-semibold mb-3">Mô tả</h2>
                  <p className="text-muted-foreground text-sm whitespace-pre-line">
                    {location.description}
                  </p>
                </motion.div>

                {/* Amenities */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h2 className="text-xl font-semibold mb-3">Tiện nghi</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {AMENITIES.map((amenity) => (
                      <div key={amenity.id} className="flex items-center gap-2 text-sm">
                        {amenity.icon}
                        <span>{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Map placeholder */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-xl font-semibold mb-3">Bản đồ</h2>
                  <div className="h-[220px] bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Bản đồ sẽ được hiển thị ở đây</span>
                  </div>
                </motion.div>
              </div>

              {/* Info Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-xl border p-5 bg-card text-card-foreground shadow-sm h-fit"
              >
                <h3 className="text-lg font-semibold mb-4">Thông tin cơ bản</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="text-muted-foreground w-5 h-5" />
                    <div>
                      <div className="font-medium text-sm">Giờ mở cửa</div>
                      <div className="text-xs text-muted-foreground">08:00 - 22:00 (Hàng ngày)</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-muted-foreground w-5 h-5" />
                    <div>
                      <div className="font-medium text-sm">Liên hệ</div>
                      <div className="text-xs text-muted-foreground">028 3123 4567</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="text-muted-foreground w-5 h-5" />
                    <div>
                      <div className="font-medium text-sm">Đặt chỗ</div>
                      <div className="text-xs text-muted-foreground">Chấp nhận đặt trước</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarClock className="text-muted-foreground w-5 h-5" />
                    <div>
                      <div className="font-medium text-sm">Thời gian phục vụ</div>
                      <div className="text-xs text-muted-foreground">30-45 phút</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Ban className="text-muted-foreground w-5 h-5" />
                    <div>
                      <div className="font-medium text-sm">Quy định</div>
                      <div className="text-xs text-muted-foreground">Không mang đồ ăn từ bên ngoài</div>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <Button className="w-full">Đặt chỗ ngay</Button>
                </div>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-xl font-semibold">Đánh giá từ khách hàng</h2>
                <Button>Viết đánh giá</Button>
              </div>

              <div className="space-y-4">
                {MOCK_REVIEWS.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-4 border rounded-lg"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={review.userAvatar}
                          alt={review.userName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="font-medium">{review.userName}</div>
                          <div className="text-xs text-muted-foreground">
                            {review.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-md h-fit">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-yellow-700">
                          {review.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="photos">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Hình ảnh ({location.images.length})</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {location.images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="aspect-square rounded-lg overflow-hidden cursor-pointer"
                  >
                    <img
                      src={image}
                      alt={`${location.name} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Similar Locations - Placeholder */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Địa điểm tương tự</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* You would map through similar locations here */}
          <div className="h-[250px] rounded-lg bg-muted animate-pulse"></div>
          <div className="h-[250px] rounded-lg bg-muted animate-pulse"></div>
          <div className="h-[250px] rounded-lg bg-muted animate-pulse"></div>
          <div className="h-[250px] rounded-lg bg-muted animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}