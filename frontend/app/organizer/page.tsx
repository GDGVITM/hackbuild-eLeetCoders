"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Download,
  Users,
  DollarSign,
  CheckCircle,
  XCircle,
  Send,
  QrCode,
  Settings,
  LogOut,
  Menu,
  X,
  MessageSquare,
  UserCheck,
  Home,
  Bell,
  Plus,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function OrganizerDashboard() {
  const [currentView, setCurrentView] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [message, setMessage] = useState("")
  const [messageAudience, setMessageAudience] = useState("all")

  const [eventForm, setEventForm] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    venue: "",
    startDate: "",
    endDate: "",
    capacity: "",
    isPaid: false,
    price: "",
  })

  const [userOrganization, setUserOrganization] = useState("Tech Student Association") // Mock organization

  const attendees = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@university.edu",
      ticketType: "VIP",
      paymentStatus: "paid",
      checkedIn: true,
      registrationDate: "2024-03-01",
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@university.edu",
      ticketType: "General",
      paymentStatus: "paid",
      checkedIn: false,
      registrationDate: "2024-03-02",
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily.d@university.edu",
      ticketType: "Student",
      paymentStatus: "pending",
      checkedIn: false,
      registrationDate: "2024-03-03",
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      email: "alex.r@university.edu",
      ticketType: "General",
      paymentStatus: "paid",
      checkedIn: true,
      registrationDate: "2024-03-04",
    },
    {
      id: 5,
      name: "Lisa Wang",
      email: "lisa.wang@university.edu",
      ticketType: "VIP",
      paymentStatus: "paid",
      checkedIn: true,
      registrationDate: "2024-03-05",
    },
  ]

  const volunteers = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@university.edu",
      role: "Check-in Volunteer",
      shift: "Morning (8AM - 12PM)",
      status: "confirmed",
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.g@university.edu",
      role: "Registration Desk",
      shift: "Afternoon (12PM - 4PM)",
      status: "confirmed",
    },
    {
      id: 3,
      name: "David Kim",
      email: "david.kim@university.edu",
      role: "Technical Support",
      shift: "Full Day (8AM - 6PM)",
      status: "pending",
    },
    {
      id: 4,
      name: "Anna Wilson",
      email: "anna.w@university.edu",
      role: "Event Coordinator",
      shift: "Evening (4PM - 8PM)",
      status: "confirmed",
    },
  ]

  const recentActivity = [
    { id: 1, action: "New registration", user: "Sarah Johnson", time: "2 minutes ago" },
    { id: 2, action: "Payment completed", user: "Mike Chen", time: "5 minutes ago" },
    { id: 3, action: "Volunteer confirmed", user: "John Smith", time: "10 minutes ago" },
    { id: 4, action: "Check-in completed", user: "Alex Rodriguez", time: "15 minutes ago" },
    { id: 5, action: "New registration", user: "Emily Davis", time: "20 minutes ago" },
  ]

  const filteredAttendees = attendees.filter((attendee) => {
    const matchesSearch =
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "checked-in" && attendee.checkedIn) ||
      (statusFilter === "not-checked-in" && !attendee.checkedIn) ||
      (statusFilter === "paid" && attendee.paymentStatus === "paid") ||
      (statusFilter === "pending" && attendee.paymentStatus === "pending")
    return matchesSearch && matchesStatus
  })

  const totalAttendees = attendees.length
  const checkedInCount = attendees.filter((a) => a.checkedIn).length
  const checkInPercentage = (checkedInCount / totalAttendees) * 100
  const totalRevenue = 12450
  const paidAttendees = attendees.filter((a) => a.paymentStatus === "paid").length

  const navigationItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "create-event", label: "Create Event", icon: Plus }, // Added create event navigation
    { id: "attendees", label: "Attendees", icon: Users },
    { id: "volunteers", label: "Volunteers", icon: UserCheck },
    { id: "communication", label: "Communication", icon: MessageSquare },
    { id: "checkin", label: "Check-in", icon: QrCode },
  ]

  const getPaymentStatusColor = (status: string) => {
    return status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
  }

  const getVolunteerStatusColor = (status: string) => {
    return status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
  }

  const sendMessage = () => {
    console.log(`[v0] Sending message to ${messageAudience}: ${message}`)
    setMessage("")
  }

  const handleEventFormChange = (field: string, value: string | boolean) => {
    setEventForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCreateEvent = async () => {
    try {
      console.log("[v0] Creating event with data:", eventForm)

      // Validate required fields
      if (
        !eventForm.title ||
        !eventForm.description ||
        !eventForm.category ||
        !eventForm.venue ||
        !eventForm.startDate ||
        !eventForm.endDate ||
        !eventForm.capacity
      ) {
        alert("Please fill in all required fields")
        return
      }

      // Validate dates
      if (new Date(eventForm.startDate) >= new Date(eventForm.endDate)) {
        alert("Start date must be before end date")
        return
      }

      // Validate capacity
      if (Number.parseInt(eventForm.capacity) <= 0) {
        alert("Capacity must be a positive number")
        return
      }

      // Validate price if paid event
      if (eventForm.isPaid && (!eventForm.price || Number.parseFloat(eventForm.price) <= 0)) {
        alert("Price must be a positive number for paid events")
        return
      }

      // Mock API call - in real implementation, this would call your backend
      const eventData = {
        ...eventForm,
        slug: eventForm.slug || eventForm.title.toLowerCase().replace(/\s+/g, "-"),
        organizer: userOrganization,
        createdBy: "current-user-id", // Mock user ID
        attendees: [],
        waitlist: [],
        feedback: [],
      }

      console.log("[v0] Event created successfully:", eventData)
      alert("Event created successfully!")

      // Reset form
      setEventForm({
        title: "",
        slug: "",
        description: "",
        category: "",
        venue: "",
        startDate: "",
        endDate: "",
        capacity: "",
        isPaid: false,
        price: "",
      })

      // Redirect to overview
      setCurrentView("overview")
    } catch (error) {
      console.error("[v0] Error creating event:", error)
      alert("Error creating event. Please try again.")
    }
  }

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="relative h-48 rounded-lg overflow-hidden mb-6">
        <img
          src="/images/tech-conference-banner.png"
          alt="Tech Conference 2024 Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold mb-2">Tech Conference 2024</h1>
            <p className="text-lg">March 15-17, 2024 • University Campus</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Overview</h2>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Total Tickets Sold</CardTitle>
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">245</div>
              <p className="text-xs text-green-600 font-medium">+23 since yesterday</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Total Revenue</CardTitle>
              <div className="p-2 bg-green-100 rounded-full">
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-green-600 font-medium">+$890 today</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Attendees Checked In</CardTitle>
              <div className="p-2 bg-purple-100 rounded-full">
                <CheckCircle className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">{checkedInCount}</div>
              <p className="text-xs text-gray-600">of {totalAttendees} total</p>
            </CardContent>
          </Card>
        </div>

        {/* Check-in Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Check-in Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(checkInPercentage)}% checked in</span>
              </div>
              <Progress value={checkInPercentage} className="w-full" />
              <p className="text-xs text-gray-500">
                {checkedInCount} of {totalAttendees} attendees have checked in
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="relative h-32 rounded-lg overflow-hidden">
                <img
                  src="/images/event-venue.png"
                  alt="Conference Venue"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden">
                <img
                  src="/images/networking-event.png"
                  alt="Networking Session"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <Users className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">245 Attendees</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderAttendees = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Attendee Management</h2>
        <div className="flex space-x-2">
          <Button variant="outline" className="bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search attendees..."
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
                <SelectItem value="all">All Attendees</SelectItem>
                <SelectItem value="checked-in">Checked In</SelectItem>
                <SelectItem value="not-checked-in">Not Checked In</SelectItem>
                <SelectItem value="paid">Payment Complete</SelectItem>
                <SelectItem value="pending">Payment Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Name</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Email</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Ticket Type</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Payment Status</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Check-in Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendees.map((attendee) => (
                  <tr key={attendee.id} className="border-b hover:bg-purple-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                            {attendee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">{attendee.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{attendee.email}</td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{attendee.ticketType}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getPaymentStatusColor(attendee.paymentStatus)}>{attendee.paymentStatus}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      {attendee.checkedIn ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-400" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderVolunteers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Volunteer Management</h2>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Users className="mr-2 h-4 w-4" />
          Add Volunteer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Volunteer List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Name</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Email</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Role</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Shift</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {volunteers.map((volunteer) => (
                  <tr key={volunteer.id} className="border-b hover:bg-purple-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-green-100 text-green-600 text-sm">
                            {volunteer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">{volunteer.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{volunteer.email}</td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{volunteer.role}</Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{volunteer.shift}</td>
                    <td className="py-4 px-4">
                      <Badge className={getVolunteerStatusColor(volunteer.status)}>{volunteer.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCommunication = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Communication Center</h2>

      <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-6 text-white mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white bg-opacity-20 rounded-full">
            <MessageSquare className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Stay Connected</h3>
            <p className="text-purple-100">Send announcements and updates to your attendees and volunteers</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Send Announcement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Audience</label>
            <Select value={messageAudience} onValueChange={setMessageAudience}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Attendees</SelectItem>
                <SelectItem value="checked-in">Attendees Who Checked In</SelectItem>
                <SelectItem value="not-checked-in">Attendees Who Haven't Checked In</SelectItem>
                <SelectItem value="volunteers">Volunteers Only</SelectItem>
                <SelectItem value="vip">VIP Ticket Holders</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <Textarea
              placeholder="Type your announcement here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>

          <Button onClick={sendMessage} className="bg-purple-600 hover:bg-purple-700">
            <Send className="mr-2 h-4 w-4" />
            Send Announcement
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderCheckIn = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">QR-Based Check-in</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>QR Code Scanner</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="relative w-64 h-64 bg-gray-900 rounded-lg flex items-center justify-center mx-auto overflow-hidden">
              <img
                src="/images/qr-scanner-interface.png"
                alt="QR Scanner Interface"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-2 border-white border-dashed rounded-lg flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
            <p className="text-gray-600">Position QR code within the frame to scan</p>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              <QrCode className="mr-2 h-4 w-4" />
              Start Scanner
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manual Check-in</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Attendee</label>
              <Input placeholder="Enter name or email..." />
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <UserCheck className="mr-2 h-4 w-4" />
              Manual Check-in
            </Button>

            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-3">Recent Check-ins</h4>
              <div className="space-y-2">
                {attendees
                  .filter((a) => a.checkedIn)
                  .slice(0, 3)
                  .map((attendee) => (
                    <div key={attendee.id} className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-green-100 text-green-600 text-xs">
                          {attendee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">{attendee.name}</span>
                      <span className="text-xs text-gray-500">Just now</span>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderCreateEvent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Create New Event</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Organization:</span>
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            {userOrganization}
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            <span>Event Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                placeholder="Enter event title"
                value={eventForm.title}
                onChange={(e) => handleEventFormChange("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug (optional)</Label>
              <Input
                id="slug"
                placeholder="event-url-slug"
                value={eventForm.slug}
                onChange={(e) => handleEventFormChange("slug", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your event..."
              rows={4}
              value={eventForm.description}
              onChange={(e) => handleEventFormChange("description", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={eventForm.category} onValueChange={(value) => handleEventFormChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="seminar">Seminar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="venue">Venue</Label>
              <Input
                id="venue"
                placeholder="Event location"
                value={eventForm.venue}
                onChange={(e) => handleEventFormChange("venue", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date & Time *</Label>
              <Input
                id="startDate"
                type="datetime-local"
                value={eventForm.startDate}
                onChange={(e) => handleEventFormChange("startDate", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date & Time *</Label>
              <Input
                id="endDate"
                type="datetime-local"
                value={eventForm.endDate}
                onChange={(e) => handleEventFormChange("endDate", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">Event Capacity *</Label>
            <Input
              id="capacity"
              type="number"
              placeholder="Maximum number of attendees"
              value={eventForm.capacity}
              onChange={(e) => handleEventFormChange("capacity", e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="isPaid"
                checked={eventForm.isPaid}
                onCheckedChange={(checked) => handleEventFormChange("isPaid", checked)}
              />
              <Label htmlFor="isPaid">This is a paid event</Label>
            </div>

            {eventForm.isPaid && (
              <div className="space-y-2">
                <Label htmlFor="price">Ticket Price *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-10"
                    value={eventForm.price}
                    onChange={(e) => handleEventFormChange("price", e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button variant="outline" onClick={() => setCurrentView("overview")}>
              Cancel
            </Button>
            <Button onClick={handleCreateEvent} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCurrentView = () => {
    switch (currentView) {
      case "overview":
        return renderOverview()
      case "create-event":
        return renderCreateEvent()
      case "attendees":
        return renderAttendees()
      case "volunteers":
        return renderVolunteers()
      case "communication":
        return renderCommunication()
      case "checkin":
        return renderCheckIn()
      default:
        return renderOverview()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div
        className={`${sidebarOpen ? "w-64" : "w-16"} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <Link href="/" className="text-xl font-bold text-purple-600">
                CampusHub
              </Link>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:bg-gray-100"
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
          {sidebarOpen && <p className="text-sm text-gray-600 mt-2">Tech Conference 2024</p>}
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    currentView === item.id
                      ? "bg-purple-100 text-purple-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              )
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start p-2">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="bg-purple-100 text-purple-600">OR</AvatarFallback>
                </Avatar>
                {sidebarOpen && <span className="text-sm">Organizer</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {navigationItems.find((item) => item.id === currentView)?.label || "Overview"}
            </h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">{renderCurrentView()}</main>
      </div>
    </div>
  )
}
