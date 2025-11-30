import React, { useState } from 'react';
import { 
  Globe, 
  AlertCircle, 
  CheckCircle2, 
  Lock, 
  LogIn
} from "lucide-react";

// --- CONFIGURATION ---

const ROLES = {
  MANAGER: { id: 'manager', label: 'Global Manager' },
  IT: { id: 'it', label: 'IT Administrator' },
  GO: { id: 'go', label: 'Global Operations' },
  FACILITY: { id: 'facility', label: 'Facility Manager' },
  FINANCE: { id: 'finance', label: 'Procurement Finance' },
};

const USERS_DB = [
  { email: 'nitzan.raich@gmail.com', pass: '1111', name: 'Nitzan Raich', role: ROLES.MANAGER, avatar: 'NR' },
  { email: 'admin@sys.com', pass: '1111', name: 'System Admin', role: ROLES.IT, avatar: 'IT' },
  { email: 'cfo@finance.com', pass: '1111', name: 'Sarah Finance', role: ROLES.FINANCE, avatar: 'SF' },
  { email: 'ops@global.com', pass: '1111', name: 'Mike Ops', role: ROLES.GO, avatar: 'MO' },
  { email: 'fac@site.com', pass: '1111', name: 'Dave Facility', role: ROLES.FACILITY, avatar: 'DF' },
];

// --- HELPER COMPONENT ---

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  disabled?: boolean;
  icon?: React.ElementType;
  type?: "button" | "submit" | "reset";
}

const Button = ({ children, onClick, variant = "primary", className = "", disabled = false, icon: Icon, type = "button" }: ButtonProps) => {
  const base = "px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm";
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm disabled:opacity-50",
    secondary: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50",
    ghost: "text-slate-500 hover:text-slate-900 hover:bg-slate-100",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${styles[variant]} ${className}`}>
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

// --- LOGIN SCREEN COMPONENT ---

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [ssoStep, setSsoStep] = useState('idle'); // idle, redirecting, authenticating, success
  const [loggedInUser, setLoggedInUser] = useState<typeof USERS_DB[0] | null>(null);

  // Mock Login Handler
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate Network Delay
    setTimeout(() => {
      const user = USERS_DB.find(u => u.email === email && u.pass === password);
      if (user) {
        setLoggedInUser(user);
      } else {
        setError('Invalid credentials. Please try again.');
        setIsLoading(false);
      }
    }, 1000);
  };

  // Mock SSO Handler
  const handleSSO = () => {
    setSsoStep('redirecting');
    setTimeout(() => setSsoStep('authenticating'), 1000);
    setTimeout(() => {
        // Auto-login Nitzan for SSO simulation
        const user = USERS_DB.find(u => u.email === 'nitzan.raich@gmail.com');
        setLoggedInUser(user);
        setSsoStep('idle');
    }, 2500);
  };

  // If logged in, show a simple success state (or redirect in a real app)
  if (loggedInUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Login Successful</h2>
            <p className="text-slate-500 mt-2">Welcome back, {loggedInUser.name}</p>
            <p className="text-xs text-slate-400 mt-1">Role: {loggedInUser.role.label}</p>
            <button 
                onClick={() => { setLoggedInUser(null); setEmail(''); setPassword(''); setIsLoading(false); }}
                className="mt-6 text-blue-600 text-sm hover:underline"
            >
                Log out
            </button>
        </div>
      </div>
    );
  }

  // SSO Loading State
  if (ssoStep !== 'idle') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6 border border-slate-100">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-slate-900">
                    {ssoStep === 'redirecting' ? 'Connecting to Identity Provider...' : 'Verifying Credentials...'}
                </h2>
                <p className="text-sm text-slate-500 mt-2">Secure SSO Handshake via Okta/Azure AD</p>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 animate-[loading_1.5s_ease-in-out_infinite]" style={{width: '60%'}}></div>
            </div>
        </div>
      </div>
    );
  }

  // Main Login Form
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-96 bg-blue-600 transform -skew-y-3 origin-top-left -z-0" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50 -z-0" />

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl grid md:grid-cols-2 overflow-hidden relative z-10 min-h-[600px]">
        
        {/* Left: Brand / Marketing */}
        <div className="bg-slate-900 text-white p-12 flex flex-col justify-between relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
           <div className="relative z-10">
             <div className="flex items-center gap-2 mb-8">
               <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                 <Globe className="w-5 h-5 text-white" />
               </div>
               <span className="font-bold text-xl tracking-tight">BudgetCommand™</span>
             </div>
             <h1 className="text-4xl font-bold leading-tight mb-4">
               Next-Gen Financial Control
             </h1>
             <p className="text-slate-300 text-lg">
               Manage $15M portfolio with real-time AI accountability and 4-tier visibility.
             </p>
           </div>
           
           <div className="relative z-10 space-y-4">
             <div className="flex items-center gap-4 text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Enterprise Grade Security</span>
             </div>
             <div className="flex items-center gap-4 text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Role-Based Access Control</span>
             </div>
             <div className="flex items-center gap-4 text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>SSO Integrated</span>
             </div>
           </div>
        </div>

        {/* Right: Login Form */}
        <div className="p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
              <p className="text-slate-500 mt-2">Please sign in to access your dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Work Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-700">Password</label>
                    <a href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</a>
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <Button 
                variant="primary" 
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-slate-800"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500">Or continue with</span>
                </div>
              </div>

              <Button 
                variant="secondary" 
                className="w-full py-3 border-blue-100 bg-blue-50 text-blue-700 hover:bg-blue-100"
                onClick={handleSSO}
                type="button"
              >
                <div className="w-5 h-5 bg-blue-600 rounded-sm flex items-center justify-center text-[10px] text-white font-bold mr-2">ID</div>
                Single Sign-On (SSO)
              </Button>
            </form>
            
            {/* Quick Demo Helpers */}
            <div className="pt-6 border-t border-slate-100">
                <p className="text-xs text-slate-400 text-center mb-3">Dev Tools: Quick Fill</p>
                <div className="flex flex-wrap justify-center gap-2">
                    {USERS_DB.map(u => (
                        <button 
                            key={u.role.id}
                            onClick={() => { setEmail(u.email); setPassword(u.pass); }}
                            className="text-[10px] px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-600"
                        >
                            {u.role.label}
                        </button>
                    ))}
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
