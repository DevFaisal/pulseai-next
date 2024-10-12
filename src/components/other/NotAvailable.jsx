import { Ban } from "lucide-react";

export default function NotAvailable({ title }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 space-y-4">
      <Ban size={128} className="text-gray-300" />
      <h1 className="text-2xl font-semibold text-center text-gray-600">
        No {title} available
      </h1>
    </div>
  );
}
