import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Skeleton className="h-20" />
      <div className="flex-1 py-5">
        <Skeleton className="h-[60vh] w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <Skeleton className="h-[90vh] w-full" /> */}
          {/* <Skeleton className="h-[300px] w-full" /> */}
        </div>
      </div>
    </div>
  );
}
