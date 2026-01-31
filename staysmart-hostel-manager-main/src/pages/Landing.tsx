import { Button } from '@/components/ui/button';
import { 
  Building2, 
  CheckCircle, 
  Clock, 
  Shield, 
  BarChart3, 
  Users,
  ArrowRight,
  Megaphone,
  Wrench
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';

const features = [
  {
    icon: Wrench,
    title: 'Easy Issue Reporting',
    description: 'Report maintenance issues with photos, priority levels, and automatic room detection.',
  },
  {
    icon: Clock,
    title: 'Real-time Tracking',
    description: 'Track your issue status from submission to resolution with live updates.',
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description: 'Issues are assigned to caretakers who work to resolve them promptly.',
  },
  {
    icon: Megaphone,
    title: 'Announcements',
    description: 'Stay updated with important hostel announcements and notifications.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Administrators can track trends and improve response times.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Choose to keep your issues private or share with the community.',
  },
];

const stats = [
  { value: '500+', label: 'Issues Resolved' },
  { value: '4.2hrs', label: 'Avg Response Time' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '24/7', label: 'Support Available' },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6 animate-fade-in">
              <CheckCircle className="w-4 h-4" />
              Trusted by 1000+ students
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
              Smart Hostel
              <span className="block text-secondary">Issue Tracking</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed animate-fade-in">
              Report issues, track resolutions, and stay connected with your hostel community. 
              A modern solution for hassle-free hostel maintenance.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
              <Button size="lg" asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8">
                <Link to="/auth?mode=signup">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Link to="/auth">
                  Login to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground">
              A complete platform for managing hostel maintenance and communication.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border/50"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center shadow-xl">
            <Building2 className="w-12 h-12 text-white/80 mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Hostel Experience?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Join thousands of students who have simplified their hostel life with StaySmart.
            </p>
            <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
              <Link to="/auth?mode=signup">
                Create Free Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-muted/30 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-foreground">StaySmart</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} StaySmart. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
