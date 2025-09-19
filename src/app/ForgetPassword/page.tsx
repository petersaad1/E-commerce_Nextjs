"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { forgetPassword } from "@/apis/ForgetPassword";
import { useTheme } from "@/Context/ThemeContext";

function ForgetPassword() {
  const [IsLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { dark } = useTheme();

  const form = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
  });

  async function handleForget(values: { email: string }) {
    setIsLoading(true);
    try {
      const res = await forgetPassword(values.email);
      toast.success("Check your email for reset code", {
        position: "top-center",
        duration: 1000,
      });
      router.push("/VerifyCodePage");
    } catch (err) {
      toast.error("Error sending reset code", {
        position: "top-center",
        duration: 1000,
      });
      setIsLoading(false);
    }
  }

  const inputClass = `border rounded-md transition-colors duration-200 w-full ${
    dark
      ? "bg-slate-700 border-gray-600 text-white focus:border-green-400 focus:ring-green-400"
      : "bg-gray-100 border-gray-300 text-black focus:border-green-600 focus:ring-green-600"
  }`;

  const labelClass = `mb-1 font-medium ${dark ? "text-gray-200" : "text-gray-700"}`;

  return (
    <div className={`w-full md:w-1/2 mx-auto my-12 transition-colors duration-300 ${dark ? "bg-slate-900 text-white" : ""}`}>
      <div className={`rounded-lg shadow-lg p-6 md:p-10 transition-colors duration-300 ${dark ? "bg-slate-800" : "bg-white"}`}>
        <h1 className={`text-4xl text-center font-bold mb-6 ${dark ? "text-green-400" : "text-green-600"}`}>
          Forgot Password
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleForget)} className="space-y-4">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>Email:</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your email..."
                      {...field}
                      className={inputClass}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className={`w-full py-3 font-semibold rounded-md transition-colors duration-200 flex justify-center items-center cursor-pointer ${
                dark ? "bg-green-500 hover:bg-green-600 text-white" : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {IsLoading ? (
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
                "Send Reset Code"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ForgetPassword;
