
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CreditCard } from "lucide-react";

export default function TransactionForm({ onSubmit, isProcessing }) {
  const [formData, setFormData] = useState({
    transaction_id: '',
    user_id: '',
    amount: '',
    currency: 'INR',
    merchant_name: '',
    merchant_category: '',
    location_state: '', // Changed from location_country to location_state
    location_city: '',
    payment_method: '',
    upi_vpa: '', // New field for UPI VPA
    bank_name: '' // New field for Bank Name
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
      transaction_id: formData.transaction_id || `TXN-${Date.now()}`
    });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-blue-50">
        <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-indigo-600" />
          Test New Transaction
          <span className="text-sm font-normal text-slate-600">/ नया लेन-देन टेस्ट करें</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="user_id" className="font-semibold text-slate-700">Customer ID / ग्राहक ID</Label>
              <Input
                id="user_id"
                value={formData.user_id}
                onChange={(e) => handleChange('user_id', e.target.value)}
                placeholder="e.g., 9876543210 or CUST-12345"
                className="border-2 focus:border-indigo-400"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount" className="font-semibold text-slate-700">Amount (₹) / राशि</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                placeholder="₹100"
                className="border-2 focus:border-indigo-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="merchant_name" className="font-semibold text-slate-700">Merchant Name / व्यापारी नाम</Label>
              <Input
                id="merchant_name"
                value={formData.merchant_name}
                onChange={(e) => handleChange('merchant_name', e.target.value)}
                placeholder="e.g., Paytm, Swiggy, Amazon"
                className="border-2 focus:border-indigo-400"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="merchant_category" className="font-semibold text-slate-700">Merchant Category</Label>
              <Select value={formData.merchant_category} onValueChange={(value) => handleChange('merchant_category', value)}>
                <SelectTrigger className="border-2 focus:border-indigo-400">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grocery">🛒 Grocery Store</SelectItem>
                  <SelectItem value="fuel">⛽ Fuel/Petrol</SelectItem>
                  <SelectItem value="restaurant">🍽️ Restaurant/Food</SelectItem>
                  <SelectItem value="ecommerce">🛍️ E-commerce</SelectItem>
                  <SelectItem value="recharge">📱 Mobile Recharge</SelectItem>
                  <SelectItem value="utilities">💡 Utilities (Electricity/Gas)</SelectItem>
                  <SelectItem value="pharmacy">💊 Pharmacy/Medical</SelectItem>
                  <SelectItem value="education">🎓 Education</SelectItem>
                  <SelectItem value="travel">✈️ Travel/Transport</SelectItem>
                  <SelectItem value="entertainment">🎬 Entertainment</SelectItem>
                  <SelectItem value="healthcare">🏥 Healthcare</SelectItem>
                  <SelectItem value="fashion">👕 Fashion/Clothing</SelectItem>
                  <SelectItem value="electronics">📺 Electronics</SelectItem>
                  <SelectItem value="gold_jewelry">💎 Gold/Jewelry</SelectItem>
                  <SelectItem value="insurance">🛡️ Insurance</SelectItem>
                  <SelectItem value="mutual_funds">📈 Mutual Funds</SelectItem>
                  <SelectItem value="other">🔗 Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="location_state" className="font-semibold text-slate-700">State / राज्य</Label>
              <Input
                id="location_state"
                value={formData.location_state}
                onChange={(e) => handleChange('location_state', e.target.value)}
                placeholder="e.g., Madhya Pradesh, Maharashtra"
                className="border-2 focus:border-indigo-400"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location_city" className="font-semibold text-slate-700">City / शहर</Label>
              <Input
                id="location_city"
                value={formData.location_city}
                onChange={(e) => handleChange('location_city', e.target.value)}
                placeholder="e.g., Bhopal, Mumbai, Delhi"
                className="border-2 focus:border-indigo-400"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment_method" className="font-semibold text-slate-700">Payment Method / भुगतान विधि</Label>
            <Select value={formData.payment_method} onValueChange={(value) => handleChange('payment_method', value)}>
              <SelectTrigger className="border-2 focus:border-indigo-400">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upi">🚀 UPI (Unified Payments Interface)</SelectItem>
                <SelectItem value="credit_card">💳 Credit Card</SelectItem>
                <SelectItem value="debit_card">💳 Debit Card</SelectItem>
                <SelectItem value="netbanking">🏦 Net Banking</SelectItem>
                <SelectItem value="wallet">📱 Digital Wallet (Paytm/PhonePe)</SelectItem>
                <SelectItem value="aadhaar_pay">🆔 Aadhaar Pay</SelectItem>
                <SelectItem value="bhim">🇮🇳 BHIM App</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.payment_method === 'upi' && (
            <div className="space-y-2 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <Label htmlFor="upi_vpa" className="font-semibold text-purple-700">UPI ID / VPA</Label>
              <Input
                id="upi_vpa"
                value={formData.upi_vpa}
                onChange={(e) => handleChange('upi_vpa', e.target.value)}
                placeholder="e.g., user@paytm, 9876543210@ybl"
                className="border-2 focus:border-purple-400"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="bank_name" className="font-semibold text-slate-700">Bank Name / बैंक का नाम</Label>
            <Input
              id="bank_name"
              value={formData.bank_name}
              onChange={(e) => handleChange('bank_name', e.target.value)}
              placeholder="e.g., SBI, HDFC, ICICI, Axis Bank"
              className="border-2 focus:border-indigo-400"
            />
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-lg py-3 font-semibold"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  AI से विश्लेषण हो रहा है...
                </>
              ) : (
                <>
                  🤖 Analyze with AI / एआई से जांचें
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
