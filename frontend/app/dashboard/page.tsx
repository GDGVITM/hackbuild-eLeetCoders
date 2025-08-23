"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
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
  QrCode,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

// Define TypeScript interfaces
interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  organization?: string;
}

interface Event {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  venue: string;
  category: string;
  description?: string;
  capacity: number;
  isPaid: boolean;
  price?: number;
  slug: string;
}

interface Notification {
  _id: string;
  title: string;
  event: string;
  createdAt: string;
  type: string;
}

interface RegistrationForm {
  eventId: string;
  fullName: string;
  email: string;
  phone: string;
  dietaryRequirements: string;
  specialNeeds: string;
  emergencyContact: string;
  emergencyPhone: string;
}

export default function AttendeesDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [registrationForm, setRegistrationForm] = useState<RegistrationForm>({
    eventId: "",
    fullName: "",
    email: "",
    phone: "",
    dietaryRequirements: "",
    specialNeeds: "",
    emergencyContact: "",
    emergencyPhone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // To get eventId from the registration form state:
  const eventId = registrationForm.eventId;

  // Fetch user data
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user", err);
      setError("Failed to load user data");
    }
  };

  // Fetch events
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/event", {
        withCredentials: true,
      });

      const data = res.data.events;
      console.log(data);

      const now = new Date();
      const upcoming = data.filter(
        (event: Event) => new Date(event.endDate) > now
      );
      const past = data.filter(
        (event: Event) => new Date(event.endDate) <= now
      );

      setUpcomingEvents(upcoming);
      setPastEvents(past);
    } catch (err) {
      console.error("Failed to fetch events", err);
      setError("Failed to load events");
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    // try {
    //   const res = await axios.get("http://localhost:5000/api/notifications", {
    //     withCredentials: true,
    //   });
    //   setNotifications(res.data);
    // } catch (err) {
    //   console.error("Failed to fetch notifications", err);
    //   // Notifications might not be critical, so we don't set error state
    // }
  };

  // Load all data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        await Promise.all([fetchUser(), fetchEvents(), fetchNotifications()]);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle registration form submission
  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await axios.post(
        `http://localhost:5000/api/registration/${eventId}/register`,
        registrationForm,
        { withCredentials: true }
      );

      alert(
        "Registration successful! You will receive a confirmation email shortly."
      );
      setIsRegistrationOpen(false);

      // Reset form
      setRegistrationForm({
        eventId: "",
        fullName: "",
        email: "",
        phone: "",
        dietaryRequirements: "",
        specialNeeds: "",
        emergencyContact: "",
        emergencyPhone: "",
      });

      // Refresh events to show updated registration status
      fetchEvents();
    } catch (err: any) {
      console.error("Registration failed:", err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes in registration form
  const handleInputChange = (field: keyof RegistrationForm, value: string) => {
    setRegistrationForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Add event to calendar
  const addToCalendar = (event: Event) => {
    const startDate =
      new Date(event.startDate)
        .toISOString()
        .replace(/[-:]/g, "")
        .split(".")[0] + "Z";

    const endDate =
      new Date(event.endDate).toISOString().replace(/[-:]/g, "").split(".")[0] +
      "Z";

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${startDate}/${endDate}&location=${encodeURIComponent(
      event.venue
    )}&details=${encodeURIComponent(
      `Join us for ${event.title} at ${event.venue}`
    )}`;

    window.open(googleCalendarUrl, "_blank");
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      window.location.href = "/";
    } catch (err: any) {
      console.error("Logout failed:", err);
      setError(
        err.response?.data?.message || "Logout failed. Please try again."
      );
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md mx-auto">
            <h3 className="font-semibold mb-2">Error Loading Dashboard</h3>
            <p className="mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

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
              <Button
                asChild
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Link href="/organizer">
                  <Plus className="h-4 w-4 mr-2" />
                  Organize Event
                </Link>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-2 transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user?.avatar || "/placeholder.svg"}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback className="bg-purple-100 text-purple-600 font-semibold">
                      {user?.name
                        ?.split(" ")
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
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Dashboard Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name?.split(" ")[0]}! 👋
          </h1>
          <p className="text-lg text-gray-600">
            You have{" "}
            <span className="font-semibold text-purple-600">
              {upcomingEvents.length}
            </span>{" "}
            upcoming events.
          </p>
        </div>

        {/* Upcoming Events Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Upcoming Events
          </h2>
          {upcomingEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <Card
                  key={event._id}
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
                          {formatDate(event.startDate)} •{" "}
                          {formatTime(event.startDate)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <Link href="/dashboard/digital-pass">
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          <QrCode className="h-4 w-4 mr-2" />
                          View My Pass
                        </Button>
                      </Link>
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
                  key={notification._id}
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
                          {new Date(
                            notification.createdAt
                          ).toLocaleDateString()}
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
                  key={event._id}
                  className="opacity-75 hover:opacity-100 transition-opacity"
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {formatDate(event.startDate)}
                    </p>
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {event.category}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Registration Modal */}
      {isRegistrationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Register for Event</h3>
            <form onSubmit={handleRegistrationSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={registrationForm.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={registrationForm.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={registrationForm.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Dietary Requirements
                  </label>
                  <input
                    type="text"
                    value={registrationForm.dietaryRequirements}
                    onChange={(e) =>
                      handleInputChange("dietaryRequirements", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Special Needs
                  </label>
                  <input
                    type="text"
                    value={registrationForm.specialNeeds}
                    onChange={(e) =>
                      handleInputChange("specialNeeds", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Emergency Contact
                  </label>
                  <input
                    type="text"
                    value={registrationForm.emergencyContact}
                    onChange={(e) =>
                      handleInputChange("emergencyContact", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Emergency Phone
                  </label>
                  <input
                    type="tel"
                    value={registrationForm.emergencyPhone}
                    onChange={(e) =>
                      handleInputChange("emergencyPhone", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsRegistrationOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
