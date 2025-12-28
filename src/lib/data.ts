import { promises as fs } from "node:fs";
import path from "node:path";

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

// Data fetching functions
export async function getDashboardData(): Promise<DashboardData> {
  return await readDataFile<DashboardData>("dashboard.json");
}

export async function getProductsData(): Promise<ProductsData> {
  return await readDataFile<ProductsData>("products.json");
}

export async function getCustomersData(): Promise<CustomersData> {
  return await readDataFile<CustomersData>("customers.json");
}

export async function getAnalyticsData(): Promise<AnalyticsData> {
  return await readDataFile<AnalyticsData>("analytics.json");
}

export async function getPayoutsData(): Promise<PayoutsData> {
  return await readDataFile<PayoutsData>("payouts.json");
}
