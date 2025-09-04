import type { Product } from "./types"

// Mock product data for Agarwal Collection
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Royal Maroon Banarasi Saree",
    category: "sarees",
    price: 8999,
    originalPrice: 12999,
    images: ["/placeholder-d973o.png", "/placeholder-8689g.png", "/placeholder-2sc3f.png"],
    description:
      "Exquisite handwoven Banarasi saree in rich maroon with intricate gold zari work. Perfect for weddings and festive occasions.",
    fabric: "Pure Silk",
    occasion: ["Wedding", "Festival", "Party"],
    colors: ["Maroon", "Gold"],
    sizes: ["Free Size"],
    stock: 5,
    featured: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Red Bridal Lehenga Set",
    category: "lehengas",
    price: 25999,
    originalPrice: 35999,
    images: ["/placeholder-pfoiq.png", "/placeholder-xzuhz.png", "/placeholder-6oen7.png"],
    description: "Stunning red bridal lehenga with heavy embroidery and sequin work. Includes choli and dupatta.",
    fabric: "Velvet",
    occasion: ["Wedding", "Engagement"],
    colors: ["Red", "Gold"],
    sizes: ["S", "M", "L", "XL"],
    stock: 3,
    featured: true,
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    name: "Golden Anarkali Suit",
    category: "suits",
    price: 4999,
    originalPrice: 7999,
    images: ["/placeholder-wcyls.png", "/placeholder-yhn1s.png", "/placeholder-1trzm.png"],
    description: "Elegant golden Anarkali suit with delicate embroidery. Perfect for festivals and celebrations.",
    fabric: "Georgette",
    occasion: ["Festival", "Party", "Casual"],
    colors: ["Gold", "Cream"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 8,
    featured: false,
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "4",
    name: "Maroon Silk Saree",
    category: "sarees",
    price: 3999,
    images: ["/placeholder-cafoj.png", "/placeholder-byyky.png"],
    description: "Classic maroon silk saree with traditional border design.",
    fabric: "Silk",
    occasion: ["Office", "Casual", "Festival"],
    colors: ["Maroon"],
    sizes: ["Free Size"],
    stock: 12,
    featured: false,
    createdAt: new Date("2024-01-25"),
  },
  {
    id: "5",
    name: "Pink Party Lehenga",
    category: "lehengas",
    price: 15999,
    images: ["/placeholder-yz87b.png", "/placeholder-vdk6o.png"],
    description: "Trendy pink lehenga perfect for parties and celebrations.",
    fabric: "Net",
    occasion: ["Party", "Sangeet"],
    colors: ["Pink", "Silver"],
    sizes: ["S", "M", "L"],
    stock: 6,
    featured: false,
    createdAt: new Date("2024-02-01"),
  },
]

export const categories = [
  { id: "sarees", name: "Sarees", image: "/placeholder-ggfcn.png" },
  { id: "suits", name: "Suits", image: "/placeholder-cnjc2.png" },
  { id: "lehengas", name: "Lehengas", image: "/placeholder.svg?height=200&width=200" },
]

export const occasions = ["Wedding", "Festival", "Party", "Casual", "Office", "Engagement", "Sangeet"]
export const fabrics = ["Silk", "Cotton", "Georgette", "Chiffon", "Net", "Velvet", "Pure Silk"]
export const priceRanges = [
  { label: "Under ₹5,000", min: 0, max: 5000 },
  { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
  { label: "₹10,000 - ₹20,000", min: 10000, max: 20000 },
  { label: "Above ₹20,000", min: 20000, max: Number.POSITIVE_INFINITY },
]
