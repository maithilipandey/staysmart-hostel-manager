import { cn } from '@/lib/utils';
import { IssuePriority } from '@/types';
import { AlertTriangle, ArrowDown, ArrowUp, Flame } from 'lucide-react';

interface PriorityBadgeProps {
  priority: IssuePriority;
  className?: string;
}

const priorityConfig: Record<IssuePriority, { 
  label: string; 
  className: string;
  icon: React.ReactNode;
}> = {
  low: {
    label: 'Low',
    className: 'bg-muted text-muted-foreground',
    icon: <ArrowDown className="w-3 h-3" />,
  },
  medium: {
    label: 'Medium',
    className: 'bg-status-in-progress/10 text-status-in-progress',
    icon: <AlertTriangle className="w-3 h-3" />,
  },
  high: {
    label: 'High',
    className: 'bg-status-pending/10 text-status-pending',
    icon: <ArrowUp className="w-3 h-3" />,
  },
  urgent: {
    label: 'Urgent',
    className: 'bg-status-emergency/10 text-status-emergency',
    icon: <Flame className="w-3 h-3" />,
  },
};

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, className }) => {
  const config = priorityConfig[priority];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium',
        config.className,
        className
      )}
    >
      {config.icon}
      {config.label}
    </span>
  );
};
