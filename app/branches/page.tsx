"use client"

import { useState, useMemo } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, Clock, Search } from "lucide-react"

const branches = [
  {
    id: 1,
    name: "Bangalore Main Branch",
    city: "Bangalore",
    state: "Karnataka",
    address: "123 MG Road, Bangalore 560001",
    phone: "080-4123-4567",
    email: "bangalore@maben.in",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 2:00 PM",
    latitude: 12.9716,
    longitude: 77.5946,
    facilities: ["Gold Loans", "Property Loans", "Deposits", "Locker Facility"],
  },
  {
    id: 2,
    name: "Mumbai Central Branch",
    city: "Mumbai",
    state: "Maharashtra",
    address: "456 Bandra Road, Mumbai 400050",
    phone: "022-2123-4567",
    email: "mumbai@maben.in",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 2:00 PM",
    latitude: 19.076,
    longitude: 72.8777,
    facilities: ["Gold Loans", "Property Loans", "Deposits"],
  },
  {
    id: 3,
    name: "Delhi Branch",
    city: "Delhi",
    state: "Delhi",
    address: "789 Connaught Place, New Delhi 110001",
    phone: "011-4123-4567",
    email: "delhi@maben.in",
    hours: "Mon-Fri: 10:00 AM - 7:00 PM, Sat: 10:00 AM - 3:00 PM",
    latitude: 28.6139,
    longitude: 77.209,
    facilities: ["All Services", "Training Center", "Locker Facility"],
  },
  {
    id: 4,
    name: "Hyderabad Branch",
    city: "Hyderabad",
    state: "Telangana",
    address: "321 Banjara Hills, Hyderabad 500034",
    phone: "040-4123-4567",
    email: "hyderabad@maben.in",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 2:00 PM",
    latitude: 17.3688,
    longitude: 78.4456,
    facilities: ["Gold Loans", "Property Loans", "Deposits"],
  },
  {
    id: 5,
    name: "Chennai Branch",
    city: "Chennai",
    state: "Tamil Nadu",
    address: "654 Mount Road, Chennai 600006",
    phone: "044-4123-4567",
    email: "chennai@maben.in",
    hours: "Mon-Fri: 10:00 AM - 7:00 PM, Sat: 10:00 AM - 2:00 PM",
    latitude: 13.0489,
    longitude: 80.2824,
    facilities: ["Gold Loans", "Property Loans", "Deposits"],
  },
  {
    id: 6,
    name: "Kolkata Branch",
    city: "Kolkata",
    state: "West Bengal",
    address: "987 Park Street, Kolkata 700016",
    phone: "033-4123-4567",
    email: "kolkata@maben.in",
    hours: "Mon-Fri: 10:00 AM - 6:00 PM, Sat: 10:00 AM - 2:00 PM",
    latitude: 22.5448,
    longitude: 88.3426,
    facilities: ["Gold Loans", "Property Loans", "Deposits"],
  },
]

export default function BranchLocatorPage() {
  const [searchCity, setSearchCity] = useState("")
  const [selectedBranch, setSelectedBranch] = useState<(typeof branches)[0] | null>(null)

  const filteredBranches = useMemo(() => {
    if (!searchCity) return branches
    return branches.filter(
      (b) =>
        b.city.toLowerCase().includes(searchCity.toLowerCase()) ||
        b.name.toLowerCase().includes(searchCity.toLowerCase()) ||
        b.state.toLowerCase().includes(searchCity.toLowerCase()),
    )
  }, [searchCity])

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-background via-secondary/5 to-background py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Branch Locator</h1>
              <p className="text-xl text-foreground/70 text-balance">
                Find your nearest Maben branch - 66 branches across India
              </p>
            </div>

            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-foreground/50" size={20} />
                <Input
                  placeholder="Search by city, branch name..."
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="pl-10 py-2 text-base"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Branch List */}
              <div className="lg:col-span-1">
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {filteredBranches.length > 0 ? (
                    filteredBranches.map((branch) => (
                      <Card
                        key={branch.id}
                        className={`border-border/50 cursor-pointer transition-all hover:shadow-lg ${
                          selectedBranch?.id === branch.id ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => setSelectedBranch(branch)}
                      >
                        <CardContent className="pt-6">
                          <h3 className="font-semibold text-foreground mb-1">{branch.name}</h3>
                          <p className="text-sm text-foreground/70 mb-3">
                            {branch.city}, {branch.state}
                          </p>
                          <Button size="sm" variant="outline" className="w-full text-xs bg-transparent">
                            View Details
                          </Button>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <MapPin className="mx-auto text-foreground/30 mb-2" size={32} />
                      <p className="text-foreground/70">No branches found</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Map & Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Map */}
                <Card className="border-border/50 overflow-hidden">
                  <div className="bg-muted h-96 flex items-center justify-center relative">
                    {selectedBranch ? (
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                          <p className="text-foreground font-semibold">{selectedBranch.name}</p>
                          <p className="text-foreground/70 text-sm">
                            {selectedBranch.latitude.toFixed(4)}, {selectedBranch.longitude.toFixed(4)}
                          </p>
                          <p className="text-xs text-foreground/60 mt-2">
                            (Google Maps integration available in production)
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <MapPin className="w-16 h-16 text-foreground/20 mx-auto mb-2" />
                        <p className="text-foreground/70">Select a branch to view location</p>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Details */}
                {selectedBranch && (
                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle className="text-foreground">{selectedBranch.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Address */}
                      <div>
                        <div className="flex items-start gap-3 mb-2">
                          <MapPin className="text-primary mt-1 flex-shrink-0" size={20} />
                          <div>
                            <p className="font-semibold text-foreground">Address</p>
                            <p className="text-foreground/70 text-sm">{selectedBranch.address}</p>
                          </div>
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="border-t border-border pt-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <Phone className="text-accent flex-shrink-0" size={20} />
                          <div>
                            <p className="text-sm text-foreground/70">Phone</p>
                            <a
                              href={`tel:${selectedBranch.phone}`}
                              className="text-primary hover:underline font-medium"
                            >
                              {selectedBranch.phone}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="text-secondary flex-shrink-0" size={20} />
                          <div>
                            <p className="text-sm text-foreground/70">Email</p>
                            <a
                              href={`mailto:${selectedBranch.email}`}
                              className="text-primary hover:underline font-medium"
                            >
                              {selectedBranch.email}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock className="text-muted-foreground mt-1 flex-shrink-0" size={20} />
                          <div>
                            <p className="text-sm text-foreground/70">Hours</p>
                            <p className="text-foreground text-sm font-medium">{selectedBranch.hours}</p>
                          </div>
                        </div>
                      </div>

                      {/* Facilities */}
                      <div className="border-t border-border pt-4">
                        <p className="font-semibold text-foreground mb-3">Services Available</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedBranch.facilities.map((facility, idx) => (
                            <span key={idx} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                              {facility}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="border-t border-border pt-4 flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-primary hover:bg-primary/90"
                          onClick={() => {
                            const mapsUrl = `https://maps.google.com/?q=${selectedBranch.latitude},${selectedBranch.longitude}`
                            window.open(mapsUrl, "_blank")
                          }}
                        >
                          Open in Maps
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          Call Branch
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
