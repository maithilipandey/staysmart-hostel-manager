import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Mail, Lock, User, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { hostels, blocks } from '@/data/mockData';
import { UserRole } from '@/types';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [isSignup, setIsSignup] = useState(searchParams.get('mode') === 'signup');
  const [isLoading, setIsLoading] = useState(false);
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [hostel, setHostel] = useState('');
  const [block, setBlock] = useState('');
  const [room, setRoom] = useState('');

  const { login, signup, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let success: boolean;
      
      if (isSignup) {
        success = await signup(name, email, password, role, hostel, block, room);
      } else {
        success = await login(email, password);
      }

      if (success) {
        toast.success(isSignup ? 'Account created successfully!' : 'Welcome back!');
      } else {
        toast.error('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        
        <div className="relative z-10 flex flex-col justify-center px-12 py-16">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">StaySmart</span>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            {isSignup ? 'Join Our Community' : 'Welcome Back'}
          </h1>
          
          <p className="text-white/80 text-lg max-w-md leading-relaxed">
            {isSignup 
              ? 'Create an account to report issues, track resolutions, and stay connected with your hostel.'
              : 'Login to your dashboard to view your issues, announcements, and more.'}
          </p>
          
          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <span className="text-sm font-semibold">1</span>
              </div>
              <span>Report issues with photos</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <span className="text-sm font-semibold">2</span>
              </div>
              <span>Track resolution status</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <span className="text-sm font-semibold">3</span>
              </div>
              <span>Get notified on updates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <Card className="border-border/50 shadow-card">
            <CardHeader className="text-center">
              <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">StaySmart</span>
              </div>
              <CardTitle className="text-2xl">
                {isSignup ? 'Create Account' : 'Sign In'}
              </CardTitle>
              <CardDescription>
                {isSignup 
                  ? 'Fill in your details to get started'
                  : 'Enter your credentials to access your dashboard'}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignup && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                {isSignup && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="caretaker">Caretaker</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {role === 'student' && (
                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="hostel">Hostel</Label>
                          <Select value={hostel} onValueChange={setHostel}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {hostels.map((h) => (
                                <SelectItem key={h} value={h}>{h}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="block">Block</Label>
                          <Select value={block} onValueChange={setBlock}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {blocks.map((b) => (
                                <SelectItem key={b} value={b}>{b}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="room">Room</Label>
                          <div className="relative">
                            <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="room"
                              type="text"
                              placeholder="101"
                              value={room}
                              onChange={(e) => setRoom(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Please wait...' : (isSignup ? 'Create Account' : 'Sign In')}
                </Button>
              </form>
              
              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">
                  {isSignup ? 'Already have an account?' : "Don't have an account?"}
                </span>{' '}
                <button
                  type="button"
                  onClick={() => setIsSignup(!isSignup)}
                  className="text-primary font-medium hover:underline"
                >
                  {isSignup ? 'Sign In' : 'Create Account'}
                </button>
              </div>

              {!isSignup && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
                  <p className="font-medium mb-1">Demo Credentials:</p>
                  <p>• Student: any email + password (6+ chars)</p>
                  <p>• Admin: email with "admin" + password</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
