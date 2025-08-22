"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Edit, Users, Calendar, DollarSign, TrendingUp, MoreVertical, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [userSearchTerm, setUserSearchTerm] = useState("")

  // Mock data for events
  const events = [
    { id: 1, name: "Tech Conference 2024", organizer: "CS Department", status: "active", registrations: 245 },
    { id: 2, name: "Spring Music Festival", organizer: "Music Club", status: "upcoming", registrations: 189 },
    { id: 3, name: "Career Fair", organizer: "Career Services", status: "active", registrations: 567 },
    { id: 4, name: "Basketball Championship", organizer: "Sports Department", status: "completed", registrations: 123 },
    { id: 5, name: "Art Exhibition", organizer: "Art Club", status: "draft", registrations: 45 },
  ]

  // Mock data for users
  const users = [
    { id: 1, name: "Sarah Johnson", email: "sarah.j@university.edu", role: "Student", joinDate: "2024-01-15" },
    { id: 2, name: "Mike Chen", email: "mike.chen@university.edu", role: "Organizer", joinDate: "2023-09-10" },
    { id: 3, name: "Emily Davis", email: "emily.d@university.edu", role: "Student", joinDate: "2024-02-20" },
    { id: 4, name: "Alex Rodriguez", email: "alex.r@university.edu", role: "Volunteer", joinDate: "2023-11-05" },
    { id: 5, name: "Lisa Wang", email: "lisa.wang@university.edu", role: "Organizer", joinDate: "2024-01-08" },
  ]

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || event.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const changeUserRole = (userId: number, newRole: string) => {
    console.log(`[v0] Changing user ${userId} role to ${newRole}`)
    // In a real app, this would make an API call
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-purple-600">
                CampusHub
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/admin" className="text-purple-600 font-medium">
                Dashboard
              </Link>
              <Link href="/admin/events" className="text-gray-600 hover:text-purple-600">
                Events
              </Link>
              <Link href="/admin/users" className="text-gray-600 hover:text-purple-600">
                Users
              </Link>
              <Link href="/admin/analytics" className="text-gray-600 hover:text-purple-600">
                Analytics
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/admin-avatar.png" alt="Admin" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analytics Dashboard */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics Overview</h2>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
                <p className="text-xs text-green-600">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                <Calendar className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-green-600">+8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231</div>
                <p className="text-xs text-green-600">+15% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Registrations Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                    <p className="text-gray-600">Line Chart Placeholder</p>
                    <p className="text-sm text-gray-500">Registrations trend visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Event Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <DollarSign className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                    <p className="text-gray-600">Bar Chart Placeholder</p>
                    <p className="text-sm text-gray-500">Revenue breakdown by category</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Event Management Table */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Event Management</h2>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Calendar className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Event Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Organizer</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Registrations</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvents.map((event) => (
                      <tr key={event.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{event.name}</td>
                        <td className="py-3 px-4 text-gray-600">{event.organizer}</td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{event.registrations}</td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
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

        {/* User & Role Management */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">User & Role Management</h2>

          <Card>
            <CardHeader>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  value={userSearchTerm}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Current Role</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Join Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{user.name}</td>
                        <td className="py-3 px-4 text-gray-600">{user.email}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{user.role}</Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{user.joinDate}</td>
                        <td className="py-3 px-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                Change Role
                                <MoreVertical className="ml-2 h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => changeUserRole(user.id, "Student")}>
                                Student
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => changeUserRole(user.id, "Organizer")}>
                                Organizer
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => changeUserRole(user.id, "Volunteer")}>
                                Volunteer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Footer */}
        <div className="text-center py-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            All data is handled securely in compliance with GDPR and DPDP regulations.
            <Link href="/privacy" className="text-purple-600 hover:underline ml-1">
              View Privacy Policy
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
