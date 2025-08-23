import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  QrCode,
  CreditCard,
  MessageSquare,
  Users,
  BarChart3,
  Zap,
  Shield,
  Target,
  Heart,
  Lightbulb,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navbar */}
      <nav className="w-full sticky top-0 z-50 bg-white shadow flex items-center justify-center px-8 py-4">
        <div className="flex items-center space-x-10">
          <Link
            href="/"
            className="text-gray-700 hover:text-purple-600 font-medium text-lg"
          >
            Home
          </Link>
          <Link
            href="/browse-events"
            className="text-gray-700 hover:text-purple-600 font-medium text-lg"
          >
            Events
          </Link>
          <Link
            href="/about"
            className="text-purple-700 font-semibold text-lg underline"
          >
            About
          </Link>
        </div>
      </nav>

      {/* About Content */}
      <main className="max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">
          About CampusHub
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          CampusHub is your one-stop platform for discovering, organizing, and
          participating in campus events. Whether you’re a student looking for
          the next big thing or an organizer wanting to reach a wider audience,
          CampusHub brings the campus community together.
        </p>
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 text-base">
            We aim to foster a vibrant campus life by making it easy for
            students to find and join events, and for organizers to manage and
            promote their activities. Our platform is designed to be intuitive,
            inclusive, and empowering for everyone on campus.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">
            Features
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Browse and search for upcoming campus events</li>
            <li>Register for events with a single click</li>
            <li>Personalized dashboard for your registered events</li>
            <li>Easy event creation and management for organizers</li>
            <li>Stay updated with notifications and reminders</li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-700 mb-2">
            Have questions, feedback, or want to collaborate? Reach out to us!
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Email:</span>{" "}
            <a
              href="mailto:support@campushub.com"
              className="text-purple-600 hover:underline"
            >
              support@campushub.com
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
