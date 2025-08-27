
import React, { useState } from "react";
import { Transaction } from "@/entities/Transaction";
import { FraudAlert } from "@/entities/FraudAlert";
import { InvokeLLM } from "@/integrations/Core";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

import TransactionForm from "../components/simulation/TransactionForm";
import FraudAnalysisResult from "../components/simulation/FraudAnalysisResult";

export default function SimulateTransaction() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const analyzeTransaction = async (transactionData) => {
    setIsProcessing(true);
    
    try {
      // Use AI to analyze the transaction for fraud with Indian context
      const aiResponse = await InvokeLLM({
        prompt: `You are an advanced AI fraud detection system specifically designed for India's digital payments ecosystem. Analyze this financial transaction considering Indian context, UPI patterns, and local spending behaviors.

Transaction Details:
- Amount: ₹${transactionData.amount} (Indian Rupees)
- Merchant: ${transactionData.merchant_name} (${transactionData.merchant_category})
- Location: ${transactionData.location_city}, ${transactionData.location_state}, India
- Payment Method: ${transactionData.payment_method}
- UPI ID: ${transactionData.upi_vpa || 'N/A'}
- Bank: ${transactionData.bank_name || 'N/A'}
- Customer ID: ${transactionData.user_id}
- Time: Current Indian Standard Time (IST)

Analyze considering Indian-specific patterns:
1. UPI transaction limits and typical usage patterns in India
2. Regional spending patterns (different states have different spending habits)
3. Festival seasons (Diwali, Dussehra) spending spikes
4. Cross-state transactions (legitimate travel vs suspicious)
5. Merchant categories popular in India (grocery, fuel, mobile recharge)
6. Common fraud patterns in Indian digital payments
7. Amount patterns relevant to Indian economy (₹100-₹50,000 typical range)
8. Time-based patterns (Indian business hours, late night transactions)

Indian Context Considerations:
- UPI transactions are very common and trusted in India
- Cross-state transactions are normal due to internal migration
- Festival season spending can be 5-10x normal amounts
- Mobile recharge, utility payments are frequent small transactions
- E-commerce transactions vary widely (₹500-₹25,000)
- International transactions are rare for average users

Provide analysis in simple Hindi/English mixed language that Indian bank officers can understand:`,
        response_json_schema: {
          type: "object",
          properties: {
            risk_score: { type: "number", minimum: 0, maximum: 100 },
            status: { type: "string", enum: ["success", "suspicious", "blocked"] },
            fraud_indicators: { 
              type: "array", 
              items: { type: "string" }
            },
            explanation: { type: "string" }
          },
          required: ["risk_score", "status", "explanation"]
        }
      });

      // Create the analyzed transaction
      const analyzedTransaction = {
        ...transactionData,
        risk_score: aiResponse.risk_score,
        status: aiResponse.status,
        fraud_indicators: aiResponse.fraud_indicators || [],
        ai_explanation: aiResponse.explanation
      };

      // Save to database
      const savedTransaction = await Transaction.create(analyzedTransaction);

      // Create fraud alert if needed
      if (aiResponse.status === 'suspicious' || aiResponse.status === 'blocked') {
        await FraudAlert.create({
          transaction_id: savedTransaction.transaction_id,
          alert_type: aiResponse.risk_score > 70 ? 'high_risk' : 'medium_risk',
          severity: aiResponse.risk_score > 80 ? 'critical' : aiResponse.risk_score > 60 ? 'high' : 'medium',
          description: aiResponse.explanation,
          status: 'pending'
        });
      }

      setAnalysisResult(analyzedTransaction);

    } catch (error) {
      console.error("Error analyzing transaction:", error);
    }

    setIsProcessing(false);
  };

  const handleReset = () => {
    setAnalysisResult(null);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(createPageUrl("Dashboard"))}
            className="hover:bg-indigo-50 border-2 border-indigo-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Transaction Testing Lab
            </h1>
            <p className="text-lg text-slate-600 font-medium">लेन-देन परीक्षण प्रयोगशाला</p>
            <p className="text-slate-600">AI fraud detection system को test करें custom transactions के साथ</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Transaction Form */}
          <div>
            <TransactionForm 
              onSubmit={analyzeTransaction}
              isProcessing={isProcessing}
            />
          </div>

          {/* Analysis Result */}
          <div>
            {analysisResult ? (
              <FraudAnalysisResult 
                result={analysisResult}
                onReset={handleReset}
              />
            ) : (
              <div className="bg-white rounded-xl shadow-lg border-0 p-8 text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-xl">Ready for AI Analysis</h3>
                <p className="text-lg text-slate-600 mb-1">एआई विश्लेषण के लिए तैयार</p>
                <p className="text-sm text-slate-500">Transaction form भरें और देखें AI-powered fraud detection कैसे काम करता है</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
