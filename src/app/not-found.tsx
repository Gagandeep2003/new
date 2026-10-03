import Link from "next/link";
import { Button } from "@/components/Button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="text-center max-w-md px-6">
        <h1 className="text-6xl font-display font-bold text-brand-600 mb-4">404</h1>
        <h2 className="text-2xl font-display font-bold mb-4">Page Not Found</h2>
        <p className="text-ink/80 mb-8">
          The calculator or page you&#39;re looking for might have been moved or removed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary">Go Home</Button>
          </Link>
          <Link href="/search">
            <Button variant="outline">Search Tools</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}