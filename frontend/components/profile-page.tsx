"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "./theme-provider"
import {
  ArrowLeft,
  Edit,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  DollarSign,
  Star,
  Award,
} from "lucide-react"

interface ProfilePageProps {
  onBack: () => void
  userEmail: string
}

export function ProfilePage({ onBack, userEmail }: ProfilePageProps) {
  const { theme } = useTheme()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: userEmail,
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Sustainable investment enthusiast with 10+ years of experience in ESG portfolio management.",
    joinDate: "January 2024",
    plan: "Premium",
    investmentStyle: "Conservative ESG",
    riskTolerance: "Medium",
  })

  const stats = [
    { label: "Portfolio Value", value: "$125,000", icon: DollarSign, color: "text-green-400" },
    { label: "Total Return", value: "+25.3%", icon: TrendingUp, color: "text-green-400" },
    { label: "ESG Score", value: "84.2", icon: Star, color: "text-yellow-400" },
    { label: "Holdings", value: "12", icon: Award, color: "text-blue-400" },
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
  }

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className={`space-y-6 ${theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className={
            theme === "dark"
              ? "text-gray-400 hover:text-white hover:bg-gray-800"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
          }
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Profile Header */}
      <Card className={theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar Section */}
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src="/placeholder.svg?height=128&width=128" />
                <AvatarFallback className="bg-green-600 text-white text-2xl">
                  {profileData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-green-600 hover:bg-green-700"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  {isEditing ? (
                    <Input
                      value={profileData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={`text-2xl font-bold mb-2 ${theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                    />
                  ) : (
                    <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {profileData.name}
                    </h1>
                  )}
                  <div className="flex items-center gap-4 mt-2">
                    <Badge className="bg-green-600 text-white">{profileData.plan}</Badge>
                    <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      Member since {profileData.joinDate}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  className={isEditing ? "bg-green-600 hover:bg-green-700" : ""}
                  variant={isEditing ? "default" : "outline"}
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className={`h-4 w-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
                  {isEditing ? (
                    <Input
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }
                    />
                  ) : (
                    <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>{profileData.email}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Phone className={`h-4 w-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
                  {isEditing ? (
                    <Input
                      value={profileData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }
                    />
                  ) : (
                    <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>{profileData.phone}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className={`h-4 w-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
                  {isEditing ? (
                    <Input
                      value={profileData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className={
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }
                    />
                  ) : (
                    <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>{profileData.location}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className={`h-4 w-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
                  <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                    Joined {profileData.joinDate}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <div>
                <Label className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  Bio
                </Label>
                {isEditing ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    rows={3}
                    className={`w-full mt-1 p-3 rounded-md border ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                ) : (
                  <p className={`mt-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{profileData.bio}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className={theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</p>
                    <p className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {stat.value}
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Investment Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}>
          <CardHeader>
            <CardTitle className={theme === "dark" ? "text-white" : "text-gray-900"}>Investment Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Investment Style
              </Label>
              <p className={`mt-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                {profileData.investmentStyle}
              </p>
            </div>
            <Separator className={theme === "dark" ? "bg-gray-700" : "bg-gray-200"} />
            <div>
              <Label className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Risk Tolerance
              </Label>
              <p className={`mt-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                {profileData.riskTolerance}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className={theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}>
          <CardHeader>
            <CardTitle className={theme === "dark" ? "text-white" : "text-gray-900"}>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>Two-Factor Authentication</span>
              <Badge className="bg-green-600 text-white">Enabled</Badge>
            </div>
            <Separator className={theme === "dark" ? "bg-gray-700" : "bg-gray-200"} />
            <div className="flex items-center justify-between">
              <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>Email Notifications</span>
              <Badge className="bg-blue-600 text-white">Active</Badge>
            </div>
            <Separator className={theme === "dark" ? "bg-gray-700" : "bg-gray-200"} />
            <div className="flex items-center justify-between">
              <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>Data Export</span>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
