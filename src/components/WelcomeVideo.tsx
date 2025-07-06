
import { useState } from "react";
import { Play, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WelcomeVideoProps {
  videoUrl?: string;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
}

const WelcomeVideo = ({ 
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ", 
  thumbnailUrl = "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop",
  title = "Welcome Message from Our Founder",
  description = "Watch our founder's heartfelt message about Koshish NGO's mission and impact."
}: WelcomeVideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-br from-koshish-blue/5 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">
            A Message from Our Leadership
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <Card className="max-w-4xl mx-auto overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300">
          <CardContent className="p-0 relative">
            {!isPlaying ? (
              <div className="relative group cursor-pointer" onClick={() => setIsPlaying(true)}>
                <img 
                  src={thumbnailUrl}
                  alt="Video thumbnail"
                  className="w-full h-[300px] md:h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-white rounded-full p-4 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <Play className="w-12 h-12 text-koshish-blue ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-2">{title}</h3>
                  <p className="text-white/90 text-sm md:text-base">Click to play video message</p>
                </div>
              </div>
            ) : (
              <div className="relative">
                <Button
                  onClick={() => setIsPlaying(false)}
                  className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                  size="sm"
                >
                  <X className="w-4 h-4" />
                </Button>
                <iframe
                  src={videoUrl}
                  title="Welcome Video"
                  className="w-full h-[300px] md:h-[450px]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WelcomeVideo;
