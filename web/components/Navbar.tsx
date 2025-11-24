"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ImCancelCircle } from "react-icons/im";

const Navbar = () => {
  const [isAuthUser, setIsAuthUser] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthUser(!!token);
    setIsReady(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthUser(false);
    setIsMobileMenuOpen(false);
    window.location.href = "/";
  };

  const handleMobileClick = () => setIsMobileMenuOpen(false);

  return (
    <nav className="w-full sticky top-0 bg-background/95 backdrop-blur-md border-b border-border z-50 shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" onClick={handleMobileClick}>
          <span className="font-bold text-lg">RenewTrack</span>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          {!isReady ? (
            <Button disabled className="opacity-50">
              Loading...
            </Button>
          ) : !isAuthUser ? (
            <>
              <Link href="/login">
                <span className="hover:text-primary transition-colors">
                  Login
                </span>
              </Link>
              <Link href="/signup">
                <Button className="bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/admin/dashboard">
                <Button className="bg-primary hover:bg-primary/90">
                  Dashboard
                </Button>
              </Link>
              <Button
                onClick={handleLogout}
                className="bg-primary hover:bg-primary/90"
              >
                Logout
              </Button>
            </>
          )}
        </div>

        <div className="md:hidden flex">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="focus:outline-none"
          >
            {isMobileMenuOpen ? <ImCancelCircle /> : "☰"}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && isReady && (
        <div className="md:hidden px-4 pb-6  flex flex-col items-center justify-center gap-6 bg-background border-t border-border">
          {!isAuthUser ? (
            <>
              <Link href="/login" onClick={handleMobileClick}>
                Login
              </Link>

              <Link
                href="/signup"
                onClick={handleMobileClick}
                className="w-full"
              >
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" onClick={handleMobileClick}>
                Dashboard
              </Link>

              <button onClick={handleLogout} className="w-full text-center">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
