"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "./theme-provider"
import { Moon, Sun, Bell, Shield, User, LogOut, DollarSign } from "lucide-react"

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSignOut: () => void
}

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
]

export function SettingsDialog({ open, onOpenChange, onSignOut }: SettingsDialogProps) {
  const { theme, setTheme } = useTheme()
  const [selectedCurrency, setSelectedCurrency] = useState("USD")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`sm:max-w-md ${theme === "dark" ? "bg-black border-gray-800" : "bg-white border-gray-200"}`}
      >
        <DialogHeader>
          <DialogTitle className={theme === "dark" ? "text-white" : "text-gray-900"}>Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Theme Settings */}
          <div className="space-y-4">
            <h3
              className={`text-sm font-medium flex items-center gap-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              <Sun className="h-4 w-4" />
              Appearance
            </h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                Dark Mode
              </Label>
              <div className="flex items-center gap-2">
                <Sun className={`h-4 w-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
                <Switch
                  id="dark-mode"
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
                <Moon className={`h-4 w-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
              </div>
            </div>
          </div>

          <Separator className={theme === "dark" ? "bg-gray-700" : "bg-gray-200"} />

          {/* Currency Settings */}
          <div className="space-y-4">
            <h3
              className={`text-sm font-medium flex items-center gap-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              <DollarSign className="h-4 w-4" />
              Currency
            </h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="currency" className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                Display Currency
              </Label>
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger
                  className={`w-32 ${theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  className={theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
                >
                  {currencies.map((currency) => (
                    <SelectItem
                      key={currency.code}
                      value={currency.code}
                      className={theme === "dark" ? "text-white hover:bg-gray-700" : "text-gray-900 hover:bg-gray-100"}
                    >
                      {currency.symbol} {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className={theme === "dark" ? "bg-gray-700" : "bg-gray-200"} />

          {/* Notification Settings */}
          <div className="space-y-4">
            <h3
              className={`text-sm font-medium flex items-center gap-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              <Bell className="h-4 w-4" />
              Notifications
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications" className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                  Email Notifications
                </Label>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications" className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                  Push Notifications
                </Label>
                <Switch id="push-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="portfolio-alerts" className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                  Portfolio Alerts
                </Label>
                <Switch id="portfolio-alerts" defaultChecked />
              </div>
            </div>
          </div>

          <Separator className={theme === "dark" ? "bg-gray-700" : "bg-gray-200"} />

          {/* Privacy Settings */}
          <div className="space-y-4">
            <h3
              className={`text-sm font-medium flex items-center gap-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              <Shield className="h-4 w-4" />
              Privacy
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="data-sharing" className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                  Data Sharing
                </Label>
                <Switch id="data-sharing" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="analytics" className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                  Analytics
                </Label>
                <Switch id="analytics" defaultChecked />
              </div>
            </div>
          </div>

          <Separator className={theme === "dark" ? "bg-gray-700" : "bg-gray-200"} />

          {/* Account Actions */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className={`w-full ${theme === "dark" ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}
            >
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button
              onClick={onSignOut}
              variant="outline"
              className="w-full border-red-700 text-red-400 hover:bg-red-900/20"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
