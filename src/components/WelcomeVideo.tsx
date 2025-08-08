
import { useState } from "react";
import { Play, X } from "lucide-react";

interface WelcomeVideoProps {
  videoUrl?: string;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
}

const WelcomeVideo = ({ 
  videoUrl = "/welcome-video.mp4",
  thumbnailUrl = "/logo/logo.png",
  title = "Welcome Message from Our Secretary",
  description = "Watch our secretary's heartfelt message about Koshish Charitable Trust's mission and impact."
}: WelcomeVideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-koshish-blue mb-4">
            A Message from Our Leadership
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            {description}
          </p>
          <div className="flex justify-center">
            <span className="inline-flex items-center bg-koshish-blue text-white px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
              Featured Message
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Message Section - Left Side (2/5 of width) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100 h-full">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  <span className="text-koshish-blue">Welcome To</span>{" "}
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    Koshish
                  </span>{" "}
                  <span className="text-koshish-blue">Charitable Trust</span>
                </h3>
                <p className="text-lg md:text-xl text-gray-700 font-semibold mb-4 leading-relaxed">
                  We help poor children to get their life better.
                </p>
                <div className="w-16 h-1 bg-gradient-to-r from-koshish-blue to-orange-500 rounded-full"></div>
              </div>
              
              <div className="space-y-5">
                <div className="bg-gradient-to-r from-koshish-blue to-blue-700 rounded-xl p-5 text-white">
                  <div className="flex items-center mb-3">
                    <span className="bg-koshish-gold text-koshish-blue px-2 py-1 rounded-full font-bold text-xs mr-2">
                      Since 1997
                    </span>
                    <span className="text-xs font-medium opacity-90">27+ Years of Impact</span>
                  </div>
                  <p className="text-xs leading-relaxed opacity-95 mb-3">
                    Koshish, founded by young and devoted social activists, was registered as a charitable trust on 4th August 1997. 
                    For over two decades, we have been at the forefront of transformative social change, working tirelessly for the 
                    social, political and economic empowerment of marginalized communities.
                  </p>
                  <p className="text-xs leading-relaxed opacity-95">
                    Our comprehensive approach encompasses protection of Human Rights, gender equality initiatives, Right to Food advocacy, 
                    strengthening grassroots justice delivery systems, and promoting sustainable environment conservation practices.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                    <div className="text-xl font-bold text-koshish-blue mb-1">27+</div>
                    <div className="text-xs text-gray-600 font-medium">Years of Service</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                    <div className="text-xl font-bold text-orange-500 mb-1">∞</div>
                    <div className="text-xs text-gray-600 font-medium">Lives Transformed</div>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <h4 className="font-bold text-koshish-blue mb-2 text-base">Our Legacy of Excellence</h4>
                  <p className="text-gray-700 text-xs leading-relaxed">
                    As one of India's most respected and legendary NGOs, Koshish has established itself as a beacon of hope 
                    and positive change. Our unwavering commitment to social justice and community empowerment has earned 
                    recognition from national and international organizations.
                  </p>
                </div>
                
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-full bg-gradient-to-r from-koshish-blue to-blue-700 hover:from-blue-700 hover:to-koshish-blue text-white py-3 px-5 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Play className="w-4 h-4" fill="currentColor" />
                  Watch Our Secretary's Message
                </button>
              </div>
            </div>
          </div>

          {/* Video Section - Right Side (3/5 of width) */}
          <div className="lg:col-span-3">
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              {!isPlaying ? (
                <div className="relative group cursor-pointer" onClick={() => setIsPlaying(true)}>
                  <div className="aspect-video w-full bg-gradient-to-br from-koshish-blue to-blue-700 flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
                    <img 
                      src={thumbnailUrl}
                      alt="Koshish Charitable Trust Logo"
                      className="h-32 md:h-40 lg:h-48 w-auto object-contain opacity-90"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/20 group-hover:from-black/80 group-hover:via-black/30 group-hover:to-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-white rounded-full p-6 md:p-8 lg:p-10 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                      <Play className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-koshish-blue ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 md:p-8">
                    <h4 className="text-white text-xl md:text-2xl lg:text-3xl font-bold text-center mb-2">
                      Welcome Message from Our Secretary
                    </h4>
                    <p className="text-white/90 text-sm md:text-base text-center mb-3">
                      Click to play video message
                    </p>
                    <div className="flex justify-center">
                      <span className="bg-koshish-gold text-koshish-blue px-3 py-1 rounded-full font-medium text-sm">
                        Duration: 2-3 minutes
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-3 transition-colors duration-200 shadow-lg"
                    aria-label="Close video"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div className="aspect-video w-full bg-black min-h-[400px] lg:min-h-[500px]">
                    <video
                      src={videoUrl}
                      title="Welcome Video from Secretary"
                      className="w-full h-full object-contain"
                      controls
                      autoPlay
                      onEnded={() => setIsPlaying(false)}
                      poster={thumbnailUrl}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                    <p className="text-white text-sm text-center">
                      Message from our Secretary - Koshish Charitable Trust
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeVideo;
