
import { useState } from "react";
import { 
  Users, 
  Calendar, 
  MessageCircle, 
  AlertTriangle,
  Activity,
  Download,
  User,
  MessageSquare,
  CheckCircle,
  XCircle,
  Bell
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardStatsCard from "@/components/DashboardStatsCard";
import UpcomingEventCard, { Event } from "@/components/UpcomingEventCard";
import RecentActivityItem, { ActivityItem } from "@/components/RecentActivityItem";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Sample data for charts
const messageData = [
  { name: "Mon", messages: 240 },
  { name: "Tue", messages: 300 },
  { name: "Wed", messages: 320 },
  { name: "Thu", messages: 290 },
  { name: "Fri", messages: 390 },
  { name: "Sat", messages: 190 },
  { name: "Sun", messages: 150 },
];

const userTypeData = [
  { name: "Regular", value: 400 },
  { name: "Premium", value: 300 },
  { name: "Enterprise", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Strategy Meeting with Marketing",
    date: "Today",
    time: "10:00 AM",
    participants: ["John D", "Lisa M", "Alex K", "Sarah P"],
    type: "meeting",
    status: "upcoming",
  },
  {
    id: "2",
    title: "Client Call - New Feature Demo",
    date: "Today",
    time: "2:30 PM",
    participants: ["Mark S", "Client A"],
    type: "call",
    status: "upcoming",
  },
  {
    id: "3",
    title: "WhatsApp Integration Planning",
    date: "Tomorrow",
    time: "9:15 AM",
    participants: ["Dev Team", "Product"],
    type: "meeting",
    status: "upcoming",
  },
];

const sampleActivities: ActivityItem[] = [
  {
    id: "1",
    title: "New team member added",
    description: "James Peterson was added to Development team",
    time: "Just now",
    icon: <User size={16} />,
    type: "success",
  },
  {
    id: "2",
    title: "Security alert",
    description: "Unusual login attempt detected from IP 192.168.1.4",
    time: "2h ago",
    icon: <AlertTriangle size={16} />,
    type: "error",
  },
  {
    id: "3",
    title: "WhatsApp connected",
    description: "WhatsApp business account successfully connected",
    time: "5h ago",
    icon: <MessageSquare size={16} />,
    type: "success",
  },
  {
    id: "4",
    title: "Monthly report generated",
    description: "December activity report is ready for download",
    time: "Yesterday",
    icon: <Download size={16} />,
    type: "default",
  },
  {
    id: "5",
    title: "System maintenance",
    description: "Scheduled maintenance completed successfully",
    time: "2d ago",
    icon: <CheckCircle size={16} />,
    type: "success",
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Dashboard header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your WhatsApp scheduling system
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button size="sm">
            <Activity className="h-4 w-4 mr-2" />
            Live Status
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStatsCard
          title="Total Users"
          value="12,347"
          description="From all channels"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 12, positive: true }}
        />
        <DashboardStatsCard
          title="Active Schedules"
          value="2,103"
          description="Currently running"
          icon={<Calendar className="h-4 w-4" />}
          trend={{ value: 8, positive: true }}
        />
        <DashboardStatsCard
          title="WhatsApp Messages"
          value="53,291"
          description="Sent this month"
          icon={<MessageCircle className="h-4 w-4" />}
          trend={{ value: 14, positive: true }}
        />
        <DashboardStatsCard
          title="Alert Incidents"
          value="23"
          description="This week"
          icon={<AlertTriangle className="h-4 w-4" />}
          trend={{ value: 5, positive: false }}
        />
      </div>

      {/* Main content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Message activity chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Message Activity</CardTitle>
            <CardDescription>Daily WhatsApp message volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={messageData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0288d1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0288d1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="messages"
                  stroke="#0288d1"
                  fillOpacity={1}
                  fill="url(#colorMessages)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User type distribution */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>By subscription type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {userTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Upcoming events */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Next scheduled activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sampleEvents.map((event) => (
              <UpcomingEventCard key={event.id} event={event} />
            ))}
            <Button variant="outline" className="w-full">View All Events</Button>
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-0 overflow-y-auto max-h-[300px]">
                {sampleActivities.map((activity) => (
                  <RecentActivityItem key={activity.id} item={activity} />
                ))}
              </TabsContent>
              <TabsContent value="alerts" className="space-y-0 overflow-y-auto max-h-[300px]">
                {sampleActivities
                  .filter((activity) => activity.type === "error" || activity.type === "warning")
                  .map((activity) => (
                    <RecentActivityItem key={activity.id} item={activity} />
                  ))}
              </TabsContent>
              <TabsContent value="system" className="space-y-0 overflow-y-auto max-h-[300px]">
                {sampleActivities
                  .filter((activity) => activity.type === "success" || activity.type === "default")
                  .map((activity) => (
                    <RecentActivityItem key={activity.id} item={activity} />
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
