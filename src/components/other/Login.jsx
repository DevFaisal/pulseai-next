"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Lock, Hospital } from "lucide-react";
import ResetPasswordDialog from "./ResetPasswordDialog";

const loginSchema = z.object({
  hospitalCode: z.string().min(1, "Hospital code is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginInputs = [
  {
    label: "Healthcare Code",
    placeholder: "Enter your Healthcare Code",
    type: "text",
    name: "hospitalCode",
    icon: Hospital,
  },
  {
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    name: "email",
    icon: Mail,
  },
  {
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    name: "password",
    icon: Lock,
  },
];

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      hospitalCode: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success("Logged in successfully");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Error logging in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-primary-800">
          Login to Pulse AI
        </CardTitle>
        <CardDescription className="text-center text-primary-600">
          Access your personalized healthcare dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {loginInputs.map((input) => (
              <FormField
                key={input.name}
                control={form.control}
                name={input.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">{input.label}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <input.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                        <Input
                          placeholder={input.placeholder}
                          type={input.type}
                          {...field}
                          className="pl-10 border-primary-200 focus:border-primary-400 rounded-md"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary  font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
        <div>
          <p className="text-center text-primary-600 text-sm">
            Forgot your password? <ResetPasswordDialog />
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
