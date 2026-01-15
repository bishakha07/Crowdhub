"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function CreateCampaignPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    durationInDays: "30",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const goalAmount = Number.parseFloat(formData.goal) || 0
  const collectedAmount = 0 // Mock data - in production this would come from blockchain
  const remainingAmount = Math.max(goalAmount - collectedAmount, 0)
  const progressPercentage = goalAmount > 0 ? (collectedAmount / goalAmount) * 100 : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        alert("Campaign created successfully! Campaign ID: " + Math.floor(Math.random() * 1000))
        setFormData({ title: "", description: "", goal: "", durationInDays: "30" })
        setTimeout(() => router.push("/campaigns"), 1500)
      } catch (error) {
        console.error("Error creating campaign:", error)
        alert("Failed to create campaign")
      } finally {
        setLoading(false)
      }
    } else {
      alert("Please connect your MetaMask wallet first")
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Start Your Campaign</CardTitle>
              <CardDescription>Create a campaign to raise funds for your project on the blockchain</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Campaign Title</label>
                  <Input
                    type="text"
                    name="title"
                    placeholder="e.g., AI-Powered Health Tracker"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <textarea
                    name="description"
                    placeholder="Describe your project, goals, and why it matters..."
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Funding Goal (ETH)</label>
                    <Input
                      type="number"
                      name="goal"
                      placeholder="e.g., 50"
                      step="0.1"
                      min="0"
                      value={formData.goal}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Campaign Duration (Days)</label>
                    <Input
                      type="number"
                      name="durationInDays"
                      placeholder="e.g., 30"
                      min="1"
                      max="365"
                      value={formData.durationInDays}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {goalAmount > 0 && (
                  <div className="bg-accent/10 rounded-lg p-4 space-y-3">
                    <h3 className="font-semibold text-foreground">Campaign Progress Preview</h3>

                    {/* Progress bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-foreground">{progressPercentage.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-accent h-full rounded-full transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Fund status grid */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-background rounded p-3">
                        <div className="text-xs text-muted-foreground mb-1">Collected</div>
                        <div className="font-semibold text-foreground">{collectedAmount} ETH</div>
                      </div>
                      <div className="bg-background rounded p-3">
                        <div className="text-xs text-muted-foreground mb-1">Goal</div>
                        <div className="font-semibold text-foreground">{goalAmount} ETH</div>
                      </div>
                      <div className="bg-background rounded p-3">
                        <div className="text-xs text-muted-foreground mb-1">Still Needed</div>
                        <div className="font-semibold text-foreground">{remainingAmount.toFixed(2)} ETH</div>
                      </div>
                    </div>
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? "Creating Campaign..." : "Create Campaign"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
