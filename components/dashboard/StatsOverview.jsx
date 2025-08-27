import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, AlertTriangle, Shield, IndianRupee, Activity, Zap } from "lucide-react";

export default function StatsOverview({ transactions, alerts }) {
  const totalTransactions = transactions.length;
  const suspiciousCount = transactions.filter(t => t.status === 'suspicious').length;
  const blockedCount = transactions.filter(t => t.status === 'blocked').length;
  const totalAmount = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  const avgRiskScore = transactions.length > 0 
    ? transactions.reduce((sum, t) => sum + (t.risk_score || 0), 0) / transactions.length 
    : 0;
  
  const suspiciousRate = totalTransactions > 0 ? ((suspiciousCount + blockedCount) / totalTransactions * 100) : 0;
  const upiCount = transactions.filter(t => t.payment_method === 'upi').length;

  const stats = [
    {
      title: "Total Transactions",
      subtitle: "कुल लेन-देन",
      value: totalTransactions.toLocaleString('en-IN'),
      icon: Activity,
      trend: "+15.2%",
      trendUp: true,
      bgGradient: "from-blue-500 to-indigo-600",
      description: "24 घंटे में"
    },
    {
      title: "Flagged Transactions", 
      subtitle: "संदिग्ध लेन-देन",
      value: (suspiciousCount + blockedCount).toString(),
      icon: AlertTriangle,
      trend: `${suspiciousRate.toFixed(1)}%`,
      trendUp: false,
      bgGradient: "from-orange-500 to-red-500",
      description: "Fraud rate"
    },
    {
      title: "Amount Processed",
      subtitle: "प्रोसेस की गई राशि",
      value: `₹${(totalAmount / 100000).toFixed(1)}L`,
      icon: IndianRupee,
      trend: "+12.8%",
      trendUp: true,
      bgGradient: "from-green-500 to-emerald-600", 
      description: "24 घंटे कुल"
    },
    {
      title: "UPI Transactions",
      subtitle: "UPI लेन-देन",
      value: upiCount.toString(),
      icon: Zap,
      trend: "+25.4%",
      trendUp: true,
      bgGradient: "from-purple-500 to-indigo-600",
      description: `${((upiCount/totalTransactions)*100).toFixed(0)}% of total`
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="relative overflow-hidden border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300">
          <div className={`absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8 bg-gradient-to-br ${stat.bgGradient} rounded-full opacity-10`} />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-sm font-semibold text-slate-700">{stat.title}</CardTitle>
              <p className="text-xs text-slate-500 mt-1">{stat.subtitle}</p>
            </div>
            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.bgGradient} shadow-lg`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
            <div className="flex items-center justify-between">
              <div className={`flex items-center text-sm font-semibold ${
                stat.trendUp ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trendUp ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {stat.trend}
              </div>
              <span className="text-xs text-slate-500 font-medium">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}