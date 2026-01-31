import { cn } from '@/lib/utils';
import { IssueStatus } from '@/types';

interface StatusBadgeProps {
  status: IssueStatus;
  className?: string;
}

const statusConfig: Record<IssueStatus, { label: string; className: string }> = {
  pending: {
    label: 'Pending',
    className: 'bg-status-pending/10 text-status-pending border-status-pending/20',
  },
  'in-progress': {
    label: 'In Progress',
    className: 'bg-status-in-progress/10 text-status-in-progress border-status-in-progress/20',
  },
  resolved: {
    label: 'Resolved',
    className: 'bg-status-resolved/10 text-status-resolved border-status-resolved/20',
  },
  closed: {
    label: 'Closed',
    className: 'bg-status-closed/10 text-status-closed border-status-closed/20',
  },
  emergency: {
    label: 'Emergency',
    className: 'bg-status-emergency/10 text-status-emergency border-status-emergency/20',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.className,
        className
      )}
    >
      <span className={cn(
        'w-1.5 h-1.5 rounded-full mr-1.5',
        status === 'pending' && 'bg-status-pending',
        status === 'in-progress' && 'bg-status-in-progress animate-pulse-gentle',
        status === 'resolved' && 'bg-status-resolved',
        status === 'closed' && 'bg-status-closed',
        status === 'emergency' && 'bg-status-emergency animate-pulse-gentle',
      )} />
      {config.label}
    </span>
  );
};
