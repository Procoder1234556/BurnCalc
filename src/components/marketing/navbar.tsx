"use client";

import Link from "next/link";
import { Flame, Menu } from "lucide-react";
import { MarketingContainer } from "@/components/marketing/container";
import { PrimaryButton } from "@/components/marketing/primary-button";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/data/marketing";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md pt-4 pb-4 sm:pt-5 sm:pb-5">
      <piix-pal pal="thread" on="header" aria-hidden />
      <MarketingContainer>
        <nav
          className="flex items-center justify-between gap-4"
          aria-label="Primary"
        >
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span
              className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
              aria-hidden
            >
              <Flame className="size-4" />
            </span>
            <span className="text-sm font-semibold text-text">BurnCalc</span>
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[13px] font-medium text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 sm:flex">
            <PrimaryButton href="/tools" className="h-9 px-4 text-sm">
              Browse tools
            </PrimaryButton>
          </div>

          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <p className="text-sm font-semibold text-text">Menu</p>
              <ul className="mt-4 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm text-muted hover:text-text">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <PrimaryButton href="/tools" className="w-full">
                  Browse tools
                </PrimaryButton>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </MarketingContainer>
    </header>
  );
}
