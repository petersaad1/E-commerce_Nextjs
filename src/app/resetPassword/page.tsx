"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTheme } from "@/Context/ThemeContext";

import { resetPassword } from "@/apis/resetPassword";

type ResetForm = {
  email: string;
  newPassword: string;
};

function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { dark } = useTheme();

  const form = useForm<ResetForm>({
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });

  async function handleReset(values: ResetForm) {
    setIsLoading(true);
    try {
      await resetPassword(values.email, values.newPassword);
      toast.success("Password reset successfully! You can login now", {
        position: "top-center",
        duration: 1000,
      });
      router.push("/login");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Error resetting password";
      toast.error(errorMessage, {
        position: "top-center",
        duration: 1000,
      });
      setIsLoading(false);
    }
  }

  const inputClass = `border rounded-md transition-colors duration-200 w-full ${
    dark
      ? "bg-slate-700 border-gray-600 text-white placeholder-gray-300 focus:border-green-400 focus:ring-green-400"
      : "bg-gray-100 border-gray-300 text-black placeholder-gray-500 focus:border-green-600 focus:ring-green-600"
  }`;

  return (
    <div className="w-full md:w-1/2 mx-auto my-12">
      <div
        className={`rounded-lg shadow-lg p-6 md:p-10 ${
          dark ? "bg-slate-900 text-white" : "bg-white text-black"
        }`}
      >
        <h1 className="text-4xl text-center font-bold mb-6 text-green-600">
          Reset Password
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleReset)} className="space-y-4">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-1 font-medium">Email:</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your email.."
                      {...field}
                      className={inputClass}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* New Password Field */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-1 font-medium">New Password:</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password.."
                      {...field}
                      className={inputClass}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-colors duration-200 flex justify-center items-center cursor-pointer"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
