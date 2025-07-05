import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectValue, SelectTrigger, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Heart, Shield, Users, Star } from "lucide-react";

const Donate = () => {
  const [donationAmount, setDonationAmount] = useState("500");
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState("one-time");
  const [cause, setCause] = useState("general");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    panCard: ""
  });

  const predefinedAmounts = [
    { value: "100", label: "₹100", description: "Provides school supplies for 1 child" },
    { value: "250", label: "₹250", description: "Feeds a family for a week" },
    { value: "500", label: "₹500", description: "Supports a woman's skill training" },
    { value: "1000", label: "₹1000", description: "Provides legal aid for 1 case" },
  ];

  const causes = [
    { value: "general", label: "Where needed most", icon: Heart },
    { value: "education", label: "Education Support", icon: Users },
    { value: "women", label: "Women Empowerment", icon: Star },
    { value: "legal", label: "Legal Aid", icon: Shield },
  ];

  const handleDonate = () => {
    const amount = donationAmount === "custom" ? customAmount : donationAmount;
    
    if (!amount || !donorInfo.name || !donorInfo.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate payment processing
    toast.success("Thank you for your donation! Redirecting to payment gateway...");
    
    console.log("Donation details:", {
      amount,
      frequency,
      cause,
      donorInfo
    });
  };

  return (
    <div className="min-h-screen font-poppins">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-koshish-blue to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Make a Donation</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            Your generosity can transform lives and create lasting change in vulnerable communities.
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-koshish-light-blue p-6 rounded-lg">
              <div className="text-3xl font-bold text-koshish-blue">₹100</div>
              <div className="text-gray-600 mt-2">Provides books for 2 children</div>
            </div>
            <div className="bg-koshish-light-blue p-6 rounded-lg">
              <div className="text-3xl font-bold text-koshish-blue">₹500</div>
              <div className="text-gray-600 mt-2">Skill training for 1 woman</div>
            </div>
            <div className="bg-koshish-light-blue p-6 rounded-lg">
              <div className="text-3xl font-bold text-koshish-blue">₹1000</div>
              <div className="text-gray-600 mt-2">Legal aid for 1 family</div>
            </div>
            <div className="bg-koshish-light-blue p-6 rounded-lg">
              <div className="text-3xl font-bold text-koshish-blue">₹2500</div>
              <div className="text-gray-600 mt-2">Emergency relief kit</div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-koshish-blue mb-8 text-center">Complete Your Donation</h2>
              
              {/* Amount Selection */}
              <div className="mb-8">
                <Label className="text-lg font-semibold text-koshish-blue mb-4 block">Choose Amount</Label>
                <RadioGroup value={donationAmount} onValueChange={setDonationAmount} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {predefinedAmounts.map((amount) => (
                    <div key={amount.value} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-koshish-light-blue transition-colors">
                      <RadioGroupItem value={amount.value} id={amount.value} />
                      <div className="flex-1">
                        <label htmlFor={amount.value} className="cursor-pointer">
                          <div className="font-semibold text-koshish-blue">{amount.label}</div>
                          <div className="text-sm text-gray-600">{amount.description}</div>
                        </label>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-koshish-light-blue transition-colors">
                    <RadioGroupItem value="custom" id="custom" />
                    <div className="flex-1">
                      <label htmlFor="custom" className="cursor-pointer font-semibold text-koshish-blue mb-2 block">
                        Custom Amount
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full"
                        disabled={donationAmount !== "custom"}
                      />
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Frequency */}
              <div className="mb-8">
                <Label className="text-lg font-semibold text-koshish-blue mb-4 block">Donation Frequency</Label>
                <RadioGroup value={frequency} onValueChange={setFrequency} className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="one-time" id="one-time" />
                    <label htmlFor="one-time" className="cursor-pointer">One-time</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <label htmlFor="monthly" className="cursor-pointer">Monthly</label>
                  </div>
                </RadioGroup>
              </div>

              {/* Cause Selection */}
              <div className="mb-8">
                <Label className="text-lg font-semibold text-koshish-blue mb-4 block">Choose a Cause</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {causes.map((causeOption) => (
                    <div 
                      key={causeOption.value} 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        cause === causeOption.value ? 'bg-koshish-light-blue border-koshish-blue' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setCause(causeOption.value)}
                    >
                      <div className="flex items-center space-x-3">
                        <causeOption.icon className="w-6 h-6 text-koshish-blue" />
                        <span className="font-medium">{causeOption.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Donor Information */}
              <div className="mb-8">
                <Label className="text-lg font-semibold text-koshish-blue mb-4 block">Donor Information</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={donorInfo.name}
                      onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={donorInfo.email}
                      onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={donorInfo.phone}
                      onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pan">PAN Card (for 80G receipt)</Label>
                    <Input
                      id="pan"
                      value={donorInfo.panCard}
                      onChange={(e) => setDonorInfo({...donorInfo, panCard: e.target.value})}
                      placeholder="Optional"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={donorInfo.address}
                    onChange={(e) => setDonorInfo({...donorInfo, address: e.target.value})}
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="mb-8">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to receive updates about Koshish NGO's work and impact stories
                  </label>
                </div>
              </div>

              {/* Donation Summary */}
              <div className="bg-koshish-light-blue p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold text-koshish-blue mb-4">Donation Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-semibold">₹{donationAmount === "custom" ? customAmount : donationAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frequency:</span>
                    <span className="font-semibold capitalize">{frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cause:</span>
                    <span className="font-semibold">{causes.find(c => c.value === cause)?.label}</span>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <Button 
                onClick={handleDonate}
                className="w-full bg-koshish-gold text-koshish-blue hover:bg-yellow-400 font-semibold text-lg py-4"
                size="lg"
              >
                Proceed to Payment
              </Button>

              {/* Security Notice */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  🔒 Your donation is secure and encrypted. All donations are eligible for 80G tax benefits.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Other Ways to Help */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-koshish-blue mb-4">Other Ways to Help</h2>
            <p className="text-xl text-gray-600">Your support can take many forms</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Users className="w-16 h-16 text-koshish-blue mx-auto mb-4" />
                <h3 className="text-xl font-bold text-koshish-blue mb-4">Volunteer</h3>
                <p className="text-gray-600 mb-4">Join our team of dedicated volunteers and make a direct impact</p>
                <Button variant="outline" className="border-koshish-blue text-koshish-blue hover:bg-koshish-blue hover:text-white">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Heart className="w-16 h-16 text-koshish-blue mx-auto mb-4" />
                <h3 className="text-xl font-bold text-koshish-blue mb-4">Corporate Partnership</h3>
                <p className="text-gray-600 mb-4">Partner with us for CSR initiatives and employee engagement</p>
                <Button variant="outline" className="border-koshish-blue text-koshish-blue hover:bg-koshish-blue hover:text-white">
                  Contact Us
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Star className="w-16 h-16 text-koshish-blue mx-auto mb-4" />
                <h3 className="text-xl font-bold text-koshish-blue mb-4">Spread Awareness</h3>
                <p className="text-gray-600 mb-4">Share our mission with your network and help us reach more people</p>
                <Button variant="outline" className="border-koshish-blue text-koshish-blue hover:bg-koshish-blue hover:text-white">
                  Share Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donate;
