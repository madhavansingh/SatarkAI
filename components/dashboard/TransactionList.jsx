import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  MapPin, 
  CreditCard, 
  Eye,
  Clock,
  Activity,
  IndianRupee
} from "lucide-react";
import { format } from "date-fns";

export default function TransactionList({ transactions, onViewDetails }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'suspicious':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'blocked':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusBadge = (status, riskScore) => {
    const badgeProps = {
      success: { variant: "secondary", className: "bg-green-100 text-green-800 border-green-300" },
      suspicious: { variant: "secondary", className: "bg-orange-100 text-orange-800 border-orange-300" },
      blocked: { variant: "secondary", className: "bg-red-100 text-red-800 border-red-300" }
    };

    return (
      <div className="flex items-center gap-2">
        <Badge {...badgeProps[status]} className="border font-semibold">
          {status === 'success' ? 'सफल' : status === 'suspicious' ? 'संदिग्ध' : 'ब्लॉक'}
        </Badge>
        {riskScore && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            riskScore > 70 ? 'bg-red-100 text-red-700' : riskScore > 40 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
          }`}>
            Risk: {riskScore}%
          </span>
        )}
      </div>
    );
  };

  const getPaymentMethodIcon = (method) => {
    if (method === 'upi') return '🚀';
    if (method === 'credit_card' || method === 'debit_card') return '💳';
    if (method === 'netbanking') return '🏦';
    if (method === 'wallet') return '📱';
    return '💰';
  };

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="border-b border-slate-100 pb-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-3">
          <Activity className="w-6 h-6 text-indigo-600" />
          Recent Transactions
          <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 font-semibold">
            {transactions.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-hidden">
          {transactions.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <CreditCard className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="font-medium">No transactions found</p>
              <p className="text-sm">New transactions will appear here</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="p-5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border-l-4 border-transparent hover:border-indigo-400">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(transaction.status)}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-bold text-slate-900 truncate text-lg">
                            {transaction.merchant_name}
                          </p>
                          <span className="text-sm bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
                            {transaction.merchant_category?.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="flex items-center gap-5 text-sm text-slate-600">
                          <span className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-lg">
                            <span className="text-lg">{getPaymentMethodIcon(transaction.payment_method)}</span>
                            {transaction.payment_method?.toUpperCase()}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-indigo-500" />
                            {transaction.location_city}, {transaction.location_state}
                          </span>
                          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                            {format(new Date(transaction.created_date), 'MMM d, HH:mm')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-xl text-slate-900 flex items-center gap-1">
                          <IndianRupee className="w-5 h-5" />
                          {transaction.amount?.toLocaleString('en-IN')}
                        </p>
                        {getStatusBadge(transaction.status, transaction.risk_score)}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetails(transaction)}
                        className="hover:bg-indigo-50 hover:text-indigo-700 p-3"
                      >
                        <Eye className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}