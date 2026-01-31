import { Announcement } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Megaphone, Building, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface AnnouncementCardProps {
  announcement: Announcement;
  className?: string;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ 
  announcement,
  className 
}) => {
  return (
    <Card className={cn("border-l-4 border-l-primary", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Megaphone className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground line-clamp-1">
              {announcement.title}
            </h3>
            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDistanceToNow(announcement.createdAt, { addSuffix: true })}
              </span>
              {announcement.targetHostel && (
                <span className="flex items-center gap-1">
                  <Building className="w-3 h-3" />
                  {announcement.targetHostel}
                  {announcement.targetBlock && `, ${announcement.targetBlock}`}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {announcement.content}
        </p>
      </CardContent>
    </Card>
  );
};
