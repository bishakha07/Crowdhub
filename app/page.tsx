"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground text-balance leading-tight">
              Fund Your Dreams
              <br />
              On The Blockchain
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Create campaigns, raise funds, and bring ideas to life. Fully decentralized, transparent, and secure with
              Ethereum.
            </p>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/campaigns">
              <Button size="lg" className="px-8">
                Explore Campaigns
              </Button>
            </Link>
            <Link href="/create">
              <Button size="lg" variant="secondary" className="px-8">
                Start a Campaign
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">Why CrowdHub?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-8 space-y-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-2xl">🔐</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Fully Transparent</h3>
              <p className="text-muted-foreground">
                Every transaction is recorded on the blockchain. No hidden fees, complete transparency.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 space-y-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Instant Withdrawals</h3>
              <p className="text-muted-foreground">
                Campaign owners can withdraw funds instantly once the goal is reached.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 space-y-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Automatic Refunds</h3>
              <p className="text-muted-foreground">
                If the goal isn't reached by the deadline, contributors get automatic refunds.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-12 text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Ready to Make an Impact?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of creators and supporters building the future on Web3.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/campaigns">
                <Button size="lg">Browse Campaigns</Button>
              </Link>
              <Link href="/create">
                <Button size="lg" variant="secondary">
                  Create Campaign
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
