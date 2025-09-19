"use client";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 mt-10 px-10 md:px-0">
      <div className="w-full md:w-[90%] mx-auto py-10 grid grid-cols-1 md:grid-cols-4 gap-8 justify-items-center">
        {/* About */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold mb-3">FreshCart</h3>
          <p className="text-gray-400">
            FreshCart offers the best fresh products with top quality and
            affordable prices.
          </p>
        </div>

        {/* Links */}
        <div className="text-center md:text-left">
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-green-500 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/product" className="hover:text-green-500 transition">
                Products
              </a>
            </li>
            <li>
              <a href="/categories" className="hover:text-green-500 transition">
                Categories
              </a>
            </li>
            <li>
              <a href="/brands" className="hover:text-green-500 transition">
                Brands
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center md:text-left">
          <h4 className="font-semibold mb-3">Contact Us</h4>
          <p className="text-gray-400">Email: support@freshcart.com</p>
          <p className="text-gray-400">Phone: +20 123 456 7890</p>
          <p className="text-gray-400">Address: Cairo, Egypt</p>
        </div>

        {/* Social */}
        <div className="text-center md:text-left">
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4 justify-center md:justify-start">
            <a href="#" className="hover:text-green-500 transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-green-500 transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-green-500 transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-green-500 transition">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-6 py-4 text-center text-gray-500 text-sm">
        © 2025 FreshCart. All rights reserved.
      </div>
    </footer>
  );
}
