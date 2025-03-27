
import { Calendar as CalendarIcon, Check, PlusCircle, User, Users } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const events = [
  {
    id: "1",
    title: "Team Status Meeting",
    date: "2023-05-10",
    time: "09:00 AM",
    attendees: ["John Doe", "Jane Smith", "Bob Johnson"],
    type: "meeting",
  },
  {
    id: "2",
    title: "Client Presentation",
    date: "2023-05-10",
    time: "02:00 PM",
    attendees: ["John Doe", "Client A"],
    type: "presentation",
  },
  {
    id: "3",
    title: "Product Review",
    date: "2023-05-11",
    time: "10:30 AM",
    attendees: ["Product Team", "John Doe"],
    type: "meeting",
  },
  {
    id: "4",
    title: "WhatsApp Integration Test",
    date: "2023-05-12",
    time: "11:00 AM",
    attendees: ["Tech Team", "QA Team"],
    type: "test",
  },
  {
    id: "5",
    title: "Monthly Planning",
    date: "2023-05-15",
    time: "09:00 AM",
    attendees: ["All Teams"],
    type: "planning",
  },
];

const CalendarPage = () => {
  const date = new Date();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">
            Manage your schedule and events
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="personal">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Calendar View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personal">Personal Calendar</SelectItem>
              <SelectItem value="team">Team Calendar</SelectItem>
              <SelectItem value="all">All Calendars</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Create Event</CardTitle>
            <CardDescription>Schedule a new event or meeting</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="font-medium">Small Calendar</div>
                <Calendar
                  mode="single"
                  selected={date}
                  className="rounded-md border"
                />
              </div>

              <div className="space-y-2">
                <div className="font-medium">Upcoming</div>
                <div className="space-y-2">
                  {events.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className="flex justify-between items-center p-2 rounded-md hover:bg-gray-100"
                    >
                      <div>
                        <div className="font-medium text-sm">{event.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {event.date} • {event.time}
                        </div>
                      </div>
                      <Badge variant="outline">{event.type}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-medium">Integrations</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-md p-2 bg-gray-50">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-sm">Google Calendar</span>
                    </div>
                    <Badge variant="secondary">
                      <Check className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-md p-2 bg-gray-50">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-sm">Microsoft Outlook</span>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-5">
          <Tabs defaultValue="week">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm">
                  Today
                </Button>
                <Button variant="outline" size="icon">
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <TabsContent value="day" className="p-0 m-0">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">May 10, 2023</h3>
                    <div className="space-y-4">
                      {events
                        .filter((event) => event.date === "2023-05-10")
                        .map((event) => (
                          <div
                            key={event.id}
                            className="flex border-l-4 border-blue-500 pl-4 py-2"
                          >
                            <div className="w-24 text-sm text-muted-foreground">
                              {event.time}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{event.title}</div>
                              <div className="text-sm flex items-center gap-1 text-muted-foreground">
                                <Users className="h-3 w-3" />
                                {event.attendees.join(", ")}
                              </div>
                            </div>
                            <Badge variant="outline">{event.type}</Badge>
                          </div>
                        ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="week" className="p-0 m-0">
                  <div className="border-t">
                    <div className="grid grid-cols-7 border-b">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                          <div
                            key={day}
                            className="p-2 text-center text-xs font-medium text-muted-foreground"
                          >
                            {day}
                          </div>
                        )
                      )}
                    </div>
                    <div className="grid grid-cols-7 gap-px bg-muted min-h-[600px]">
                      {Array.from({ length: 7 * 5 }).map((_, i) => {
                        const date = new Date(2023, 4, i - 2);
                        const day = date.getDate();
                        const isCurrentMonth = date.getMonth() === 4;
                        const isToday = day === 10 && isCurrentMonth;

                        return (
                          <div
                            key={i}
                            className={`bg-background p-2 ${
                              isToday ? "bg-blue-50" : ""
                            } ${isCurrentMonth ? "" : "opacity-40"}`}
                          >
                            <div
                              className={`text-xs ${
                                isToday
                                  ? "bg-blue-500 text-white rounded-full h-5 w-5 flex items-center justify-center"
                                  : ""
                              }`}
                            >
                              {day}
                            </div>
                            {isCurrentMonth &&
                              events
                                .filter(
                                  (event) =>
                                    new Date(event.date).getDate() === day
                                )
                                .slice(0, 2)
                                .map((event, idx) => (
                                  <div
                                    key={`${event.id}-${idx}`}
                                    className="mt-1 text-xs bg-blue-100 rounded px-1 py-0.5 truncate"
                                  >
                                    {event.time} {event.title}
                                  </div>
                                ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="month" className="p-0 m-0">
                  <div className="min-h-[600px] flex items-center justify-center text-muted-foreground">
                    Monthly view calendar will be displayed here
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
