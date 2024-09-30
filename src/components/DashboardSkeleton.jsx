import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Skeleton */}
      <nav className="hidden w-64 flex-shrink-0 border-r border-border bg-card md:block">
        <div className="flex h-full flex-col">
          {/* Logo Skeleton */}
          <div className="flex h-16 items-center border-b border-border px-6">
            <Skeleton className="w-32 h-8" />
          </div>
          {/* Sidebar Links Skeleton */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex items-center py-2">
                  <Skeleton className="mr-3 h-5 w-5" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Skeleton */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header Skeleton */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 sm:px-6">
          <div className="flex items-center">
            {/* Menu Icon Skeleton */}
            <Skeleton className="h-6 w-6 mr-4 md:hidden" />
            {/* Welcome Text Skeleton */}
            <Skeleton className="h-5 w-36" />
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 sm:flex">
              {/* Hospital Name Skeleton */}
              <Skeleton className="h-5 w-28" />
            </div>
            {/* Mode Toggle and User Icon Skeleton */}
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
        </header>

        {/* Content Area Skeleton */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-muted">
          <div className="mx-auto max-w-7xl">
            {/* Placeholder for actual content */}
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="mb-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
