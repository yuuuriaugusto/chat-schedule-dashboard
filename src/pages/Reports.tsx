
import { useState } from "react";
import { 
  FileText, 
  Download, 
  Calendar, 
  ChevronDown, 
  BarChart, 
  PieChart as PieChartIcon, 
  TrendingUp, 
  Filter,
  RefreshCw,
  Share2,
  MessageSquare,
  Clock,
  Users,
  DollarSign
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Sample data for charts
const messageActivityData = [
  { date: "2023-05-01", count: 245 },
  { date: "2023-05-02", count: 288 },
  { date: "2023-05-03", count: 320 },
  { date: "2023-05-04", count: 400 },
  { date: "2023-05-05", count: 458 },
  { date: "2023-05-06", count: 387 },
  { date: "2023-05-07", count: 290 },
  { date: "2023-05-08", count: 310 },
  { date: "2023-05-09", count: 370 },
  { date: "2023-05-10", count: 342 },
  { date: "2023-05-11", count: 318 },
  { date: "2023-05-12", count: 395 },
  { date: "2023-05-13", count: 410 },
  { date: "2023-05-14", count: 310 },
];

const messageTypeData = [
  { name: "Scheduling", value: 45 },
  { name: "Notifications", value: 30 },
  { name: "Customer Support", value: 15 },
  { name: "Other", value: 10 },
];

const engagementData = [
  { name: "Jan", engagement: 65 },
  { name: "Feb", engagement: 72 },
  { name: "Mar", engagement: 78 },
  { name: "Apr", engagement: 74 },
  { name: "May", engagement: 83 },
];

const responseTimeData = [
  { time: "<1 min", percentage: 35 },
  { time: "1-5 mins", percentage: 45 },
  { time: "5-15 mins", percentage: 15 },
  { time: ">15 mins", percentage: 5 },
];

const userGrowthData = [
  { month: "Jan", users: 1200 },
  { month: "Feb", users: 1350 },
  { month: "Mar", users: 1450 },
  { month: "Apr", users: 1600 },
  { month: "May", users: 1750 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Reports = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [reportPeriod, setReportPeriod] = useState("last30days");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Analytics and performance insights
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={reportPeriod} onValueChange={setReportPeriod}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Last 7 days</SelectItem>
              <SelectItem value="last30days">Last 30 days</SelectItem>
              <SelectItem value="last90days">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem>
                Export as Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Messages
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,546</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 inline-flex items-center mr-1">
                ↑ 18.2%
              </span>
              from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Response Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2 min</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 inline-flex items-center mr-1">
                ↓ 12.5%
              </span>
              faster than previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,752</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 inline-flex items-center mr-1">
                ↑ 9.3%
              </span>
              from previous period
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Message Activity</CardTitle>
                <CardDescription>Message volume over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={messageActivityData}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#0088FE" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="date"
                      tickFormatter={(date) => {
                        const d = new Date(date);
                        return `${d.getMonth() + 1}/${d.getDate()}`;
                      }}
                    />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip
                      labelFormatter={(date) => {
                        const d = new Date(date);
                        return d.toLocaleDateString();
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#0088FE"
                      fillOpacity={1}
                      fill="url(#colorCount)"
                      name="Messages"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Change Date Range
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Data
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Message Types</CardTitle>
                <CardDescription>Distribution by purpose</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={messageTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {messageTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New users over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userGrowthData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#00C49F"
                      activeDot={{ r: 8 }}
                      name="Users"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="messages">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Message Volume</CardTitle>
                <CardDescription>Total messages by day of week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={[
                    { day: "Mon", messages: 320 },
                    { day: "Tue", messages: 380 },
                    { day: "Wed", messages: 420 },
                    { day: "Thu", messages: 390 },
                    { day: "Fri", messages: 450 },
                    { day: "Sat", messages: 280 },
                    { day: "Sun", messages: 220 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="messages" fill="#0088FE" name="Messages" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Message Response Time</CardTitle>
                <CardDescription>Distribution of response times</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={responseTimeData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="percentage" fill="#00C49F" name="Percentage" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Message Success Rate</CardTitle>
                <CardDescription>Delivery and read receipt statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Sent Messages</div>
                      <div className="text-sm font-medium">12,546</div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Delivered</div>
                      <div className="text-sm font-medium">12,100 (96.4%)</div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "96.4%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Read</div>
                      <div className="text-sm font-medium">10,870 (86.6%)</div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "86.6%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Responded</div>
                      <div className="text-sm font-medium">8,245 (65.7%)</div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "65.7%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>Monthly engagement trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="engagement" stroke="#8884d8" activeDot={{ r: 8 }} name="Engagement Rate (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feature Usage</CardTitle>
                <CardDescription>Most used system features</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart
                    data={[
                      { feature: "Scheduling", usage: 85 },
                      { feature: "WhatsApp", usage: 75 },
                      { feature: "Reports", usage: 60 },
                      { feature: "Team Mgmt", usage: 45 },
                      { feature: "Security", usage: 30 },
                    ]}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="feature" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="usage" fill="#8884d8" name="Usage (%)" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>User Retention</CardTitle>
                <CardDescription>Weekly active user retention rate</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={[
                      { week: "Week 1", retention: 100 },
                      { week: "Week 2", retention: 86 },
                      { week: "Week 3", retention: 76 },
                      { week: "Week 4", retention: 72 },
                      { week: "Week 5", retention: 68 },
                      { week: "Week 6", retention: 65 },
                      { week: "Week 7", retention: 63 },
                      { week: "Week 8", retention: 61 },
                    ]}
                  >
                    <defs>
                      <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="week" />
                    <YAxis domain={[0, 100]} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="retention"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorRetention)"
                      name="Retention (%)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financials">
          <div className="grid gap-6 md:grid-cols-6">
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={[
                      { month: "Jan", revenue: 4200 },
                      { month: "Feb", revenue: 4800 },
                      { month: "Mar", revenue: 5600 },
                      { month: "Apr", revenue: 6200 },
                      { month: "May", revenue: 7100 },
                    ]}
                  >
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#82ca9d"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                      name="Revenue"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Subscription Distribution</CardTitle>
                <CardDescription>By plan type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={[
                        { name: "Basic", value: 30 },
                        { name: "Pro", value: 45 },
                        { name: "Enterprise", value: 25 },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell fill="#0088FE" />
                      <Cell fill="#00C49F" />
                      <Cell fill="#FFBB28" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">ARR</div>
                      <div className="text-xl font-bold">$520,400</div>
                    </div>
                    <div className="p-2 bg-green-50 text-green-500 rounded-full">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">MRR</div>
                      <div className="text-xl font-bold">$43,366</div>
                    </div>
                    <div className="p-2 bg-green-50 text-green-500 rounded-full">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">ARPU</div>
                      <div className="text-xl font-bold">$24.75</div>
                    </div>
                    <div className="p-2 bg-green-50 text-green-500 rounded-full">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Revenue by Feature</CardTitle>
                <CardDescription>Revenue contribution by system feature</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart
                    data={[
                      { feature: "WhatsApp Integration", revenue: 35000 },
                      { feature: "AI Scheduling", revenue: 25000 },
                      { feature: "Team Management", revenue: 18000 },
                      { feature: "Security Controls", revenue: 12000 },
                      { feature: "Report System", revenue: 10000 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="feature" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#0088FE" name="Revenue" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Financial Reports</CardTitle>
                    <CardDescription>Download detailed financial reports</CardDescription>
                  </div>
                  <Button>
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Custom Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-medium">Monthly Revenue Report</div>
                        <div className="text-sm text-muted-foreground">May 2023</div>
                      </div>
                    </div>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-green-100 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <div className="font-medium">Quarterly Financial Summary</div>
                        <div className="text-sm text-muted-foreground">Q2 2023</div>
                      </div>
                    </div>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-purple-100 flex items-center justify-center">
                        <BarChart className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <div className="font-medium">Subscription Growth Analysis</div>
                        <div className="text-sm text-muted-foreground">Last 6 months</div>
                      </div>
                    </div>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
