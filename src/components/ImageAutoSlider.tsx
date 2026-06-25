import type React from "react";

interface ImageItem {
  src: string;
  label: string;
}

interface ImageAutoSliderProps {
  images: ImageItem[];
  reverse?: boolean;
  onImageClick: (imageIndex: number) => void;
  startIndex: number; // Offset to map back to the original index in global list
}

export function ImageAutoSlider({
  images,
  reverse = false,
  onImageClick,
  startIndex,
}: ImageAutoSliderProps) {
  // To create a seamless infinite marquee effect, we triple the array.
  const marqueeItems = [...images, ...images, ...images];

  return (
    <div className="relative w-full overflow-hidden py-2 sm:py-3 select-none">
      <div
        className={`flex gap-3 sm:gap-4 w-max ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {marqueeItems.map((item, index) => {
          const originalLocalIndex = index % images.length;
          const globalIndex = startIndex + originalLocalIndex;

          return (
            <div
              key={index}
              onClick={() => onImageClick(globalIndex)}
              className="relative w-56 sm:w-72 md:w-80 lg:w-96 aspect-[16/10] rounded-xl overflow-hidden border border-gold/15 cursor-pointer shrink-0 group shadow-lg hover:border-gold/45 transition-all duration-300"
            >
              <img
                src={item.src}
                alt={item.label}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-85 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-gold font-serif text-xs sm:text-sm md:text-base leading-tight drop-shadow-[0_2px_5px_rgba(0,0,0,0.85)]">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
