
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  X, 
  AlertTriangle, 
  MapPin, 
  CreditCard, 
  Calendar,
  IndianRupee, // Changed from DollarSign to IndianRupee
  User,
  Store,
  Brain,
  Zap // Added Zap icon
} from "lucide-react";
import { format } from "date-fns";

export default function TransactionDetails({ transaction, onClose }) {
  if (!transaction) return null;

  const riskLevel = transaction.risk_score > 70 ? 'high' : transaction.risk_score > 40 ? 'medium' : 'low';
  const riskColors = {
    high: 'bg-red-100 text-red-800 border-red-300', // Changed border color
    medium: 'bg-orange-100 text-orange-800 border-orange-300', // Changed bg, text, border colors
    low: 'bg-green-100 text-green-800 border-green-300' // Changed border color
  };

  // Helper function for payment method display names
  const getPaymentMethodDisplay = (method) => {
    const methods = {
      upi: '🚀 UPI Payment',
      credit_card: '💳 Credit Card',
      debit_card: '💳 Debit Card', 
      netbanking: '🏦 Net Banking',
      wallet: '📱 Digital Wallet',
      aadhaar_pay: '🆔 Aadhaar Pay',
      bhim: '🇮🇳 BHIM App'
    };
    return methods[method] || method;
  };

  return (
    <Card className="shadow-xl border-0 bg-white"> {/* Changed shadow-lg to shadow-xl */}
      <CardHeader className="border-b border-slate-100 pb-4 bg-gradient-to-r from-indigo-50 to-blue-50"> {/* Added gradient background */}
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2"> {/* Changed text-lg to text-xl, font-semibold to font-bold, added flex and Brain icon */}
            <Brain className="w-6 h-6 text-indigo-600" /> {/* Brain icon with specific styling */}
            Transaction Details
            <span className="text-sm font-normal text-slate-600">/ लेन-देन विवरण</span> {/* Added Hindi translation */}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-red-50 hover:text-red-600"> {/* Added hover styles */}
            <X className="w-5 h-5" /> {/* Changed icon size */}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Changed grid-cols-2 to responsive grid */}
          <div className="space-y-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200"> {/* Updated styling */}
            <p className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-500" /> {/* Added color to icon */}
              Transaction ID / लेन-देन ID {/* Added Hindi translation */}
            </p>
            <p className="font-mono text-sm bg-white p-3 rounded-lg shadow-sm border"> {/* Updated styling */}
              {transaction.transaction_id}
            </p>
          </div>
          <div className="space-y-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200"> {/* Updated styling */}
            <p className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-green-600" /> {/* Changed icon to IndianRupee and added color */}
              Amount / राशि {/* Added Hindi translation */}
            </p>
            <p className="text-3xl font-bold text-slate-900 flex items-center gap-2"> {/* Changed text size */}
              ₹{transaction.amount?.toLocaleString('en-IN')} {/* Added Rupee symbol and Indian locale formatting */}
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                {transaction.currency}
              </span>
            </p>
          </div>
        </div>

        {/* Merchant & Payment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Changed grid-cols-2 to responsive grid */}
          <div className="space-y-3 p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200"> {/* Updated styling */}
            <p className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <Store className="w-4 h-4 text-purple-500" /> {/* Added color to icon */}
              Merchant / व्यापारी {/* Added Hindi translation */}
            </p>
            <p className="font-bold text-slate-900 text-lg">{transaction.merchant_name}</p> {/* Added text-lg */}
            <div className="flex gap-2"> {/* Added flex for multiple badges */}
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 font-medium"> {/* Updated badge styling */}
                {transaction.merchant_category?.replace('_', ' ')}
              </Badge>
              {transaction.bank_name && ( // Added bank_name display
                <Badge variant="outline" className="border-purple-300 text-purple-700">
                  {transaction.bank_name}
                </Badge>
              )}
            </div>
          </div>
          <div className="space-y-3 p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-200"> {/* Updated styling */}
            <p className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-500" /> {/* Changed icon to Zap and added color */}
              Payment Method / भुगतान विधि {/* Added Hindi translation */}
            </p>
            <p className="font-bold text-slate-900 text-lg"> {/* Added text-lg */}
              {getPaymentMethodDisplay(transaction.payment_method)} {/* Used helper function */}
            </p>
            {transaction.upi_vpa && ( // Added UPI VPA display
              <p className="text-sm text-slate-600 bg-white p-2 rounded border font-mono">
                UPI ID: {transaction.upi_vpa}
              </p>
            )}
          </div>
        </div>

        {/* Location & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Changed grid-cols-2 to responsive grid */}
          <div className="space-y-3 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200"> {/* Updated styling */}
            <p className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-600" /> {/* Added color to icon */}
              Location / स्थान {/* Added Hindi translation */}
            </p>
            <p className="font-bold text-slate-900 text-lg"> {/* Added text-lg */}
              {transaction.location_city}, {transaction.location_state} {/* Changed location_country to location_state */}
            </p>
            <span className="text-sm text-cyan-700 bg-cyan-100 px-3 py-1 rounded-full font-medium">
              🇮🇳 India {/* Added India badge */}
            </span>
          </div>
          <div className="space-y-3 p-4 bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl border border-slate-200"> {/* Updated styling */}
            <p className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500" /> {/* Added color to icon */}
              Timestamp / समय {/* Added Hindi translation */}
            </p>
            <p className="font-bold text-slate-900">
              {format(new Date(transaction.created_date), 'MMM d, yyyy')}
            </p>
            <p className="text-sm text-slate-600">
              {format(new Date(transaction.created_date), 'HH:mm:ss')} IST {/* Added IST */}
            </p>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200"> {/* Updated styling */}
          <div className="flex items-center justify-between mb-4"> {/* Changed mb-3 to mb-4 */}
            <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg"> {/* Changed font-semibold to font-bold, added text-lg, added Brain icon styling */}
              <Brain className="w-6 h-6 text-indigo-600" />
              AI Risk Assessment / एआई जोखिम मूल्यांकन {/* Added Hindi translation */}
            </h3>
            <Badge className={`border font-bold text-sm px-4 py-2 ${riskColors[riskLevel]}`}> {/* Added font-bold, padding */}
              {transaction.risk_score}% Risk ({riskLevel === 'high' ? 'उच्च' : riskLevel === 'medium' ? 'मध्यम' : 'कम'} जोखिम) {/* Updated Hindi translations for risk levels */}
            </Badge>
          </div>
          
          {transaction.ai_explanation && (
            <div className="mb-4">
              <p className="text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-lg shadow-sm border"> {/* Updated styling */}
                <strong>Analysis:</strong> {transaction.ai_explanation} {/* Added "Analysis:" */}
              </p>
            </div>
          )}

          {transaction.fraud_indicators && transaction.fraud_indicators.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2"> {/* Changed font-medium to font-semibold, text-slate-600 to text-slate-700, mb-2 to mb-3 */}
                <AlertTriangle className="w-4 h-4 text-orange-600" /> {/* Changed color to orange-600 */}
                Fraud Indicators / धोखाधड़ी संकेतक: {/* Added Hindi translation */}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2"> {/* Changed flex flex-wrap to responsive grid */}
                {transaction.fraud_indicators.map((indicator, index) => (
                  <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800 border-orange-300 p-2 justify-start font-medium"> {/* Updated badge styling */}
                    ⚠️ {indicator} {/* Added warning emoji */}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Status */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-lg"> {/* Updated border-t, added gradient and padding */}
          <span className="text-sm font-semibold text-slate-600">Current Status / वर्तमान स्थिति:</span> {/* Changed font-medium to font-semibold, added Hindi translation */}
          <Badge className={`border font-bold text-sm px-4 py-2 ${ // Added font-bold, padding
            transaction.status === 'success' ? 'bg-green-100 text-green-800 border-green-300' : // Changed 'normal' to 'success', updated border color
            transaction.status === 'suspicious' ? 'bg-orange-100 text-orange-800 border-orange-300' : // Updated bg, text, border colors
            'bg-red-100 text-red-800 border-red-300' // Updated border color
          }`}>
            {transaction.status === 'success' ? '✅ सफल (SUCCESS)' : // Changed text for 'success'
             transaction.status === 'suspicious' ? '⚠️ संदिग्ध (SUSPICIOUS)' : 
             '🚫 ब्लॉक (BLOCKED)'} {/* Changed text for other statuses */}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
