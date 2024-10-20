import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Skeleton className="h-[100px] w-full  mb-4" />
      <Skeleton className="h-[600px] w-full" />
    </div>
  );
}
