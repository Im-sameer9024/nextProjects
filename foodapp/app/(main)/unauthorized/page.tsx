import Link from "next/link";

// app/unauthorized/page.tsx
export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">401 - Unauthorized</h1>
      <p>You don&#39;t have permission to access this page</p>
      <Link href="/" className="mt-4 text-blue-500 hover:underline">
        Return to Home
      </Link>
    </div>
  );
}