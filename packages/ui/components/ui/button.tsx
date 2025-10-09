import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '../../lib/utils';

const ButtonStyles = {
  base: cn(
    'inline-flex items-center justify-center uppercase font-display relative overflow-hidden content-none outline-none box-border',
    // Slide effect
    'after:absolute after:top-0 after:left-[-100%] after:w-full after:h-full after:-z-10',
    'after:transition-[left] after:ease-in-out after:duration-[300ms]',
    'md:hover:after:left-0 md:focus-within:after:left-0',
    'active:after:left-0',
    // Active overlay
    'active:before:absolute active:before:inset-0 active:before:z-20',
    'z-10',
  ),
  sizes: {
    lg: 'rounded-[0.75rem] px-[1.875rem] py-[1.25rem] text-sm max-w-[24.375rem] h-[3.5rem]',
    md: 'rounded-[0.5rem] px-[1.5rem] py-[1rem] text-xs max-w-[20rem] h-[3rem]',
    sm: 'rounded-[0.375rem] px-[1.5rem] py-[1rem] text-xs max-w-[15rem] h-[2rem]',
  },
  variants: {
    primary: 'bg-pink text-white after:bg-black/15 active:before:bg-black/25',
    secondary:
      'bg-white/40 text-black dark:text-white border border-grey-200 after:bg-[#aeb7cb]/30 [&>*]:relative [&>*]:z-30 active:before:bg-[#aeb7cb]/45',
    tertiary:
      'glass-effect text-white after:bg-black/40 active:before:bg-black/50',
    legacy:
      'text-black dark:text-white bg-white dark:bg-black hover:bg-grey-200 border-[1px] border-grey-200 duration-200',
    disabled:
      'bg-grey-200 text-grey-300 pointer-events-none border border-grey-100',
  },
};

const buttonVariants = cva(ButtonStyles.base, {
  variants: { variant: ButtonStyles.variants, size: ButtonStyles.sizes },
  defaultVariants: { variant: 'primary', size: 'md' },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        disabled={variant === 'disabled'}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button, ButtonStyles, buttonVariants };
