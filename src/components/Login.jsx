"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn, useSession } from "next-auth/react";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

const loginInputs = [
  {
    label: "H-Code",
    placeholder: "Enter your H-Code",
    type: "text",
    id: "hospital-code",
    name: "hospitalCode",
  },
  {
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    name: "email",
  },
  {
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    name: "password",
  },
];

const schema = z.object({
  hospitalCode: z.string().min(1, "Hospital code is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      hospitalCode: "",
      email: "",
      password: "",
    },
  });

  const session = useSession();
  const router = useRouter();

  const onSubmit = (data) => {
    signIn("credentials", {
      hospitalCode: data.hospitalCode,
      email: data.email,
      password: data.password,
      redirect: false,
    });
  };

  return (
    <Card className="border-violet-100 p-4">
      {JSON.stringify(session)}
      <CardHeader>
        <CardTitle className="text-violet-800">Login to Pulse AI</CardTitle>
        <CardDescription className="text-violet-600">
          Access your personalized healthcare dashboard
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        {loginInputs.map((input) => (
          <FormField
            key={input.name}
            control={form.control}
            name={input.name}
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel htmlFor={input.id} className="text-violet-700">
                  {input.label}
                </FormLabel>
                <FormControl>
                  <Input
                    id={input.id}
                    placeholder={input.placeholder}
                    type={input.type}
                    {...field}
                    className="border-violet-200 focus:border-violet-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white"
        >
          Login
        </Button>
      </Form>
    </Card>
  );
}
