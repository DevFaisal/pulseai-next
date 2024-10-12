"use client";

import { LoaderCircle } from "lucide-react";

export default function SpinnerLoader({ size = 24, title }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <LoaderCircle size={size} />
      <span className="text-sm text-gray-500">{title}</span>
    </div>
  );
}
