
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  participants?: string[];
  type?: 'meeting' | 'call' | 'event';
  status?: 'upcoming' | 'inProgress' | 'completed' | 'cancelled';
}

interface UpcomingEventCardProps {
  event: Event;
  className?: string;
}

const UpcomingEventCard = ({ event, className }: UpcomingEventCardProps) => {
  const getStatusClasses = () => {
    switch (event.status) {
      case 'inProgress':
        return 'bg-green-500';
      case 'completed':
        return 'bg-gray-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getEventTypeLabel = () => {
    switch (event.type) {
      case 'meeting':
        return 'Meeting';
      case 'call':
        return 'Call';
      default:
        return 'Event';
    }
  };

  return (
    <Card className={cn("border-l-4 border-l-primary", className)}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-sm">{event.title}</h3>
            
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {event.date}
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {event.time}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary">
              {getEventTypeLabel()}
            </span>
            {event.status && (
              <span className={cn("h-2 w-2 rounded-full", getStatusClasses())} />
            )}
          </div>
        </div>
        
        {event.participants && event.participants.length > 0 && (
          <div className="mt-3 flex -space-x-2">
            {event.participants.slice(0, 3).map((participant, i) => (
              <div
                key={i}
                className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-[10px] ring-2 ring-white"
                title={participant}
              >
                {participant.charAt(0)}
              </div>
            ))}
            {event.participants.length > 3 && (
              <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] ring-2 ring-white">
                +{event.participants.length - 3}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingEventCard;
