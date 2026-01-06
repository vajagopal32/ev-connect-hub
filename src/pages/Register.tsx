import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Zap, User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, 
  Loader2, Car, Building, CheckCircle2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import gsap from 'gsap';

type UserRole = 'ev_user' | 'vehicle_owner' | 'station_owner';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '' as UserRole | '',
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLDivElement>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const roles = [
    {
      id: 'ev_user' as UserRole,
      icon: User,
      title: 'EV User',
      description: 'Find charging stations and book slots',
    },
    {
      id: 'vehicle_owner' as UserRole,
      icon: Car,
      title: 'Vehicle Owner',
      description: 'Manage your EV fleet and track usage',
    },
    {
      id: 'station_owner' as UserRole,
      icon: Building,
      title: 'Station Owner',
      description: 'List and manage charging stations',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Animate step transition
    gsap.fromTo(
      stepRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
    );
  }, [step]);

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.role) {
        newErrors.role = 'Please select a role';
      }
    }

    if (currentStep === 2) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      }
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    if (currentStep === 3) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Password must contain uppercase, lowercase, and number';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'You must agree to the terms';
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      gsap.fromTo(
        cardRef.current,
        { x: -10 },
        { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' }
      );
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(3)) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setStep(4); // Success step

    // Animate success
    gsap.fromTo(
      '.success-icon',
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' }
    );

    setTimeout(() => {
      toast({
        title: 'Registration Successful!',
        description: 'Welcome to EVPortal. Redirecting to login...',
      });
      navigate('/login');
    }, 2500);
  };

  const getPasswordStrength = () => {
    const { password } = formData;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const strengthColors = ['bg-destructive', 'bg-orange-500', 'bg-amber-500', 'bg-lime-500', 'bg-primary'];
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-hero relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300">
            <Zap className="w-7 h-7 text-primary-foreground" />
          </div>
          <span className="text-2xl font-display font-bold text-foreground">
            EV<span className="text-gradient">Portal</span>
          </span>
        </Link>

        {/* Progress */}
        {step < 4 && (
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s === step
                    ? 'w-12 bg-primary'
                    : s < step
                    ? 'w-8 bg-primary/50'
                    : 'w-8 bg-muted'
                }`}
              />
            ))}
          </div>
        )}

        {/* Card */}
        <div ref={cardRef} className="ev-card p-8">
          <div ref={stepRef}>
            {/* Step 1: Role Selection */}
            {step === 1 && (
              <div>
                <div className="text-center mb-8">
                  <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                    Choose Your Role
                  </h1>
                  <p className="text-muted-foreground">
                    Select how you'll use EVPortal
                  </p>
                </div>

                <div className="space-y-4">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => updateFormData('role', role.id)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                        formData.role === role.id
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          formData.role === role.id
                            ? 'bg-gradient-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          <role.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-foreground">
                            {role.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {role.description}
                          </p>
                        </div>
                        {formData.role === role.id && (
                          <CheckCircle2 className="w-6 h-6 text-primary ml-auto" />
                        )}
                      </div>
                    </button>
                  ))}
                  {errors.role && (
                    <p className="text-destructive text-sm text-center">{errors.role}</p>
                  )}
                </div>

                <Button
                  onClick={handleNext}
                  variant="hero"
                  size="lg"
                  className="w-full mt-8 group"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}

            {/* Step 2: Personal Info */}
            {step === 2 && (
              <div>
                <div className="text-center mb-8">
                  <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                    Personal Information
                  </h1>
                  <p className="text-muted-foreground">
                    Tell us about yourself
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-foreground">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => updateFormData('fullName', e.target.value)}
                        className={`pl-12 ${errors.fullName ? 'border-destructive' : ''}`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-destructive text-sm">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className={`pl-12 ${errors.email ? 'border-destructive' : ''}`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-destructive text-sm">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">
                      Mobile Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 234 567 8900"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        className={`pl-12 ${errors.phone ? 'border-destructive' : ''}`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-destructive text-sm">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    variant="hero"
                    size="lg"
                    className="flex-1 group"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Password */}
            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <div className="text-center mb-8">
                  <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                    Secure Your Account
                  </h1>
                  <p className="text-muted-foreground">
                    Create a strong password
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => updateFormData('password', e.target.value)}
                        className={`pl-12 pr-12 ${errors.password ? 'border-destructive' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-destructive text-sm">{errors.password}</p>
                    )}
                    
                    {/* Password Strength */}
                    {formData.password && (
                      <div className="space-y-2">
                        <div className="flex gap-1">
                          {[0, 1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className={`h-1.5 flex-1 rounded-full transition-colors ${
                                i < getPasswordStrength()
                                  ? strengthColors[getPasswordStrength() - 1]
                                  : 'bg-muted'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Password strength: {strengthLabels[getPasswordStrength() - 1] || 'Very Weak'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-foreground">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                        className={`pl-12 pr-12 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-destructive text-sm">{errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Terms */}
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => updateFormData('agreeTerms', checked as boolean)}
                      className="mt-1"
                    />
                    <div>
                      <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                        I agree to the{' '}
                        <Link to="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                      {errors.agreeTerms && (
                        <p className="text-destructive text-sm mt-1">{errors.agreeTerms}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="flex-1 group"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <div className="text-center py-8">
                <div className="success-icon w-24 h-24 mx-auto rounded-full bg-gradient-primary flex items-center justify-center mb-6 shadow-glow">
                  <CheckCircle2 className="w-12 h-12 text-primary-foreground" />
                </div>
                <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                  Welcome to EVPortal!
                </h1>
                <p className="text-muted-foreground mb-6">
                  Your account has been created successfully.
                </p>
                <div className="flex justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Redirecting to login...
                </p>
              </div>
            )}
          </div>

          {/* Login Link */}
          {step < 4 && (
            <>
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Already have an account?
                  </span>
                </div>
              </div>

              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full">
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
