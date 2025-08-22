"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Calendar, QrCode, CreditCard, Star, Facebook, Twitter, Instagram, Settings, Mail } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const carouselImages = [
    {
      src: "/vibrant-student-concert.png",
      title: "Campus Music Festival",
      subtitle: "Live performances & dancing",
    },
    {
      src: "/outdoor-sports-cheer.png",
      title: "Intramural Sports",
      subtitle: "Competitive & recreational",
    },
    {
      src: "/tech-conference-lecture.png",
      title: "Tech Conference",
      subtitle: "Innovation & learning",
    },
    {
      src: "/social-club-networking.png",
      title: "Club Social",
      subtitle: "Connect & network",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(interval)
  }, [carouselImages.length])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-purple-600">CampusHub</div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors">
                Home
              </Link>
              <Link href="/events" className="text-gray-700 hover:text-purple-600 transition-colors">
                Browse Events
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-purple-600 transition-colors">
                About
              </Link>
            </nav>

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

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-white to-blue-50/20 animate-pulse"
          style={{ animationDuration: "4s" }}
        ></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">Your Campus, Simplified</h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Find and Manage All Your Campus Events in One Place. Discover events, connect with friends, and
                  navigate your campus life with our intuitive platform designed for students.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth?form=signup">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-8 py-3">
                    Get Started
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-8 py-3 bg-transparent"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="relative">
                {/* Phone mockup */}
                <div className="w-64 h-[500px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                    <div className="relative w-full h-full">
                      {carouselImages.map((image, index) => (
                        <div
                          key={index}
                          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                            index === currentSlide
                              ? "translate-x-0"
                              : index < currentSlide
                                ? "-translate-x-full"
                                : "translate-x-full"
                          }`}
                        >
                          <div className="w-full h-full flex flex-col">
                            <div className="flex-1 relative overflow-hidden">
                              <img
                                src={image.src || "/placeholder.svg"}
                                alt={image.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                              <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                              <p className="text-sm text-gray-200">{image.subtitle}</p>

                              <div className="flex items-center justify-between mt-4">
                                <div className="flex space-x-4">
                                  <div className="text-center">
                                    <div className="font-bold text-lg text-purple-300">127</div>
                                    <div className="text-xs text-gray-300">Events This Semester</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="font-bold text-lg text-purple-300">2K+</div>
                                    <div className="text-xs text-gray-300">Student Users</div>
                                  </div>
                                </div>

                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                  <QrCode className="w-10 h-10 text-white" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Carousel indicators */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {carouselImages.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                              index === currentSlide ? "bg-white" : "bg-white/40"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Removed the statistics section from here */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Features that Make a Difference</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white rounded-xl shadow-sm border-0 hover:shadow-md transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Unified Event Discovery</h3>
                <p className="text-gray-600 leading-relaxed">
                  Find all campus events in one place with personalized recommendations and smart filtering. From
                  academic seminars to social gatherings, never miss what matters to you.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-xl shadow-sm border-0 hover:shadow-md transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <QrCode className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">QR-Based Check-in</h3>
                <p className="text-gray-600 leading-relaxed">
                  Skip the lines with instant, secure QR code check-ins. Get your digital tickets and access events
                  seamlessly with military-grade security.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-xl shadow-sm border-0 hover:shadow-md transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Integrated Payments</h3>
                <p className="text-gray-600 leading-relaxed">
                  Secure, fast payments with exclusive student discounts. Your digital wallet for all campus services,
                  simplified and protected.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-xl shadow-sm border-0 hover:shadow-md transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Effortless Event Management</h3>
                <p className="text-gray-600 leading-relaxed">
                  Create, promote, and manage events with powerful organizer tools. Real-time analytics, automated
                  check-ins, and seamless attendee communication.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Students Are Saying</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-50 rounded-xl shadow-sm border-0">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "CampusHub's event discovery is incredible! The personalized recommendations helped me find study
                  groups and social events I never knew existed. I've met so many new people!"
                </p>
                <div className="flex items-center">
                  <img
                    src="/diverse-female-student-smiling.png"
                    alt="Sarah Martinez"
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Sarah Martinez</div>
                    <div className="text-sm text-gray-600">Junior, Computer Science</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 rounded-xl shadow-sm border-0">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "As an event organizer, CampusHub's management tools are game-changing. The QR check-ins and real-time
                  analytics saved us hours of manual work and gave us incredible insights."
                </p>
                <div className="flex items-center">
                  <img
                    src="/professional-male-student-coordinator.png"
                    alt="Michael Johnson"
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Michael Johnson</div>
                    <div className="text-sm text-gray-600">Student Activities Coordinator</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 rounded-xl shadow-sm border-0">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "The integrated payment system with student discounts is amazing! No more cash or juggling multiple
                  apps. Everything I need for campus life in one secure place."
                </p>
                <div className="flex items-center">
                  <img
                    src="/happy-asian-student.png"
                    alt="Emily Park"
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Emily Park</div>
                    <div className="text-sm text-gray-600">Senior, Business Administration</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Simplify Your Campus Life?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of students already using CampusHub to enhance their college experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="text-center">
              <p className="text-purple-100 text-sm mb-2">For Students</p>
              <Link href="/auth?form=signup">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 rounded-lg px-8 py-3 text-lg font-semibold"
                >
                  Explore Events
                </Button>
              </Link>
            </div>

            <div className="text-center">
              <p className="text-purple-100 text-sm mb-2">For Organizers</p>
              <Link href="/auth?form=signup">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600 rounded-lg px-8 py-3 text-lg font-semibold bg-transparent"
                >
                  Organize Your Event
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-purple-400 mb-4">CampusHub</div>
              <p className="text-gray-400 leading-relaxed mb-4">
                Empowering students to connect, discover, and thrive in their campus community through innovative
                technology.
              </p>

              <div className="space-y-2">
                <p className="text-sm text-gray-300">Stay updated with campus events</p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-l-lg border border-gray-700 focus:outline-none focus:border-purple-500"
                  />
                  <Button className="bg-purple-600 hover:bg-purple-700 rounded-l-none">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Pricing for Organizers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Student FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    API Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Campus Partnerships
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Status Page
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Press Kit
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="text-center mt-4 text-gray-400">© 2024 CampusHub. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
