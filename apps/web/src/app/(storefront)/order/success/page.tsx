import { CheckCircle, Download, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrderSuccessPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-12 text-center">
      {/* Success Icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>

      <h1 className="mb-2 font-bold text-3xl text-gray-900">
        Payment Successful!
      </h1>
      <p className="mb-8 max-w-md text-gray-600">
        Thank you for your purchase. Your download links have been sent to your
        email.
      </p>

      {/* Order Details */}
      <div className="mb-8 w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-left">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900 text-sm">
                Check your email
              </p>
              <p className="text-gray-500 text-xs">
                Download links sent to your inbox
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-left">
            <Download className="h-5 w-5 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900 text-sm">
                Access your library
              </p>
              <p className="text-gray-500 text-xs">
                Download anytime from your account
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link href="/account/library">Go to Library</Link>
        </Button>
        <Button asChild>
          <Link href="/categories">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
