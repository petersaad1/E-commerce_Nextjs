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
import registerSchema, { RegisterType } from "@/schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

function Register() {
  const [IsLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { dark } = useTheme();

  const form = useForm<RegisterType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(values: RegisterType) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      toast.success(data.message, {
        position: "top-center",
        duration: 1000,
      });
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error", {
        position: "top-center",
        duration: 1000,
      });
      setIsLoading(false);
    }
  }

  const inputClass = `border rounded-md transition-colors duration-200 ${
    dark
      ? "bg-slate-700 border-gray-600 text-white focus:border-green-400 focus:ring-green-400"
      : "bg-gray-100 border-gray-300 text-black focus:border-green-600 focus:ring-green-600"
  }`;

  const labelClass = `mb-1 font-medium ${dark ? "text-gray-200" : "text-gray-700"}`;

  return (
    <div className={`w-full md:w-1/2 mx-auto my-12 transition-colors duration-300 ${dark ? "bg-slate-900 text-white" : ""}`}>
      {/* Container with shadow and rounded corners */}
      <div className={`rounded-lg shadow-lg p-6 md:p-10 transition-colors duration-300 ${dark ? "bg-slate-800" : "bg-white"}`}>
        {/* Heading */}
        <h1 className={`text-4xl text-center font-bold mb-6 ${dark ? "text-green-400" : "text-green-600"}`}>
          Register
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegister)}
            className="space-y-4"
          >
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>Username:</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Name..." {...field} className={inputClass} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>Email:</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Email..." {...field} className={inputClass} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>Password:</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password..." {...field} className={inputClass} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>Confirm Password:</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm Password..." {...field} className={inputClass} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>Phone:</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Phone..." {...field} className={inputClass} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className={`w-full py-3 font-semibold rounded-md transition-colors duration-200 flex justify-center items-center cursor-pointer ${dark ? "bg-green-500 hover:bg-green-600 text-white" : "bg-green-600 hover:bg-green-700 text-white"}`}
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
                "Register Now"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Register;
