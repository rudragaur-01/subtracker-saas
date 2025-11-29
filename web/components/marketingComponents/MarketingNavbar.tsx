"use client";
import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export const MarketingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(true); // true = logged in

  return (
    <nav className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <h1 className="text-lg md:text-xl font-bold tracking-wider">
          RenewFitPro
        </h1>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-6">
          {!isAuth ? (
            <>
              <Link href="/plans" className="hover:text-gray-300">
                Plans
              </Link>
              <Link href="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 rounded bg-white text-gray-800 font-medium hover:bg-gray-200"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link href="/admindashboard" className="hover:text-gray-300">
                Dashboard
              </Link>
              <Link
                href="/logout"
                className="px-4 py-2 rounded bg-white text-gray-800 font-medium hover:bg-gray-200"
              >
                Logout
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden px-2 pt-2 pb-4 space-y-1">
          {!isAuth ? (
            <>
              <Link
                href="/plans"
                className="block px-3 py-2 rounded hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Plans
              </Link>
              <Link
                href="/login"
                className="block px-3 py-2 rounded hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block px-3 py-2 rounded bg-white text-gray-800 font-medium hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/admin/dashboard"
                className="block px-3 py-2 rounded hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/logout"
                className="block px-3 py-2 rounded bg-white text-gray-800 font-medium hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                Logout
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
