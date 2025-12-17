"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminHeader from "@/components/admin/admin-header"
import AdminSidebar from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Edit, Plus } from "lucide-react"

const mockBranches = [
  {
    id: 1,
    name: "Bangalore Main",
    city: "Bangalore",
    state: "Karnataka",
    phone: "080-4123-4567",
    status: "Active",
  },
  {
    id: 2,
    name: "Mumbai Central",
    city: "Mumbai",
    state: "Maharashtra",
    phone: "022-2123-4567",
    status: "Active",
  },
]

export default function AdminBranchesPage() {
  const [user, setUser] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const [branches, setBranches] = useState(mockBranches)
  const [newBranch, setNewBranch] = useState({
    name: "",
    city: "",
    state: "",
    address: "",
    phone: "",
    email: "",
  })
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/login")
      return
    }
    const userData = JSON.parse(storedUser)
    if (userData.role !== "admin" && userData.role !== "super_admin") {
      router.push("/dashboard")
      return
    }
    setUser(userData)
  }, [router])

  const handleAddBranch = () => {
    const branch = {
      id: branches.length + 1,
      name: newBranch.name,
      city: newBranch.city,
      state: newBranch.state,
      phone: newBranch.phone,
      status: "Active",
    }
    setBranches([...branches, branch])
    setNewBranch({ name: "", city: "", state: "", address: "", phone: "", email: "" })
    setShowForm(false)
  }

  if (!user) return null

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader user={user} />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Branch Management</h1>
                <p className="text-foreground/70 mt-1">Manage all branch locations</p>
              </div>
              <Button onClick={() => setShowForm(!showForm)} className="bg-primary hover:bg-primary/90">
                <Plus size={18} className="mr-2" />
                Add Branch
              </Button>
            </div>

            {/* Add Form */}
            {showForm && (
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Add New Branch</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-foreground">Branch Name</Label>
                      <Input
                        value={newBranch.name}
                        onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                        placeholder="Enter branch name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-foreground">City</Label>
                      <Input
                        value={newBranch.city}
                        onChange={(e) => setNewBranch({ ...newBranch, city: e.target.value })}
                        placeholder="Enter city"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-foreground">State</Label>
                      <Input
                        value={newBranch.state}
                        onChange={(e) => setNewBranch({ ...newBranch, state: e.target.value })}
                        placeholder="Enter state"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-foreground">Phone</Label>
                      <Input
                        value={newBranch.phone}
                        onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-foreground">Address</Label>
                      <textarea
                        value={newBranch.address}
                        onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
                        placeholder="Enter full address"
                        rows={3}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-foreground">Email</Label>
                      <Input
                        type="email"
                        value={newBranch.email}
                        onChange={(e) => setNewBranch({ ...newBranch, email: e.target.value })}
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button onClick={handleAddBranch} className="bg-primary hover:bg-primary/90">
                      Save Branch
                    </Button>
                    <Button onClick={() => setShowForm(false)} variant="outline">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Branches Table */}
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Branch Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">City</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">State</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Phone</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {branches.map((branch) => (
                        <tr key={branch.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4 font-medium text-foreground">{branch.name}</td>
                          <td className="px-6 py-4 text-foreground/70">{branch.city}</td>
                          <td className="px-6 py-4 text-foreground/70">{branch.state}</td>
                          <td className="px-6 py-4 text-foreground/70">{branch.phone}</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              {branch.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 flex gap-2">
                            <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10">
                              <Edit size={16} />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10">
                              <Trash2 size={16} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
