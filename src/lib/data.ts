import { promises as fs } from "node:fs";
import path from "node:path";
import type { DashboardDataMode } from "@/lib/dashboard-mode";

// Dashboard data types
export interface DashboardData {
  metrics: Array<{
    title: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    subtext: string;
  }>;
  countries: Array<{
    name: string;
    flag: string;
    value: number;
    percent: number;
    color: string;
  }>;
  transactions: Array<{
    id: string;
    customer: string;
    product: string;
    amount: string;
    status: string;
    payment: string;
    date: string;
    time: string;
  }>;
  totalRevenue: string;
}

export interface ProductsData {
  products: Array<{
    id: string;
    name: string;
    status: "active" | "draft" | "archived";
    price: number;
    inventory: number;
    sales: number;
    image: string;
  }>;
}

export interface CustomersData {
  customers: Array<{
    id: string;
    name: string;
    email: string;
    spent: number;
    lastOrder: string;
    status: string;
  }>;
  metrics: Array<{
    title: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    subtext: string;
    icon: string;
  }>;
  segments: Array<{
    name: string;
    value: number;
    percent: number;
    color: string;
  }>;
}

export interface AnalyticsData {
  metrics: Array<{
    title: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    subtext: string;
  }>;
  trafficSources: Array<{
    name: string;
    value: number;
    percent: number;
    color: string;
  }>;
  topPages: Array<{
    path: string;
    title: string;
    views: string;
    bounceRate: string;
    avgTime: string;
    trend: string;
  }>;
  salesRevenue: string;
}

export interface PayoutsData {
  metrics: Array<{
    title: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    subtext: string;
    icon: string;
    primary?: boolean;
  }>;
  paymentMethods: Array<{
    name: string;
    value: number;
    percent: number;
    color: string;
  }>;
  transactions: Array<{
    id: string;
    date: string;
    time: string;
    amount: string;
    method: string;
    account: string;
    status: string;
  }>;
}

// Helper to read JSON data files
async function readDataFile<T>(filename: string): Promise<T> {
  const filePath = path.join(process.cwd(), "src", "data", filename);
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content) as T;
}

function getEmptyDashboardData(): DashboardData {
  return {
    metrics: [
      { title: "Revenue", value: "$0", subtext: "No sales yet" },
      { title: "Orders", value: "0", subtext: "No orders yet" },
      { title: "Customers", value: "0", subtext: "No customers yet" },
      { title: "Conversion", value: "0%", subtext: "No traffic yet" },
    ],
    countries: [],
    transactions: [],
    totalRevenue: "$0",
  };
}

function getEmptyProductsData(): ProductsData {
  return { products: [] };
}

function getEmptyCustomersData(): CustomersData {
  return {
    customers: [],
    metrics: [
      {
        title: "Total Customers",
        value: "0",
        subtext: "No customers yet",
        icon: "Users",
      },
      {
        title: "Active Customers",
        value: "0",
        subtext: "No active customers",
        icon: "UserCheck",
      },
      {
        title: "New This Month",
        value: "0",
        subtext: "No new customers",
        icon: "UserPlus",
      },
      {
        title: "Growth Rate",
        value: "0%",
        subtext: "No growth data",
        icon: "TrendingUp",
      },
    ],
    segments: [],
  };
}

function getEmptyAnalyticsData(): AnalyticsData {
  return {
    metrics: [
      { title: "Visitors", value: "0", subtext: "No traffic yet" },
      { title: "Sessions", value: "0", subtext: "No sessions yet" },
      { title: "Bounce Rate", value: "0%", subtext: "No data yet" },
      { title: "Conversion", value: "0%", subtext: "No conversions yet" },
    ],
    trafficSources: [],
    topPages: [],
    salesRevenue: "$0",
  };
}

function getEmptyPayoutsData(): PayoutsData {
  return {
    metrics: [
      {
        title: "Available Balance",
        value: "$0",
        subtext: "No payouts yet",
        icon: "Wallet",
      },
      {
        title: "Total Paid Out",
        value: "$0",
        subtext: "No payout history",
        icon: "Banknote",
      },
      {
        title: "Pending",
        value: "$0",
        subtext: "No pending payouts",
        icon: "TrendingUp",
      },
      {
        title: "Payment Methods",
        value: "0",
        subtext: "No methods linked",
        icon: "CreditCard",
      },
    ],
    paymentMethods: [],
    transactions: [],
  };
}

// Data fetching functions
export async function getDashboardData(
  mode: DashboardDataMode = "demo"
): Promise<DashboardData> {
  if (mode === "empty") {
    return getEmptyDashboardData();
  }
  return await readDataFile<DashboardData>("dashboard.json");
}

export async function getProductsData(
  mode: DashboardDataMode = "demo"
): Promise<ProductsData> {
  if (mode === "empty") {
    return getEmptyProductsData();
  }
  return await readDataFile<ProductsData>("products.json");
}

export async function getCustomersData(
  mode: DashboardDataMode = "demo"
): Promise<CustomersData> {
  if (mode === "empty") {
    return getEmptyCustomersData();
  }
  return await readDataFile<CustomersData>("customers.json");
}

export async function getAnalyticsData(
  mode: DashboardDataMode = "demo"
): Promise<AnalyticsData> {
  if (mode === "empty") {
    return getEmptyAnalyticsData();
  }
  return await readDataFile<AnalyticsData>("analytics.json");
}

export async function getPayoutsData(
  mode: DashboardDataMode = "demo"
): Promise<PayoutsData> {
  if (mode === "empty") {
    return getEmptyPayoutsData();
  }
  return await readDataFile<PayoutsData>("payouts.json");
}

export async function getCategoriesInfo(): Promise<
  Record<string, { name: string; icon: string }>
> {
  return await readDataFile<Record<string, { name: string; icon: string }>>(
    "categories.json"
  );
}

export async function getCategoryProducts(): Promise<
  Array<{
    id: string;
    name: string;
    price: number;
    originalPrice: number | null;
    rating: number;
    sales: number;
    seller: string;
  }>
> {
  return await readDataFile<
    Array<{
      id: string;
      name: string;
      price: number;
      originalPrice: number | null;
      rating: number;
      sales: number;
      seller: string;
    }>
  >("category-products.json");
}
