// Web3 utility functions
export function formatEther(wei: string | number): string {
  const weiNum = typeof wei === "string" ? BigInt(wei) : wei
  return (Number(weiNum) / 1e18).toFixed(4)
}

export function parseEther(eth: string): string {
  const ethNum = Number.parseFloat(eth)
  return (ethNum * 1e18).toString()
}

export function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function getTimeRemaining(deadline: number): { days: number; hours: number; minutes: number } {
  const now = Math.floor(Date.now() / 1000)
  const timeLeft = deadline - now

  if (timeLeft <= 0) return { days: 0, hours: 0, minutes: 0 }

  const days = Math.floor(timeLeft / 86400)
  const hours = Math.floor((timeLeft % 86400) / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)

  return { days, hours, minutes }
}

export function getProgressPercentage(raised: number, goal: number): number {
  if (goal === 0) return 0
  const percentage = (raised / goal) * 100
  return Math.min(percentage, 100)
}
