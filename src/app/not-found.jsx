import Link from "next/link";
import Image from "next/image";
import icon from "@/app/icon/pulse-ai.svg"; // Adjust the path if necessary

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <div className="mb-8">
        <Image src={icon} width={120} height={50} alt="Pulse AI Logo" />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page you're looking for doesn't seem to exist.
      </p>
      <Link href="/" passHref>
        <p className="text-blue-600 hover:underline">Go back to Home</p>
      </Link>
      <div className="mt-12">
        <p className="text-sm text-gray-500">
          If this is an error, please contact us at{" "}
          <Link href="mailto:support@pulseai.com">
            <span className="text-blue-600 hover:underline">
              support@pulseai.com
            </span>
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
