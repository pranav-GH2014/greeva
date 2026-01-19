import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        
        {/* NAVBAR */}
        <nav className="bg-white border-b shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="text-xl font-bold">
              FancyStore
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-6">
              <Link
                href="/products"
                className="text-gray-600 hover:text-black transition"
              >
                Products
              </Link>

              <Link
                href="/cart"
                className="text-gray-600 hover:text-black transition"
              >
                Cart
              </Link>

              <Link
                href="/checkout"
                className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800 transition"
              >
                Checkout
              </Link>
            </div>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <main className="max-w-6xl mx-auto p-4">
          {children}
        </main>

      </body>
    </html>
  );
}
