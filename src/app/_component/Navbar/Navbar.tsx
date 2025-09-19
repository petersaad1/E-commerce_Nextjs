"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/freshcart-logo.svg";
import { signOut, useSession } from "next-auth/react";
import { Menu, Sun, Moon } from "lucide-react";
import { cartContext } from "@/Context/CartContext";
import { wishContext } from "@/Context/wishlistContext";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { numOfCartItems } = useContext(cartContext);
  const { numOfWishItems } = useContext(wishContext);

  const { dark, toggle } = useTheme();

  const handleSignout = async () => {
    setIsSigningOut(true);
    await signOut({ callbackUrl: "/login" });
    setIsSigningOut(false);
  };

  const pathname = usePathname();

  return (
    <nav className="bg-slate-100/70 dark:bg-slate-900/80 backdrop-blur-md p-5 sticky top-0 w-full z-50 transition-colors duration-300">
      <div className="w-full md:w-[90%] mx-auto flex flex-col md:flex-row items-center justify-between gap-5 relative">
        {/* Logo and Mobile Menu */}
        <div className="flex justify-between items-center w-full md:w-auto order-1 md:order-1">
          <Image src={logo} alt="logo" />
          <button
            className="md:hidden text-green-600 border rounded-sm border-green-600 p-2 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Menu in Center */}
        <div
          className={`flex flex-col md:flex-row items-center md:gap-5 w-full md:w-auto justify-center order-2 md:order-2 ${
            isMenuOpen ? "flex" : "hidden"
          } md:flex`}
        >
          <ul className="flex flex-col md:flex-row items-center gap-5 md:gap-5 w-full md:w-auto justify-center">
            {status === "authenticated" && (
              <>
                <li>
                  <Link
                    href="/"
                    onClick={() => setIsMenuOpen(false)}
                    className={`${
                      pathname === "/"
                        ? "text-green-600 font-bold bg-green-100 dark:bg-green-800 dark:text-green-300"
                        : "text-gray-900 dark:text-gray-200"
                    } rounded-md px-2 py-1 transition-colors duration-300`}
                  >
                    Home
                  </Link>
                </li>

                <li className="relative">
                  <Link
                    href="/cart"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-1 ${
                      pathname === "/cart"
                        ? "text-green-600 font-bold bg-green-100 dark:bg-green-800 dark:text-green-300"
                        : "text-gray-900 dark:text-gray-200"
                    } rounded-md px-2 py-1 transition-colors duration-300`}
                  >
                    <span className="font-medium">Cart</span>
                    <i className="fa-solid fa-cart-shopping text-lg"></i>
                    {numOfCartItems > 0 && (
                      <span className="absolute -top-2 -right-3 bg-green-600 dark:bg-green-400 text-white rounded-full px-2 py-0 text-xs font-bold shadow-md">
                        {numOfCartItems}
                      </span>
                    )}
                  </Link>
                </li>

                <li className="relative">
                  <Link
                    href="/wish"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-1 ${
                      pathname === "/wish"
                        ? "text-red-500 font-bold bg-red-100 dark:bg-red-800 dark:text-red-300"
                        : "text-gray-900 dark:text-gray-200"
                    } rounded-md px-2 py-1 transition-colors duration-300`}
                  >
                    <span className="font-medium">Wishlist</span>
                    <i className="fa-solid fa-heart text-lg text-red-500"></i>
                    {numOfWishItems > 0 && (
                      <span className="absolute -top-2 -right-3 bg-red-600 dark:bg-red-400 text-white rounded-full px-2 py-0 text-xs font-bold shadow-md">
                        {numOfWishItems}
                      </span>
                    )}
                  </Link>
                </li>

                <li>
                  <Link
                    href="/product"
                    onClick={() => setIsMenuOpen(false)}
                    className={`${
                      pathname === "/product"
                        ? "text-green-600 font-bold bg-green-100 dark:bg-green-800 dark:text-green-300"
                        : "text-gray-900 dark:text-gray-200"
                    } rounded-md px-2 py-1 transition-colors duration-300`}
                  >
                    Product
                  </Link>
                </li>

                <li>
                  <Link
                    href="/categories"
                    onClick={() => setIsMenuOpen(false)}
                    className={`${
                      pathname === "/categories"
                        ? "text-green-600 font-bold bg-green-100 dark:bg-green-800 dark:text-green-300"
                        : "text-gray-900 dark:text-gray-200"
                    } rounded-md px-2 py-1 transition-colors duration-300`}
                  >
                    Categories
                  </Link>
                </li>

                <li>
                  <Link
                    href="/brands"
                    onClick={() => setIsMenuOpen(false)}
                    className={`${
                      pathname === "/brands"
                        ? "text-green-600 font-bold bg-green-100 dark:bg-green-800 dark:text-green-300"
                        : "text-gray-900 dark:text-gray-200"
                    } rounded-md px-2 py-1 transition-colors duration-300`}
                  >
                    Brands
                  </Link>
                </li>
              </>
            )}

            {status === "unauthenticated" && (
              <>
                <li>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-3 py-1 rounded font-bold transition-colors duration-300 ${
                      pathname === "/login"
                        ? "text-green-600 bg-green-100 dark:bg-green-800 dark:text-green-300"
                        : "text-gray-900 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-3 py-1 rounded font-bold transition-colors duration-300 ${
                      pathname === "/register"
                        ? "text-green-600 bg-green-100 dark:bg-green-800 dark:text-green-300"
                        : "text-gray-900 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Dark Mode Toggle (Mobile) */}
          <div className="mt-3 md:hidden flex justify-center gap-2">
            <button
              onClick={toggle}
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-black dark:text-white cursor-pointer transition-transform duration-300 hover:rotate-12"
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {status === "authenticated" && (
              <button
                onClick={handleSignout}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 transition text-white rounded flex items-center justify-center cursor-pointer"
              >
                {isSigningOut ? (
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
                  "Signout"
                )}
              </button>
            )}
          </div>
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex order-3 items-center gap-2">
          <button
            onClick={toggle}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-black dark:text-white cursor-pointer transition-transform duration-300 hover:rotate-12"
          >
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {status === "authenticated" && (
            <button
              onClick={handleSignout}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 transition text-white rounded flex items-center justify-center cursor-pointer"
            >
              {isSigningOut ? (
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
                "Signout"
              )}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
