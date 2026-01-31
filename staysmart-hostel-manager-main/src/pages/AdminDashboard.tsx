import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { IssueCard } from '@/components/IssueCard';
import { StatCard } from '@/components/StatCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { mockIssues, mockUsers, mockAnalytics } from '@/data/mockData';
import { Issue, IssueStatus } from '@/types';
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Search, 
  Filter,
  TrendingUp,
  Users,
  BarChart3,
  Megaphone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { StatusBadge } from '@/components/ui/StatusBadge';

const AdminDashboard = () => {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Edit form state
  const [editStatus, setEditStatus] = useState<IssueStatus>('pending');
  const [editAssignee, setEditAssignee] = useState('');
  const [editRemarks, setEditRemarks] = useState('');

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.hostel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = issues.filter(i => i.status === 'pending').length;
  const inProgressCount = issues.filter(i => i.status === 'in-progress').length;
  const resolvedCount = issues.filter(i => i.status === 'resolved' || i.status === 'closed').length;

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue);
    setEditStatus(issue.status);
    setEditAssignee(issue.assignedTo?.id || '');
    setEditRemarks(issue.remarks || '');
    setIsDialogOpen(true);
  };

  const handleUpdateIssue = () => {
    if (!selectedIssue) return;

    const caretaker = mockUsers.find(u => u.id === editAssignee);
    
    setIssues(prev => prev.map(issue => 
      issue.id === selectedIssue.id 
        ? { 
            ...issue, 
            status: editStatus, 
            assignedTo: caretaker,
            remarks: editRemarks,
            updatedAt: new Date(),
            resolvedAt: editStatus === 'resolved' ? new Date() : issue.resolvedAt
          }
        : issue
    ));

    toast.success('Issue updated successfully!');
    setIsDialogOpen(false);
  };

  const caretakers = mockUsers.filter(u => u.role === 'caretaker');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage issues, assign caretakers, and track resolutions.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/admin/analytics">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Link>
            </Button>
            <Button asChild>
              <Link to="/admin/announcements">
                <Megaphone className="w-4 h-4 mr-2" />
                Announcements
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Issues"
            value={mockAnalytics.totalIssues}
            icon={AlertCircle}
            trend={{ value: 12, isPositive: false }}
          />
          <StatCard
            title="Pending"
            value={pendingCount}
            icon={Clock}
            iconClassName="bg-status-pending/10 text-status-pending"
          />
          <StatCard
            title="In Progress"
            value={inProgressCount}
            icon={TrendingUp}
            iconClassName="bg-status-in-progress/10 text-status-in-progress"
          />
          <StatCard
            title="Resolved"
            value={resolvedCount}
            icon={CheckCircle}
            iconClassName="bg-status-resolved/10 text-status-resolved"
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        {/* Issues Section */}
        <div className="bg-card rounded-xl border border-border/50 shadow-card">
          <div className="p-6 border-b border-border/50">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search issues by title, description, or hostel..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-6">
            <div className="grid gap-4">
              {filteredIssues.length > 0 ? (
                filteredIssues.map((issue) => (
                  <IssueCard 
                    key={issue.id} 
                    issue={issue} 
                    onClick={() => handleIssueClick(issue)}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No issues found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Issue Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Manage Issue</DialogTitle>
              <DialogDescription>
                Update status, assign caretaker, and add remarks.
              </DialogDescription>
            </DialogHeader>
            
            {selectedIssue && (
              <div className="space-y-6 pt-4">
                {/* Issue Info */}
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-1">
                    {selectedIssue.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {selectedIssue.hostel}, {selectedIssue.block}, Room {selectedIssue.room}
                  </p>
                  <StatusBadge status={selectedIssue.status} />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label>Update Status</Label>
                  <Select value={editStatus} onValueChange={(v) => setEditStatus(v as IssueStatus)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Assign Caretaker */}
                <div className="space-y-2">
                  <Label>Assign Caretaker</Label>
                  <Select value={editAssignee} onValueChange={setEditAssignee}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select caretaker" />
                    </SelectTrigger>
                    <SelectContent>
                      {caretakers.map((ct) => (
                        <SelectItem key={ct.id} value={ct.id}>
                          {ct.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Remarks */}
                <div className="space-y-2">
                  <Label>Remarks</Label>
                  <Textarea
                    placeholder="Add any notes or updates..."
                    value={editRemarks}
                    onChange={(e) => setEditRemarks(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={handleUpdateIssue}>
                    Update Issue
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default AdminDashboard;
