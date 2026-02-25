"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";

export function Nav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [isConnecting, setIsConnecting] = React.useState(false);
  const [walletAddress, setWalletAddress] = React.useState<string | null>(null);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setWalletAddress("0x7...f4ae");
      setIsOpen(false);
    }, 1500);
  };

  const loginButton = (
    <Button asChild variant="secondary" size="sm">
      <Link href="/login">Login</Link>
    </Button>
  );

  const walletButton = walletAddress ? (
    <div className="flex items-center gap-2 px-3 h-8 bg-foreground/5 border border-border rounded-none group cursor-default">
      <div className="w-2 h-2 bg-green-500 rounded-full" />
      <span className="text-[10px] font-bold uppercase tracking-tighter text-foreground">
        {walletAddress}
      </span>
    </div>
  ) : (
    <Button 
      size="sm" 
      onClick={handleConnect}
      isLoading={isConnecting}
    >
      Connect Wallet
    </Button>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tighter text-foreground uppercase">
                Omen Protocol
              </span>
            </Link>
            <div className="hidden md:flex gap-6">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-subtext hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/docs"
                className="text-sm font-medium text-subtext hover:text-foreground transition-colors"
              >
                SDK Docs
              </Link>
              <Link
                href="/alpha"
                className="text-sm font-medium text-subtext hover:text-foreground transition-colors"
              >
                Private Alpha
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4">
              {loginButton}
              {walletButton}
            </div>
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-4">
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="px-2 py-1 text-sm font-medium text-subtext hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/docs"
                onClick={() => setIsOpen(false)}
                className="px-2 py-1 text-sm font-medium text-subtext hover:text-foreground transition-colors"
              >
                SDK Docs
              </Link>
              <Link
                href="/alpha"
                onClick={() => setIsOpen(false)}
                className="px-2 py-1 text-sm font-medium text-subtext hover:text-foreground transition-colors"
              >
                Private Alpha
              </Link>
              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                <div className="py-2">
                  {loginButton}
                </div>
                {walletButton}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}


