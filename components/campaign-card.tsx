"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getProgressPercentage, getTimeRemaining, formatEther } from "@/lib/web3"

interface CampaignCardProps {
  id: number
  title: string
  description: string
  goal: number
  amountRaised: number
  deadline: number
  owner: string
}

export function CampaignCard({ id, title, description, goal, amountRaised, deadline, owner }: CampaignCardProps) {
  const progress = getProgressPercentage(amountRaised, goal)
  const timeLeft = getTimeRemaining(deadline)
  const isEnded = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{formatEther(amountRaised)} ETH</span>
            <span className="text-muted-foreground">{formatEther(goal)} ETH</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">{progress.toFixed(0)}% funded</p>
        </div>

        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>
            {isEnded ? (
              <span className="text-destructive font-medium">Campaign Ended</span>
            ) : (
              <span>
                {timeLeft.days}d {timeLeft.hours}h remaining
              </span>
            )}
          </span>
        </div>

        <Link href={`/campaign/${id}`}>
          <Button className="w-full">View Campaign</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
