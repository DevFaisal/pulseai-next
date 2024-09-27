"use client";

import { LoaderCircle } from "lucide-react";

export default function SpinnerLoader({ size = 24 }) {
  return (
    <div className="flex justify-center items-center">
      <LoaderCircle size={size} className="animate-spin" />
    </div>
  );
}
