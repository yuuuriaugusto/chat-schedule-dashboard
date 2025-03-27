
import { cn } from "@/lib/utils";

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  icon?: React.ReactNode;
  type?: 'default' | 'success' | 'warning' | 'error';
}

interface RecentActivityItemProps {
  item: ActivityItem;
}

const RecentActivityItem = ({ item }: RecentActivityItemProps) => {
  const getTypeClasses = () => {
    switch (item.type) {
      case 'success':
        return 'bg-green-100 text-green-700';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700';
      case 'error':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      {item.icon && (
        <div className={cn("p-2 rounded-full h-10 w-10 flex items-center justify-center", getTypeClasses())}>
          {item.icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium">{item.title}</h4>
        <p className="text-xs text-muted-foreground truncate">{item.description}</p>
      </div>
      <div className="text-xs text-muted-foreground">
        {item.time}
      </div>
    </div>
  );
};

export default RecentActivityItem;
