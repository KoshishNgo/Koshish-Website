interface DonationData {
  amount: string;
  frequency: string;
  cause: string;
  donorInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    panCard: string;
  };
}

interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  orderId?: string;
  error?: string;
}

// Razorpay configuration
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'your_razorpay_key_id';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const initializeRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const processPayment = async (donationData: DonationData): Promise<PaymentResponse> => {
  try {
    // Initialize Razorpay if not already loaded
    const isRazorpayLoaded = await initializeRazorpay();
    if (!isRazorpayLoaded) {
      throw new Error('Failed to load Razorpay SDK');
    }

    const amount = parseInt(donationData.amount) * 100; // Convert to paise
    
    // In a real implementation, you would create an order on your backend
    // For now, we'll create the order directly on frontend (not recommended for production)
    const orderData = {
      amount: amount,
      currency: 'INR',
      receipt: `donation_${Date.now()}`,
      notes: {
        cause: donationData.cause,
        frequency: donationData.frequency,
        donor_name: donationData.donorInfo.name,
        donor_email: donationData.donorInfo.email,
      }
    };

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: amount,
      currency: 'INR',
      name: 'Koshish NGO',
      description: `Donation for ${donationData.cause}`,
      image: '/logo/logo.png', // Your NGO logo
      order_id: orderData.receipt,
      prefill: {
        name: donationData.donorInfo.name,
        email: donationData.donorInfo.email,
        contact: donationData.donorInfo.phone,
      },
      notes: orderData.notes,
      theme: {
        color: '#1e40af' // Your koshish-blue color
      },
      handler: function (response: any) {
        // Payment successful - redirect to success page
        const params = new URLSearchParams({
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          amount: donationData.amount,
        });
        window.location.href = `/donation-success?${params.toString()}`;
      },
      modal: {
        ondismiss: function() {
          console.log('Payment cancelled');
        }
      }
    };

    return new Promise((resolve, reject) => {
      const rzp = new window.Razorpay({
        ...options,
        handler: function (response: any) {
          resolve({
            success: true,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
          });
        },
        modal: {
          ondismiss: function() {
            resolve({
              success: false,
              error: 'Payment cancelled by user'
            });
          }
        }
      });

      rzp.open();
    });

  } catch (error) {
    console.error('Payment processing error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Payment processing failed'
    };
  }
};

// Alternative payment methods for different regions or preferences
export const getPaymentMethods = () => {
  return [
    {
      id: 'razorpay',
      name: 'Credit/Debit Card, UPI, NetBanking',
      description: 'Pay securely using Razorpay',
      icon: '💳'
    },
    {
      id: 'bank_transfer',
      name: 'Direct Bank Transfer',
      description: 'Transfer directly to our bank account',
      icon: '🏦'
    },
    {
      id: 'cheque',
      name: 'Cheque/DD',
      description: 'Send cheque or demand draft',
      icon: '📝'
    }
  ];
};

// Bank details for direct transfer (from your About page)
export const getBankDetails = () => {
  return {
    fcra: {
      name: 'Koshish (For International Donations)',
      accountNumber: '40211696985',
      bankName: 'State Bank of India, New Delhi',
      ifsc: 'SBIN0000691',
      swift: 'SBININBB104'
    },
    indian: {
      name: 'Koshish',
      accountNumber: '625901128707',
      bankName: 'ICICI Bank, Exhibition Road, Patna 800001',
      ifsc: 'ICIC0000579'
    }
  };
};
