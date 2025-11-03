"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import AdminKeyManager from "@/components/admin-key-manager"
import AdminCallLogs from "@/components/admin-call-logs"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("keys")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem("admin_auth")
    if (auth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, use proper authentication (OAuth, API key, etc.)
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin"
    if (password === correctPassword) {
      setIsAuthenticated(true)
      localStorage.setItem("admin_auth", "true")
      setPassword("")
    } else {
      alert("Invalid password")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-card border-border">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground mb-6">Manage your Sun AI Chat Bot configuration</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground block mb-2">Admin Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground"
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            In production, use OAuth or proper authentication
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground">Manage Sun AI Chat Bot</p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setIsAuthenticated(false)
              localStorage.removeItem("admin_auth")
            }}
          >
            Logout
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("keys")}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === "keys"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            API Keys
          </button>
          <button
            onClick={() => setActiveTab("logs")}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === "logs"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Call Logs
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === "settings"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Settings
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "keys" && <AdminKeyManager />}
          {activeTab === "logs" && <AdminCallLogs />}
          {activeTab === "settings" && (
            <Card className="p-8 bg-card border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">System Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">Application Name</label>
                  <input
                    type="text"
                    defaultValue="Sun AI Chat Bot"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">Primary Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      defaultValue="#FF7A00"
                      className="w-12 h-10 rounded cursor-pointer border border-border"
                    />
                    <input
                      type="text"
                      defaultValue="#FF7A00"
                      className="flex-1 px-4 py-2 bg-input border border-border rounded-lg text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground block mb-2">Secondary Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      defaultValue="#004D40"
                      className="w-12 h-10 rounded cursor-pointer border border-border"
                    />
                    <input
                      type="text"
                      defaultValue="#004D40"
                      className="flex-1 px-4 py-2 bg-input border border-border rounded-lg text-foreground"
                    />
                  </div>
                </div>

                <Button className="w-full">Save Settings</Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
