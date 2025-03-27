'use client';

import type { countdownTimerSelection } from '@/sanity/selections/blocks/countdown-timer';
import type { TypeFromSelection } from 'groqd';
import { useEffect, useState } from 'react';

import { Heading, cn } from '@shared/ui';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Props {
  countdownTimer: TypeFromSelection<typeof countdownTimerSelection>;
}

interface TimeUnitProps {
  value: number;
  label: string;
}

const TimeUnit = ({ value, label }: TimeUnitProps) => (
  <div className="col-span-1 flex w-full flex-col items-center justify-center">
    <div
      className={cn(
        'text-[2rem]',
        'sm:text-[3rem]',
        'md:text-[5rem]',
        'lg:text-[7rem]',
        'xl:text-[11rem]',
        'flex min-w-0  items-center rounded-lg tabular-nums text-black',
        '',
      )}
    >
      {value.toString().padStart(2, '0')}
    </div>
    <span className="md:text-normal text-nowrap font-display text-[.75rem] leading-snug text-black sm:text-sm  md:text-2xl lg:text-5xl">
      {label}
    </span>
  </div>
);

export function CountdownTimer({ countdownTimer }: Props) {
  if (!countdownTimer || !countdownTimer.targetDate) {
    return null;
  }

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!countdownTimer.targetDate) {
      return;
    }

    const calculateTimeLeft = () => {
      const difference = +new Date(countdownTimer.targetDate!) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [countdownTimer.targetDate]);

  return (
    <div className="max-width pt-12">
      <div className={cn('flex flex-col gap-copy', 'px-gutter')}>
        {countdownTimer.heading && (
          <Heading variant="h1">{countdownTimer.heading}</Heading>
        )}
      </div>

      <div className="flex w-full flex-col items-center space-y-2  px-gutter font-display">
        <div
          className={cn(
            'gap-8 md:gap-24',
            'grid  w-full grid-cols-4 md:px-gutter',
          )}
        >
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    </div>
  );
}
