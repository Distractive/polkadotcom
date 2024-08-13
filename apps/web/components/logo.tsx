import Image from "next/image"
import logo from "@/public/polkadot-logo-horizontal-pink-black.png"

interface Props {
  ariaLabel?: string
  className?: string
}

export function Logo({ ariaLabel }: Props) {
  return (
    <Image
      src={logo}
      alt="Polkadot logo"
      width={160}
      height={49}
      role="img"
      aria-label={ariaLabel}
      priority
    />
  )
}
