"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  // Base navigation items
  const baseNavItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Rates", href: "/rates" },
    { label: "Branch Locator", href: "/branches" },
    { label: "Investor Relations", href: "/investor-relations" },
    { label: "सावरा Care", href: "/support" },
  ]

  // Add role-specific navigation items
  const navItems = [
    ...baseNavItems,
    ...(user?.role === 'admin' || user?.role === 'super_admin' 
      ? [{ label: "Admin Panel", href: "/admin" }]
      : user 
      ? [{ label: "Dashboard", href: "/dashboard" }]
      : []
    )
  ]

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-background to-background/95 border-b border-border/50 shadow-md backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105 border-3 border-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="text-blue-900 font-bold text-sm leading-none mb-1">सावरा</div>
                <div className="w-6 h-0.5 bg-blue-900 mb-1"></div>
                <div className="text-blue-900 font-bold text-xs leading-none">HELP</div>
              </div>
              <div className="absolute bottom-1 right-1 text-green-700 text-xs">🌱</div>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-xl bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent leading-tight">
                सावरा
              </span>
              <span className="font-semibold text-sm text-blue-900 leading-tight">
                JUST HELP NIDHI LIMITED
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 rounded-lg transition-all duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              // Logged in user
              <>
                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-lg">
                  <User size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">{user.name}</span>
                </div>
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="border-red-500/50 hover:bg-red-500/10 text-red-600 hover:text-red-700"
                >
                  <LogOut size={16} className="mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              // Not logged in
              <>
                <Link href="/login" className="hidden md:inline">
                  <Button variant="outline" size="sm" className="border-primary/50 hover:bg-primary/5 bg-transparent">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 rounded-lg transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 space-y-2 pb-4 border-t border-border/50 pt-4 bg-gradient-to-b from-primary/5 to-secondary/5 rounded-lg p-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              // Mobile logout for logged in user
              <div className="space-y-2 pt-2 border-t border-border/50">
                <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg">
                  <User size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">{user.name}</span>
                </div>
                <Button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full border-red-500/50 hover:bg-red-500/10 text-red-600"
                >
                  <LogOut size={16} className="mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              // Mobile login for not logged in user
              <Link href="/login" className="block">
                <Button variant="outline" size="sm" className="w-full bg-transparent border-primary/50">
                  Login
                </Button>
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}
