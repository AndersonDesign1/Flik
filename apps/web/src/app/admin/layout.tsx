import { redirect } from "next/navigation";

export default function AdminLayout({
  children: _children,
}: {
  children: React.ReactNode;
}) {
  redirect("/staff");
}
