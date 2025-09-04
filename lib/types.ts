// Product and order types for Agarwal Collection
export interface Product {
  id: string
  name: string
  category: "sarees" | "suits" | "lehengas"
  price: number
  originalPrice?: number
  images: string[]
  description: string
  fabric: string
  occasion: string[]
  colors: string[]
  sizes: string[]
  stock: number
  featured: boolean
  createdAt: Date
}

export interface CartItem {
  product: Product
  quantity: number
  selectedSize: string
  selectedColor: string
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentMethod: "upi" | "cod"
  customerInfo: {
    name: string
    phone: string
    email?: string
    address: string
  }
  createdAt: Date
  estimatedDelivery?: Date
}

export interface User {
  id: string
  name: string
  phone: string
  email?: string
  addresses: Address[]
}

export interface Address {
  id: string
  name: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  pincode: string
  isDefault: boolean
}
