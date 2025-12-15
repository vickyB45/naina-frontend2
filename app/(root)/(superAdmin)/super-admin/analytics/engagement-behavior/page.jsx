  "use client";
  import React from 'react';
  import { BarChart3, MessageSquare, Home, Activity, Grid, Users, MessageCircle, Clock, TrendingUp } from 'lucide-react';
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  import StatCard from '@/components/SuperAdmin/Analytics/StatCard';
  import EngagementChart from '@/components/SuperAdmin/Analytics/EngagementChart';
  import SentimentBreakdown from '@/components/SuperAdmin/Analytics/SentimentBreakdown';
  import TopEngagementPages from '@/components/SuperAdmin/Analytics/TopEngagementPages';



  const miniChartData = [
    { value: 30 },
    { value: 45 },
    { value: 50 },
    { value: 60 },
    { value: 75 },
    { value: 90 },
  ];


  const steps = [
    { label: 'Homepage', value: '50K', color: 'bg-blue-500' },
    { label: 'AI Chat', value: '60K', color: 'bg-purple-500' },
    { label: 'Product Page', value: '6.0k', color: 'bg-green-500' },
    { label: 'Checkout', value: '50K', color: 'bg-teal-500' },
    { label: 'Convertion', value: '56', color: 'bg-blue-400' },
    { label: 'Consistion', value: '', color: 'bg-purple-400' }
  ];



  // Table Row Component
  const TableRow = ({ name, views, time, interactions, sentiment, isHeader, color = "bg-blue-500" }) => (
    <tr className={isHeader ? "text-gray-400 text-xs" : "text-gray-300"}>
      <td className="py-3">
        {!isHeader && (
          <div className="flex items-center gap-3">
            <div className={`h-6 ${color} rounded`} style={{ width: `${parseInt(views) / 1000}%` }}></div>
            <span>{name}</span>
          </div>
        )}
        {isHeader && name}
      </td>
      <td className="py-3 text-center">{views}</td>
      <td className="py-3 text-center">{time}</td>
      <td className="py-3 text-center">{interactions}</td>
      <td className="py-3 text-center">{sentiment}</td>
    </tr>
  );


  // Main Dashboard Component
  const Dashboard = () => {
    return (
      <div className="flex h-screen  overflow-auto">
        <div className="flex-1 p-6 space-y-8">
          {/* Page Header */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold tracking-tight ">
              Engagement & Behavior
            </h1>
            <p className="text-gray-400 mt-1">
              Track how users interact with your AI and website experience.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="">
            <div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Total Visits"
                  value="150k"
                  change="+50%"
                  data={miniChartData}
                  color="#6366F1" // Indigo
                />
                <StatCard
                  title="AI Chats Opened"
                  value="35K"
                  change="+60%"
                  data={miniChartData}
                  color="#F59E0B" // Amber
                />
                <StatCard
                  title="Avg. Session Duration"
                  value="4m 39s"
                  change="+12%"
                  data={miniChartData}
                  color="#10B981" // Green
                />
                <StatCard
                  title="Returning Users"
                  value="70K"
                  change="+15%"
                  data={miniChartData}
                  color="#3B82F6" // Blue
                />
              </div>
            </div>
          </div>


          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-2">
              <EngagementChart />
            </div>

            <SentimentBreakdown />
          </div>

          {/* Top Pages Section */}
              <TopEngagementPages />

        
        </div>
      </div>
    );
  };

  export default Dashboard;

