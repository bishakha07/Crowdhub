"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { CampaignCard } from "@/components/campaign-card"

interface Campaign {
  id: number
  title: string
  description: string
  goal: number
  amountRaised: number
  deadline: number
  owner: string
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCampaigns = async () => {
      if (typeof window !== "undefined" && (window as any).ethereum) {
        try {
          const provider = (window as any).ethereum
          // For demo, we'll show mock campaigns
          // In production, you'd interact with the smart contract here
          setCampaigns([
            {
              id: 1,
              title: "AI-Powered Health Tracking",
              description: "Revolutionary wearable device using AI to predict health issues",
              goal: 50,
              amountRaised: 35.5,
              deadline: Math.floor(Date.now() / 1000) + 86400 * 15,
              owner: "0x742d35Cc6634C0532925a3b844Bc9e7595f1bEb",
            },
            {
              id: 2,
              title: "Open-Source Education Platform",
              description: "Free learning platform for underprivileged students",
              goal: 25,
              amountRaised: 18.2,
              deadline: Math.floor(Date.now() / 1000) + 86400 * 8,
              owner: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
            },
            {
              id: 3,
              title: "Sustainable Water Filtration",
              description: "Eco-friendly water purification system for rural areas",
              goal: 100,
              amountRaised: 75.8,
              deadline: Math.floor(Date.now() / 1000) + 86400 * 30,
              owner: "0x9Ba2D8Cb96A0Eb1a3c1ce4c2F6d9e8fE5aD6b7c8",
            },
            {
              id: 4,
              title: "Mental Health App",
              description: "AI-powered mental health support and counseling",
              goal: 40,
              amountRaised: 32.1,
              deadline: Math.floor(Date.now() / 1000) + 86400 * 20,
              owner: "0xaBcD1234567890eFg1234567890aBcD1234567",
            },
          ])
        } catch (error) {
          console.error("Error loading campaigns:", error)
        }
      }
      setLoading(false)
    }

    loadCampaigns()
  }, [])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Discover Campaigns</h1>
            <p className="text-lg text-muted-foreground">
              Support innovative projects and ideas from creators worldwide.
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-lg h-64" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <CampaignCard key={campaign.id} {...campaign} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
