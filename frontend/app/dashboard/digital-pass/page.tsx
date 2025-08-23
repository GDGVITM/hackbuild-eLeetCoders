"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Share2, MapPin, Calendar, Clock, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DigitalPassPage() {
  const [attendeeData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    event: "Tech Conference 2024",
    ticketType: "VIP Access",
    venue: "Convention Center Hall A",
    date: "March 25, 2024",
    time: "9:00 AM - 6:00 PM",
    qrCode: "/placeholder.svg?height=200&width=200&text=QR",
  })

  const handleDownload = () => {
    // Simulate download functionality
    console.log("Downloading digital pass...")
  }

  const handleShare = () => {
    // Simulate share functionality
    if (navigator.share) {
      navigator.share({
        title: `${attendeeData.event} - Digital Pass`,
        text: `My digital pass for ${attendeeData.event}`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Digital Pass</h1>
                <p className="text-sm text-gray-500">Your event entry pass</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button onClick={handleDownload} className="bg-purple-600 hover:bg-purple-700">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-8">
        {/* Digital Pass Card */}
        <Card className="bg-white shadow-lg border-0 overflow-hidden">
          <CardContent className="p-0">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white text-center">
              <div className="flex items-center justify-center mb-2">
                <Ticket className="h-6 w-6 mr-2" />
                <span className="font-semibold">DIGITAL PASS</span>
              </div>
              <h2 className="text-xl font-bold">{attendeeData.event}</h2>
            </div>

            {/* QR Code Section */}
            <div className="p-8 text-center bg-white">
              <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm">
                <img src={attendeeData.qrCode || "/placeholder.svg"} alt="QR Code" className="w-48 h-48 mx-auto" />
              </div>
              <p className="text-sm text-gray-500 mt-4">Present this QR code at the venue entrance</p>
            </div>

            {/* Attendee Information */}
            <div className="px-6 pb-6 space-y-4">
              <div className="border-t pt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Attendee Name
                    </label>
                    <p className="text-lg font-semibold text-gray-900">{attendeeData.name}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Email
                    </label>
                    <p className="text-sm text-gray-700">{attendeeData.email}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Ticket Type
                    </label>
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                      {attendeeData.ticketType}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{attendeeData.venue}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{attendeeData.date}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{attendeeData.time}</p>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="border-t pt-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-yellow-800 mb-2">Important Notes:</h4>
                  <ul className="text-xs text-yellow-700 space-y-1">
                    <li>• Please arrive 30 minutes before the event starts</li>
                    <li>• Keep this digital pass accessible on your device</li>
                    <li>• Valid ID may be required for verification</li>
                    <li>• Screenshot or download recommended for offline access</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <Button className="w-full bg-purple-600 hover:bg-purple-700" size="lg" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Save to Device
          </Button>

          <Button variant="outline" className="w-full bg-transparent" size="lg" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share Pass
          </Button>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Having trouble? Contact support at{" "}
            <a href="mailto:support@campushub.com" className="text-purple-600 hover:underline">
              support@campushub.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
