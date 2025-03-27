
import { useState } from "react";
import { 
  UserPlus, 
  SearchIcon, 
  User, 
  Users, 
  PlusCircle, 
  Mail, 
  Phone, 
  Calendar, 
  MessageSquare,
  Edit,
  Trash,
  ShieldCheck
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample team data
const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "",
    role: "Admin",
    department: "Management",
    status: "active",
    lastActive: "2 hours ago",
    permissions: ["Read", "Write", "Admin"],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "",
    role: "Editor",
    department: "Marketing",
    status: "active",
    lastActive: "10 minutes ago",
    permissions: ["Read", "Write"],
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    avatar: "",
    role: "Viewer",
    department: "Sales",
    status: "inactive",
    lastActive: "3 days ago",
    permissions: ["Read"],
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    avatar: "",
    role: "Editor",
    department: "Support",
    status: "active",
    lastActive: "Just now",
    permissions: ["Read", "Write"],
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    avatar: "",
    role: "Editor",
    department: "Development",
    status: "active",
    lastActive: "1 hour ago",
    permissions: ["Read", "Write"],
  },
];

// Sample team permissions structure
const teamPermissions = {
  "Schedule Management": [
    { name: "View schedules", key: "schedule_view" },
    { name: "Create schedules", key: "schedule_create" },
    { name: "Edit schedules", key: "schedule_edit" },
    { name: "Delete schedules", key: "schedule_delete" },
  ],
  "WhatsApp Integration": [
    { name: "View messages", key: "whatsapp_view" },
    { name: "Send messages", key: "whatsapp_send" },
    { name: "Manage templates", key: "whatsapp_templates" },
  ],
  "Reports & Analytics": [
    { name: "View reports", key: "reports_view" },
    { name: "Export reports", key: "reports_export" },
    { name: "Custom reports", key: "reports_custom" },
  ],
  "System Settings": [
    { name: "Manage users", key: "users_manage" },
    { name: "Security settings", key: "security_settings" },
    { name: "Billing access", key: "billing_access" },
  ],
};

const TeamManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterRole, setFilterRole] = useState("all");

  // Filter members based on search and filters
  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || member.department === filterDepartment;
    const matchesRole = filterRole === "all" || member.role === filterRole;
    return matchesSearch && matchesDepartment && matchesRole;
  });

  // Get unique departments and roles for filter dropdowns
  const departments = [...new Set(teamMembers.map((member) => member.department))];
  const roles = [...new Set(teamMembers.map((member) => member.role))];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground">
            Manage team members and permissions
          </p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      <Tabs defaultValue="members">
        <TabsList className="mb-4">
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
        </TabsList>

        <TabsContent value="members">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Manage and organize your team</CardDescription>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="relative w-full sm:w-auto">
                    <SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search members..."
                      className="pl-8 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="hidden md:table-cell">Department</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {member.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-muted-foreground">{member.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={member.role === "Admin" ? "default" : "outline"}>
                          {member.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{member.department}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant={member.status === "active" ? "success" : "secondary"} className={
                          member.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }>
                          {member.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
                        {member.lastActive}
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

        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>Permissions & Access Control</CardTitle>
              <CardDescription>Configure team member permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(teamPermissions).map(([category, permissions]) => (
                  <div key={category} className="space-y-3">
                    <div className="font-medium text-lg flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                      {category}
                    </div>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      {permissions.map((permission) => (
                        <div key={permission.key} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="text-sm font-medium">{permission.name}</div>
                          <Select defaultValue="admin">
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Roles</SelectItem>
                              <SelectItem value="admin">Admin Only</SelectItem>
                              <SelectItem value="editor">Editor+</SelectItem>
                              <SelectItem value="viewer">All Users</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Departments</CardTitle>
                <CardDescription>Organize team by departments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departments.map((dept) => (
                    <div key={dept} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{dept}</div>
                          <div className="text-sm text-muted-foreground">
                            {teamMembers.filter(m => m.department === dept).length} members
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Department
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Role Management</CardTitle>
                <CardDescription>Customize user roles and capabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roles.map((role) => (
                    <div key={role} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{role}</div>
                          <div className="text-sm text-muted-foreground">
                            {role === "Admin" ? "Full access" : role === "Editor" ? "Limited access" : "View only"}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Custom Role
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamManagement;
