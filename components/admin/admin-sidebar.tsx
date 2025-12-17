"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, FileText, MapPin, BarChart3, Settings, HelpCircle } from "lucide-react"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: FileText, label: "Applications", href: "/admin/applications" },
  { icon: Users, label: "Members", href: "/admin/members" },
  { icon: MapPin, label: "Branches", href: "/admin/branches" },
  { icon: BarChart3, label: "Reports", href: "/admin/reports" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
  { icon: HelpCircle, label: "Support", href: "/admin/support" },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border">
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
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
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
    </aside>
  )
}
