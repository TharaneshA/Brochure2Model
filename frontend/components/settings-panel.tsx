"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, User, Monitor, Palette, Volume2, Shield, Download, Upload, RotateCcw } from "lucide-react"

interface SettingsPanelProps {
  onBack: () => void
}

export function SettingsPanel({ onBack }: SettingsPanelProps) {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@company.com",
    company: "Tech Solutions Inc.",
  })

  const [preferences, setPreferences] = useState({
    autoRotate: true,
    showGrid: false,
    enableSound: true,
    quality: "high",
    theme: "dark",
    language: "en",
  })

  return (
    <div className="w-full h-screen bg-[#111827] overflow-auto">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Visualizer
          </Button>
          <h1 className="text-3xl font-bold text-white font-['Inter']">Settings</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Settings */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 font-['Inter']">
                <User className="h-5 w-5" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback className="bg-blue-600 text-white text-xl">JD</AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300 font-['Inter']">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white font-['Inter']"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300 font-['Inter']">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white font-['Inter']"
                  />
                </div>
                <div>
                  <Label htmlFor="company" className="text-gray-300 font-['Inter']">
                    Company
                  </Label>
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white font-['Inter']"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3D Viewer Settings */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 font-['Inter']">
                <Monitor className="h-5 w-5" />
                3D Viewer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-rotate" className="text-gray-300 font-['Inter']">
                  Auto Rotate Model
                </Label>
                <Switch
                  id="auto-rotate"
                  checked={preferences.autoRotate}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, autoRotate: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="show-grid" className="text-gray-300 font-['Inter']">
                  Show Grid
                </Label>
                <Switch
                  id="show-grid"
                  checked={preferences.showGrid}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, showGrid: checked })}
                />
              </div>

              <div>
                <Label htmlFor="quality" className="text-gray-300 font-['Inter']">
                  Render Quality
                </Label>
                <Select
                  value={preferences.quality}
                  onValueChange={(value) => setPreferences({ ...preferences, quality: value })}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white font-['Inter']">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="low" className="text-white font-['Inter']">
                      Low (Better Performance)
                    </SelectItem>
                    <SelectItem value="medium" className="text-white font-['Inter']">
                      Medium
                    </SelectItem>
                    <SelectItem value="high" className="text-white font-['Inter']">
                      High (Better Quality)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 font-['Inter'] bg-transparent"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Camera Position
              </Button>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 font-['Inter']">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="theme" className="text-gray-300 font-['Inter']">
                  Theme
                </Label>
                <Select
                  value={preferences.theme}
                  onValueChange={(value) => setPreferences({ ...preferences, theme: value })}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white font-['Inter']">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="dark" className="text-white font-['Inter']">
                      Dark
                    </SelectItem>
                    <SelectItem value="light" className="text-white font-['Inter']">
                      Light
                    </SelectItem>
                    <SelectItem value="auto" className="text-white font-['Inter']">
                      Auto
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="language" className="text-gray-300 font-['Inter']">
                  Language
                </Label>
                <Select
                  value={preferences.language}
                  onValueChange={(value) => setPreferences({ ...preferences, language: value })}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white font-['Inter']">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="en" className="text-white font-['Inter']">
                      English
                    </SelectItem>
                    <SelectItem value="es" className="text-white font-['Inter']">
                      Spanish
                    </SelectItem>
                    <SelectItem value="fr" className="text-white font-['Inter']">
                      French
                    </SelectItem>
                    <SelectItem value="de" className="text-white font-['Inter']">
                      German
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="enable-sound" className="text-gray-300 font-['Inter']">
                  <Volume2 className="h-4 w-4 inline mr-2" />
                  Enable Sound Effects
                </Label>
                <Switch
                  id="enable-sound"
                  checked={preferences.enableSound}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, enableSound: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data & Privacy */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 font-['Inter']">
                <Shield className="h-5 w-5" />
                Data & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 font-['Inter'] bg-transparent"
              >
                <Download className="h-4 w-4 mr-2" />
                Export My Data
              </Button>

              <Button
                variant="outline"
                className="w-full border-red-600 text-red-400 hover:bg-red-900/20 font-['Inter'] bg-transparent"
              >
                Clear All Data
              </Button>

              <Separator className="bg-gray-600" />

              <div className="text-xs text-gray-400 space-y-2 font-['Inter']">
                <p>• Your 3D models and documents are processed locally</p>
                <p>• No data is shared with third parties</p>
                <p>• Session data is cleared when you close the app</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <Button className="bg-blue-600 hover:bg-blue-700 font-['Inter']">Save Changes</Button>
        </div>
      </div>
    </div>
  )
}
