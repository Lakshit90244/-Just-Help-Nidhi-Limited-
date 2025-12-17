"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { CreditCard, PiggyBank, User, Home, LogOut, MessageSquare, FileText } from "lucide-react"

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: CreditCard, label: "My Loans", href: "/dashboard/loans" },
  { icon: PiggyBank, label: "My Deposits", href: "/dashboard/deposits" },
  { icon: MessageSquare, label: "Inquiry", href: "/dashboard/inquiry" },
  { icon: FileText, label: "Apply Loan", href: "/dashboard/apply-loan" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/login")
      return
    }
    const userData = JSON.parse(storedUser)
    if (userData.role === "admin" || userData.role === "super_admin") {
      router.push("/admin/dashboard")
      return
    }
    setUser(userData)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (!user) return null

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-sidebar-border">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center border-2 border-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="text-blue-900 font-bold text-xs leading-none mb-1">सावरा</div>
              <div className="w-4 h-0.5 bg-blue-900 mb-1"></div>
              <div className="text-blue-900 font-bold text-[8px] leading-none">HELP</div>
            </div>
            <div className="absolute bottom-1 right-1 text-green-700 text-xs">🌱</div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-yellow-400 leading-tight">सावरा</span>
            <span className="font-semibold text-sm text-sidebar-foreground/90 leading-tight">JUST HELP NIDHI</span>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Toggle */}
        <div className="md:hidden bg-background border-b border-border p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-muted rounded-lg text-foreground"
          >
            ☰
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  )
}
