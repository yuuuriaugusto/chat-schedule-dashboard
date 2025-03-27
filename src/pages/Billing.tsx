
import { useState } from "react";
import { 
  CreditCard, 
  DollarSign, 
  Package, 
  CheckCircle, 
  Clock, 
  X, 
  AlertCircle,
  FileText,
  Download,
  ChevronRight,
  Plus,
  ShieldCheck,
  RefreshCw,
  Settings,
  Lock
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";

// Sample billing data
const subscriptionPlans = [
  {
    id: 1,
    name: "Basic",
    price: 29,
    period: "month",
    features: [
      "1,000 WhatsApp messages/month",
      "5 team members",
      "Basic reporting",
      "Standard support",
      "1 WhatsApp number",
    ],
    recommended: false,
  },
  {
    id: 2,
    name: "Professional",
    price: 79,
    period: "month",
    features: [
      "5,000 WhatsApp messages/month",
      "15 team members",
      "Advanced reporting",
      "Priority support",
      "3 WhatsApp numbers",
      "IP whitelisting",
      "API access",
    ],
    recommended: true,
  },
  {
    id: 3,
    name: "Enterprise",
    price: 199,
    period: "month",
    features: [
      "Unlimited WhatsApp messages",
      "Unlimited team members",
      "Custom reporting",
      "Dedicated support",
      "10 WhatsApp numbers",
      "Advanced security features",
      "Custom API integration",
      "SLA guarantees",
    ],
    recommended: false,
  },
];

const invoices = [
  {
    id: "INV-001",
    date: "May 1, 2023",
    amount: 79.00,
    status: "paid",
    description: "Professional Plan - Monthly",
  },
  {
    id: "INV-002",
    date: "Apr 1, 2023",
    amount: 79.00,
    status: "paid",
    description: "Professional Plan - Monthly",
  },
  {
    id: "INV-003",
    date: "Mar 1, 2023",
    amount: 79.00,
    status: "paid",
    description: "Professional Plan - Monthly",
  },
  {
    id: "INV-004",
    date: "Feb 1, 2023",
    amount: 29.00,
    status: "paid",
    description: "Basic Plan - Monthly",
  },
  {
    id: "INV-005",
    date: "Jan 1, 2023",
    amount: 29.00,
    status: "paid",
    description: "Basic Plan - Monthly",
  },
];

const paymentMethods = [
  {
    id: 1,
    type: "visa",
    last4: "4242",
    expiry: "05/2025",
    default: true,
  },
  {
    id: 2,
    type: "mastercard",
    last4: "5678",
    expiry: "09/2024",
    default: false,
  },
];

const Billing = () => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [yearlyBilling, setYearlyBilling] = useState(false);

  // Current subscription info
  const currentPlan = subscriptionPlans[1]; // Professional
  const messageUsage = 3245;
  const messageLimit = 5000;
  const messagePercentage = (messageUsage / messageLimit) * 100;
  const renewalDate = "June 1, 2023";

  const getRemainingDays = () => {
    const today = new Date();
    const renewal = new Date("2023-06-01");
    const diffTime = Math.abs(renewal - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const remainingDays = getRemainingDays();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
          <p className="text-muted-foreground">
            Manage your subscription and payment methods
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Billing History
          </Button>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Billing Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="subscription">
        <TabsList className="mb-4">
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="usage">Usage & Limits</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Your subscription details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-primary" />
                        <span className="font-medium text-lg">{currentPlan.name}</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex items-end gap-1">
                      <span className="text-2xl font-bold">${currentPlan.price}</span>
                      <span className="text-muted-foreground">/{currentPlan.period}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Plan Features</div>
                    <ul className="space-y-2">
                      {currentPlan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Renewal Information</div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Renews automatically on {renewalDate} ({remainingDays} days from now)
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full">Upgrade Plan</Button>
                <Button variant="outline" className="w-full">Cancel Subscription</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Plans</CardTitle>
                <CardDescription>
                  Select a plan that works for you
                </CardDescription>
                <div className="flex items-center justify-end space-x-2 pt-2">
                  <span className="text-sm text-muted-foreground">Monthly</span>
                  <Switch 
                    checked={yearlyBilling} 
                    onCheckedChange={setYearlyBilling} 
                  />
                  <span className="text-sm text-muted-foreground">
                    Yearly
                    <Badge className="ml-1 bg-green-100 text-green-800">Save 20%</Badge>
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subscriptionPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`border rounded-lg p-4 relative ${
                        plan.recommended ? "border-primary" : ""
                      }`}
                    >
                      {plan.recommended && (
                        <div className="absolute -top-3 left-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
                          Recommended
                        </div>
                      )}
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{plan.name}</h3>
                          <div className="flex items-baseline mt-1">
                            <span className="text-2xl font-bold">
                              ${yearlyBilling ? (plan.price * 0.8 * 12).toFixed(0) : plan.price}
                            </span>
                            <span className="text-muted-foreground ml-1">
                              /{yearlyBilling ? "year" : "month"}
                            </span>
                          </div>
                          <div className="mt-2 text-sm text-muted-foreground">
                            {plan.features[0]}
                          </div>
                        </div>
                        <Button
                          variant={plan.id === currentPlan.id ? "outline" : "default"}
                          size="sm"
                        >
                          {plan.id === currentPlan.id ? "Current" : "Select"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  Need a custom plan? <a href="#" className="text-primary hover:underline">Contact sales</a>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment options</CardDescription>
                </div>
                <Button onClick={() => setShowAddCard(!showAddCard)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between border p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">
                          {method.type === "visa" ? "Visa" : "Mastercard"} •••• {method.last4}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Expires {method.expiry}
                          {method.default && (
                            <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      {!method.default && (
                        <Button variant="outline" size="sm">Remove</Button>
                      )}
                    </div>
                  </div>
                ))}

                {showAddCard && (
                  <div className="border p-4 rounded-lg">
                    <div className="font-medium mb-3">Add new payment method</div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                          <label className="text-sm font-medium mb-1 block">Card Number</label>
                          <input
                            type="text"
                            placeholder="1234 1234 1234 1234"
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Expiration Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">CVC</label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setShowAddCard(false)}>
                          Cancel
                        </Button>
                        <Button>Save Card</Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                <span>All card information is encrypted and securely stored</span>
              </div>
            </CardFooter>
          </Card>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>Your billing details for invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium mb-1">Name</div>
                      <div>John Doe</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Email</div>
                      <div>john.doe@example.com</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm font-medium mb-1">Address</div>
                      <div>1234 Main St, Suite 100</div>
                      <div>San Francisco, CA 94103</div>
                      <div>United States</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Update Billing Info
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing Settings</CardTitle>
                <CardDescription>Configure your billing preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Email Receipts</div>
                      <div className="text-sm text-muted-foreground">
                        Receive receipts via email
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Payment Reminders</div>
                      <div className="text-sm text-muted-foreground">
                        Get notified before renewal
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Usage Alerts</div>
                      <div className="text-sm text-muted-foreground">
                        Get notifications when approaching limits
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>WhatsApp Message Usage</CardTitle>
                <CardDescription>Current billing period: May 1-31, 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="text-sm font-medium">Total Messages</div>
                      <div className="text-sm font-medium">
                        {messageUsage} / {messageLimit} ({(messagePercentage).toFixed(1)}%)
                      </div>
                    </div>
                    <Progress value={messagePercentage} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">
                      {messageLimit - messageUsage} messages remaining this month
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm font-medium text-muted-foreground">Sent</div>
                      <div className="text-2xl font-bold mt-1">3,012</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm font-medium text-muted-foreground">Delivered</div>
                      <div className="text-2xl font-bold mt-1">2,954</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm font-medium text-muted-foreground">Failed</div>
                      <div className="text-2xl font-bold mt-1">58</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Message Type Breakdown</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex justify-between p-3 border rounded-lg">
                        <div className="text-sm">Scheduling Messages</div>
                        <div className="text-sm font-medium">1,452</div>
                      </div>
                      <div className="flex justify-between p-3 border rounded-lg">
                        <div className="text-sm">Notifications</div>
                        <div className="text-sm font-medium">876</div>
                      </div>
                      <div className="flex justify-between p-3 border rounded-lg">
                        <div className="text-sm">Customer Support</div>
                        <div className="text-sm font-medium">523</div>
                      </div>
                      <div className="flex justify-between p-3 border rounded-lg">
                        <div className="text-sm">Other</div>
                        <div className="text-sm font-medium">394</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Usage
                </Button>
              </CardFooter>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Limits</CardTitle>
                  <CardDescription>Based on your plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>WhatsApp Messages</span>
                        <span className="font-medium">{messageLimit.toLocaleString()}/month</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Team Members</span>
                        <span className="font-medium">15</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>WhatsApp Numbers</span>
                        <span className="font-medium">3</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>API Rate Limit</span>
                        <span className="font-medium">1,000 req/min</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Report Exports</span>
                        <span className="font-medium">Unlimited</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Increase Limits
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Overage Charges</CardTitle>
                  <CardDescription>Fees for exceeding limits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Additional Messages</span>
                      <span className="font-medium">$0.01 per message</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Additional Team Members</span>
                      <span className="font-medium">$5 per user/month</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Additional WhatsApp Numbers</span>
                      <span className="font-medium">$10 per number/month</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Overage charges will be billed automatically at the end of the billing period.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Invoice History</CardTitle>
                  <CardDescription>View and download past invoices</CardDescription>
                </div>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Export All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <div className="font-medium">{invoice.id}</div>
                      </TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.description}</TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            invoice.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : invoice.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {invoice.status === "paid" ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : invoice.status === "pending" ? (
                            <Clock className="h-3 w-3 mr-1" />
                          ) : (
                            <X className="h-3 w-3 mr-1" />
                          )}
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          PDF
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Billing;
