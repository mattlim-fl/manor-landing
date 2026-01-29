import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  alt?: string;
  className?: string;
}

const ImageCarousel = ({ images, alt = "Venue image", className = "" }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) return null;

  return (
    <div className={`relative w-full ${className}`}>
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={images[currentIndex]}
          alt={`${alt} ${currentIndex + 1}`}
          className="w-full h-64 md:h-80 lg:h-96 object-cover transition-opacity duration-300"
        />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 bg-manor-coral"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} className="text-manor-brown" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 bg-manor-coral"
            aria-label="Next image"
          >
            <ChevronRight size={20} className="text-manor-brown" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-4 bg-manor-coral'
                  : 'w-2 bg-manor-gold opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
