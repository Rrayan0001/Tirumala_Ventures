import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        hero: "gradient-gold text-primary-foreground shadow-gold hover:brightness-110 font-semibold tracking-wide",
        heroOutline: "border border-gold/60 text-gold bg-transparent hover:bg-gold/10 font-semibold tracking-wide",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  rippleColor?: string;
  duration?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      rippleColor,
      duration = "600ms",
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const [buttonRipples, setButtonRipples] = React.useState<
      Array<{ x: number; y: number; size: number; key: number }>
    >([]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      createRipple(event);
      onClick?.(event);
    };

    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const sizeVal = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - sizeVal / 2;
      const y = event.clientY - rect.top - sizeVal / 2;

      const newRipple = { x, y, size: sizeVal, key: Date.now() };
      setButtonRipples((prevRipples) => [...prevRipples, newRipple]);
    };

    React.useEffect(() => {
      let timeout: ReturnType<typeof setTimeout> | null = null;

      if (buttonRipples.length > 0) {
        const lastRipple = buttonRipples[buttonRipples.length - 1];
        timeout = setTimeout(() => {
          setButtonRipples((prevRipples) =>
            prevRipples.filter((ripple) => ripple.key !== lastRipple.key)
          );
        }, parseInt(duration));
      }

      return () => {
        if (timeout !== null) {
          clearTimeout(timeout);
        }
      };
    }, [buttonRipples, duration]);

    // Determine default ripple color based on button variant if not explicitly provided
    const resolvedRippleColor = rippleColor || (
      variant === "hero" ? "rgba(255, 255, 255, 0.35)" :
      variant === "heroOutline" ? "rgba(212, 175, 55, 0.25)" :
      variant === "outline" || variant === "ghost" ? "rgba(212, 175, 55, 0.15)" :
      "rgba(255, 255, 255, 0.3)"
    );

    if (asChild) {
      const Comp = Slot;
      return (
        <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
          {children}
        </Comp>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
        <span className="pointer-events-none absolute inset-0 block">
          {buttonRipples.map((ripple) => (
            <span
              className="animate-rippling absolute rounded-full opacity-30"
              key={ripple.key}
              style={
                {
                  width: `${ripple.size}px`,
                  height: `${ripple.size}px`,
                  top: `${ripple.y}px`,
                  left: `${ripple.x}px`,
                  backgroundColor: resolvedRippleColor,
                  transform: `scale(0)`,
                  "--duration": duration,
                } as React.CSSProperties
              }
            />
          ))}
        </span>
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
