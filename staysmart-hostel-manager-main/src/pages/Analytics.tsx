import { Navbar } from '@/components/Navbar';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockAnalytics } from '@/data/mockData';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';

const COLORS = {
  primary: 'hsl(224, 76%, 33%)',
  secondary: 'hsl(160, 84%, 39%)',
  accent: 'hsl(38, 92%, 50%)',
  muted: 'hsl(220, 9%, 46%)',
};

const PIE_COLORS = [COLORS.secondary, COLORS.accent, COLORS.primary];

const Analytics = () => {
  const { issuesByCategory, resolvedVsPending, responseTime, totalIssues, resolvedIssues, pendingIssues, avgResponseTime } = mockAnalytics;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track issue trends, resolution rates, and response times.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Issues"
            value={totalIssues}
            icon={AlertCircle}
            trend={{ value: 12, isPositive: false }}
          />
          <StatCard
            title="Resolved"
            value={resolvedIssues}
            icon={CheckCircle}
            iconClassName="bg-status-resolved/10 text-status-resolved"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Pending"
            value={pendingIssues}
            icon={Clock}
            iconClassName="bg-status-pending/10 text-status-pending"
          />
          <StatCard
            title="Avg Response Time"
            value={`${avgResponseTime}hrs`}
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Issues by Category */}
          <Card className="border-border/50 shadow-card">
            <CardHeader>
              <CardTitle>Issues by Category</CardTitle>
              <CardDescription>Distribution of issues across different categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={issuesByCategory} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis 
                      type="category" 
                      dataKey="category" 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                      width={80}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar 
                      dataKey="count" 
                      fill={COLORS.primary}
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Resolved vs Pending */}
          <Card className="border-border/50 shadow-card">
            <CardHeader>
              <CardTitle>Resolution Status</CardTitle>
              <CardDescription>Current status of all reported issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={resolvedVsPending}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="count"
                      nameKey="status"
                      label={({ status, count }) => `${status}: ${count}`}
                      labelLine={false}
                    >
                      {resolvedVsPending.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={PIE_COLORS[index % PIE_COLORS.length]} 
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Response Time Chart */}
        <Card className="border-border/50 shadow-card">
          <CardHeader>
            <CardTitle>Average Response Time</CardTitle>
            <CardDescription>Average time to first response over the past week (in hours)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={responseTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    tickFormatter={(value) => `${value}h`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => [`${value} hours`, 'Avg Response Time']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avgTime" 
                    stroke={COLORS.secondary}
                    strokeWidth={3}
                    dot={{ fill: COLORS.secondary, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Analytics;
