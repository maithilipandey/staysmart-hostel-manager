import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { IssueCard } from '@/components/IssueCard';
import { AnnouncementCard } from '@/components/AnnouncementCard';
import { StatCard } from '@/components/StatCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { mockIssues, mockAnnouncements } from '@/data/mockData';
import { AlertCircle, CheckCircle, Clock, Plus, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IssueStatus } from '@/types';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter issues for current user (mock - show all for demo)
  const userIssues = mockIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = mockIssues.filter(i => i.status === 'pending').length;
  const inProgressCount = mockIssues.filter(i => i.status === 'in-progress').length;
  const resolvedCount = mockIssues.filter(i => i.status === 'resolved' || i.status === 'closed').length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-muted-foreground">
            {user?.hostel && `${user.hostel}, ${user.block}, Room ${user.room}`}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard
            title="Pending Issues"
            value={pendingCount}
            icon={Clock}
            iconClassName="bg-status-pending/10 text-status-pending"
          />
          <StatCard
            title="In Progress"
            value={inProgressCount}
            icon={AlertCircle}
            iconClassName="bg-status-in-progress/10 text-status-in-progress"
          />
          <StatCard
            title="Resolved"
            value={resolvedCount}
            icon={CheckCircle}
            iconClassName="bg-status-resolved/10 text-status-resolved"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Issues Section */}
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-semibold text-foreground">My Issues</h2>
              <Button asChild>
                <Link to="/report">
                  <Plus className="w-4 h-4 mr-2" />
                  Report Issue
                </Link>
              </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search issues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Issues List */}
            <div className="space-y-4">
              {userIssues.length > 0 ? (
                userIssues.map((issue) => (
                  <IssueCard key={issue.id} issue={issue} />
                ))
              ) : (
                <div className="text-center py-12 bg-card rounded-xl border border-border/50">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No issues found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery || statusFilter !== 'all' 
                      ? 'Try adjusting your filters'
                      : "You haven't reported any issues yet"}
                  </p>
                  <Button asChild>
                    <Link to="/report">Report an Issue</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Announcements Sidebar */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Announcements</h2>
              <Link to="/announcements" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </div>
            
            <div className="space-y-4">
              {mockAnnouncements.slice(0, 3).map((announcement) => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
