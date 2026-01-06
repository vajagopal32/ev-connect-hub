import { useEffect, useRef } from 'react';
import { 
  Zap, 
  Calendar, 
  Car, 
  Shield, 
  Star, 
  Clock,
  Wallet,
  Bell
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.feature-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.feature-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Clock,
      title: 'Real-time Availability',
      description: 'Check live charging station status and available slots instantly.',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Calendar,
      title: 'Online Slot Booking',
      description: 'Book your charging slot in advance. No more waiting in queues.',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      icon: Car,
      title: 'EV Model Comparison',
      description: 'Compare different EV models, specs, and find the perfect vehicle.',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Multiple payment options with bank-grade security protection.',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Star,
      title: 'Ratings & Reviews',
      description: 'Read user reviews and rate your charging experience.',
      color: 'from-indigo-500 to-violet-500',
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Get alerts for booking confirmations and charging updates.',
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: Zap,
      title: 'Fast Charging',
      description: 'Locate fast charging stations for quick power-ups on the go.',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Wallet,
      title: 'Wallet & Rewards',
      description: 'Earn points on every charge and redeem for discounts.',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-muted/30 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 feature-title">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Platform Features
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Everything You Need for{' '}
            <span className="text-gradient">Smart Charging</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform offers a complete suite of features to make your EV charging 
            experience seamless and enjoyable.
          </p>
        </div>

        {/* Features Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group"
            >
              <div className="ev-card h-full text-center hover:border-primary/30">
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}>
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <h3 className="font-display text-lg font-bold mb-3 text-foreground">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
