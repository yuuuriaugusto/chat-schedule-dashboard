
import { useState } from "react";
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Smartphone, 
  MapPin, 
  Eye, 
  EyeOff, 
  Plus, 
  Check, 
  X,
  Globe,
  Clock,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample security data
const loginHistory = [
  {
    id: 1,
    user: "John Doe",
    email: "john.doe@example.com",
    timestamp: "2023-05-15 09:32:45",
    ip: "192.168.1.1",
    location: "San Francisco, USA",
    device: "Chrome / Windows",
    status: "success",
  },
  {
    id: 2,
    user: "Jane Smith",
    email: "jane.smith@example.com",
    timestamp: "2023-05-14 14:22:15",
    ip: "192.168.1.5",
    location: "New York, USA",
    device: "Safari / Mac OS",
    status: "success",
  },
  {
    id: 3,
    user: "Unknown",
    email: "john.doe@example.com",
    timestamp: "2023-05-13 18:45:22",
    ip: "203.0.113.1",
    location: "Kiev, Ukraine",
    device: "Firefox / Linux",
    status: "failed",
  },
  {
    id: 4,
    user: "Robert Johnson",
    email: "robert.johnson@example.com",
    timestamp: "2023-05-12 11:17:35",
    ip: "192.168.1.22",
    location: "Austin, USA",
    device: "Edge / Windows",
    status: "success",
  },
  {
    id: 5,
    user: "Emily Davis",
    email: "emily.davis@example.com",
    timestamp: "2023-05-11 15:55:10",
    ip: "192.168.1.15",
    location: "Seattle, USA",
    device: "Chrome / Mac OS",
    status: "success",
  },
];

const whitelistedIPs = [
  {
    id: 1,
    ip: "192.168.1.0/24",
    description: "Office Network",
    addedBy: "John Doe",
    addedOn: "2023-04-10",
  },
  {
    id: 2,
    ip: "203.0.113.5",
    description: "Remote Developer",
    addedBy: "Jane Smith",
    addedOn: "2023-04-15",
  },
  {
    id: 3,
    ip: "198.51.100.0/24",
    description: "Marketing Team",
    addedBy: "Robert Johnson",
    addedOn: "2023-04-22",
  },
];

const whitelistedNumbers = [
  {
    id: 1,
    number: "+1 (555) 123-4567",
    description: "CEO Phone",
    addedBy: "John Doe",
    addedOn: "2023-04-10",
  },
  {
    id: 2,
    number: "+1 (555) 987-6543",
    description: "Support Team",
    addedBy: "Jane Smith",
    addedOn: "2023-04-15",
  },
  {
    id: 3,
    number: "+1 (555) 456-7890",
    description: "Development Team",
    addedBy: "Robert Johnson",
    addedOn: "2023-04-22",
  },
];

const Security = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState("sk_test_51NcyRMD0YUwFCJ7NJuO1eWP5RbFWg8jMN");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Security</h1>
          <p className="text-muted-foreground">
            Manage security settings and access controls
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-100 text-green-800 gap-1 px-3 py-1 text-xs">
            <ShieldCheck className="h-3 w-3" />
            System Secure
          </Badge>
          <Button>
            <Shield className="h-4 w-4 mr-2" />
            Security Scan
          </Button>
        </div>
      </div>

      <Tabs defaultValue="access">
        <TabsList className="mb-4">
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="history">Login History</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="access">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>IP Whitelist</CardTitle>
                <CardDescription>Control which IP addresses can access the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Lock className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">IP Restriction</div>
                        <div className="text-sm text-muted-foreground">
                          Only allow access from whitelisted IPs
                        </div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>IP Address</TableHead>
                        <TableHead className="hidden md:table-cell">Description</TableHead>
                        <TableHead className="hidden lg:table-cell">Added By</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {whitelistedIPs.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="font-medium">{item.ip}</div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{item.description}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="text-sm">
                              <div>{item.addedBy}</div>
                              <div className="text-muted-foreground">{item.addedOn}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add IP Address
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>WhatsApp Number Whitelist</CardTitle>
                <CardDescription>Control which phone numbers can use WhatsApp features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Number Restriction</div>
                        <div className="text-sm text-muted-foreground">
                          Only allow whitelisted numbers
                        </div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Phone Number</TableHead>
                        <TableHead className="hidden md:table-cell">Description</TableHead>
                        <TableHead className="hidden lg:table-cell">Added By</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {whitelistedNumbers.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="font-medium">{item.number}</div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{item.description}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="text-sm">
                              <div>{item.addedBy}</div>
                              <div className="text-muted-foreground">{item.addedOn}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Phone Number
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="auth">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Authentication Settings</CardTitle>
                <CardDescription>Configure how users authenticate to the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Two-Factor Authentication (2FA)</div>
                        <div className="text-sm text-muted-foreground">
                          Require 2FA for all admin accounts
                        </div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Lock className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Password Requirements</div>
                        <div className="text-sm text-muted-foreground">
                          Enforce strong password policies
                        </div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Session Timeout</div>
                        <div className="text-sm text-muted-foreground">
                          Log users out after period of inactivity
                        </div>
                      </div>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 min</SelectItem>
                        <SelectItem value="30">30 min</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Failed Login Lockout</div>
                        <div className="text-sm text-muted-foreground">
                          Lock account after failed login attempts
                        </div>
                      </div>
                    </div>
                    <Select defaultValue="5">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 attempts</SelectItem>
                        <SelectItem value="5">5 attempts</SelectItem>
                        <SelectItem value="10">10 attempts</SelectItem>
                        <SelectItem value="never">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Authentication Settings</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Single Sign-On (SSO)</CardTitle>
                <CardDescription>Configure external authentication providers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                          <path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">Google SSO</div>
                        <div className="text-sm text-muted-foreground">
                          Allow users to sign in with Google
                        </div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">GitHub SSO</div>
                        <div className="text-sm text-muted-foreground">
                          Allow users to sign in with GitHub
                        </div>
                      </div>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.44 20.97c.04-1.01-.75-1.77-1.78-1.77-1.03 0-1.82.76-1.78 1.77 0 1.01.75 1.77 1.78 1.77 1.03 0 1.82-.76 1.78-1.77zm-15.9-1.77c-1.03 0-1.82.76-1.78 1.77 0 1.01.75 1.77 1.78 1.77 1.03 0 1.82-.76 1.78-1.77-.04-1.01-.75-1.77-1.78-1.77zm15.9-4.52c-1.03 0-1.82.76-1.78 1.77 0 1.01.75 1.77 1.78 1.77 1.03 0 1.82-.76 1.78-1.77-.04-1.01-.75-1.77-1.78-1.77zm-15.9-1.77c-1.03 0-1.82.76-1.78 1.77 0 1.01.75 1.77 1.78 1.77 1.03 0 1.82-.76 1.78-1.77-.04-1.01-.75-1.77-1.78-1.77zm15.9-4.52c-1.03 0-1.82.76-1.78 1.77 0 1.01.75 1.77 1.78 1.77 1.03 0 1.82-.76 1.78-1.77-.04-1.01-.75-1.77-1.78-1.77zm-15.9-1.77c-1.03 0-1.82.76-1.78 1.77 0 1.01.75 1.77 1.78 1.77 1.03 0 1.82-.76 1.78-1.77-.04-1.01-.75-1.77-1.78-1.77zm17.68 0c-1.03 0-1.82.76-1.78 1.77 0 1.01.75 1.77 1.78 1.77 1.03 0 1.82-.76 1.78-1.77-.04-1.01-.75-1.77-1.78-1.77z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">Microsoft SSO</div>
                        <div className="text-sm text-muted-foreground">
                          Allow users to sign in with Microsoft
                        </div>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Configure SSO Settings</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Login History</CardTitle>
              <CardDescription>Monitor recent login attempts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead className="hidden md:table-cell">Date & Time</TableHead>
                    <TableHead className="hidden md:table-cell">IP Address</TableHead>
                    <TableHead className="hidden lg:table-cell">Location</TableHead>
                    <TableHead className="hidden lg:table-cell">Device</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loginHistory.map((login) => (
                    <TableRow key={login.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{login.user}</div>
                          <div className="text-sm text-muted-foreground hidden md:block">{login.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{login.timestamp}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          {login.ip}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {login.location}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{login.device}</TableCell>
                      <TableCell>
                        <Badge className={login.status === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {login.status === "success" ? (
                            <Check className="h-3 w-3 mr-1" />
                          ) : (
                            <X className="h-3 w-3 mr-1" />
                          )}
                          {login.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline">
                Download Full History
              </Button>
              <Button variant="outline">
                Clear History
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Security</CardTitle>
              <CardDescription>Manage API keys and access tokens</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="api-key">WhatsApp API Key</Label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <Input
                        id="api-key"
                        value={apiKey}
                        type={showApiKey ? "text" : "password"}
                        className="pr-10"
                        readOnly
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showApiKey ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                    <Button variant="outline" className="ml-2">
                      Copy
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This key provides access to the WhatsApp Business API. Keep it secure.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="font-medium">API Access Controls</div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border p-3 rounded-lg">
                      <div>
                        <div className="text-sm font-medium">Rate Limiting</div>
                        <div className="text-xs text-muted-foreground">
                          Limit API requests to prevent abuse
                        </div>
                      </div>
                      <Select defaultValue="1000">
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Limit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="100">100/min</SelectItem>
                          <SelectItem value="500">500/min</SelectItem>
                          <SelectItem value="1000">1000/min</SelectItem>
                          <SelectItem value="unlimited">Unlimited</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between border p-3 rounded-lg">
                      <div>
                        <div className="text-sm font-medium">IP Restrictions</div>
                        <div className="text-xs text-muted-foreground">
                          Restrict API access to whitelisted IPs
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between border p-3 rounded-lg">
                      <div>
                        <div className="text-sm font-medium">API Usage Logging</div>
                        <div className="text-xs text-muted-foreground">
                          Log all API requests for security auditing
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>API Keys</Label>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Generate New Key
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Key Name</TableHead>
                        <TableHead className="hidden md:table-cell">Created</TableHead>
                        <TableHead className="hidden lg:table-cell">Last Used</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Production Key</div>
                          <div className="text-sm text-muted-foreground">Live environment</div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">2023-04-15</TableCell>
                        <TableCell className="hidden lg:table-cell">2 hours ago</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Revoke</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Development Key</div>
                          <div className="text-sm text-muted-foreground">Testing environment</div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">2023-04-10</TableCell>
                        <TableCell className="hidden lg:table-cell">1 day ago</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Revoke</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Rotate API Keys
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Security;
