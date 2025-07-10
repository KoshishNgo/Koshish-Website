import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Share2, Heart, Mail, Phone } from "lucide-react";

const DonationSuccess = () => {
  const [searchParams] = useSearchParams();
  const [donationDetails, setDonationDetails] = useState({
    paymentId: searchParams.get('payment_id') || '',
    orderId: searchParams.get('order_id') || '',
    amount: searchParams.get('amount') || '',
    timestamp: new Date().toISOString(),
  });

  useEffect(() => {
    // In a real app, you would fetch donation details from your backend
    // using the payment ID to verify the transaction
  }, []);

  const shareMessage = `I just donated to Koshish NGO to support their amazing work in community development! Join me in making a difference. 🤝 #KoshishNGO #MakeADifference`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'I just donated to Koshish NGO!',
        text: shareMessage,
        url: window.location.origin,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(shareMessage + ` ${window.location.origin}`);
      alert('Message copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen font-poppins">
      <Helmet>
        <title>Thank You - Donation Successful | Koshish NGO</title>
        <meta name="description" content="Thank you for your generous donation to Koshish NGO. Your support makes a real difference!" />
      </Helmet>
      <Navbar />
      
      {/* Success Header */}
      <section className="py-20 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Thank You!</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Your generous donation has been successfully processed. You're now part of our mission to create positive change!
          </p>
        </div>
      </section>

      {/* Donation Details */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-koshish-blue mb-6 text-center">Donation Receipt</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment ID:</span>
                      <span className="font-mono text-sm">{donationDetails.paymentId || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order ID:</span>
                      <span className="font-mono text-sm">{donationDetails.orderId || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-bold text-green-600">₹{donationDetails.amount || '0'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date & Time:</span>
                      <span>{new Date(donationDetails.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="text-green-600 font-semibold">✓ Successful</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Tax Benefits</h3>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-green-800 mb-1">80G Tax Exemption Eligible</p>
                        <p className="text-green-700">
                          This donation is eligible for tax deduction under Section 80G of the Income Tax Act.
                          Your official receipt will be emailed to you within 24 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <Button variant="outline" className="w-full" disabled>
                      <Download className="w-4 h-4 mr-2" />
                      Download Receipt (Available in 24 hours)
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Impact Message */}
          <Card className="mb-8">
            <CardContent className="p-8 text-center">
              <Heart className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-koshish-blue mb-4">Your Impact</h3>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                Your donation of ₹{donationDetails.amount || '0'} will directly support our programs in education, 
                women empowerment, and community development across Bihar and Jharkhand.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-koshish-blue">
                    {Math.floor((parseInt(donationDetails.amount || '0')) / 100) || 1}
                  </div>
                  <div className="text-sm text-gray-600">Children can get school supplies</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.floor((parseInt(donationDetails.amount || '0')) / 250) || 1}
                  </div>
                  <div className="text-sm text-gray-600">Families can be fed for a week</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.floor((parseInt(donationDetails.amount || '0')) / 500) || 1}
                  </div>
                  <div className="text-sm text-gray-600">Women can receive skill training</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Button onClick={handleShare} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Share2 className="w-4 h-4 mr-2" />
              Share Your Good Deed
            </Button>
            <Button variant="outline" asChild>
              <Link to="/volunteer">
                <Heart className="w-4 h-4 mr-2" />
                Become a Volunteer
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/donate">
                Make Another Donation
              </Link>
            </Button>
          </div>

          {/* Contact Information */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-koshish-blue mb-4 text-center">Stay Connected</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <Mail className="w-8 h-8 text-koshish-blue mx-auto mb-2" />
                  <p className="font-medium">Email Us</p>
                  <a href="mailto:info@koshish.org" className="text-koshish-blue hover:underline">
                    info@koshish.org
                  </a>
                </div>
                <div className="text-center">
                  <Phone className="w-8 h-8 text-koshish-blue mx-auto mb-2" />
                  <p className="font-medium">Call Us</p>
                  <a href="tel:+919431234567" className="text-koshish-blue hover:underline">
                    +91 94312 34567
                  </a>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  We'll keep you updated on how your donation is making a difference in our communities.
                  Thank you for being part of the Koshish family!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DonationSuccess;
