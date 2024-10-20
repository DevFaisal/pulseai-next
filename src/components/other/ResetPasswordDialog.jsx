"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function ResetPasswordDialog() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      resetCode: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSendCode = async (data) => {
    setIsLoading(true);
    setError("");

    // Simulate API call to send reset code
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStep(2);
    } catch (err) {
      setError("Failed to send reset code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (data) => {
    setIsLoading(true);
    setError("");

    if (data.newPassword !== data.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Simulate API call to reset password
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccess(true);
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    form.reset();
    setStep(1);
    setIsLoading(false);
    setError("");
    setSuccess(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) resetState();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="none" className='text-blue-500 p-0'>Reset here</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            {step === 1
              ? "Enter your healthcare code and email to receive a reset code"
              : "Enter the code you received and your new password"}
          </DialogDescription>
        </DialogHeader>
        {success ? (
          <div className="text-center py-4">
            <h3 className="text-lg font-semibold text-green-600">
              Password Reset Successful
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Your password has been reset successfully.
            </p>
            <Button className="mt-4" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                step === 1 ? handleSendCode : handleResetPassword
              )}
              className="space-y-4"
            >
              {step === 1 ? (
                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="resetCode"
                    rules={{ required: "Reset code is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reset Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter reset code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    rules={{
                      required: "New password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter new password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    rules={{ required: "Please confirm your password" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm new password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading
                    ? step === 1
                      ? "Sending..."
                      : "Resetting..."
                    : step === 1
                    ? "Request Reset Code"
                    : "Set New Password"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
