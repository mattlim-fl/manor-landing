
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

interface ImageGalleryProps {
  images: string[];
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, className }) => {
  return (
    <div className={className}>
      <Carousel className="w-full h-full">
        <CarouselContent className="h-full">
          {images.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative h-full w-full min-h-64">
                <img 
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
};

export default ImageGallery;
