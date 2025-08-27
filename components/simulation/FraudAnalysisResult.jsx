import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Brain,
  TrendingUp,
  MapPin,
  Clock
} from "lucide-react";

export default function FraudAnalysisResult({ result, onReset }) {
  if (!result) return null;

  const getRiskLevel = (score) => {
    if (score >= 70) return { level: 'HIGH', color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle };
    if (score >= 40) return { level: 'MEDIUM', color: 'bg-amber-100 text-amber-800 border-amber-200', icon: AlertTriangle };
    return { level: 'LOW', color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle };
  };

  const risk = getRiskLevel(result.risk_score);
  const StatusIcon = risk.icon;

  return (
    <Card className="shadow-sm border-0 bg-white">
      <CardHeader className="border-b border-slate-100">
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-500" />
          Fraud Analysis Result
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Risk Score */}
        <div className="text-center p-6 bg-slate-50 rounded-lg">
          <StatusIcon className={`w-12 h-12 mx-auto mb-3 ${
            result.risk_score >= 70 ? 'text-red-500' : 
            result.risk_score >= 40 ? 'text-amber-500' : 'text-green-500'
          }`} />
          <div className="text-3xl font-bold text-slate-900 mb-2">
            {result.risk_score}%
          </div>
          <Badge className={`border text-sm font-medium ${risk.color}`}>
            {risk.level} RISK
          </Badge>
        </div>

        {/* AI Explanation */}
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2">
            <Brain className="w-4 h-4 text-blue-500" />
            AI Analysis
          </h3>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-slate-700 leading-relaxed">
              {result.ai_explanation}
            </p>
          </div>
        </div>

        {/* Fraud Indicators */}
        {result.fraud_indicators && result.fraud_indicators.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Detected Risk Factors
            </h3>
            <div className="grid gap-2">
              {result.fraud_indicators.map((indicator, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-sm font-medium text-amber-800">{indicator}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transaction Summary */}
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-900">Transaction Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-500">Amount:</span>
              <p className="font-semibold">${result.amount?.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-slate-500">Merchant:</span>
              <p className="font-semibold">{result.merchant_name}</p>
            </div>
            <div>
              <span className="text-slate-500">Status:</span>
              <p className="font-semibold capitalize">{result.status}</p>
            </div>
            <div>
              <span className="text-slate-500">Location:</span>
              <p className="font-semibold">{result.location_city}, {result.location_country}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-slate-100">
          <Button 
            onClick={onReset} 
            variant="outline" 
            className="w-full"
          >
            Analyze Another Transaction
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}