import { useState } from "react";
import { Helmet } from "react-helmet-async";
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
import { Heart, Shield, Users, Star, CreditCard, Building, FileText, Copy, CheckCircle } from "lucide-react";
import { processPayment, getPaymentMethods, getBankDetails } from "@/services/paymentService";

const Donate = () => {
  const [donationAmount, setDonationAmount] = useState("500");
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState("one-time");
  const [cause, setCause] = useState("general");
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);
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

  const paymentMethods = getPaymentMethods();
  const bankDetails = getBankDetails();

  const handleDonate = async () => {
    const amount = donationAmount === "custom" ? customAmount : donationAmount;
    
    if (!amount || !donorInfo.name || !donorInfo.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (parseInt(amount) < 10) {
      toast.error("Minimum donation amount is ₹10");
      return;
    }

    setIsProcessing(true);

    try {
      if (paymentMethod === "razorpay") {
        const donationData = {
          amount,
          frequency,
          cause,
          donorInfo
        };

        const result = await processPayment(donationData);
        
        if (result.success) {
          toast.success("Thank you for your donation! Payment successful.");
          // You can save the payment details to your database here
          console.log("Payment successful:", result);
          
          // Reset form or redirect to success page
          // resetForm();
        } else {
          toast.error(result.error || "Payment failed. Please try again.");
        }
      } else if (paymentMethod === "bank_transfer") {
        setShowBankDetails(true);
        toast.info("Bank details displayed below. Please transfer the amount and send us the transaction details.");
      } else {
        toast.info("Please contact us for cheque/DD payment instructions.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${label} copied to clipboard!`);
    }).catch(() => {
      toast.error("Failed to copy to clipboard");
    });
  };

  return (
    <div className="min-h-screen font-poppins">
      <Helmet>
        <title>Koshish NGO - Donate</title>
        <meta name="description" content="Support Koshish NGO by making a donation and help us create a better tomorrow." />
      </Helmet>
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

              {/* Payment Method Selection */}
              <div className="mb-8">
                <Label className="text-lg font-semibold text-koshish-blue mb-4 block">Payment Method</Label>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div 
                      key={method.id} 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === method.id ? 'bg-koshish-light-blue border-koshish-blue' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{method.icon}</div>
                        <div>
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
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
                    I agree to receive updates about Koshish Charitable Trust's work and impact stories
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
                disabled={isProcessing}
                className="w-full bg-koshish-gold text-koshish-blue hover:bg-yellow-400 font-semibold text-lg py-4"
                size="lg"
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-koshish-blue border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  paymentMethod === "razorpay" ? "Pay Now" : "Get Payment Details"
                )}
              </Button>

              {/* Security Notice */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  🔒 Your donation is secure and encrypted. All donations are eligible for 80G tax benefits.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Bank Details Section */}
          {showBankDetails && paymentMethod === "bank_transfer" && (
            <Card className="mt-8">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-koshish-blue mb-6 flex items-center">
                  <Building className="w-6 h-6 mr-3" />
                  Bank Transfer Details
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Indian Donations */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">For Indian Donations</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Account Name:</span>
                        <div className="flex items-center space-x-2">
                          <span>{bankDetails.indian.name}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(bankDetails.indian.name, "Account name")}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Account Number:</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono">{bankDetails.indian.accountNumber}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(bankDetails.indian.accountNumber, "Account number")}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">IFSC Code:</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono">{bankDetails.indian.ifsc}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(bankDetails.indian.ifsc, "IFSC code")}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Bank:</span>
                        <span>{bankDetails.indian.bankName}</span>
                      </div>
                    </div>
                  </div>

                  {/* International Donations */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">For International Donations</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Account Name:</span>
                        <div className="flex items-center space-x-2">
                          <span>{bankDetails.fcra.name}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(bankDetails.fcra.name, "Account name")}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Account Number:</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono">{bankDetails.fcra.accountNumber}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(bankDetails.fcra.accountNumber, "Account number")}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">IFSC Code:</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono">{bankDetails.fcra.ifsc}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(bankDetails.fcra.ifsc, "IFSC code")}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">SWIFT Code:</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono">{bankDetails.fcra.swift}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(bankDetails.fcra.swift, "SWIFT code")}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Bank:</span>
                        <span>{bankDetails.fcra.bankName}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-800 mb-1">After transferring the amount:</p>
                      <p className="text-blue-700">
                        Please send us the transaction details (screenshot/receipt) to{" "}
                        <a href="mailto:info@koshish.org" className="font-medium underline">
                          info@koshish.org
                        </a>{" "}
                        or WhatsApp us at{" "}
                        <a href="https://wa.me/919431234567" className="font-medium underline">
                          +91 94312 34567
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
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
