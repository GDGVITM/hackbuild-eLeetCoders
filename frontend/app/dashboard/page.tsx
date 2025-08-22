"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  Plus,
  Bell,
  Settings,
} from "lucide-react";
import axios from "axios";

export default function AttendeesDashboard() {
  const [showPastEvents, setShowPastEvents] = useState(false);

  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    avatar: "/student-avatar.png",
  };

  // Mock upcoming events data
  const upcomingEvents = [
    {
      id: 1,
      title: "Campus Tech Fest 2025",
      date: "March 15, 2025",
      time: "7:00 PM",
      location: "Main Auditorium",
      type: "Technology Conference",
    },
    {
      id: 2,
      title: "Spring Career Fair",
      date: "March 22, 2025",
      time: "10:00 AM",
      location: "Student Union Building",
      type: "Career Event",
    },
    {
      id: 3,
      title: "Intramural Sports Championship",
      date: "March 28, 2025",
      time: "3:00 PM",
      location: "Athletic Complex",
      type: "Sports Event",
    },
  ];

  // Mock past events data
  const pastEvents = [
    {
      id: 4,
      title: "Winter Formal Dance",
      date: "February 14, 2025",
      type: "Social Event",
    },
    {
      id: 5,
      title: "Guest Speaker: Innovation in AI",
      date: "February 8, 2025",
      type: "Academic Event",
    },
    {
      id: 6,
      title: "Study Abroad Information Session",
      date: "January 25, 2025",
      type: "Information Session",
    },
  ];

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "Event Update: Speaker Change",
      event: "Campus Tech Fest 2025",
      time: "2 hours ago",
      type: "update",
    },
    {
      id: 2,
      title: "Reminder: Event Tomorrow",
      event: "Spring Career Fair",
      time: "1 day ago",
      type: "reminder",
    },
    {
      id: 3,
      title: "New Event Available",
      event: "Photography Workshop",
      time: "3 days ago",
      type: "new",
    },
    {
      id: 4,
      title: "Event Cancelled",
      event: "Study Group Session",
      time: "1 week ago",
      type: "cancelled",
    },
  ];

  const addToCalendar = (event: any) => {
    const startDate =
      new Date(`${event.date} ${event.time}`)
        .toISOString()
        .replace(/[-:]/g, "")
        .split(".")[0] + "Z";
    const endDate =
      new Date(
        new Date(`${event.date} ${event.time}`).getTime() + 2 * 60 * 60 * 1000
      )
        .toISOString()
        .replace(/[-:]/g, "")
        .split(".")[0] + "Z";

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${startDate}/${endDate}&location=${encodeURIComponent(
      event.location
    )}&details=${encodeURIComponent(
      `Join us for ${event.title} at ${event.location}`
    )}`;

    window.open(googleCalendarUrl, "_blank");
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      console.log(document.cookie); // Debugging line
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true, // send cookies to backend
        }
      );
      window.location.href = "/";
    } catch (err: any) {
      alert(err?.response?.data?.message || "Logout failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CH</span>
              </div>
              <span className="text-xl font-bold text-gray-900">CampusHub</span>
            </Link>

            {/* Navigation */}
            <div className="flex items-center space-x-6">
              <Link
                href="/browse-events"
                className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
              >
                Browse Events
              </Link>
              {/* Organize Event Button */}
              <Link
                href="/auth?redirect=organizer"
                className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
              >
                <Button
                  variant="outline"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                >
                  Organize Event
                </Button>
              </Link>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-2 transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                    />
                    <AvatarFallback className="bg-purple-100 text-purple-600 font-semibold">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    <Link href="/settings" className="w-full">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/profile" className="w-full">
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name.split(" ")[0]}! 👋
          </h1>
          <p className="text-lg text-gray-600">
            You have{" "}
            <span className="font-semibold text-purple-600">
              {upcomingEvents.length}
            </span>{" "}
            upcoming events.
          </p>
        </div>

        {/* Organize Event Card Section */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Want to organize an event?
                  </h3>
                  <p className="text-gray-600">
                    Create and manage your own events with our powerful
                    organizer tools. Perfect for clubs, organizations, and
                    student groups.
                  </p>
                </div>
                <Link href="/auth?redirect=organizer">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3">
                    <Plus className="w-4 h-4 mr-2" />
                    Organize Event
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Upcoming Events Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Upcoming Events
          </h2>

          {upcomingEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <Card
                  key={event.id}
                  className="hover:shadow-lg transition-shadow duration-200"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-gray-900 leading-tight">
                      {event.title}
                    </CardTitle>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          {event.date} • {event.time}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        View My Pass
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                        onClick={() => addToCalendar(event)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Calendar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No upcoming events
                </h3>
                <p className="text-gray-600 mb-4">
                  Looks like you don't have any events registered yet.
                </p>
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/browse-events">Browse Events</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Notifications & Updates Section */}
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <Bell className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Notifications & Updates
            </h2>
          </div>

          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className="hover:shadow-md transition-shadow duration-200"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900">
                            {notification.title}
                          </h3>
                          <span
                            className={`inline-block px-2 py-1 text-xs rounded-full ${
                              notification.type === "update"
                                ? "bg-blue-100 text-blue-700"
                                : notification.type === "reminder"
                                ? "bg-yellow-100 text-yellow-700"
                                : notification.type === "new"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {notification.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          Related to:{" "}
                          <span className="font-medium text-purple-600">
                            {notification.event}
                          </span>
                        </p>
                        <p className="text-xs text-gray-500">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-8">
              <CardContent>
                <Bell className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No new notifications
                </h3>
                <p className="text-gray-600">
                  You're all caught up! Check back later for updates.
                </p>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Past Events Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Your Past Events
            </h2>
            <Button
              variant="ghost"
              onClick={() => setShowPastEvents(!showPastEvents)}
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
            >
              {showPastEvents ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-2" />
                  Hide Past Events
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-2" />
                  Show Past Events ({pastEvents.length})
                </>
              )}
            </Button>
          </div>

          {showPastEvents && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event) => (
                <Card
                  key={event.id}
                  className="opacity-75 hover:opacity-100 transition-opacity"
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{event.date}</p>
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {event.type}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
