import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">QR Code Scanner</h1>
      <p className="mb-6">Welcome! Click below to start scanning.</p>
      <Link
        href="/scanner"
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Go to Scanner
      </Link>
    </main>
  );
}
