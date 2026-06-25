import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
}

export function TextReveal({ text, className }: TextRevealProps) {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className={cn(
        "relative inline-block overflow-hidden whitespace-nowrap cursor-pointer select-none",
        className
      )}
    >
      <div className="block">
        {text.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: 0.35,
              ease: [0.215, 0.61, 0.355, 1],
              delay: 0.02 * i,
            }}
            className="inline-block"
            key={i}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0 block">
        {text.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: 0.35,
              ease: [0.215, 0.61, 0.355, 1],
              delay: 0.02 * i,
            }}
            className="inline-block"
            key={i}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
