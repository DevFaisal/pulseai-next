import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import icon from "@/app/icon/pulse-ai.svg";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center">
          <div className="mb-4">
            <Image
              src={icon}
              width={120}
              height={50}
              alt="Pulse AI Logo"
              priority
            />
          </div>
          <CardTitle className="text-3xl font-bold text-center">
            404 - Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 mb-6">
            Oops! The page you're looking for doesn't seem to exist.
          </p>
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/">Go back to Home</Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500 text-center">
            If this is an error, please contact us at{" "}
            <Link
              href="mailto:support@pulseai.com"
              className="text-primary hover:underline"
            >
              support@pulseai.com
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
