import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { hostels, blocks } from '@/data/mockData';
import { IssueCategory, IssuePriority } from '@/types';
import { 
  Upload, 
  X, 
  Zap, 
  Droplets, 
  Armchair, 
  Sparkles, 
  Wifi, 
  Shield, 
  HelpCircle,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Flame,
  Eye,
  EyeOff,
  Send
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const categories: { value: IssueCategory; label: string; icon: React.ElementType }[] = [
  { value: 'electrical', label: 'Electrical', icon: Zap },
  { value: 'plumbing', label: 'Plumbing', icon: Droplets },
  { value: 'furniture', label: 'Furniture', icon: Armchair },
  { value: 'cleaning', label: 'Cleaning', icon: Sparkles },
  { value: 'internet', label: 'Internet', icon: Wifi },
  { value: 'security', label: 'Security', icon: Shield },
  { value: 'other', label: 'Other', icon: HelpCircle },
];

const priorities: { value: IssuePriority; label: string; icon: React.ElementType; description: string }[] = [
  { value: 'low', label: 'Low', icon: ArrowDown, description: 'Can wait a few days' },
  { value: 'medium', label: 'Medium', icon: AlertTriangle, description: 'Should be fixed soon' },
  { value: 'high', label: 'High', icon: ArrowUp, description: 'Needs attention today' },
  { value: 'urgent', label: 'Urgent', icon: Flame, description: 'Emergency situation' },
];

const ReportIssue = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<IssueCategory | ''>('');
  const [priority, setPriority] = useState<IssuePriority>('medium');
  const [hostel, setHostel] = useState(user?.hostel || '');
  const [block, setBlock] = useState(user?.block || '');
  const [room, setRoom] = useState(user?.room || '');
  const [isPublic, setIsPublic] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Mock image upload - in production, this would upload to Cloudinary
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Mock submission - in production, this would call an API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success('Issue reported successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Report an Issue
          </h1>
          <p className="text-muted-foreground">
            Describe the problem and we'll get it fixed for you.
          </p>
        </div>

        <Card className="border-border/50 shadow-card">
          <CardHeader>
            <CardTitle>Issue Details</CardTitle>
            <CardDescription>
              Provide as much detail as possible to help us resolve your issue quickly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Issue Title *</Label>
                <Input
                  id="title"
                  placeholder="Brief description of the issue"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Category Selection */}
              <div className="space-y-2">
                <Label>Category *</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setCategory(cat.value)}
                      className={cn(
                        'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                        category === cat.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border/50 hover:border-primary/50'
                      )}
                    >
                      <cat.icon className={cn(
                        'w-6 h-6',
                        category === cat.value ? 'text-primary' : 'text-muted-foreground'
                      )} />
                      <span className={cn(
                        'text-sm font-medium',
                        category === cat.value ? 'text-primary' : 'text-muted-foreground'
                      )}>
                        {cat.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the issue in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  required
                />
              </div>

              {/* Priority Selection */}
              <div className="space-y-2">
                <Label>Priority Level</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {priorities.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setPriority(p.value)}
                      className={cn(
                        'flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all',
                        priority === p.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border/50 hover:border-primary/50'
                      )}
                    >
                      <p.icon className={cn(
                        'w-5 h-5',
                        priority === p.value ? 'text-primary' : 'text-muted-foreground'
                      )} />
                      <span className={cn(
                        'text-sm font-medium',
                        priority === p.value ? 'text-primary' : 'text-muted-foreground'
                      )}>
                        {p.label}
                      </span>
                      <span className="text-xs text-muted-foreground text-center">
                        {p.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label>Location</Label>
                <div className="grid grid-cols-3 gap-3">
                  <Select value={hostel} onValueChange={setHostel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Hostel" />
                    </SelectTrigger>
                    <SelectContent>
                      {hostels.map((h) => (
                        <SelectItem key={h} value={h}>{h}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={block} onValueChange={setBlock}>
                    <SelectTrigger>
                      <SelectValue placeholder="Block" />
                    </SelectTrigger>
                    <SelectContent>
                      {blocks.map((b) => (
                        <SelectItem key={b} value={b}>{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Input
                    placeholder="Room No."
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Images (Optional)</Label>
                <div className="border-2 border-dashed border-border/50 rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </label>
                </div>

                {images.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-3">
                    {images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`Upload ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Privacy Toggle */}
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-3">
                  {isPublic ? (
                    <Eye className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-medium text-foreground">
                      {isPublic ? 'Public Issue' : 'Private Issue'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isPublic 
                        ? 'Other students can see this issue'
                        : 'Only admins and caretakers can see this'}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Issue
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ReportIssue;
