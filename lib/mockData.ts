// lib/mockData.ts

// --- Mock Products ---
export const mockProducts = [
  {
    id: "1",
    name: "Blue Shirt",
    price: 1200,
    stock: 15,
  },
  {
    id: "2",
    name: "Black Jeans",
    price: 1800,
    stock: 10,
  },
  {
    id: "3",
    name: "Sneakers",
    price: 2500,
    stock: 8,
  },
  {
    id: "4",
    name: "Leather Jacket",
    price: 3500,
    stock: 5,
  },
  {
    id: "5",
    name: "White T-Shirt",
    price: 800,
    stock: 25,
  },
]

// --- Mock Orders ---
export const mockOrders = [
  {
    id: "101",
    customerName: "Amit Sharma",
    email: "amit@example.com",
    total: 2500,
    status: "pending",
    createdAt: new Date("2024-09-10T10:30:00"),
  },
  {
    id: "102",
    customerName: "Priya Patel",
    email: "priya@example.com",
    total: 3800,
    status: "shipped",
    createdAt: new Date("2024-09-12T14:15:00"),
  },
  {
    id: "103",
    customerName: "Rahul Verma",
    email: "rahul@example.com",
    total: 1200,
    status: "delivered",
    createdAt: new Date("2024-09-14T09:00:00"),
  },
  {
    id: "104",
    customerName: "Sneha Kapoor",
    email: "sneha@example.com",
    total: 4500,
    status: "cancelled",
    createdAt: new Date("2024-09-15T17:45:00"),
  },
]
