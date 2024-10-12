export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary"></div>
      <h1 className="mt-4 text-lg font-semibold text-primary">Loading...</h1>
    </div>
  );
}
