import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '../../lib/utils';

// const ButtonStyles = {
//   base: cn(
//     'inline-flex items-center justify-center gap-2 uppercase font-display relative overflow-hidden content-none outline-none box-border',
//     'after:absolute after:inset-0 after:-z-10',
//     'after:w-[200%] after:transition-transform after:ease-in-out after:duration-300 after:translate-x-[-200%]',
//     'md:hover:after:translate-x-0 md:focus-within:after:translate-x-0',
//     'active:after:translate-x-0',
//     'z-10',
//   ),
//   sizes: {
//     lg: 'rounded-[0.75rem] px-[1.875rem] py-[1.25rem] text-sm max-w-[24.375rem] h-[3.5rem]',
//     md: 'rounded-[0.5rem] px-[1.5rem] py-[1rem] text-xs max-w-[20rem] h-[3rem]',
//     sm: 'rounded-[0.375rem] px-[1.5rem] py-[1rem] text-xs max-w-[15rem] h-[2rem]',
//   },
//   variants: {
//     primary:
//       'bg-pink text-white after:bg-black/25 active:before:absolute active:before:inset-0 active:before:bg-black/25 active:before:z-10',
//     secondary:
//       'bg-white/40 text-black border border-gray-200 after:bg-gray-300 active:before:absolute active:before:inset-0 active:before:bg-gray-400 active:before:z-10',
//     tertiary: 'bg-white text-black border border-gray-200 after:bg-gray-300',
//     disabled:
//       'bg-gray-200 text-gray-300 pointer-events-none border border-gray-100',
//   },
// };

const ButtonStyles = {
  base: cn(
    'inline-flex items-center justify-center  uppercase font-display relative overflow-hidden content-none outline-none box-border',
    'relative overflow-hidden',
    // Slide effect
    'before:absolute before:inset-0 before:-z-10',
    'before:w-[200%] before:transition-transform before:ease-in-out before:duration-300 before:translate-x-[-200%]',
    'md:hover:before:translate-x-0 md:focus-within:before:translate-x-0',
    'active:before:translate-x-0',
    // Active overlay
    'active:after:absolute active:after:inset-0 active:after:z-20',
    'z-10',
  ),
  sizes: {
    lg: 'rounded-[0.75rem] px-[1.875rem] py-[1.25rem] text-sm max-w-[24.375rem] h-[3.5rem]',
    md: 'rounded-[0.5rem] px-[1.5rem] py-[1rem] text-xs max-w-[20rem] h-[3rem]',
    sm: 'rounded-[0.375rem] px-[1.5rem] py-[1rem] text-xs max-w-[15rem] h-[2rem]',
  },
  variants: {
    primary: 'bg-pink text-white before:bg-black/15 active:after:bg-black/25',
    secondary:
      'bg-white/40 text-black border border-grey-200 before:bg-[#aeb7cb]/30 [&>*]:relative [&>*]:z-30 active:after:bg-[#aeb7cb]/45',
    tertiary:
      'glass-effect text-white before:bg-black/40 active:after:bg-black/50',
    legacy:
      'text-black bg-white hover:bg-grey-200 border-[1px] border-grey-200 duration-200',
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
