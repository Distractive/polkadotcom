import logo from '@/public/polkadot-logo.png';
import Image from 'next/image';

interface Props {
  ariaLabel?: string;
  className?: string;
  width?: number;
}

export function Logo({ ariaLabel, width }: Props) {
  return (
    <Image
      src={logo}
      alt="Polkadot logo"
      width={width || 180}
      style={{ height: 'auto' }}
      role="img"
      aria-label={ariaLabel}
      priority
    />
  );
}
