import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Shield, BarChart3, Plus, AlertTriangle, Activity, Zap } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: BarChart3,
  },
  {
    title: "Test Transaction",
    url: createPageUrl("SimulateTransaction"),
    icon: Plus,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <style>
        {`
          :root {
            --primary-indigo: #4f46e5;
            --primary-blue: #0066cc;
            --success-green: #00c851;
            --warning-orange: #ff8800;
            --danger-red: #ff4444;
            --upi-purple: #7c3aed;
            --paytm-blue: #00baf2;
            --light-gray: #f8fafc;
            --border-gray: #e2e8f0;
          }
        `}
      </style>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 to-indigo-50">
        <Sidebar className="border-r border-blue-200 bg-white shadow-lg">
          <SidebarHeader className="border-b border-blue-100 p-6 bg-gradient-to-r from-indigo-600 to-blue-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">FraudShield AI</h2>
                <p className="text-xs text-blue-100 font-medium">भारत का Fraud Detection</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-2 flex items-center gap-2">
                <Activity className="w-3 h-3" />
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 rounded-xl mb-1 ${
                          location.pathname === item.url ? 'bg-indigo-50 text-indigo-700 border-l-3 border-indigo-500 shadow-sm' : ''
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-2 flex items-center gap-2">
                <Zap className="w-3 h-3" />
                System Status
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-3 py-2 space-y-4">
                  <div className="flex items-center gap-3 text-sm p-2 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-700 font-medium">AI Engine सक्रिय</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm p-2 bg-blue-50 rounded-lg">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-700 font-medium">UPI Monitoring</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm p-2 bg-orange-50 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <span className="text-orange-700 font-medium">0 Alerts</span>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-blue-100 p-4 bg-gradient-to-r from-slate-50 to-blue-50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">BO</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm truncate">Bank Officer</p>
                <p className="text-xs text-slate-600 truncate">Fraud Prevention Team</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white border-b border-blue-200 px-6 py-4 md:hidden shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-blue-50 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">FraudShield AI</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 to-indigo-50">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}