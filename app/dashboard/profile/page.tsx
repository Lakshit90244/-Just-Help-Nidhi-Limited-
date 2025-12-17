"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Phone, MapPin, FileText } from "lucide-react"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
  })
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/login")
      return
    }
    const userData = JSON.parse(storedUser)
    setUser(userData)
    setFormData({
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.phone || "",
      city: userData.city || "",
      address: userData.address || "",
    })
  }, [router])

  const handleSave = () => {
    // In a real app, this would save to the backend
    const updatedUser = { ...user, ...formData }
    localStorage.setItem("user", JSON.stringify(updatedUser))
    setUser(updatedUser)
    setIsEditing(false)
  }

  if (!user) return null

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
            <p className="text-foreground/70">Manage your personal information</p>
          </div>

          {/* Profile Section */}
          <Card className="border-border/50 mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground">Personal Information</CardTitle>
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={() => setIsEditing(!isEditing)}
                className={isEditing ? "bg-primary hover:bg-primary/90" : ""}
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Avatar */}
              <div className="flex items-center gap-4 pb-6 border-b border-border">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{user.name}</p>
                  <p className="text-sm text-foreground/70">{user.email}</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-foreground/50" size={18} />
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-foreground/50" size={18} />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">
                      Phone
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 text-foreground/50" size={18} />
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-foreground">
                      City
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-foreground/50" size={18} />
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-foreground">
                    Address
                  </Label>
                  <textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  />
                </div>

                {isEditing && (
                  <Button onClick={handleSave} className="w-full bg-primary hover:bg-primary/90">
                    Save Changes
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* KYC Section */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <FileText size={20} />
                KYC Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4 border border-border">
                <p className="text-sm text-foreground/70 mb-4">Upload your documents to complete KYC verification</p>
                <div className="space-y-3">
                  {["Aadhaar Card", "PAN Card", "Address Proof"].map((doc) => (
                    <div
                      key={doc}
                      className="flex items-center justify-between p-3 bg-background rounded-lg border border-border"
                    >
                      <p className="font-medium text-foreground">{doc}</p>
                      <Button size="sm" variant="outline">
                        Upload
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
