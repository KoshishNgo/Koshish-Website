import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  description: string;
}

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const slides: CarouselSlide[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      title: "Empowering Communities",
      description: "Building hope and transforming lives through education and healthcare initiatives"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      title: "Education for All",
      description: "Providing quality education to underprivileged children across rural communities"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      title: "Healthcare Access",
      description: "Bringing essential medical care and health awareness to marginalized communities"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000); // Resume auto-play after 3 seconds
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      {/* Slides Container */}
      <div 
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="relative w-full h-full flex-shrink-0"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center text-white px-4 max-w-4xl mx-auto">
                <h1 
                  className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-4 transition-all duration-1000 ${
                    index === currentSlide 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  {slide.title}
                </h1>
                <p 
                  className={`text-lg md:text-xl lg:text-2xl text-gray-200 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
                    index === currentSlide 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  {slide.description}
                </p>
                
                {/* Call to Action Buttons */}
                <div 
                  className={`flex flex-col sm:flex-row gap-4 justify-center mt-8 transition-all duration-1000 delay-500 ${
                    index === currentSlide 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  <a 
                    href="/donate" 
                    className="bg-koshish-gold text-koshish-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition-colors duration-300 transform hover:scale-105"
                  >
                    Donate Now
                  </a>
                  <a 
                    href="/volunteer" 
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-koshish-blue transition-colors duration-300 transform hover:scale-105"
                  >
                    Join Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={previousSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-20 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-20 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20 z-20">
        <div 
          className="h-full bg-koshish-gold transition-all duration-300"
          style={{ 
            width: `${((currentSlide + 1) / slides.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
};

export default HeroCarousel;
