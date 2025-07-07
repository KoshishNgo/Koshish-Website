
import { Card, CardContent } from "@/components/ui/card";

const BiharPoliticalMap = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">
            Our Presence in Bihar
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We work across all major districts of Bihar. Explore our efforts across the state.
          </p>
        </div>

        {/* Map Container */}
        <div className="max-w-5xl mx-auto">
          <Card className="border-2 border-gray-200 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4">
                <div className="bg-white rounded-lg shadow-inner overflow-hidden">
                  {/* Professional Bihar Map Embed */}
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683840.8274486!2d83.5!3d25.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed576a9a7b1b01%3A0x594b6e1e2e9e7e0!2sBihar%2C%20India!5e0!3m2!1sen!2sin!4v1234567890123"
                    width="100%" 
                    height="600" 
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Bihar District Map - Koshish NGO Presence"
                    className="w-full h-96 md:h-[600px] rounded-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* District Information */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-r from-koshish-blue to-blue-600 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold mb-2">38</div>
                <div className="text-sm opacity-90">Total Districts in Bihar</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-koshish-gold to-yellow-500 text-koshish-blue">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold mb-2">10+</div>
                <div className="text-sm opacity-90">Districts We Serve</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold mb-2">5000+</div>
                <div className="text-sm opacity-90">People Reached</div>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Note */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
              📍 <strong>Interactive Map:</strong> Click on any district to explore satellite view and street-level details. 
              Our main operations are centered in Patna, Gaya, Muzaffarpur, and surrounding areas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BiharPoliticalMap;
