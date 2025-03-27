
import { useState } from "react";
import { 
  Bell, 
  BellOff, 
  Calendar, 
  Clock, 
  Edit, 
  Filter, 
  Info, 
  MessageSquare, 
  Plus, 
  Search, 
  Shield, 
  Trash, 
  Users, 
  X 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const alertRules = [
  {
    id: 1,
    name: "High Message Volume",
    description: "Alert when message volume exceeds threshold",
    type: "message",
    threshold: "1000 messages / hour",
    status: "active",
    priority: "high",
    notifyChannels: ["email", "sms", "dashboard"],
    lastTriggered: "2 hours ago",
  },
  {
    id: 2,
    name: "Failed Scheduled Messages",
    description: "Alert when scheduled messages fail to send",
    type: "schedule",
    threshold: "5 failures",
    status: "active",
    priority: "critical",
    notifyChannels: ["email", "sms", "slack", "dashboard"],
    lastTriggered: "Never",
  },
  {
    id: 3,
    name: "New Team Member Login",
    description: "Alert when new team members log in",
    type: "security",
    threshold: "Any new login",
    status: "inactive",
    priority: "medium",
    notifyChannels: ["email", "dashboard"],
    lastTriggered: "1 day ago",
  },
  {
    id: 4,
    name: "WhatsApp API Connection Loss",
    description: "Alert when connection to WhatsApp API is lost",
    type: "system",
    threshold: "10 seconds disconnect",
    status: "active",
    priority: "critical",
    notifyChannels: ["email", "sms", "slack", "dashboard"],
    lastTriggered: "3 days ago",
  },
  {
    id: 5,
    name: "Low Account Balance",
    description: "Alert when account balance is low",
    type: "billing",
    threshold: "Below $50",
    status: "active",
    priority: "medium",
    notifyChannels: ["email", "dashboard"],
    lastTriggered: "Never",
  },
];

const alertHistory = [
  {
    id: 1,
    ruleName: "High Message Volume",
    timestamp: "2023-05-15 14:32:45",
    details: "Message volume exceeded 1000 messages/hour (actual: 1245)",
    status: "resolved",
    resolvedAt: "2023-05-15 15:10:22",
    resolvedBy: "John Doe",
  },
  {
    id: 2,
    ruleName: "WhatsApp API Connection Loss",
    timestamp: "2023-05-12 09:15:33",
    details: "Connection to WhatsApp API lost for 23 seconds",
    status: "resolved",
    resolvedAt: "2023-05-12 09:17:02",
    resolvedBy: "System",
  },
  {
    id: 3,
    ruleName: "New Team Member Login",
    timestamp: "2023-05-14 11:45:12",
    details: "New login detected for user: sarah.parker@example.com",
    status: "acknowledged",
    acknowledgedBy: "Jane Smith",
  },
  {
    id: 4,
    ruleName: "Failed Scheduled Messages",
    timestamp: "2023-05-10 16:22:08",
    details: "3 scheduled messages failed to send due to rate limiting",
    status: "resolved",
    resolvedAt: "2023-05-10 16:40:15",
    resolvedBy: "Robert Johnson",
  },
  {
    id: 5,
    ruleName: "WhatsApp API Connection Loss",
    timestamp: "2023-05-09 20:11:37",
    details: "Connection to WhatsApp API lost for 45 seconds",
    status: "resolved",
    resolvedAt: "2023-05-09 20:15:22",
    resolvedBy: "System",
  },
];

const Alerts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredRules = alertRules.filter((rule) => {
    const matchesSearch = rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rule.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || rule.type === typeFilter;
    const matchesPriority = priorityFilter === "all" || rule.priority === priorityFilter;
    const matchesStatus = statusFilter === "all" || rule.status === statusFilter;
    
    return matchesSearch && matchesType && matchesPriority && matchesStatus;
  });

  // Priority badge color
  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      default:
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    }
  };

  // Status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "acknowledged":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Type icon
  const getTypeIcon = (type) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4" />;
      case "schedule":
        return <Calendar className="h-4 w-4" />;
      case "security":
        return <Shield className="h-4 w-4" />;
      case "system":
        return <Info className="h-4 w-4" />;
      case "billing":
        return <Users className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Alerts</h1>
          <p className="text-muted-foreground">
            Manage alert rules and notification settings
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Alert Rule
        </Button>
      </div>

      <Tabs defaultValue="rules">
        <TabsList className="mb-4">
          <TabsTrigger value="rules">Alert Rules</TabsTrigger>
          <TabsTrigger value="history">Alert History</TabsTrigger>
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Alert Rules</CardTitle>
                  <CardDescription>Configure what triggers alerts in your system</CardDescription>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search rules..."
                      className="pl-8 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full sm:w-[130px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="message">Message</SelectItem>
                      <SelectItem value="schedule">Schedule</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-full sm:w-[130px]">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Status</TableHead>
                    <TableHead>Rule Name</TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead className="hidden lg:table-cell">Threshold</TableHead>
                    <TableHead className="hidden md:table-cell">Priority</TableHead>
                    <TableHead className="hidden lg:table-cell">Last Triggered</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Switch
                            checked={rule.status === "active"}
                            aria-label={`${rule.status === "active" ? "Disable" : "Enable"} ${rule.name}`}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{rule.name}</div>
                          <div className="text-sm text-muted-foreground hidden md:block">{rule.description}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(rule.type)}
                          <span className="capitalize">{rule.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {rule.threshold}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline" className={getPriorityBadgeColor(rule.priority)}>
                          {rule.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {rule.lastTriggered}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Alert History</CardTitle>
                  <CardDescription>View past alerts and their resolution status</CardDescription>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Clock className="h-4 w-4 mr-2" />
                    Last 7 days
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alert</TableHead>
                    <TableHead className="hidden md:table-cell">Timestamp</TableHead>
                    <TableHead className="hidden lg:table-cell">Details</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Resolution</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alertHistory.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>
                        <div className="font-medium">{alert.ruleName}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {alert.timestamp}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="text-sm max-w-xs truncate">{alert.details}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadgeColor(alert.status)}>
                          {alert.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {alert.status === "resolved" ? (
                          <div className="text-sm">
                            <div>By: {alert.resolvedBy}</div>
                            <div className="text-muted-foreground">{alert.resolvedAt}</div>
                          </div>
                        ) : alert.status === "acknowledged" ? (
                          <div className="text-sm">
                            <div>By: {alert.acknowledgedBy}</div>
                          </div>
                        ) : null}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Notification Channels</CardTitle>
                <CardDescription>Configure where alerts are sent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Dashboard Notifications</div>
                        <div className="text-sm text-muted-foreground">Show alerts in the dashboard</div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-muted-foreground">Send alerts to admin@example.com</div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">SMS Notifications</div>
                        <div className="text-sm text-muted-foreground">Send alerts to +1 (555) 123-4567</div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Slack Integration</div>
                        <div className="text-sm text-muted-foreground">Send alerts to #alerts channel</div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <BellOff className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Quiet Hours</div>
                        <div className="text-sm text-muted-foreground">Silence notifications from 10PM to 7AM</div>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Preferences</CardTitle>
                <CardDescription>Configure how alerts behave</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="font-medium">Minimum Alert Priority</div>
                    <Select defaultValue="low">
                      <SelectTrigger>
                        <SelectValue placeholder="Select minimum priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical Only</SelectItem>
                        <SelectItem value="high">High & Critical</SelectItem>
                        <SelectItem value="medium">Medium & Above</SelectItem>
                        <SelectItem value="low">All Priorities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="font-medium">Auto-resolve Timeouts</div>
                    <div className="border rounded-lg divide-y">
                      <div className="flex items-center justify-between p-3">
                        <div className="text-sm">Critical alerts</div>
                        <div className="text-sm font-medium">Never</div>
                      </div>
                      <div className="flex items-center justify-between p-3">
                        <div className="text-sm">High alerts</div>
                        <div className="text-sm font-medium">24 hours</div>
                      </div>
                      <div className="flex items-center justify-between p-3">
                        <div className="text-sm">Medium alerts</div>
                        <div className="text-sm font-medium">12 hours</div>
                      </div>
                      <div className="flex items-center justify-between p-3">
                        <div className="text-sm">Low alerts</div>
                        <div className="text-sm font-medium">4 hours</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-medium">Notification Grouping</div>
                    <Select defaultValue="group">
                      <SelectTrigger>
                        <SelectValue placeholder="Select grouping mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Send Immediately</SelectItem>
                        <SelectItem value="group">Group Similar (15 min)</SelectItem>
                        <SelectItem value="digest">Daily Digest</SelectItem>
                      </SelectContent>
                    </Select>
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

export default Alerts;
