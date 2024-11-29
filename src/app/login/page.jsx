import Login from "@/components/other/Login";
import { Gradient } from "@/components/ui/gradient";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-secondary flex items-center justify-center px-4 py-12 md:px-20">
      <section className="max-w-4xl mx-auto text-center">
        <Gradient className="absolute inset-0 opacity-20" />
        <div className="relative space-y-8">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Empowering Healthcare with{" "}
            <span className="bg-gradient-to-br from-red-500 to-primary-600 text-transparent bg-clip-text">
              AI
            </span>
          </h1>
          <p className="mx-auto max-w-[700px] text-primary/80 text-lg sm:text-xl md:text-2xl">
            Enhance patient outcomes with seamless, personalized care—anytime,
            anywhere.
          </p>
          <div className="w-full max-w-sm mx-auto pt-8">
            <Login />
          </div>
        </div>
      </section>
    </main>
  );
}
