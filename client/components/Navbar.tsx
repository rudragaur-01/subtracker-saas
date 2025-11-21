"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isAuthUser, setIsAuthUser] = useState<boolean | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsAuthUser(!!token);
    }
  }, [isAuthUser]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthUser(false);
      setIsMobileMenuOpen(false);
      window.location.href = "/";
    }
  };

  const handleMobileClick = () => {
    setIsMobileMenuOpen(false);
  };

  if (isAuthUser === null) return null;

  return (
    <nav className="fixed top-0 w-full backdrop-blur-md bg-background/80 border-b border-border z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={handleMobileClick}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent"></div>
          <span className="font-bold text-lg">RenewTrack</span>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          {!isAuthUser ? (
            <>
              <Link
                href="/auth/login"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                Login
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/dashboard">
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

        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-foreground hover:text-primary focus:outline-none"
          >
            {isMobileMenuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col items-center gap-2 bg-background border-t border-border">
          {!isAuthUser ? (
            <>
              <Link
                href="/auth/login"
                className="text-foreground/70 hover:text-foreground transition-colors"
                onClick={handleMobileClick}
              >
                Login
              </Link>
              <Link href="/auth/signup" onClick={handleMobileClick}>
                <Button className="bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/auth/dashboard"
                className="hover:text-primary"
                onClick={handleMobileClick}
              >
                Dashboard
              </Link>
              
              <button
                onClick={handleLogout}
                className="text-left hover:text-primary"
              >
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
