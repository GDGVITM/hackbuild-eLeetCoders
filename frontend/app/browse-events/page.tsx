"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, MapPin, Clock, Tag, ArrowLeft } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function BrowseEventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDate, setSelectedDate] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All")
  const [sortBy, setSortBy] = useState("Newest")

  const sampleEvents = [
    {
      id: 1,
      title: "Campus Music Festival",
      date: "March 15, 2025",
      time: "7:00 PM",
      location: "Main Auditorium",
      category: "Music",
      image: "/vibrant-student-concert.png",
      tags: ["Music", "Entertainment"],
    },
    {
      id: 2,
      title: "Tech Innovation Summit",
      date: "March 18, 2025",
      time: "2:00 PM",
      location: "Engineering Building",
      category: "Tech",
      image: "/tech-conference-lecture.png",
      tags: ["Technology", "Innovation"],
    },
    {
      id: 3,
      title: "Intramural Basketball Championship",
      date: "March 20, 2025",
      time: "6:00 PM",
      location: "Sports Complex",
      category: "Sports",
      image: "/outdoor-sports-cheer.png",
      tags: ["Sports", "Competition"],
    },
    {
      id: 4,
      title: "Career Networking Night",
      date: "March 22, 2025",
      time: "5:30 PM",
      location: "Student Center",
      category: "Career",
      image: "/social-club-networking.png",
      tags: ["Networking", "Career"],
    },
    {
      id: 5,
      title: "Art Exhibition Opening",
      date: "March 25, 2025",
      time: "4:00 PM",
      location: "Art Gallery",
      category: "Arts",
      image: "/art-exhibition-gallery.png",
      tags: ["Arts", "Culture"],
    },
    {
      id: 6,
      title: "Study Group: Advanced Mathematics",
      date: "March 28, 2025",
      time: "3:00 PM",
      location: "Library Room 204",
      category: "Academic",
      image: "/students-studying-mathematics.png",
      tags: ["Academic", "Study"],
    },
  ]

  const filteredEvents = sampleEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
    const matchesDate = selectedDate === "All" // Simplified for demo
    const matchesLocation = selectedLocation === "All" // Simplified for demo

    return matchesSearch && matchesCategory && matchesDate && matchesLocation
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <div className="text-2xl font-bold text-purple-600">CampusHub</div>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/auth?form=login">
                <Button variant="ghost" className="text-gray-700 hover:text-purple-600">
                  Login
                </Button>
              </Link>
              <Link href="/auth?form=signup">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse All Events</h1>
            <p className="text-xl text-gray-600">Discover what's happening on campus</p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="All">All Categories</option>
                <option value="Music">Music</option>
                <option value="Tech">Tech</option>
                <option value="Sports">Sports</option>
                <option value="Career">Career</option>
                <option value="Arts">Arts</option>
                <option value="Academic">Academic</option>
              </select>

              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="All">All Dates</option>
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="All">All Locations</option>
                <option value="Main Campus">Main Campus</option>
                <option value="Sports Complex">Sports Complex</option>
                <option value="Student Center">Student Center</option>
              </select>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Newest">Newest</option>
                  <option value="Closest">Closest Date</option>
                  <option value="Popular">Most Popular</option>
                </select>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card
                key={event.id}
                className="bg-white rounded-xl shadow-sm border-0 hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {event.category}
                    </span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{event.title}</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        {event.date} • {event.time}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
