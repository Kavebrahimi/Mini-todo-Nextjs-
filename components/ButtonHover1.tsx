import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type ButtonHover1Props = React.ComponentProps<typeof Button> & {
  layerClassName?: string;
};

const ButtonHover1 = ({
  children,
  className,
  layerClassName = "before:bg-emerald-400",
  ...props
}: ButtonHover1Props) => {
  return (
    <Button
      className={cn(
        "group relative overflow-hidden rounded-sm",
        "before:absolute before:-inset-2 before:translate-y-10",
        layerClassName,
        "before:transition-transform before:duration-600 before:content-['']",
        "hover:before:-translate-y-10",
        className
      )}
      {...props}
    >
      <span className="relative z-10 inline-block transition-transform duration-500 group-hover:scale-110">
        {children}
      </span>
    </Button>
  );
};

export default ButtonHover1;
