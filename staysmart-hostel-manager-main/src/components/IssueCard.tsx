import { Issue } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PriorityBadge } from '@/components/ui/PriorityBadge';
import { CategoryIcon, getCategoryLabel } from '@/components/ui/CategoryIcon';
import { MapPin, Clock, Eye, EyeOff, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface IssueCardProps {
  issue: Issue;
  onClick?: () => void;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue, onClick }) => {
  return (
    <Card 
      className="group cursor-pointer transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 border-border/50"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <CategoryIcon category={issue.category} size="md" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {issue.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {getCategoryLabel(issue.category)}
              </p>
            </div>
          </div>
          <StatusBadge status={issue.status} />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {issue.description}
        </p>
        
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{issue.hostel}, {issue.block}, Room {issue.room}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatDistanceToNow(issue.createdAt, { addSuffix: true })}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
          <div className="flex items-center gap-2">
            <PriorityBadge priority={issue.priority} />
            {issue.isPublic ? (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Eye className="w-3 h-3" /> Public
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <EyeOff className="w-3 h-3" /> Private
              </span>
            )}
          </div>
          {issue.assignedTo && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <User className="w-3 h-3" />
              <span>{issue.assignedTo.name}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
