import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  iconClassName?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  className,
  iconClassName,
}) => {
  return (
    <div
      className={cn(
        'bg-card rounded-xl p-6 border border-border/50 shadow-card',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
          {trend && (
            <p
              className={cn(
                'text-xs mt-2 font-medium',
                trend.isPositive ? 'text-status-resolved' : 'text-status-emergency'
              )}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from last week
            </p>
          )}
        </div>
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center',
            iconClassName || 'bg-primary/10'
          )}
        >
          <Icon className={cn('w-6 h-6', iconClassName ? 'text-current' : 'text-primary')} />
        </div>
      </div>
    </div>
  );
};
