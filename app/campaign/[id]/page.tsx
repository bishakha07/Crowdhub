"use client"

import type React from "react"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getProgressPercentage, getTimeRemaining, formatEther, truncateAddress } from "@/lib/web3"

export default function CampaignDetailPage() {
  const params = useParams()
  const campaignId = params.id as string
  const [contributionAmount, setContributionAmount] = useState("")
  const [loading, setLoading] = useState(false)

  // Mock campaign data
  const campaign = {
    id: Number.parseInt(campaignId),
    title: "AI-Powered Health Tracking",
    description:
      "Revolutionary wearable device using AI to predict health issues before they become serious. Our team has been researching for 3 years and we are ready to launch the prototype.",
    goal: 50,
    amountRaised: 35.5,
    deadline: Math.floor(Date.now() / 1000) + 86400 * 15,
    owner: "0x742d35Cc6634C0532925a3b844Bc9e7595f1bEb",
    contributors: 156,
  }

  const progress = getProgressPercentage(campaign.amountRaised, campaign.goal)
  const timeLeft = getTimeRemaining(campaign.deadline)

  const handleContribute = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!contributionAmount || Number.parseFloat(contributionAmount) <= 0) {
        alert("Please enter a valid amount")
        return
      }

      alert(`Successfully contributed ${contributionAmount} ETH to the campaign!`)
      setContributionAmount("")
    } catch (error) {
      console.error("Error contributing:", error)
      alert("Failed to contribute")
    } finally {
      setLoading(false)
    }
  }

  const isEnded = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-4">{campaign.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>By {truncateAddress(campaign.owner)}</span>
                  <span>·</span>
                  <span>{campaign.contributors} contributors</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-8 border border-primary/20">
                <p className="text-lg text-foreground leading-relaxed">{campaign.description}</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Funding Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-bold text-lg">{formatEther(campaign.amountRaised)} ETH</span>
                      <span className="text-muted-foreground">of {formatEther(campaign.goal)} ETH goal</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {progress.toFixed(0)}% funded · {campaign.contributors} supporters
                    </p>
                  </div>

                  <div className="border-t border-border pt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground font-medium">
                        {isEnded ? (
                          <span className="text-destructive">Campaign Ended</span>
                        ) : (
                          <span>
                            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m remaining
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Contribute Now</CardTitle>
                  <CardDescription>Support this campaign by sending ETH</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContribute} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Amount (ETH)</label>
                      <Input
                        type="number"
                        placeholder="0.5"
                        step="0.01"
                        min="0"
                        value={contributionAmount}
                        onChange={(e) => setContributionAmount(e.target.value)}
                        disabled={isEnded}
                      />
                    </div>

                    {!isEnded ? (
                      <Button type="submit" size="lg" className="w-full" disabled={loading || !contributionAmount}>
                        {loading ? "Contributing..." : "Contribute"}
                      </Button>
                    ) : (
                      <Button size="lg" className="w-full" disabled>
                        Campaign Ended
                      </Button>
                    )}
                  </form>

                  {progress < 100 && !isEnded && (
                    <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                      <p className="text-xs text-foreground">
                        If the goal isn't reached by the deadline, all contributions will be automatically refunded.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
