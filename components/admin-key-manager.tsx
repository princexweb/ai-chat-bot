"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ApiKey {
  id: string
  name: string
  key: string
  masked: string
  createdAt: string
  lastUsed: string | null
}

const mockKeys: ApiKey[] = [
  {
    id: "1",
    name: "OpenAI API Key",
    key: "sk_test_...",
    masked: "sk_test_***...***",
    createdAt: "2024-01-15",
    lastUsed: "2024-01-20",
  },
  {
    id: "2",
    name: "Twilio Account SID",
    key: "AC...",
    masked: "AC***...***",
    createdAt: "2024-01-10",
    lastUsed: "2024-01-20",
  },
]

export default function AdminKeyManager() {
  const [keys, setKeys] = useState<ApiKey[]>(mockKeys)
  const [showForm, setShowForm] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")
  const [newKeyValue, setNewKeyValue] = useState("")

  const handleAddKey = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newKeyName || !newKeyValue) {
      alert("Please fill in all fields")
      return
    }

    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: newKeyValue,
      masked: newKeyValue.substring(0, 5) + "***" + newKeyValue.substring(-5),
      createdAt: new Date().toISOString().split("T")[0],
      lastUsed: null,
    }

    setKeys([...keys, newKey])
    setNewKeyName("")
    setNewKeyValue("")
    setShowForm(false)
  }

  const handleDeleteKey = (id: string) => {
    if (confirm("Are you sure you want to delete this key?")) {
      setKeys(keys.filter((k) => k.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-foreground">API Keys</h2>
          <Button onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "Add Key"}</Button>
        </div>

        {showForm && (
          <form onSubmit={handleAddKey} className="mb-6 p-4 bg-input rounded-lg border border-border">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-2">Key Name</label>
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g., OpenAI Production Key"
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-2">Key Value</label>
                <textarea
                  value={newKeyValue}
                  onChange={(e) => setNewKeyValue(e.target.value)}
                  placeholder="Paste your API key here"
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground font-mono text-sm"
                  rows={3}
                />
              </div>
              <Button type="submit" className="w-full">
                Save Key
              </Button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {keys.map((key) => (
            <div key={key.id} className="p-4 bg-input rounded-lg border border-border flex justify-between items-start">
              <div className="flex-1">
                <p className="font-semibold text-foreground mb-1">{key.name}</p>
                <p className="text-sm text-muted-foreground font-mono mb-2">{key.masked}</p>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>Created: {key.createdAt}</span>
                  <span>Last used: {key.lastUsed ? key.lastUsed : "Never"}</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteKey(key.id)}
                className="text-destructive hover:text-destructive"
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-bold text-foreground mb-4">Security Tips</h3>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
          <li>Never commit API keys to version control</li>
          <li>Rotate keys every 90 days</li>
          <li>Use separate keys for production and development</li>
          <li>Monitor API usage for unusual activity</li>
          <li>Keep keys secure and never share them</li>
        </ul>
      </Card>
    </div>
  )
}
