"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Bell, Settings } from "lucide-react"

export default function AdminHeader({ user }: { user: any }) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/login")
  }

  return (
    <header className="bg-background border-b border-border px-6 py-4 flex items-center justify-between">
      <div className="text-foreground font-medium">Admin Panel</div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-muted rounded-lg text-foreground/70 hover:text-foreground transition-colors">
          <Bell size={20} />
        </button>
        <button className="p-2 hover:bg-muted rounded-lg text-foreground/70 hover:text-foreground transition-colors">
          <Settings size={20} />
        </button>
        <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-foreground/70 hover:text-foreground">
          <LogOut size={18} className="mr-2" />
          Logout
        </Button>
      </div>
    </header>
  )
}
