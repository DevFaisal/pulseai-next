import { Progress } from "@/components/ui/progress"; // Assuming a Progress component exists

export default function Loading({ progress }) {
  return (
    <div className="p-20 loading-container">
      <Progress value={progress} />
    </div>
  );
}
