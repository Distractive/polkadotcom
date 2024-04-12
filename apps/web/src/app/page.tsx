import Image from "next/image"

import { Button } from "@shared/ui"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>POLKADOT WEB</h1>
      <Button variant="brand">Primary</Button>
    </main>
  )
}
