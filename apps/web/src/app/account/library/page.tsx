import { Download, FolderOpen } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const LIBRARY_ITEMS = [
  {
    id: "1",
    name: "Cosmic Icon Pack",
    seller: "Design Studio Co",
    files: 3,
    size: "24.5 MB",
    lastDownload: "Dec 28, 2024",
    image: "",
  },
  {
    id: "2",
    name: "Neo-Grid UI Kit",
    seller: "Creative Assets",
    files: 5,
    size: "156.2 MB",
    lastDownload: "Dec 22, 2024",
    image: "",
  },
  {
    id: "3",
    name: "Linear Icons",
    seller: "Icon Foundry",
    files: 2,
    size: "8.4 MB",
    lastDownload: "Dec 18, 2024",
    image: "",
  },
  {
    id: "4",
    name: "Prism Wallpapers",
    seller: "UI Kit Pro",
    files: 12,
    size: "245.8 MB",
    lastDownload: "Never",
    image: "",
  },
];

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-2xl text-gray-900">Library</h2>
          <p className="text-gray-500 text-sm">
            All your purchased products ready to download.
          </p>
        </div>
        <Button className="gap-2" variant="outline">
          <Download className="h-4 w-4" />
          Download All
        </Button>
      </div>

      {/* Library Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LIBRARY_ITEMS.map((item) => (
          <Card className="overflow-hidden" key={item.id}>
            {/* Image */}
            <div className="relative aspect-video bg-gray-100">
              {item.image ? (
                <Image
                  alt={item.name}
                  className="object-cover"
                  fill
                  src={item.image}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-300">
                  <span className="text-4xl">📦</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
              <p className="text-gray-500 text-xs">by {item.seller}</p>

              <div className="mt-3 flex items-center justify-between text-gray-500 text-xs">
                <span className="flex items-center gap-1">
                  <FolderOpen className="h-3 w-3" />
                  {item.files} files • {item.size}
                </span>
              </div>

              <Button className="mt-4 w-full gap-2" size="sm">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
