"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { verifyResetCode } from "@/apis/verifyResetCode";
import { useTheme } from "@/Context/ThemeContext";

const verifySchema = z.object({
  resetCode: z.string().min(6, "Reset code must be at least 6 digits"),
});

type VerifyType = z.infer<typeof verifySchema>;

export default function VerifyCodePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { dark } = useTheme();

  const form = useForm<VerifyType>({
    resolver: zodResolver(verifySchema),
    defaultValues: { resetCode: "" },
  });

  async function handleVerify(values: VerifyType) {
    setIsLoading(true);
    try {
      await verifyResetCode(values.resetCode);
      toast.success("Code verified successfully!", {
        position: "top-center",
        duration: 1000,
      });
      router.push("/resetPassword");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Invalid code";
      toast.error(errorMessage, {
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
        <h1 className={`text-3xl text-center font-bold mb-6 ${dark ? "text-green-400" : "text-green-600"}`}>
          Verify Reset Code
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleVerify)} className="space-y-4">
            <FormField
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>
                    Enter the code from your email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="123456"
                      className={inputClass}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className={`w-full py-3 font-semibold rounded-md transition-colors duration-200 flex justify-center items-center cursor-pointer ${
                dark ? "bg-green-500 hover:bg-green-600 text-white" : "bg-green-600 hover:bg-green-700 text-white"
              }`}
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
                "Verify Code"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
