import { IssueCategory } from '@/types';
import { 
  Zap, 
  Droplets, 
  Armchair, 
  Sparkles, 
  Wifi, 
  Shield, 
  HelpCircle 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryIconProps {
  category: IssueCategory;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const categoryConfig: Record<IssueCategory, { 
  icon: React.ElementType; 
  color: string;
  bgColor: string;
  label: string;
}> = {
  electrical: {
    icon: Zap,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
    label: 'Electrical',
  },
  plumbing: {
    icon: Droplets,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    label: 'Plumbing',
  },
  furniture: {
    icon: Armchair,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    label: 'Furniture',
  },
  cleaning: {
    icon: Sparkles,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    label: 'Cleaning',
  },
  internet: {
    icon: Wifi,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    label: 'Internet',
  },
  security: {
    icon: Shield,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    label: 'Security',
  },
  other: {
    icon: HelpCircle,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    label: 'Other',
  },
};

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export const CategoryIcon: React.FC<CategoryIconProps> = ({ 
  category, 
  className,
  size = 'md' 
}) => {
  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'rounded-lg flex items-center justify-center',
        sizeClasses[size],
        config.bgColor,
        className
      )}
    >
      <Icon className={cn(iconSizes[size], config.color)} />
    </div>
  );
};

export const getCategoryLabel = (category: IssueCategory): string => {
  return categoryConfig[category].label;
};
