export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  slug: string;
  description: string;
  // Bento grid sizing
  span?: "col-span-1" | "col-span-2" | "row-span-2";
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Lumina Workspace Kit",
    category: "Productivity",
    price: 49,
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
    slug: "lumina-workspace",
    description:
      "A comprehensive Notion system for managing projects, tasks, and knowledge. Designed for clarity and focus.",
    span: "row-span-2",
  },
  {
    id: "2",
    title: "Apex Icon Set",
    category: "Design Assets",
    price: 29,
    image:
      "https://images.unsplash.com/photo-1629732047847-50219e7c5a63?q=80&w=2600&auto=format&fit=crop",
    slug: "apex-icons",
    description:
      "Over 400 pixel-perfect SVG icons for modern interfaces. Crafted on a 24px grid.",
    span: "col-span-1",
  },
  {
    id: "3",
    title: "Mono Focus Theme",
    category: "VS Code Theme",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
    slug: "mono-focus",
    description:
      "A high-contrast monochrome theme for VS Code. Optimized for long coding sessions and OLED screens.",
    span: "col-span-1",
  },
  {
    id: "4",
    title: "Voyager 3D Pack",
    category: "3D Assets",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    slug: "voyager-3d",
    description:
      "Abstract 3D shapes and textures in 4K resolution. Perfect for hero sections and social media assets.",
    span: "col-span-2",
  },
  {
    id: "5",
    title: "Chronos UI Kit",
    category: "Figma Kit",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop",
    slug: "chronos-ui",
    description:
      "A complete design system for complex dashboards and SaaS applications. 50+ components.",
    span: "col-span-1",
  },
  {
    id: "6",
    title: "Zenith Wallpapers",
    category: "Digital Art",
    price: 10,
    image:
      "https://images.unsplash.com/photo-1614850523296-63c1a92443d8?q=80&w=2070&auto=format&fit=crop",
    slug: "zenith-wallpapers",
    description:
      "A collection of 12 generated wallpapers with deep grain and fluid gradients.",
    span: "col-span-1",
  },
];
