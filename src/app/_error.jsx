"use client";

export default function Error({ error, digest }) {
  return (
    <div className="max-sm:text-3xl text-6xl">
      Error
      {error}
      {digest}
    </div>
  );
}
