"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const handleConnect = async () => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        })
        setWalletAddress(accounts[0])
        setIsConnected(true)
      } catch (error) {
        console.error("Failed to connect wallet:", error)
      }
    } else {
      alert("Please install MetaMask to use this dApp")
    }
  }

  return (
    <nav className="fixed top-0 w-full border-b border-border bg-background/95 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">CH</span>
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">CrowdHub</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/campaigns">
              <Button variant="ghost">Discover</Button>
            </Link>
            <Link href="/create">
              <Button variant="ghost">Create</Button>
            </Link>

            {isConnected ? (
              <Button disabled variant="secondary">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </Button>
            ) : (
              <Button onClick={handleConnect}>Connect Wallet</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
