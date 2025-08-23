"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  MapPin,
  Clock,
  Tag,
  ArrowLeft,
  CheckCircle,
  UserPlus,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

type RegistrationFormType = {
  fullName: string;
  email: string;
  phone: string;
};

type EventType = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  category: "technical" | "cultural" | "sports" | "workshop" | "seminar";
  venue?: string;
  startDate: string;
  endDate: string;
  capacity: number;
  isPaid: boolean;
  price: number;
  createdAt: string;
  attendees?: any[];
};

export default function BrowseEventsPage() {
  const router = useRouter(); // <-- must be here, not inside any function or condition
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [registeredEvents, setRegisteredEvents] = useState<Set<string>>(
    new Set()
  );
  const [loadingRegistrations, setLoadingRegistrations] = useState<Set<string>>(
    new Set()
  );
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [selectedEventForRegistration, setSelectedEventForRegistration] =
    useState<any>(null);
  const [registrationForm, setRegistrationForm] =
    useState<RegistrationFormType>({
      fullName: "",
      email: "",
      phone: "",
    });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/event")
      .then((res) => {
        setEvents(res.data.events || res.data || []);
      })
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const registerForEvent = async (eventId: string) => {
    setLoadingRegistrations((prev) => new Set([...prev, eventId]));
    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${eventId}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        setRegisteredEvents((prev) => new Set([...prev, eventId]));
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoadingRegistrations((prev) => {
        const newSet = new Set(prev);
        newSet.delete(eventId);
        return newSet;
      });
    }
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${selectedEventForRegistration.id}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            ...registrationForm,
            eventId: selectedEventForRegistration.id,
          }),
        }
      );

      if (response.ok) {
        setRegisteredEvents(
          (prev) => new Set([...prev, selectedEventForRegistration.id])
        );
        setRegistrationForm({
          fullName: "",
          email: "",
          phone: "",
        });
        setIsRegistrationOpen(false);
        setSelectedEventForRegistration(null);
        alert(
          "Registration successful! You will receive a confirmation email shortly."
        );
      } else {
        console.error("Registration failed");
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setRegistrationForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Check authentication on mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setAuthChecked(true);
      })
      .catch(() => {
        setUser(null);
        setAuthChecked(true);
      });
  }, []);

  const openRegistrationForm = (event: any) => {
    if (!user) {
      // Redirect to login, with redirect back to this event after login
      router.push(`/auth?form=login&redirect=event&eventId=${event.id}`);
      return;
    }
    setSelectedEventForRegistration(event);
    setIsRegistrationOpen(true);
  };

  const cancelRegistration = async (eventId: string) => {
    setLoadingRegistrations((prev) => new Set([...prev, eventId]));
    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${eventId}/register`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        setRegisteredEvents((prev) => {
          const newSet = new Set(prev);
          newSet.delete(eventId);
          return newSet;
        });
      } else {
        console.error("Cancellation failed");
      }
    } catch (error) {
      console.error("Cancellation error:", error);
    } finally {
      setLoadingRegistrations((prev) => {
        const newSet = new Set(prev);
        newSet.delete(eventId);
        return newSet;
      });
    }
  };

  useEffect(() => {
    const loadUserRegistrations = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/user/registrations",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const registeredEventIds = data.registrations.map(
            (reg: any) => reg.eventId
          );
          setRegisteredEvents(new Set(registeredEventIds));
        }
      } catch (error) {
        console.error("Failed to load registrations:", error);
      }
    };

    if (localStorage.getItem("token")) {
      loadUserRegistrations();
    }
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      (event.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (event.venue?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (event.category?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (event.description?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      );

    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    // Add your date/location logic as needed

    return matchesSearch && matchesCategory;
  });

  // Show nothing until auth check is done
  if (!authChecked) {
    return <div>Loading...</div>;
  }

  // Helper function to format date as "Month Day, Year . h:mm AM/PM"
  function formatEventDate(dateString: string) {
    const date = new Date(dateString);
    const datePart = date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const timePart = date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${datePart} • ${timePart}`;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href={user ? "/dashboard" : "/"}
                className="flex items-center text-gray-600 hover:text-purple-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Link>
              <div className="text-2xl font-bold text-purple-600">
                CampusHub
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {!user ? (
                <>
                  <Link href="/auth?form=login">
                    <Button
                      variant="ghost"
                      className="text-gray-700 hover:text-purple-600"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth?form=signup">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Browse All Events
            </h1>
            <p className="text-xl text-gray-600">
              Discover what's happening on campus
            </p>
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
                <span className="text-sm font-medium text-gray-700">
                  Filter by:
                </span>
              </div>

              {/* Category Select */}
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  <SelectItem value="Music">Music</SelectItem>
                  <SelectItem value="Tech">Tech</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Career">Career</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                  <SelectItem value="Academic">Academic</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Select */}
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Dates</SelectItem>
                  <SelectItem value="Today">Today</SelectItem>
                  <SelectItem value="This Week">This Week</SelectItem>
                  <SelectItem value="This Month">This Month</SelectItem>
                </SelectContent>
              </Select>

              {/* Location Select */}
              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Locations</SelectItem>
                  <SelectItem value="Main Campus">Main Campus</SelectItem>
                  <SelectItem value="Sports Complex">Sports Complex</SelectItem>
                  <SelectItem value="Student Center">Student Center</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort By Select */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <SelectValue placeholder="Select sort option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Newest">Newest</SelectItem>
                  <SelectItem value="Closest">Closest Date</SelectItem>
                  <SelectItem value="Popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const isRegistered = registeredEvents.has(event._id);
              const isLoading = loadingRegistrations.has(event._id);
              const isFull = event.attendees?.length! >= event.capacity!;

              return (
                <Card
                  key={event._id}
                  className="bg-white rounded-xl shadow-sm border-0 hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={"/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {event.category}
                      </span>
                    </div>
                    {isRegistered && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Registered
                        </div>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {event.title}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {formatEventDate(event.startDate)}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{event.venue}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <UserPlus className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {event.attendees?.length}/{event.capacity} registered
                        </span>
                        {isFull && (
                          <span className="ml-2 bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                            Full
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4 flex-grow">
                      {event.category}
                    </div>

                    <div className="space-y-2 mt-auto">
                      {isRegistered ? (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                          >
                            View Details
                          </Button>
                          <Button
                            onClick={() => cancelRegistration(event._id)}
                            disabled={isLoading}
                            variant="outline"
                            className="border-red-200 text-red-600 hover:bg-red-50 px-3"
                          >
                            {isLoading ? (
                              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <X className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                          >
                            View Details
                          </Button>
                          <Button
                            onClick={() => openRegistrationForm(event)}
                            disabled={isFull}
                            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg disabled:bg-gray-400"
                          >
                            <UserPlus className="w-4 h-4 mr-2" />
                            {isFull ? "Event Full" : "Register"}
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No events found matching your criteria.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Register for {selectedEventForRegistration?.title}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRegistrationSubmit} className="space-y-6">
            {/* Event Details */}
            {selectedEventForRegistration && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {selectedEventForRegistration.title}
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {selectedEventForRegistration.date} •{" "}
                    {selectedEventForRegistration.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {selectedEventForRegistration.location}
                  </div>
                </div>
              </div>
            )}

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={registrationForm.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={registrationForm.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={registrationForm.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsRegistrationOpen(false);
                  setSelectedEventForRegistration(null);
                }}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-purple-600 hover:bg-purple-700"
                disabled={
                  isSubmitting ||
                  !registrationForm.fullName ||
                  !registrationForm.email ||
                  !registrationForm.phone
                }
              >
                {isSubmitting ? "Registering..." : "Register for Event"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
