import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { AnnouncementCard } from '@/components/AnnouncementCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { mockAnnouncements, hostels, blocks } from '@/data/mockData';
import { Announcement } from '@/types';
import { Megaphone, Plus, Send } from 'lucide-react';
import { toast } from 'sonner';

const Announcements = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetHostel, setTargetHostel] = useState('all');
  const [targetBlock, setTargetBlock] = useState('all');

  const handleCreateAnnouncement = () => {
    if (!title || !content) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      title,
      content,
      targetHostel: targetHostel === 'all' ? undefined : targetHostel,
      targetBlock: targetBlock === 'all' ? undefined : targetBlock,
      createdBy: user!,
      createdAt: new Date(),
      isActive: true,
    };

    setAnnouncements(prev => [newAnnouncement, ...prev]);
    toast.success('Announcement posted successfully!');
    setIsDialogOpen(false);
    setTitle('');
    setContent('');
    setTargetHostel('all');
    setTargetBlock('all');
  };

  // Filter announcements for students based on their hostel/block
  const filteredAnnouncements = isAdmin 
    ? announcements 
    : announcements.filter(a => {
        if (!a.targetHostel) return true; // General announcement
        if (a.targetHostel === user?.hostel) {
          if (!a.targetBlock) return true;
          return a.targetBlock === user?.block;
        }
        return false;
      });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Announcements
            </h1>
            <p className="text-muted-foreground">
              {isAdmin 
                ? 'Post and manage hostel announcements'
                : 'Stay updated with the latest hostel news'}
            </p>
          </div>
          
          {isAdmin && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Announcement
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create Announcement</DialogTitle>
                  <DialogDescription>
                    Post a new announcement for hostel residents.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="Announcement title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                      id="content"
                      placeholder="Write your announcement..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Target Hostel</Label>
                      <Select value={targetHostel} onValueChange={setTargetHostel}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Hostels</SelectItem>
                          {hostels.map((h) => (
                            <SelectItem key={h} value={h}>{h}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Target Block</Label>
                      <Select 
                        value={targetBlock} 
                        onValueChange={setTargetBlock}
                        disabled={targetHostel === 'all'}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Blocks</SelectItem>
                          {blocks.map((b) => (
                            <SelectItem key={b} value={b}>{b}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button className="w-full" onClick={handleCreateAnnouncement}>
                    <Send className="w-4 h-4 mr-2" />
                    Post Announcement
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))
          ) : (
            <Card className="border-border/50">
              <CardContent className="py-12 text-center">
                <Megaphone className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No announcements yet
                </h3>
                <p className="text-muted-foreground">
                  {isAdmin 
                    ? 'Create your first announcement to notify residents'
                    : 'Check back later for hostel updates'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Announcements;
