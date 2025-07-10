# Payment Integration Setup Guide

This guide will help you set up real payment processing for your Koshish NGO donation page.

## 1. Razorpay Setup (Recommended for India)

### Step 1: Create Razorpay Account
1. Go to [Razorpay](https://razorpay.com/)
2. Sign up for a business account
3. Complete KYC verification with your NGO documents:
   - Trust registration certificate
   - PAN card
   - Bank account details
   - 80G certificate (for tax benefits)

### Step 2: Get API Keys
1. Login to Razorpay Dashboard
2. Go to Settings → API Keys
3. Generate Test Keys first for testing
4. Later generate Live Keys for production

### Step 3: Configure Environment Variables
Update your `.env` file:
```
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id_here
VITE_RAZORPAY_KEY_SECRET=your_secret_key_here
```

### Step 4: NGO-Specific Settings
1. Enable recurring payments for monthly donations
2. Set up webhooks for payment confirmation
3. Configure 80G tax receipt generation
4. Set up automatic email notifications

## 2. Alternative Payment Methods

### Bank Transfer
- Already configured with your existing bank details
- Users can transfer directly and send proof
- Manual verification required

### Cheque/DD
- Provide your office address for physical payments
- Include instructions for cheque handling

## 3. Compliance & Legal

### For NGOs in India:
1. **FCRA Compliance**: Use separate FCRA account for international donations
2. **80G Certificate**: Ensure donors get tax benefit receipts
3. **Transparency**: Maintain donation records as per legal requirements
4. **Audit Trail**: Keep detailed payment logs for auditing

### Required Documents:
- Trust registration certificate
- 80G registration
- FCRA certificate (for international donations)
- PAN card
- Audit reports

## 4. Testing Your Integration

### Test Mode:
1. Use Razorpay test keys
2. Test with these card numbers:
   - Success: 4111 1111 1111 1111
   - Failure: 4000 0000 0000 0002
3. Use any future expiry date and CVV

### Go Live Checklist:
- [ ] KYC approved by Razorpay
- [ ] Live API keys generated
- [ ] Webhook endpoints configured
- [ ] SSL certificate installed
- [ ] Payment success/failure pages ready
- [ ] Email notifications working
- [ ] Tax receipt generation ready

## 5. Security Best Practices

1. **Never expose secret keys**: Keep them server-side only
2. **Use HTTPS**: Ensure all payment pages are SSL secured
3. **Validate on server**: Always verify payments on your backend
4. **PCI Compliance**: Follow payment industry standards
5. **Fraud Prevention**: Monitor unusual payment patterns

## 6. Enhanced Features

### Recommended Additions:
1. **Recurring Donations**: Monthly giving programs
2. **Donor Portal**: Let donors track their contributions
3. **Tax Receipts**: Automatic 80G receipt generation
4. **Thank You Page**: Customized donor acknowledgment
5. **Analytics**: Track donation patterns and sources

### Backend Integration:
```javascript
// Example webhook handler for payment confirmation
app.post('/webhook/payment', (req, res) => {
  const signature = req.headers['x-razorpay-signature'];
  const body = req.body;
  
  // Verify webhook signature
  const isValid = verifyWebhookSignature(body, signature);
  
  if (isValid && body.event === 'payment.captured') {
    // Update database
    // Send thank you email
    // Generate tax receipt
  }
  
  res.status(200).send('OK');
});
```

## 7. Troubleshooting

### Common Issues:
1. **Payment Failing**: Check API keys and account status
2. **Webhook Not Working**: Verify endpoint URL and signature validation
3. **KYC Issues**: Contact Razorpay support with proper documents
4. **International Payments**: Ensure FCRA account is properly configured

### Support Contacts:
- Razorpay Support: support@razorpay.com
- Technical Issues: Check Razorpay documentation
- NGO Specific: Contact your Razorpay account manager

## 8. Go-Live Steps

1. **Replace test keys** with live keys in production
2. **Update webhook URLs** to production endpoints
3. **Test live payments** with small amounts
4. **Monitor transactions** closely for first few days
5. **Set up monitoring** and alerting for failed payments

Remember: Always test thoroughly before going live with real payments!
