import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '../../lib/utils';

const ButtonStyles = {
  base: cn(
    'inline-flex items-center justify-center gap-2 uppercase font-display relative overflow-hidden content-none outline-none ',
    'before:absolute before:inset-0 before:-z-20 before:bg-black',
    'after:absolute after:-inset-0 after:-z-10 after:bg-gradient-to-r',
    'after:w-[200%] after:transition-transform after:ease-in-out after:duration-300 after:translate-x-[-200%]',
    'md:hover:after:translate-x-0 md:focus-within:after:translate-x-0',
    'z-10',
  ),
  sizes: {
    lg: 'rounded-xl px-[1.875rem] py-5 text-sm max-w-[24.375rem]',
    md: 'rounded-lg px-8 py-4 text-xs max-w-[20rem]',
    sm: 'rounded-md px-4 py-2 text-xs max-w-[15rem]',
  },
  variants: {
    primary: 'text-white after:from-pink after:via-pink after:to-black',
    secondary:
      'text-black before:bg-white after:from-grey-200 after:via-grey-200 after-to:grey-200 border-[1px] border-grey-200',
    tertiary:
      'text-black before:bg-white after:from-grey-200 after:via-grey-200 after:to-grey-200 border-[1px] border-grey-200 after:translate-x-[0%] after:w-[100%]',
    disabled:
      'bg-grey-200 text-grey-300 pointer-events-none border-[1px] border-grey-100 before:bg-grey-200',
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
