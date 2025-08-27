import React, { useState, useEffect } from "react";
import { Transaction } from "@/entities/Transaction";
import { FraudAlert } from "@/entities/FraudAlert";

import StatsOverview from "../components/dashboard/StatsOverview";
import TransactionList from "../components/dashboard/TransactionList";
import TransactionDetails from "../components/dashboard/TransactionDetails";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [transactionData, alertData] = await Promise.all([
        Transaction.list('-created_date', 50),
        FraudAlert.list('-created_date', 20)
      ]);
      
      setTransactions(transactionData);
      setAlerts(alertData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Fraud Detection Dashboard
          </h1>
          <h2 className="text-xl text-slate-600 font-medium">धोखाधड़ी का पता लगाने वाला डैशबोर्ड</h2>
          <p className="text-slate-600 mt-2">भारत की डिजिटल पेमेंट्स की रीयल-टाइम निगरानी</p>
        </div>

        {/* Stats Overview */}
        <StatsOverview transactions={transactions} alerts={alerts} />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Transaction List */}
          <div className="lg:col-span-2">
            <TransactionList 
              transactions={transactions}
              onViewDetails={setSelectedTransaction}
            />
          </div>

          {/* Transaction Details Sidebar */}
          <div className="lg:col-span-1">
            {selectedTransaction ? (
              <TransactionDetails 
                transaction={selectedTransaction}
                onClose={() => setSelectedTransaction(null)}
              />
            ) : (
              <div className="bg-white rounded-xl shadow-lg border-0 p-8 text-center">
                <div className="text-slate-400 mb-4">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">Select a Transaction</h3>
                <p className="text-sm text-slate-600 mb-1">लेन-देन चुनें</p>
                <p className="text-xs text-slate-500">किसी भी transaction पर click करें detailed analysis के लिए</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}